import { NextResponse } from 'next/server';
import { admin, getUser, getProfile } from '@/lib/supabaseAdmin';

export async function GET(request, { params }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  const { data } = await admin()
    .from('summaries').select('*').eq('id', params.id).eq('user_id', user.id).maybeSingle();
  if (!data) return NextResponse.json({ error: 'Summary not found.' }, { status: 404 });
  const profile = await getProfile(user);
  return NextResponse.json({ summary: data, plan: profile.plan });
}

export async function DELETE(request, { params }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  await admin().from('summaries').delete().eq('id', params.id).eq('user_id', user.id);
  return NextResponse.json({ ok: true });
}
