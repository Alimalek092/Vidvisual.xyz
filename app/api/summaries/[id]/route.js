import { NextResponse } from 'next/server';
import { admin, getUser, getProfile } from '@/lib/supabaseAdmin';
import { getOrCreateGuestUser } from '@/lib/guestAuth';

export async function GET(request, { params }) {
  const db = admin();
  let user = await getUser(request);
  let isGuest = false;

  if (!user) {
    const guestId = request.headers.get('x-guest-id') || request.cookies.get('vv_guest_id')?.value;
    if (guestId) {
      user = await getOrCreateGuestUser(guestId);
      isGuest = true;
    }
  }

  // Fetch summary by id
  let query = db.from('summaries').select('*').eq('id', params.id);
  // If user is resolved, verify ownership or allow shared read
  if (user) {
    query = query.eq('user_id', user.id);
  }

  const { data } = await query.maybeSingle();

  // Fallback: If not found under current user, try fetching directly (allows sharing links)
  if (!data) {
    const { data: shared } = await db.from('summaries').select('*').eq('id', params.id).maybeSingle();
    if (!shared) {
      return NextResponse.json({ error: 'Summary not found.' }, { status: 404 });
    }
    return NextResponse.json({ summary: shared, plan: 'free', isShared: true });
  }

  const plan = isGuest ? 'free' : (await getProfile(user)).plan;
  return NextResponse.json({
    summary: data,
    plan,
    isGuest,
    guestUsed: isGuest ? user?.used : undefined,
    guestLimit: isGuest ? user?.limit : undefined,
  });
}

export async function DELETE(request, { params }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  await admin().from('summaries').delete().eq('id', params.id).eq('user_id', user.id);
  return NextResponse.json({ ok: true });
}
