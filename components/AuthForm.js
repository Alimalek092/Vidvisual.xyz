'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isRegister = mode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);
    const auth = supabase().auth;
    const { data, error: err } = isRegister
      ? await auth.signUp({ email, password })
      : await auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) return setError(err.message);
    if (isRegister && !data.session) return setNotice('Check your email and click the confirmation link, then log in.');
    router.push('/dashboard');
  }

  async function google() {
    setError('');
    const { error: err } = await supabase().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (err) setError(err.message);
  }

  return (
    <main className="auth">
      <Link href="/" className="brand vv-hand">Vid Visual</Link>
      <h1 className="vv-hand">{isRegister ? 'Create your free account' : 'Welcome back'}</h1>
      <p className="muted">{isRegister ? '3 summaries a week, free forever.' : 'Log in to see your library.'}</p>
      <button type="button" className="btn btn-wide" onClick={google}>Continue with Google</button>
      <p className="divider"><span>or use email</span></p>
      <form onSubmit={submit}>
        <label>Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label>Password
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isRegister ? 'new-password' : 'current-password'} />
        </label>
        {error ? <p className="msg msg-error" role="alert">{error}</p> : null}
        {notice ? <p className="msg msg-ok">{notice}</p> : null}
        <button className="btn btn-primary btn-wide" disabled={loading}>
          {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'}
        </button>
      </form>
      <p className="muted small">
        {isRegister ? 'Already have an account? ' : 'New here? '}
        <Link href={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create an account'}</Link>
      </p>
    </main>
  );
}
