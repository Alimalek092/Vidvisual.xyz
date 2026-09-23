'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import { getPlan } from '@/lib/plans';
import Pricing from '@/components/Pricing';

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Could not load checkout'));
    document.body.appendChild(s);
  });
}

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [items, setItems] = useState(null);
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('whiteboard');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [upgrading, setUpgrading] = useState('');
  const [showPlans, setShowPlans] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase().auth.getSession();
    if (!data.session) return router.replace('/login');
    const [a, b] = await Promise.all([authFetch('/api/me'), authFetch('/api/summaries')]);
    if (a.ok) setMe(await a.json());
    if (b.ok) setItems((await b.json()).items);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function generate(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const res = await authFetch('/api/generate', { method: 'POST', body: JSON.stringify({ url, format }) });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      if (json.code === 'LIMIT') setShowPlans(true);
      return setError(json.error || 'Something went wrong. Please try again.');
    }
    router.push(`/summary/${json.id}`);
  }

  async function upgrade(plan) {
    setError('');
    setUpgrading(plan);
    try {
      const res = await authFetch('/api/billing/checkout', { method: 'POST', body: JSON.stringify({ plan }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await loadRazorpay();
      new window.Razorpay({
        key: json.key,
        subscription_id: json.subscriptionId,
        name: 'Vid Visual',
        description: `${getPlan(plan).name} plan`,
        prefill: { email: json.email },
        theme: { color: '#2B59E0' },
        handler: () => setTimeout(load, 3000),
      }).open();
    } catch (e) {
      setError(e.message || 'Could not start checkout.');
    }
    setUpgrading('');
  }

  async function remove(id) {
    await authFetch(`/api/summaries/${id}`, { method: 'DELETE' });
    setItems((list) => list.filter((x) => x.id !== id));
  }

  async function logout() {
    await supabase().auth.signOut();
    router.replace('/');
  }

  const left = me ? Math.max(0, me.limit - me.used) : null;

  return (
    <>
      <nav className="nav">
        <Link href="/" className="brand vv-hand">Vid Visual</Link>
        <div className="nav-links">
          {me ? <span className="chip">{getPlan(me.plan).name} plan</span> : null}
          <button className="link" onClick={() => setShowPlans((v) => !v)}>Plans</button>
          <button className="link" onClick={logout}>Log out</button>
        </div>
      </nav>

      <main className="dash">
        <h1 className="vv-hand">Make a visual</h1>
        <form className="gen" onSubmit={generate}>
          <input
            type="url" required placeholder="https://www.youtube.com/watch?v=…"
            value={url} onChange={(e) => setUrl(e.target.value)} aria-label="YouTube link"
          />
          <div className="seg" role="radiogroup" aria-label="Format">
            {[['whiteboard', 'Whiteboard'], ['infographic', 'Infographic']].map(([v, l]) => (
              <button type="button" key={v} role="radio" aria-checked={format === v}
                className={format === v ? 'on' : ''} onClick={() => setFormat(v)}>{l}</button>
            ))}
          </div>
          <button className="btn btn-primary" disabled={busy}>{busy ? 'Reading the video…' : 'Generate visual'}</button>
        </form>
        {me ? (
          <div className="usage">
            <div className="bar"><i style={{ width: `${Math.min(100, (me.used / me.limit) * 100)}%` }} /></div>
            <span>{left} of {me.limit} summaries left this week</span>
          </div>
        ) : null}
        {error ? <p className="msg msg-error" role="alert">{error}</p> : null}

        {showPlans ? (
          <section className="upgrade">
            <h2 className="vv-hand">Choose a plan</h2>
            <Pricing current={me?.plan} onSelect={upgrade} busy={upgrading} />
          </section>
        ) : null}

        <h2 className="vv-hand lib-title">Your library</h2>
        {items === null ? <p className="muted">Loading…</p> : items.length === 0 ? (
          <p className="muted">Nothing here yet. Paste a YouTube link above to make your first visual.</p>
        ) : (
          <ul className="library">
            {items.map((it) => (
              <li key={it.id}>
                <Link href={`/summary/${it.id}`}>
                  <img src={`https://i.ytimg.com/vi/${it.video_id}/mqdefault.jpg`} alt="" loading="lazy" />
                  <strong>{it.title}</strong>
                  <span className="muted small">{it.format === 'whiteboard' ? 'Whiteboard' : 'Infographic'} · {new Date(it.created_at).toLocaleDateString()}</span>
                </Link>
                <button className="link small" onClick={() => remove(it.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
