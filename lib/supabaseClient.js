import { createClient } from '@supabase/supabase-js';

let client;
export function supabase() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return client;
}

export async function authFetch(url, options = {}) {
  const { data } = await supabase().auth.getSession();
  const token = data.session?.access_token;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
