import { NextResponse } from 'next/server';
import { admin, getUser } from '@/lib/supabaseAdmin';

export async function GET(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  const { data } = await admin()
    .from('summaries')
    .select('id, video_id, title, format, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(100);
  return NextResponse.json({ items: data || [] });
}
