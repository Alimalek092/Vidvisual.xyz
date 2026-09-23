import { NextResponse } from 'next/server';
import { getUser, getProfile, weeklyUsage } from '@/lib/supabaseAdmin';
import { getPlan } from '@/lib/plans';

export async function GET(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  const profile = await getProfile(user);
  const plan = getPlan(profile.plan);
  const used = await weeklyUsage(user.id);
  return NextResponse.json({ email: user.email, plan: plan.id, limit: plan.weekly, used });
}
