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
            : id === 'pro' ? 'Upgrade to Pro →'
            : id === 'unlimited' ? 'Go Unlimited →'
            : 'Get Team →';
          return (
            <div key={id} className={`plan${p.popular ? ' plan-hot' : ''}${id === 'unlimited' ? ' plan-value' : ''}`}>
              {p.popular ? <span className="plan-tag">Most popular</span> : null}
              {id === 'unlimited' ? <span className="plan-tag plan-tag-value">Best value</span> : null}
              <h3>{p.name}</h3>
              <p className="plan-price">
                <strong>${p.price}</strong>
                <span>{id === 'free' ? '/forever' : '/month'}</span>
              </p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {onSelect ? (
                <button
                  className={p.popular ? 'btn btn-primary btn-wide' : 'btn btn-wide'}
                  disabled={isCurrent || busy || id === 'free'}
                  onClick={() => onSelect(id)}
                >
                  {busy === id ? 'Opening checkout…' : label}
                </button>
              ) : (
                <Link className={p.popular ? 'btn btn-primary btn-wide' : 'btn btn-wide'} href={href}>{label}</Link>
              )}
            </div>
          );
        })}
      </div>
      <p className="pricing-help muted small" style={{ textAlign: 'center', marginTop: '18px' }}>
        Have questions or facing payment issues? Email us at{' '}
        <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
          vidvisual.xyz@gmail.com
        </a>
      </p>
    </>
  );
}
