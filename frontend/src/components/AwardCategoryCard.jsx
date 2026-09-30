import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Sparkles } from 'lucide-react';

/**
 * AwardCategoryCard Component
 * Displays individual award categories with category code, domain badge, and direct apply trigger.
 */
export default function AwardCategoryCard({
  code,
  name,
  domain,
  description,
  isHonorary = false,
  className = '',
}) {
  return (
    <div
      className={`fem-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderTop: isHonorary ? '3px solid var(--color-gold)' : '3px solid var(--color-burgundy)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--color-gold-rich)',
            letterSpacing: '0.06em',
          }}
        >
          {code}
        </span>
        <span className={`badge ${isHonorary ? 'badge-gold' : 'badge-plum'}`} style={{ fontSize: '0.7rem' }}>
          {isHonorary ? 'Honorary' : domain}
        </span>
      </div>

      <h4
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--color-plum-deep)',
          marginBottom: '0.65rem',
          lineHeight: 1.35,
        }}
      >
        {name}
      </h4>

      {description && (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          {description}
        </p>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-rich)', fontWeight: 600 }}>
          50% Jury + 50% Vote
        </span>
        <Link
          to={`/nominate?category=${encodeURIComponent(name)}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--color-burgundy)',
          }}
        >
          <span>Nominate</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
