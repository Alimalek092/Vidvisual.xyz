import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { admin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  const rawBody = await request.text();

  // Signature verification (optional if secret configured)
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = request.headers.get('webhook-signature') || request.headers.get('x-polar-signature');
    const timestamp = request.headers.get('webhook-timestamp');
    const webhookId = request.headers.get('webhook-id');

    if (signature && timestamp && webhookId) {
      const signedPayload = `${webhookId}.${timestamp}.${rawBody}`;
      const secretBytes = webhookSecret.startsWith('polar_whs_')
        ? Buffer.from(webhookSecret.replace('polar_whs_', ''), 'base64')
        : Buffer.from(webhookSecret, 'utf-8');

      const expectedSignature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedPayload)
        .digest('base64');

      // Check if signatures match (safe timing)
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
        console.warn('Polar webhook signature verification failed');
      }
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

  const db = admin();

  // Extract user ID
  let userId = data.metadata?.user_id;
  const customerEmail = data.customer?.email || data.customer_email;

  // Fallback to looking up user by email if metadata is missing
  if (!userId && customerEmail) {
    const { data: profile } = await db
      .from('profiles')
      .select('id')
      .eq('email', customerEmail)
      .maybeSingle();
    if (profile) userId = profile.id;
  }

  if (!userId) {
    console.warn('Polar webhook received without matching user:', { customerEmail, eventType });
    return NextResponse.json({ received: true });
  }

  // Determine plan
  let plan = data.metadata?.plan;
  if (!plan) {
    const productName = (data.product?.name || data.name || '').toLowerCase();
    if (productName.includes('unlimited')) plan = 'unlimited';
    else if (productName.includes('team')) plan = 'team';
    else if (productName.includes('pro')) plan = 'pro';
    else plan = 'pro';
  }

  // Active subscription or purchase events
  const isActivation = [
    'subscription.created',
    'subscription.updated',
    'subscription.active',
    'order.created',
    'checkout.created',
  ].includes(eventType);

  // Cancellation or revocation events
  const isDeactivation = [
    'subscription.canceled',
    'subscription.revoked',
  ].includes(eventType);

  if (isActivation && data.status !== 'canceled') {
    await db
      .from('profiles')
      .update({ plan })
      .eq('id', userId);
    console.log(`Upgraded user ${userId} to ${plan} via Polar`);
  } else if (isDeactivation || data.status === 'canceled') {
    await db
      .from('profiles')
      .update({ plan: 'free' })
      .eq('id', userId);
    console.log(`Reverted user ${userId} to free plan via Polar`);
  }

  return NextResponse.json({ received: true });
}
