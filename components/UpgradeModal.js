'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function calculateMondayReset() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 is Sun, 1 is Mon...
  const diffToNextMonday = ((7 - day + 1) % 7) || 7;

  const nextMonday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + diffToNextMonday,
    0, 0, 0, 0
  ));

  const options = { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' };
  const formattedDate = nextMonday.toLocaleDateString('en-US', options);

  const msRemaining = nextMonday.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.floor(msRemaining / (24 * 60 * 60 * 1000)));
  const hoursRemaining = Math.max(0, Math.floor((msRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));

  const countdownText = daysRemaining > 0
    ? `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} and ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`
    : `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`;

  return { formattedDate, countdownText, daysRemaining, hoursRemaining };
}

export default function UpgradeModal({ open, onClose, used = 3, limit = 3, resetInfo: serverResetInfo }) {
  const [email, setEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [clientReset, setClientReset] = useState(null);

  useEffect(() => {
    setClientReset(calculateMondayReset());
    const interval = setInterval(() => {
      setClientReset(calculateMondayReset());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!open) return null;

  const resetData = serverResetInfo || clientReset || calculateMondayReset();

  async function handleSendRecallEmail(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSendingEmail(true);

    try {
      const res = await fetch('/api/email/recall-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send recall email');
      setEmailSent(true);
    } catch (err) {
      setEmailError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(7px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          border: '3px solid var(--ink)',
          borderRadius: '22px',
          maxWidth: '580px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '28px 24px',
          boxShadow: '10px 10px 0 var(--ink)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'var(--board)',
            border: '2px solid var(--ink)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            color: 'var(--ink)',
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        {/* 🔴 High-Impact Psychological Red Alert Banner */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '2px solid #ef4444',
            borderRadius: '14px',
            padding: '14px 16px',
            marginBottom: '18px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>🔴</span>
            <strong style={{ color: '#dc2626', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              You just reached your limit of this week!
            </strong>
          </div>
          <p style={{ margin: '0 0 6px', color: '#b91c1c', fontSize: '0.92rem', lineHeight: 1.45, fontWeight: 600 }}>
            Free allowances recharge on every Monday of every week.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #fca5a5', padding: '3px 10px', borderRadius: '8px', fontSize: '0.82rem', color: '#991b1b', fontWeight: 700 }}>
            <span>⏳ Next recharge:</span>
            <span>{resetData.countdownText}</span>
            <span>({resetData.formattedDate})</span>
          </div>
          <p style={{ margin: '8px 0 0', color: '#7f1d1d', fontSize: '0.88rem', fontWeight: 600 }}>
            👉 If you want to generate more summaries right now, buy pro version now!
          </p>
        </div>

        {/* Psychological Headline & Loss Aversion Hook */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 className="vv-hand" style={{ fontSize: '2.1rem', margin: '0 0 8px', lineHeight: 1.2, color: 'var(--ink)' }}>
            Don&apos;t lose your learning momentum!
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
            You just saved 2+ hours of video watching. Why halt your flow and wait until Monday when you can unlock <strong>50 summaries</strong> this second?
          </p>
        </div>

        {/* Value Anchor Card ($9/mo = $0.30/day) */}
        <div
          style={{
            background: 'var(--board)',
            border: '2.5px solid var(--ink)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', borderBottom: '1.5px dashed var(--border)', paddingBottom: '14px' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'var(--blue)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                ⭐ MOST POPULAR
              </div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--ink)', fontWeight: 800 }}>
                vidvisual Pro
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                For high-speed students, researchers &amp; learners
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '2px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue)', lineHeight: 1 }}>$9</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', fontWeight: 600 }}>/mo</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 700, marginTop: '2px' }}>
                Just $0.30 / day
              </div>
            </div>
          </div>

          {/* Feature Bullets with Psychological Reinforcement */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'grid', gap: '9px', fontSize: '0.92rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 900, fontSize: '1.1rem' }}>✓</span>
              <span><strong>50 summaries / week</strong> — 16x more summaries (zero waiting for Monday)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 900, fontSize: '1.1rem' }}>✓</span>
              <span><strong>Ultra-HD Vector PDF &amp; PNG</strong> — Crystal-clear whiteboard diagrams</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 900, fontSize: '1.1rem' }}>✓</span>
              <span><strong>Priority High-Speed AI Engine</strong> — Ultra-fast generation under 15 seconds</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 900, fontSize: '1.1rem' }}>✓</span>
              <span><strong>Notion &amp; GoodNotes Sync</strong> — Save notes directly to your personal vault</span>
            </li>
          </ul>

          {/* High-Converting CTA Button */}
          <Link
            href="/register?plan=pro"
            className="btn btn-primary"
            style={{
              width: '100%',
              textAlign: 'center',
              display: 'block',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: 800,
              boxShadow: '4px 4px 0 var(--ink)',
            }}
            onClick={onClose}
          >
            ⚡ Unlock Pro Now ($9/mo) &rarr;
          </Link>
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
            Instant activation • Cancel anytime with 1 click • Zero commitment
          </div>
        </div>

        {/* Monday Recall Email Box */}
        <div style={{ borderTop: '2px dashed var(--border)', paddingTop: '18px' }}>
          {emailSent ? (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '2px solid var(--green)',
                borderRadius: '12px',
                padding: '14px 16px',
                textAlign: 'center',
                color: 'var(--ink)',
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green)', marginBottom: '4px' }}>
                🎉 We&apos;ve got you covered!
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.45 }}>
                We will email you at <strong>{email}</strong> the exact minute your 3 free summaries replenish on Monday. Email sent from <em>vidvisual.xyz@gmail.com</em>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendRecallEmail} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1rem' }}>📬</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)' }}>
                  Can&apos;t upgrade today? Get a reminder when you recharge on Monday:
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>
                Enter your email. We&apos;ll notify you on Monday 00:00 UTC plus send an exclusive student discount straight from <em>vidvisual.xyz@gmail.com</em>.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '2px solid var(--ink)',
                    background: 'var(--board)',
                    color: 'var(--ink)',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={sendingEmail}
                  style={{ padding: '10px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap', fontWeight: 700 }}
                >
                  {sendingEmail ? 'Scheduling…' : 'Notify Me on Monday'}
                </button>
              </div>
              {emailError ? (
                <div style={{ color: 'var(--red)', fontSize: '0.8rem', fontWeight: 600 }}>{emailError}</div>
              ) : null}
            </form>
          )}
        </div>

        {/* Existing Member Sign In */}
        <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Already have a Pro account?{' '}
          <Link
            href="/login"
            style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'underline' }}
            onClick={onClose}
          >
            Log in to continue
          </Link>
        </div>
      </div>
    </div>
  );
}
