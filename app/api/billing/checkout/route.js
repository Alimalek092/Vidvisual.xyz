import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getUser } from '@/lib/supabaseAdmin';

const PLAN_ENV = {
  pro: 'RAZORPAY_PLAN_PRO',
  unlimited: 'RAZORPAY_PLAN_UNLIMITED',
  team: 'RAZORPAY_PLAN_TEAM',
};

export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  const { plan } = await request.json().catch(() => ({}));
  const planId = process.env[PLAN_ENV[plan]];
  if (!planId) return NextResponse.json({ error: 'This plan is not available yet.' }, { status: 400 });

  const rzp = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  try {
    const sub = await rzp.subscriptions.create({
      plan_id: planId,
      total_count: 120,
      customer_notify: 1,
      notes: { user_id: user.id, plan },
    });
    return NextResponse.json({ subscriptionId: sub.id, key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, email: user.email });
  } catch {
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }
}
