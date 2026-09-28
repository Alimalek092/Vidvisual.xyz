import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { admin } from '@/lib/supabaseAdmin';
import { sendAdminPurchaseNotification } from '@/lib/email';

export async function POST(request) {
  const rawBody = await request.text();

  // Signature verification (strict if webhook secret is configured)
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = request.headers.get('webhook-signature') || request.headers.get('x-polar-signature');
    const timestamp = request.headers.get('webhook-timestamp');
    const webhookId = request.headers.get('webhook-id');

    if (!signature || !timestamp || !webhookId) {
      console.error('[Polar Webhook] Missing signature headers');
      return NextResponse.json({ error: 'Missing webhook signature headers' }, { status: 401 });
    }

    const signedPayload = `${webhookId}.${timestamp}.${rawBody}`;
    const secretBytes = webhookSecret.startsWith('polar_whs_')
      ? Buffer.from(webhookSecret.replace('polar_whs_', ''), 'base64')
      : Buffer.from(webhookSecret, 'utf-8');

    const expectedSignature = crypto
      .createHmac('sha256', secretBytes)
      .update(signedPayload)
      .digest('base64');

    const sigList = signature.split(' ');
    const matched = sigList.some((s) => {
      const clean = s.replace(/^v1,/, '');
      try {
        return crypto.timingSafeEqual(Buffer.from(clean), Buffer.from(expectedSignature));
      } catch {
        return false;
      }
    });

    if (!matched) {
      console.error('[Polar Webhook] Signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const eventType = event.type || event.event;
  const data = event.data || event;

  if (!data) {
    return NextResponse.json({ received: true });
  }

  // CRITICAL SECURITY RULE:
  // 'checkout.created' is ONLY an open checkout modal. Payment has NOT happened!
  // Ignore checkout.created, checkout.expired, etc.
  if (eventType === 'checkout.created') {
    console.log('[Polar Webhook] Checkout modal opened (unpaid). Ignoring activation.');
    return NextResponse.json({ received: true, note: 'Checkout initiated, waiting for payment' });
  }

  try {
    const db = admin();

    // Extract user ID & customer email
    const metadata = data.metadata || data.subscription?.metadata || data.order?.metadata || {};
    let userId = metadata.user_id;
    const customerEmail =
      data.customer?.email ||
      data.user?.email ||
      data.customer_email ||
      data.email;

    // Fallback to looking up user by email if metadata is missing
    if (!userId && customerEmail) {
      const cleanEmail = customerEmail.toLowerCase().trim();
      const { data: profile } = await db
        .from('profiles')
        .select('id')
        .ilike('email', cleanEmail)
        .maybeSingle();
      if (profile) userId = profile.id;
    }

    if (!userId) {
      console.warn('[Polar Webhook] Webhook received without matching user:', { customerEmail, eventType });
      return NextResponse.json({ received: true });
    }

    // Determine plan & normalize to lowercase
    let plan = metadata.plan;
    if (plan) {
      plan = String(plan).toLowerCase().trim();
    }
    if (!plan || !['pro', 'unlimited', 'team'].includes(plan)) {
      const productName = (data.product?.name || data.product?.title || data.name || '').toLowerCase();
      if (productName.includes('unlimited')) plan = 'unlimited';
      else if (productName.includes('team')) plan = 'team';
      else if (productName.includes('pro')) plan = 'pro';
      else plan = 'pro';
    }

    // STRICT PAYMENT VERIFICATION:
    // Only activate if payment was actually captured and completed:
    // 1. 'order.created' -> In Polar, an order is an invoice that was successfully PAID.
    // 2. 'subscription.active' -> In Polar, this event fires only when subscription is active & paid.
    // 3. 'subscription.created' or 'subscription.updated' ONLY if data.status === 'active'
    // 4. 'checkout.updated' ONLY if data.status === 'succeeded'
    const status = (data.status || '').toLowerCase();

    const isPaidOrder = eventType === 'order.created';
    const isActiveSubscription =
      eventType === 'subscription.active' ||
      (['subscription.created', 'subscription.updated'].includes(eventType) && status === 'active');
    const isSuccessfulCheckout =
      eventType === 'checkout.updated' && status === 'succeeded';

    const isActivation = isPaidOrder || isActiveSubscription || isSuccessfulCheckout;

    // Cancellation, revocation, or failure events
    const isDeactivation =
      [
        'subscription.canceled',
        'subscription.revoked',
        'order.refunded',
      ].includes(eventType) ||
      ['canceled', 'revoked', 'unpaid', 'past_due'].includes(status);

    if (isActivation && status !== 'canceled' && status !== 'unpaid' && status !== 'incomplete') {
      const { error: updateError } = await db
        .from('profiles')
        .update({ plan })
        .eq('id', userId);
      if (updateError) {
        console.error('[Polar Webhook] Supabase update error:', updateError);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
      console.log(`[Polar Webhook] VERIFIED PAYMENT: Upgraded user ${userId} to ${plan} (event: ${eventType}, status: ${status})`);

      // Resolve customer details for email alert
      let buyerEmail = customerEmail;
      let buyerName =
        data.customer?.name ||
        data.user?.name ||
        data.customer_name ||
        '';

      if (!buyerEmail || !buyerName) {
        try {
          const { data: userRecord } = await db.auth.admin.getUserById(userId);
          if (userRecord?.user) {
            if (!buyerEmail) buyerEmail = userRecord.user.email;
            if (!buyerName) {
              buyerName =
                userRecord.user.user_metadata?.full_name ||
                userRecord.user.user_metadata?.name ||
                buyerEmail?.split('@')[0] ||
                'Valued Customer';
            }
          }
        } catch (authErr) {
          console.warn('[Polar Webhook] Could not fetch user from auth admin:', authErr?.message);
        }
      }

      if (!buyerName && buyerEmail) {
        buyerName = buyerEmail.split('@')[0];
      }

      let formattedAmount = '';
      const rawAmount = data.amount || data.order?.amount || data.subtotal_amount;
      if (typeof rawAmount === 'number') {
        const cur = (data.currency || 'usd').toUpperCase();
        formattedAmount = `$${(rawAmount / 100).toFixed(2)} ${cur}`;
      }

      // Send purchase email alert to vidvisual.xyz@gmail.com
      // Only for verified paid events (order.created or subscription.active)
      if (isPaidOrder || eventType === 'subscription.active') {
        sendAdminPurchaseNotification({
          customerEmail: buyerEmail,
          customerName: buyerName,
          plan,
          amount: formattedAmount,
          currency: data.currency || 'USD',
          orderId: data.id || data.order_id || data.subscription_id || '',
          eventType,
        }).catch((err) => {
          console.error('[Polar Webhook] Error sending admin purchase email:', err?.message);
        });
      }
    } else if (isDeactivation) {
      const { error: updateError } = await db
        .from('profiles')
        .update({ plan: 'free' })
        .eq('id', userId);
      if (updateError) {
        console.error('[Polar Webhook] Supabase update error on deactivation:', updateError);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
      console.log(`[Polar Webhook] Reverted user ${userId} to free plan (event: ${eventType}, status: ${status})`);
    } else {
      console.log(`[Polar Webhook] Ignored non-payment event: ${eventType} with status: ${status}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[Polar Webhook] Error handling webhook event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
