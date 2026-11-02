import { NextResponse } from 'next/server';
import { getUser } from '@/lib/supabaseAdmin';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vidvisual.xyz';

const POLAR_URL_MAP = {
  starter: 'POLAR_CHECKOUT_STARTER',
  pro: 'POLAR_CHECKOUT_PRO',
  unlimited: 'POLAR_CHECKOUT_UNLIMITED',
};

const POLAR_PRODUCT_MAP = {
  starter: 'POLAR_PRODUCT_STARTER',
  pro: 'POLAR_PRODUCT_PRO',
  unlimited: 'POLAR_PRODUCT_UNLIMITED',
};

const DODO_URL_MAP = {
  starter: 'DODO_CHECKOUT_STARTER',
  pro: 'DODO_CHECKOUT_PRO',
  unlimited: 'DODO_CHECKOUT_UNLIMITED',
};

const DODO_PRODUCT_MAP = {
  starter: 'DODO_PRODUCT_STARTER',
  pro: 'DODO_PRODUCT_PRO',
  unlimited: 'DODO_PRODUCT_UNLIMITED',
};

/**
 * Normalizes a URL value so that if the user pasted only a product ID
 * (e.g., "pdt_0Nr3KYWOTha9IBbEU6Lo1"), it automatically converts into the full Dodo checkout URL:
 * https://checkout.dodopayments.com/buy/pdt_0Nr3KYWOTha9IBbEU6Lo1
 */
function normalizeDodoUrl(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  // If user only entered the product ID (e.g. pdt_...)
  if (trimmed.startsWith('pdt_')) {
    return `https://checkout.dodopayments.com/buy/${trimmed}`;
  }
  // Generic fallback if protocol was omitted
  return `https://${trimmed}`;
}

export async function POST(request) {
  const user = await getUser(request);

  const { plan, gateway = 'polar' } = await request.json().catch(() => ({}));
  if (!plan || !['starter', 'pro', 'unlimited'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
  }

  // ==========================================
  // PATH A: DODO PAYMENTS (UPI, Cards, Wallets)
  // ==========================================
  if (gateway === 'dodo') {
    const rawDodoUrl = process.env[DODO_URL_MAP[plan]] || process.env[DODO_PRODUCT_MAP[plan]];
    const dodoDirectUrl = normalizeDodoUrl(rawDodoUrl);

    if (dodoDirectUrl) {
      const sep = dodoDirectUrl.includes('?') ? '&' : '?';
      let finalUrl = dodoDirectUrl;
      const params = [];
      if (user?.email) params.push(`customer_email=${encodeURIComponent(user.email)}`);
      if (user?.id) params.push(`metadata_user_id=${encodeURIComponent(user.id)}`);
      params.push(`metadata_plan=${encodeURIComponent(plan)}`);
      if (params.length > 0) {
        finalUrl = `${dodoDirectUrl}${sep}${params.join('&')}`;
      }
      return NextResponse.json({ url: finalUrl });
    }

    // Direct REST API for Dodo if payment link not provided
    const dodoApiKey = process.env.DODO_PAYMENTS_API_KEY;
    const dodoProductId = process.env[DODO_PRODUCT_MAP[plan]];
    if (dodoApiKey && dodoProductId) {
      try {
        const dodoEndpoint = process.env.DODO_PAYMENTS_ENV === 'test'
          ? 'https://test.dodopayments.com/checkouts'
          : 'https://live.dodopayments.com/checkouts';

        const res = await fetch(dodoEndpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${dodoApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_cart: [{ product_id: dodoProductId, quantity: 1 }],
            customer: user?.email ? { email: user.email } : undefined,
            metadata: {
              user_id: user?.id || '',
              plan,
            },
            return_url: `${SITE_URL}/dashboard?checkout=success`,
          }),
        });

        const data = await res.json();
        if (data.checkout_url) {
          return NextResponse.json({ url: data.checkout_url });
        }
      } catch (dodoErr) {
        console.error('[Dodo API Checkout Error]:', dodoErr);
      }
    }

    // Fallback if Dodo is selected but not configured yet
    return NextResponse.json(
      { error: 'UPI payment gateway (Dodo Payments) is being connected. You can pay via Card / International using Polar right now, or contact vidvisual.xyz@gmail.com' },
      { status: 503 }
    );
  }

  // ==========================================
  // PATH B: POLAR PAYMENTS (Global Cards / Apple Pay)
  // ==========================================
  const directUrl = process.env[POLAR_URL_MAP[plan]];
  if (directUrl) {
    const sep = directUrl.includes('?') ? '&' : '?';
    if (user) {
      const finalUrl = `${directUrl}${sep}customer_email=${encodeURIComponent(user.email)}&metadata[user_id]=${encodeURIComponent(user.id)}&metadata[plan]=${encodeURIComponent(plan)}`;
      return NextResponse.json({ url: finalUrl });
    } else {
      const finalUrl = `${directUrl}${sep}metadata[plan]=${encodeURIComponent(plan)}`;
      return NextResponse.json({ url: finalUrl });
    }
  }

  const token = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env[POLAR_PRODUCT_MAP[plan]];

  if (!token && !directUrl) {
    return NextResponse.json(
      { error: 'Payment system is being initialized. Please contact support at vidvisual.xyz@gmail.com.' },
      { status: 503 }
    );
  }

  if (!productId) {
    return NextResponse.json(
      { error: `Polar Product ID for ${plan} plan is not configured yet.` },
      { status: 400 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { error: 'Please log in or create a free account to continue to checkout.' },
      { status: 401 }
    );
  }

  try {
    const res = await fetch('https://api.polar.sh/v1/checkouts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          plan: plan,
        },
        success_url: `${SITE_URL}/dashboard?checkout=success`,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.url) {
      console.error('Polar checkout error:', data);
      return NextResponse.json(
        { error: data.detail || data.message || 'Could not start checkout with Polar.' },
        { status: res.status || 500 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: 'Network error connecting to payment gateway.' },
      { status: 502 }
    );
  }
}
