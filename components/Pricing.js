'use client';
import Link from 'next/link';
import { PLANS, PLAN_ORDER } from '@/lib/plans';

export default function Pricing({ current, onSelect, busy, href = '/register' }) {
  return (
    <div className="plans">
      {PLAN_ORDER.map((id) => {
        const p = PLANS[id];
        const isCurrent = current === id;
        const label = isCurrent ? 'Your plan' : id === 'free' ? 'Start free' : `Get ${p.name}`;
        return (
          <div key={id} className={`plan${p.popular ? ' plan-hot' : ''}`}>
            {p.popular ? <span className="plan-tag">Most popular</span> : null}
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
                className={p.popular ? 'btn btn-primary' : 'btn'}
                disabled={isCurrent || busy || id === 'free'}
                onClick={() => onSelect(id)}
              >
                {busy === id ? 'Opening checkout…' : label}
              </button>
            ) : (
              <Link className={p.popular ? 'btn btn-primary' : 'btn'} href={href}>{label}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
