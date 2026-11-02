import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { admin, addUserCredits } from '@/lib/supabaseAdmin';
import { sendAdminPurchaseNotification } from '@/lib/email';

export async function POST(request) {
  const rawBody = await request.text();

  // Signature verification (using Standard Webhooks specification)
  const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_KEY || process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = request.headers.get('webhook-signature');
    const timestamp = request.headers.get('webhook-timestamp');
    const webhookId = request.headers.get('webhook-id');

    if (!signature || !timestamp || !webhookId) {
      console.error('[Dodo Webhook] Missing signature headers');
      return NextResponse.json({ error: 'Missing webhook signature headers' }, { status: 401 });
    }

    // Check timestamp tolerance (5 minutes) to protect against replay attacks
    const FIVE_MINUTES = 5 * 60;
    const currentTime = Math.floor(Date.now() / 1000);
    if (Math.abs(currentTime - parseInt(timestamp, 10)) > FIVE_MINUTES) {
      console.error('[Dodo Webhook] Timestamp outside tolerance window');
      return NextResponse.json({ error: 'Timestamp expired' }, { status: 400 });
    }

    try {
      const secretBytes = Buffer.from(
        webhookSecret.startsWith('whsec_') ? webhookSecret.slice(6) : webhookSecret,
        'base64'
      );
      const signedContent = `${webhookId}.${timestamp}.${rawBody}`;
      const expectedSignature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest('base64');

      const signatures = signature.split(' ');
      let matched = false;
      for (const sig of signatures) {
        const [version, signatureValue] = sig.split(',');
        if (version === 'v1' && signatureValue) {
          try {
            const sigBuf = Buffer.from(signatureValue, 'base64');
            const expBuf = Buffer.from(expectedSignature, 'base64');
            if (sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf)) {
              matched = true;
              break;
            }
          } catch {}
        }
      }

      if (!matched) {
        console.error('[Dodo Webhook] Signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } catch (verifErr) {
      console.error('[Dodo Webhook] Verification error:', verifErr);
      return NextResponse.json({ error: 'Verification error' }, { status: 500 });
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

  try {
    const db = admin();

    // Extract user ID, customer email & metadata
    const metadata = data.metadata || data.subscription?.metadata || data.payment?.metadata || {};
    let userId = metadata.user_id || metadata.userId;
    const customerEmail =
      data.customer?.email ||
      data.user?.email ||
      data.customer_email ||
      data.email;

    // Fallback lookup or auto-provisioning
    if (!userId && customerEmail) {
      const cleanEmail = customerEmail.toLowerCase().trim();
      const { data: profile } = await db
        .from('profiles')
        .select('id')
        .ilike('email', cleanEmail)
        .maybeSingle();

      if (profile) {
        userId = profile.id;
      } else {
        try {
          const { data: newAuthUser } = await db.auth.admin.createUser({
            email: cleanEmail,
            email_confirm: true,
          });
          if (newAuthUser?.user) {
            userId = newAuthUser.user.id;
            await db.from('profiles').upsert({ id: userId, email: cleanEmail, plan: 'free' }).catch(() => {});
          }
        } catch (provisionErr) {
          console.warn('[Dodo Webhook] Could not auto-provision user:', provisionErr?.message || provisionErr);
        }
      }
    }

    if (!userId) {
      console.warn('[Dodo Webhook] Webhook received without matching user:', { customerEmail, eventType });
      return NextResponse.json({ received: true });
    }

    // Determine plan
    let plan = metadata.plan;
    if (plan) {
      plan = String(plan).toLowerCase().trim();
    }
    if (!plan || !['starter', 'pro', 'unlimited'].includes(plan)) {
      const productName = (data.product?.name || data.product_name || data.name || '').toLowerCase();
      if (productName.includes('starter') || productName.includes('pack') || productName.includes('30')) plan = 'starter';
      else if (productName.includes('unlimited')) plan = 'unlimited';
      else if (productName.includes('pro')) plan = 'pro';
      else plan = 'starter';
    }

    // Verification check for successful payment / active subscription
    const status = (data.status || '').toLowerCase();
    const isPaymentSucceeded = eventType === 'payment.succeeded' || eventType === 'payment.successful';
    const isSubscriptionActive = eventType === 'subscription.active' || (eventType === 'subscription.created' && status === 'active');
    const isActivation = isPaymentSucceeded || isSubscriptionActive;

    const isDeactivation =
      [
        'subscription.canceled',
        'subscription.cancelled',
        'subscription.revoked',
        'payment.refunded',
      ].includes(eventType) ||
      ['canceled', 'cancelled', 'revoked', 'refunded'].includes(status);

    if (isActivation && status !== 'failed' && status !== 'cancelled' && status !== 'canceled') {
      if (plan === 'starter') {
        await addUserCredits(userId, 30);
      } else {
        const { error: updateError } = await db
          .from('profiles')
          .update({ plan })
          .eq('id', userId);
        if (updateError) {
          console.error('[Dodo Webhook] Supabase update error:', updateError);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }
      }
      console.log(`[Dodo Webhook] VERIFIED PAYMENT: Processed ${plan} for user ${userId} (event: ${eventType})`);

      // Customer email alert
      let buyerEmail = customerEmail;
      let buyerName = data.customer?.name || data.customer_name || '';
      if (!buyerName && buyerEmail) {
        buyerName = buyerEmail.split('@')[0];
      }

      let formattedAmount = '';
      const rawAmount = data.amount || data.total_amount;
      if (typeof rawAmount === 'number') {
        const cur = (data.currency || 'USD').toUpperCase();
        formattedAmount = `${(rawAmount / 100).toFixed(2)} ${cur}`;
      }

      try {
        await sendAdminPurchaseNotification({
          customerEmail: buyerEmail || 'Customer',
          customerName: buyerName,
          plan: `(via UPI / Dodo) ${plan}`,
          amount: formattedAmount,
          currency: data.currency || 'USD',
          orderId: data.payment_id || data.id || '',
          eventType,
        });
      } catch (notifyErr) {
        console.warn('[Dodo Webhook] Admin notification failed:', notifyErr?.message || notifyErr);
      }

      return NextResponse.json({ received: true, activated: true, plan });
    }

    if (isDeactivation) {
      await db.from('profiles').update({ plan: 'free' }).eq('id', userId);
      console.log(`[Dodo Webhook] Deactivated plan for user ${userId} to free (event: ${eventType})`);
      return NextResponse.json({ received: true, deactivated: true });
    }

    return NextResponse.json({ received: true, ignored: true });
  } catch (err) {
    console.error('[Dodo Webhook] Server error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
