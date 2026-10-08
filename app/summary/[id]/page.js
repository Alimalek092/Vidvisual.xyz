'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import { getPlan } from '@/lib/plans';
import Visual, { THEMES } from '@/components/Visual';
import SupportModal from '@/components/SupportModal';

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
  const [showSupport, setShowSupport] = useState(false);

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
      const bg = document.documentElement.dataset.theme === 'dark' ? '#0f172a' : '#ffffff';
      const node = ref.current;
      if (!node) throw new Error('Visual element not found');

      // Canonical desktop width (1200px) ensures clean layout without mobile squishing
      const TARGET_WIDTH = 1200;
      const actualWidth = node.offsetWidth || TARGET_WIDTH;
      const scale = TARGET_WIDTH / actualWidth;
      const targetHeight = Math.round(node.offsetHeight * scale);

      // Ultra-HD export configuration:
      // High pixel ratio + fixed desktop rendering dimensions prevents mobile downsampling blur
      const exportOptions = {
        backgroundColor: bg,
        width: TARGET_WIDTH,
        height: targetHeight,
        style: {
          width: `${TARGET_WIDTH}px`,
          maxWidth: `${TARGET_WIDTH}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          margin: '0',
        },
      };

      if (kind === 'jpg') {
        const dataUrl = await lib.toJpeg(node, {
          ...exportOptions,
          quality: 0.98,
          pixelRatio: 2.5,
        });
        download(dataUrl, `${base}.jpg`);
      } else if (kind === 'png') {
        const dataUrl = await lib.toPng(node, {
          ...exportOptions,
          pixelRatio: 3, // Ultra-sharp 3600px resolution
        });
        download(dataUrl, `${base}-UltraHD.png`);
      } else if (kind === 'pdf') {
        const img = await lib.toPng(node, {
          ...exportOptions,
          pixelRatio: 2.5,
        });
        const { jsPDF } = await import('jspdf/dist/jspdf.umd.min.js');
        const pdf = new jsPDF({
          orientation: TARGET_WIDTH > targetHeight ? 'l' : 'p',
          unit: 'px',
          format: [TARGET_WIDTH, targetHeight],
          hotfixes: ['px_scaling'],
        });
        pdf.addImage(img, 'PNG', 0, 0, TARGET_WIDTH, targetHeight, undefined, 'FAST');
        pdf.save(`${base}.pdf`);
      }
    } catch (err) {
      console.error('[Export Error]:', err);
      setError('Could not create the download. Please try again.');
    }
    setBusy('');
  }

  return (
    <>
      <nav className="nav">
        <Link href="/dashboard" className="brand vv-hand"><img src="/logo.png" alt="Vid Visual" className="brand-icon" width="32" height="32" /><span>Vid Visual</span></Link>
        <div className="nav-links">
          <button className="link" onClick={() => setShowSupport(true)}>Support</button>
          <Link href="/dashboard">Back to library</Link>
        </div>
      </nav>

      <SupportModal open={showSupport} onClose={() => setShowSupport(false)} />

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
        {error ? (
          <div className="msg msg-error" role="alert">
            <p style={{ margin: 0 }}>{error}</p>
            <p className="small" style={{ margin: '6px 0 0' }}>
              Having trouble? Contact support at{' '}
              <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                vidvisual.xyz@gmail.com
              </a>
            </p>
          </div>
        ) : null}
        <div className="stage">
          <Visual ref={ref} data={summary.data} format={summary.format} theme={theme} watermark={plan.watermark} />
        </div>
      </main>
    </>
  );
}
