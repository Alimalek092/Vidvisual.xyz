import { createClient } from '@supabase/supabase-js';

export function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

export async function getUser(request) {
  const header = request.headers.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const { data, error } = await admin().auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export async function getProfile(user) {
  const db = admin();
  let { data } = await db.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (!data) {
    const res = await db.from('profiles').insert({ id: user.id, email: user.email }).select().single();
    data = res.data;
  }
  return data;
}

export async function weeklyUsage(userId) {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count } = await admin()
    .from('summaries')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', since);
  return count || 0;
}
