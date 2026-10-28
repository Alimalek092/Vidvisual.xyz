import { NextResponse } from 'next/server';
import { getUser } from '@/lib/supabaseAdmin';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vidvisual.xyz';

const POLAR_PRODUCT_MAP = {
  starter: 'POLAR_PRODUCT_STARTER',
  pro: 'POLAR_PRODUCT_PRO',
  unlimited: 'POLAR_PRODUCT_UNLIMITED',
  team: 'POLAR_PRODUCT_TEAM',
};

const POLAR_URL_MAP = {
  starter: 'POLAR_CHECKOUT_STARTER',
  pro: 'POLAR_CHECKOUT_PRO',
  unlimited: 'POLAR_CHECKOUT_UNLIMITED',
  team: 'POLAR_CHECKOUT_TEAM',
};

export async function POST(request) {
  const user = await getUser(request);

  const { plan } = await request.json().catch(() => ({}));
  if (!plan || !POLAR_PRODUCT_MAP[plan]) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
  }

  const token = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env[POLAR_PRODUCT_MAP[plan]];
  const directUrl = process.env[POLAR_URL_MAP[plan]];

  // 1. Direct Checkout Link (if configured)
  // Allows both logged-in users and guest visitors to checkout smoothly!
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

  // 2. Polar API Checkout Session (Standard)
  if (!token) {
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

  // If user is not logged in and Polar API is used, require registration or email
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
