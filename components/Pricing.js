'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PLANS, PLAN_ORDER } from '@/lib/plans';

export default function Pricing({ current, onSelect, busy, href = '/register' }) {
  const [gateway, setGateway] = useState('polar'); // 'polar' | 'dodo'

  return (
    <>
      {/* 🇮🇳 International Cards vs. UPI / Indian Payment Switch */}
      <div
        className="payment-gateway-switcher"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 24px',
          maxWidth: '520px',
        }}
      >
        <div
          style={{
            background: 'var(--paper)',
            border: '2px solid var(--ink)',
            borderRadius: '999px',
            padding: '4px',
            display: 'inline-flex',
            gap: '4px',
            boxShadow: '3px 3px 0 var(--ink)',
            width: '100%',
          }}
        >
          <button
            type="button"
            onClick={() => setGateway('polar')}
            style={{
              flex: 1,
              padding: '9px 16px',
              borderRadius: '999px',
              border: 'none',
              background: gateway === 'polar' ? 'var(--blue)' : 'transparent',
              color: gateway === 'polar' ? '#fff' : 'var(--ink)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>💳 Card / Global</span>
            <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>(Polar)</span>
          </button>

          <button
            type="button"
            onClick={() => setGateway('dodo')}
            style={{
              flex: 1,
              padding: '9px 16px',
              borderRadius: '999px',
              border: 'none',
              background: gateway === 'dodo' ? '#16a34a' : 'transparent',
              color: gateway === 'dodo' ? '#fff' : 'var(--ink)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>🇮🇳 Pay with UPI</span>
            <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>(Dodo)</span>
          </button>
        </div>
      </div>

      <div className="plans">
        {PLAN_ORDER.map((id) => {
          const p = PLANS[id];
          const isCurrent = current === id;
          const label = isCurrent
            ? 'Your current plan'
            : id === 'free' ? 'Get started free'
            : id === 'starter' ? (gateway === 'dodo' ? 'Pay $1.99 via UPI →' : 'Get 30 Summaries ($1.99) →')
            : id === 'pro' ? (gateway === 'dodo' ? 'Upgrade via UPI ($9/mo) →' : 'Upgrade to Pro →')
            : (gateway === 'dodo' ? 'Get Unlimited via UPI →' : 'Go Unlimited →');

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
                  style={
                    gateway === 'dodo' && id !== 'free'
                      ? { background: '#16a34a', borderColor: '#15803d', color: '#fff' }
                      : id === 'starter'
                      ? { background: '#f59e0b', borderColor: '#d97706', color: '#1e293b' }
                      : undefined
                  }
                  disabled={isCurrent || busy || id === 'free'}
                  onClick={() => onSelect(id, gateway)}
                >
                  {busy === id ? 'Opening checkout…' : label}
                </button>
              ) : (
                <Link
                  className={p.popular ? 'btn btn-primary btn-wide' : id === 'starter' ? 'btn btn-primary btn-wide' : 'btn btn-wide'}
                  style={
                    gateway === 'dodo' && id !== 'free'
                      ? { background: '#16a34a', borderColor: '#15803d', color: '#fff' }
                      : id === 'starter'
                      ? { background: '#f59e0b', borderColor: '#d97706', color: '#1e293b' }
                      : undefined
                  }
                  href={`${href}${href.includes('?') ? '&' : '?'}plan=${id}&gateway=${gateway}`}
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <p className="pricing-help muted small" style={{ textAlign: 'center', marginTop: '24px' }}>
        ⚡ {gateway === 'dodo' ? 'Instant UPI & Indian payment via Dodo Payments' : 'Secure global payment via Polar (Cards, Apple Pay)'} • Instant delivery • Questions or feedback? Email us at{' '}
        <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
          vidvisual.xyz@gmail.com
        </a>
      </p>
    </>
  );
}
