'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UpgradeModal({ open, onClose, used = 3, limit = 3 }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  if (!open) return null;

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
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setEmailSent(true);
    } catch (err) {
      setEmailError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'var(--paper)', border: '3px solid var(--ink)', borderRadius: '20px', maxWidth: '560px', width: '100%', maxHeight: '92vh', overflowY: 'auto', padding: '32px 28px', boxShadow: '8px 8px 0 var(--ink)', position: 'relative' }}>
        
        {/* Close button */}
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: '16px', right: '18px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--ink)' }}>
          &times;
        </button>

        {/* Header Pill */}
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(43, 89, 224, 0.12)', border: '1.5px solid var(--blue)', color: 'var(--blue)', padding: '4px 14px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            ⚡ Weekly Limit Reached ({used}/{limit})
          </span>
        </div>

        <h2 className="vv-hand" style={{ fontSize: '2.1rem', textAlign: 'center', margin: '0 0 10px', lineHeight: 1.2 }}>
          You&apos;ve experienced the power of vidvisual!
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: '0.96rem', margin: '0 auto 24px', maxWidth: '440px', lineHeight: 1.5 }}>
          You&apos;ve used all {limit} of your free visual summaries this week. Upgrade to <strong>Pro</strong> to keep summarizing videos without waiting for the weekly reset.
        </p>

        {/* Pro Plan Feature Highlights Card */}
        <div style={{ background: 'var(--board)', border: '2px solid var(--border)', borderRadius: '14px', padding: '18px 20px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
            <div>
              <strong style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>vidvisual Pro</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>For serious students &amp; professionals</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue)' }}>$9</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>/month</span>
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 800 }}>✓</span>
              <span><strong>50 summaries/week</strong> (16x more than free)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 800 }}>✓</span>
              <span><strong>Ultra-HD PNG &amp; Vector PDF</strong> (watermark-free)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 800 }}>✓</span>
              <span><strong>Priority Gemini 2.5 Flash</strong> (zero wait times)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 800 }}>✓</span>
              <span><strong>Permanent Cloud Library</strong> for Notion &amp; GoodNotes</span>
            </li>
          </ul>

          <div style={{ marginTop: '16px' }}>
            <Link
              href="/register?plan=pro"
              className="btn btn-primary"
              style={{ width: '100%', textAlign: 'center', display: 'block', padding: '12px 20px', fontSize: '1rem', fontWeight: 700 }}
              onClick={onClose}
            >
              Get Pro Access for $9/mo &rarr;
            </Link>
          </div>
        </div>

        {/* Email Recalling Box */}
        <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '20px', marginTop: '10px' }}>
          {emailSent ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1.5px solid var(--green)', borderRadius: '12px', padding: '14px 18px', textAlign: 'center', color: 'var(--green)' }}>
              <strong>🎉 Recall Email Dispatched!</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem' }}>
                We just sent your weekly reset reminder and a special upgrade link to <strong>{email}</strong> from <em>vidvisual.xyz@gmail.com</em>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendRecallEmail} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 600 }}>
                📧 Want an email alert when your 3 free summaries reset?
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                Enter your email to receive an instant reminder the moment your free summaries replenish, plus an exclusive student discount.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, minWidth: '220px', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--board)', color: 'var(--ink)', fontSize: '0.9rem' }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={sendingEmail}
                  style={{ padding: '10px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
                >
                  {sendingEmail ? 'Sending…' : 'Remind Me'}
                </button>
              </div>
              {emailError ? (
                <div style={{ color: 'var(--red)', fontSize: '0.82rem' }}>{emailError}</div>
              ) : null}
            </form>
          )}
        </div>

        {/* Footer link for existing customers */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'underline' }} onClick={onClose}>
            Log in here
          </Link>
        </div>

      </div>
    </div>
  );
}
