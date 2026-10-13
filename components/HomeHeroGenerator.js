'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import UpgradeModal from '@/components/UpgradeModal';

export default function HomeHeroGenerator() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('whiteboard');
  const [language, setLanguage] = useState('auto');
  const [busy, setBusy] = useState(false);
  const [stepText, setStepText] = useState('');
  const [error, setError] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [limitData, setLimitData] = useState({ used: 3, limit: 3 });

  // Ensure persistent guest ID exists in localStorage and cookie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let gid = localStorage.getItem('vv_guest_id');
      if (!gid) {
        gid = crypto.randomUUID();
        localStorage.setItem('vv_guest_id', gid);
      }
      // Ensure cookie is synced for server-side read
      document.cookie = `vv_guest_id=${gid}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!url.trim()) return;

    setError('');
    setBusy(true);
    setStepText('🔍 Reading video transcript & captions…');

    const stepTimer1 = setTimeout(() => {
      setStepText('🧠 Gemini 2.5 Flash synthesizing core concepts…');
    }, 4500);

    const stepTimer2 = setTimeout(() => {
      setStepText('🎨 Building whiteboard concept cards & mind map…');
    }, 9500);

    try {
      const { data: sessionData } = await supabase().auth.getSession();
      const guestId = typeof window !== 'undefined' ? localStorage.getItem('vv_guest_id') : null;

      const headers = { 'Content-Type': 'application/json' };
      if (guestId) headers['x-guest-id'] = guestId;

      const res = sessionData?.session
        ? await authFetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ url, format, language }),
          })
        : await fetch('/api/generate', {
            method: 'POST',
            headers,
            body: JSON.stringify({ url, format, language }),
          });

      const json = await res.json().catch(() => ({}));

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!res.ok) {
        setBusy(false);
        if (json.code === 'LIMIT') {
          setLimitData({ used: json.used || 3, limit: json.limit || 3 });
          setShowUpgradeModal(true);
          return;
        }
        setError(json.error || 'Failed to generate visual summary. Please try another video.');
        return;
      }

      // Record in local history if guest
      if (json.isGuest && typeof window !== 'undefined') {
        try {
          const history = JSON.parse(localStorage.getItem('vv_guest_history') || '[]');
          history.unshift({ id: json.id, url, format, createdAt: new Date().toISOString() });
          localStorage.setItem('vv_guest_history', JSON.stringify(history.slice(0, 10)));
        } catch {}
      }

      setStepText('✅ Complete! Opening visual summary…');
      router.push(`/summary/${json.id}`);
    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setBusy(false);
      setError(err.message || 'Network error. Please try again.');
    }
  }

  return (
    <>
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        used={limitData.used}
        limit={limitData.limit}
      />

      <div className="hero-generator-box" style={{ background: 'var(--paper)', border: '3px solid var(--ink)', borderRadius: '18px', padding: '24px 22px', boxShadow: '6px 6px 0 var(--ink)', marginTop: '20px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'grid', gap: '14px' }}>
          
          {/* URL Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="url"
              required
              placeholder="Paste any YouTube video or podcast URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
              aria-label="YouTube video URL"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--ink)',
                background: 'var(--board)',
                color: 'var(--ink)',
                boxSizing: 'border-box',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Options Row: Format & Language */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="seg" role="radiogroup" aria-label="Summary Format" style={{ margin: 0, flex: 1, minWidth: '220px' }}>
              <button
                type="button"
                role="radio"
                aria-checked={format === 'whiteboard'}
                className={format === 'whiteboard' ? 'on' : ''}
                onClick={() => setFormat('whiteboard')}
                disabled={busy}
                style={{ fontSize: '0.88rem' }}
              >
                ✏️ Whiteboard
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={format === 'infographic'}
                className={format === 'infographic' ? 'on' : ''}
                onClick={() => setFormat('infographic')}
                disabled={busy}
                style={{ fontSize: '0.88rem' }}
              >
                📊 Infographic
              </button>
            </div>

            <select
              className="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={busy}
              aria-label="Summary Language"
              style={{ padding: '9px 14px', borderRadius: '10px', border: '2px solid var(--ink)', background: 'var(--board)', color: 'var(--ink)', fontSize: '0.88rem', fontWeight: 600, minWidth: '160px', flex: 1 }}
            >
              <option value="auto">🌐 Auto (Same as video)</option>
              <option value="English">🇺🇸 English</option>
              <option value="Spanish">🇪🇸 Spanish (Español)</option>
              <option value="French">🇫🇷 French (Français)</option>
              <option value="German">🇩🇪 German (Deutsch)</option>
              <option value="Hindi">🇮🇳 Hindi (हिन्दी)</option>
              <option value="Japanese">🇯🇵 Japanese (日本語)</option>
              <option value="Korean">🇰🇷 Korean (한국어)</option>
              <option value="Chinese">🇨🇳 Chinese (中文)</option>
              <option value="Portuguese">🇵🇹 Portuguese (Português)</option>
              <option value="Arabic">🇸🇦 Arabic (العربية)</option>
              <option value="Italian">🇮🇹 Italian (Italiano)</option>
              <option value="Russian">🇷🇺 Russian (Русский)</option>
            </select>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={busy}
            style={{ width: '100%', fontSize: '1.08rem', padding: '14px 24px', fontWeight: 700, cursor: busy ? 'wait' : 'pointer' }}
          >
            {busy ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span>{stepText || 'Synthesizing with AI…'}</span>
              </span>
            ) : (
              '⚡ Generate Visual Summary Free (No Login Needed)'
            )}
          </button>
        </form>

        {/* Live Step Tracker when busy */}
        {busy ? (
          <div style={{ marginTop: '12px', padding: '10px 14px', background: 'var(--board)', borderRadius: '10px', border: '1px solid var(--border)', textAlign: 'center', fontSize: '0.88rem', color: 'var(--blue)', fontWeight: 600 }}>
            {stepText}
          </div>
        ) : null}

        {/* Error message */}
        {error ? (
          <div className="msg msg-error" role="alert" style={{ marginTop: '14px', fontSize: '0.88rem' }}>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        ) : null}

        {/* Trust & Guarantee Strip */}
        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
          <span>✨ <strong>3 free summaries every week</strong></span>
          <span>⚡ Under 20s turnaround</span>
          <span>🔒 Zero card or login required</span>
        </div>
      </div>
    </>
  );
}
