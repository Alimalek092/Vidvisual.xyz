'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import UpgradeModal from '@/components/UpgradeModal';

const PRESET_VIDEOS = [
  { label: '🎙️ Huberman: Focus & Sleep', url: 'https://www.youtube.com/watch?v=a9yDC_Kx30o' },
  { label: '🧠 3Blue1Brown: Neural Networks', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
  { label: '🚀 Sam Altman: AI Future', url: 'https://www.youtube.com/watch?v=L_Guz73e6fw' },
  { label: '⚡ Veritasium: Real Physics', url: 'https://www.youtube.com/watch?v=bHIhgxav9LY' },
];

const LOADING_STAGES = [
  { id: 1, title: 'Fetching YouTube transcript & captions…', duration: 4500 },
  { id: 2, title: 'Gemini 2.5 Flash distilling core thesis & arguments…', duration: 5000 },
  { id: 3, title: 'Building whiteboard concept cards & relational mind map…', duration: 5500 },
  { id: 4, title: 'Rendering high-resolution visual canvas…', duration: 4000 },
];

export default function HomeHeroGenerator() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('whiteboard');
  const [language, setLanguage] = useState('auto');
  const [busy, setBusy] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [limitData, setLimitData] = useState({ used: 3, limit: 3, resetInfo: null });
  const [hasHitLimit, setHasHitLimit] = useState(false);
  const [pasteFeedback, setPasteFeedback] = useState(false);

  // Ensure persistent guest ID exists in localStorage and cookie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let gid = localStorage.getItem('vv_guest_id');
      if (!gid) {
        gid = crypto.randomUUID();
        localStorage.setItem('vv_guest_id', gid);
      }
      document.cookie = `vv_guest_id=${gid}; path=/; max-age=31536000; SameSite=Lax`;

      const storedLimit = localStorage.getItem('vv_limit_hit');
      if (storedLimit) {
        setHasHitLimit(true);
      }
    }
  }, []);

  async function handlePaste() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setUrl(text.trim());
          setPasteFeedback(true);
          setTimeout(() => setPasteFeedback(false), 2000);
        }
      }
    } catch {
      // Clipboard access denied or unsupported
    }
  }

  function handleSelectPreset(presetUrl) {
    setUrl(presetUrl);
    setError('');
  }

  async function handleGenerate(e) {
    e.preventDefault();
    if (!url.trim()) return;

    setError('');
    setBusy(true);
    setCurrentStage(0);

    const timer1 = setTimeout(() => setCurrentStage(1), 4500);
    const timer2 = setTimeout(() => setCurrentStage(2), 9500);
    const timer3 = setTimeout(() => setCurrentStage(3), 15000);

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

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (!res.ok) {
        setBusy(false);
        if (json.code === 'LIMIT') {
          setLimitData({
            used: json.used || 3,
            limit: json.limit || 3,
            resetInfo: json.resetInfo || null,
          });
          setHasHitLimit(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('vv_limit_hit', 'true');
          }
          setShowUpgradeModal(true);
          return;
        }
        setError(json.error || 'Failed to generate visual summary. Please try another video.');
        return;
      }

      if (json.isGuest && typeof window !== 'undefined') {
        try {
          const history = JSON.parse(localStorage.getItem('vv_guest_history') || '[]');
          history.unshift({ id: json.id, url, format, createdAt: new Date().toISOString() });
          localStorage.setItem('vv_guest_history', JSON.stringify(history.slice(0, 10)));
        } catch {}
      }

      router.push(`/summary/${json.id}`);
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setBusy(false);
      const raw = (err?.message || '').toLowerCase();
      if (raw.includes('abort') || raw.includes('timeout')) {
        setError('Video processing took longer than expected. Please try another video or try again.');
      } else {
        setError(err?.message || 'Network error. Please try again.');
      }
    }
  }

  return (
    <>
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        used={limitData.used}
        limit={limitData.limit}
        resetInfo={limitData.resetInfo}
      />

      <div className="hero-aurora-wrapper">
        {/* Ambient Motion Blur Aura */}
        <div className="hero-aurora-glow" />

        {/* Uiverse-Style Glass Generator Card */}
        <div className="uiverse-gen-card">
          
          {/* Limit Alert Banner */}
          {hasHitLimit ? (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1.5px solid #ef4444',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔴</span>
                  <strong style={{ color: '#dc2626', fontSize: '0.92rem' }}>
                    Weekly free limit reached (3/3).
                  </strong>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#991b1b', lineHeight: 1.4 }}>
                  Allowances reset every Monday. Upgrade for instant unlimited access or get 30 summaries for $1.99.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowUpgradeModal(true)}
                style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                ⚡ Get Instant Access
              </button>
            </div>
          ) : null}

          <form onSubmit={handleGenerate} style={{ display: 'grid', gap: '14px' }}>
            
            {/* Modern Input Field with Integrated Icons & Paste Button */}
            <div className="uiverse-input-wrapper">
              <span className="uiverse-input-icon">▶</span>
              <input
                type="url"
                required
                placeholder="Paste any YouTube video or podcast URL…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={busy}
                aria-label="YouTube video URL"
                className="uiverse-input-field"
              />
              <div className="uiverse-input-actions">
                {url ? (
                  <button
                    type="button"
                    onClick={() => setUrl('')}
                    className="uiverse-clear-btn"
                    title="Clear input"
                  >
                    ✕
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handlePaste}
                  className="uiverse-paste-btn"
                  title="Paste from clipboard"
                >
                  📋 {pasteFeedback ? 'Pasted!' : 'Paste'}
                </button>
              </div>
            </div>

            {/* 1-Click Popular Video Presets for Immediate User Engagement */}
            <div className="uiverse-presets-row">
              <span className="uiverse-presets-label">
                <span>⚡</span> Or test with 1-click popular videos:
              </span>
              <div className="uiverse-presets-chips">
                {PRESET_VIDEOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className="uiverse-chip-btn"
                    disabled={busy}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Options Row: Format Switcher & Language Dropdown */}
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
                  ✏️ Whiteboard Cards
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
                  📊 Mind Map &amp; Hub
                </button>
              </div>

              <select
                className="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={busy}
                aria-label="Summary Language"
                style={{
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--line)',
                  background: 'var(--board)',
                  color: 'var(--ink)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  minWidth: '160px',
                  flex: 1,
                }}
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

            {/* Primary Action Button with Uiverse Shimmer Effect */}
            <button
              type="submit"
              className="uiverse-cta-btn"
              disabled={busy}
            >
              {busy ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <span>Transforming Video with AI…</span>
                </span>
              ) : hasHitLimit ? (
                '⚡ Weekly Limit Reached — Upgrade to Continue'
              ) : (
                '⚡ Generate Visual Notes in 20s (Free · No Login)'
              )}
            </button>
          </form>

          {/* High-Tech Animated Loading Suite When Generating */}
          {busy ? (
            <div className="uiverse-loading-suite" role="status" aria-live="polite">
              <div className="uiverse-loading-bar-track">
                <div
                  className="uiverse-loading-bar-fill"
                  style={{ width: `${Math.min(100, (currentStage + 1) * 25)}%` }}
                />
              </div>
              <div className="uiverse-loading-steps">
                {LOADING_STAGES.map((stg, i) => {
                  const isDone = currentStage > i;
                  const isActive = currentStage === i;
                  return (
                    <div
                      key={stg.id}
                      className={`uiverse-step-item ${isDone ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    >
                      <span className="uiverse-step-indicator">
                        {isDone ? '✓' : isActive ? '▶' : i + 1}
                      </span>
                      <span>{stg.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Error Message */}
          {error ? (
            <div className="msg msg-error" role="alert" style={{ marginTop: '14px', fontSize: '0.88rem' }}>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : null}

          {/* Trust & Guarantee Strip */}
          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
            <span>✨ <strong>3 free visual summaries / week</strong></span>
            <span>⚡ 20-second turnaround</span>
            <span>🔒 Zero signup or card needed</span>
          </div>
        </div>
      </div>
    </>
  );
}
