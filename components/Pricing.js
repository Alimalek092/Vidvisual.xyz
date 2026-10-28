'use client';
import Link from 'next/link';
import { PLANS, PLAN_ORDER } from '@/lib/plans';

export default function Pricing({ current, onSelect, busy, href = '/register' }) {
  return (
    <>
      <div className="plans">
        {PLAN_ORDER.map((id) => {
          const p = PLANS[id];
          const isCurrent = current === id;
          const label = isCurrent
            ? 'Your current plan'
            : id === 'free' ? 'Get started free'
            : id === 'starter' ? 'Get 30 Summaries ($1.99) →'
            : id === 'pro' ? 'Upgrade to Pro →'
            : id === 'unlimited' ? 'Go Unlimited →'
            : 'Get Team →';

          const priceSpan = id === 'free'
            ? '/forever'
            : p.isOneTime
            ? '/one-time'
            : '/month';

          return (
            <div
              key={id}
              className={`plan${p.popular ? ' plan-hot' : ''}${id === 'unlimited' ? ' plan-value' : ''}${id === 'starter' ? ' plan-starter' : ''}`}
              style={id === 'starter' ? { borderColor: '#f59e0b' } : undefined}
            >
              {p.popular ? <span className="plan-tag">Most popular</span> : null}
              {id === 'unlimited' ? <span className="plan-tag plan-tag-value">Best value</span> : null}
              {p.badge && !p.popular && id !== 'unlimited' ? (
                <span className="plan-tag" style={{ background: '#f59e0b', color: '#1e293b' }}>
                  {p.badge}
                </span>
              ) : null}

              <h3>{p.name}</h3>
              <p className="plan-price">
                <strong>${p.price}</strong>
                <span>{priceSpan}</span>
              </p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {onSelect ? (
                <button
                  className={p.popular ? 'btn btn-primary btn-wide' : id === 'starter' ? 'btn btn-primary btn-wide' : 'btn btn-wide'}
                  style={id === 'starter' ? { background: '#f59e0b', borderColor: '#d97706', color: '#1e293b' } : undefined}
                  disabled={isCurrent || busy || id === 'free'}
                  onClick={() => onSelect(id)}
                >
                  {busy === id ? 'Opening checkout…' : label}
                </button>
              ) : (
                <Link
                  className={p.popular ? 'btn btn-primary btn-wide' : id === 'starter' ? 'btn btn-primary btn-wide' : 'btn btn-wide'}
                  style={id === 'starter' ? { background: '#f59e0b', borderColor: '#d97706', color: '#1e293b' } : undefined}
                  href={`${href}${href.includes('?') ? '&' : '?'}plan=${id}`}
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <p className="pricing-help muted small" style={{ textAlign: 'center', marginTop: '24px' }}>
        ⚡ Secure payment via Polar • Instant delivery • Questions or feedback? Email us anytime at{' '}
        <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
          vidvisual.xyz@gmail.com
        </a>
      </p>
    </>
  );
}
