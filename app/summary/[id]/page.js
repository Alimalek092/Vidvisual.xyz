'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import { getPlan } from '@/lib/plans';
import Visual, { THEMES } from '@/components/Visual';

function download(dataUrl, name) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = name;
  a.click();
}

export default function SummaryPage({ params }) {
  const router = useRouter();
  const ref = useRef(null);
  const [state, setState] = useState({ loading: true });
  const [theme, setTheme] = useState('marker');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase().auth.getSession();
      if (!data.session) return router.replace('/login');
      const res = await authFetch(`/api/summaries/${params.id}`);
      const json = await res.json();
      if (!res.ok) return setState({ error: json.error });
      setState({ summary: json.summary, plan: getPlan(json.plan) });
    })();
  }, [params.id, router]);

  if (state.loading) return <main className="dash"><p className="muted">Loading…</p></main>;
  if (state.error) return <main className="dash"><p className="msg msg-error">{state.error}</p><Link href="/dashboard">Back to library</Link></main>;

  const { summary, plan } = state;
  const base = summary.title.replace(/[^\w]+/g, '-').slice(0, 40) || 'visual';

  async function exportAs(kind) {
    setError('');
    setBusy(kind);
    try {
      const lib = await import('html-to-image');
      if (kind === 'jpg') {
        download(await lib.toJpeg(ref.current, { quality: 0.92, pixelRatio: 2, backgroundColor: '#ffffff' }), `${base}.jpg`);
      } else if (kind === 'png') {
        download(await lib.toPng(ref.current, { pixelRatio: 3 }), `${base}-HD.png`);
      } else if (kind === 'pdf') {
        const img = await lib.toPng(ref.current, { pixelRatio: 2 });
        const { jsPDF } = await import('jspdf');
        const w = ref.current.offsetWidth, h = ref.current.offsetHeight;
        const pdf = new jsPDF({ orientation: w > h ? 'l' : 'p', unit: 'px', format: [w, h] });
        pdf.addImage(img, 'PNG', 0, 0, w, h);
        pdf.save(`${base}.pdf`);
      }
    } catch {
      setError('Could not create the download. Please try again.');
    }
    setBusy('');
  }

  return (
    <>
      <nav className="nav">
        <Link href="/dashboard" className="brand vv-hand">Vid Visual</Link>
        <div className="nav-links"><Link href="/dashboard">Back to library</Link></div>
      </nav>
      <main className="dash">
        <h1 className="vv-hand small-h">{summary.title}</h1>
        <div className="toolbar">
          <button className="btn" disabled={!!busy} onClick={() => exportAs('jpg')}>{busy === 'jpg' ? 'Preparing…' : 'Download JPG'}</button>
          <button className="btn" disabled={!!busy || !plan.hdPng} onClick={() => exportAs('png')} title={plan.hdPng ? '' : 'Pro and above'}>
            {plan.hdPng ? (busy === 'png' ? 'Preparing…' : 'Download HD PNG') : 'HD PNG · Pro'}
          </button>
          <button className="btn" disabled={!!busy || !plan.pdf} onClick={() => exportAs('pdf')} title={plan.pdf ? '' : 'Unlimited and above'}>
            {plan.pdf ? (busy === 'pdf' ? 'Preparing…' : 'Download PDF') : 'PDF · Unlimited'}
          </button>
          <span className="spacer" />
          {plan.themes ? (
            <label className="theme">Theme
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {Object.entries(THEMES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </label>
          ) : <span className="muted small">Custom themes come with Unlimited</span>}
        </div>
        {error ? <p className="msg msg-error" role="alert">{error}</p> : null}
        <div className="stage">
          <Visual ref={ref} data={summary.data} format={summary.format} theme={theme} watermark={plan.watermark} />
        </div>
      </main>
    </>
  );
}
