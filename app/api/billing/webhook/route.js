import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { admin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  const raw = await request.text();
  const signature = request.headers.get('x-razorpay-signature') || '';
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
    .update(raw)
    .digest('hex');
  const ok =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!ok) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

  const event = JSON.parse(raw);
  const sub = event?.payload?.subscription?.entity;
  const userId = sub?.notes?.user_id;
  const plan = sub?.notes?.plan;
  if (!userId) return NextResponse.json({ ok: true });

  const db = admin();
  if (['subscription.activated', 'subscription.charged', 'subscription.resumed'].includes(event.event)) {
    await db.from('profiles').update({ plan, razorpay_subscription_id: sub.id }).eq('id', userId);
  } else if (['subscription.cancelled', 'subscription.halted', 'subscription.completed', 'subscription.expired'].includes(event.event)) {
    await db.from('profiles').update({ plan: 'free' }).eq('id', userId).eq('razorpay_subscription_id', sub.id);
  }
  return NextResponse.json({ ok: true });
}
