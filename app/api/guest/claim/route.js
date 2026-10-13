import { NextResponse } from 'next/server';
import { getUser } from '@/lib/supabaseAdmin';
import { claimGuestSummaries } from '@/lib/guestAuth';

export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });

  const { guestId } = await request.json().catch(() => ({}));
  if (!guestId) return NextResponse.json({ ok: true, claimedCount: 0 });

  const claimedCount = await claimGuestSummaries(guestId, user.id);
  return NextResponse.json({ ok: true, claimedCount });
}
