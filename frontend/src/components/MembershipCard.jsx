import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import CTAButton from './CTAButton';

/**
 * MembershipCard Component
 * Displays membership tiers (Free Community, Pro, Elite) with price and benefits checklist.
 */
export default function MembershipCard({
  tierName,
  price,
  billingPeriod = '/year',
  description,
  benefits = [],
  isPopular = false,
  ctaText = 'Join This Tier',
  ctaTo = '/membership',
  onClick,
  className = '',
}) {
  return (
    <div
      className={`fem-card ${isPopular ? 'fem-card-gold' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '2.25rem',
        border: isPopular ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      {isPopular && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '2rem',
            transform: 'translateY(-50%)',
            background: 'var(--gradient-gold)',
            color: '#241400',
            fontWeight: 800,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.3rem 0.85rem',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <Sparkles size={11} />
          Most Popular
        </div>
      )}

      {/* Tier Title */}
      <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.35rem' }}>
        {tierName}
      </h3>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem', minHeight: '40px' }}>
        {description}
      </p>

      {/* Price Block */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.6rem',
            fontWeight: 800,
            color: 'var(--color-burgundy)',
            lineHeight: 1,
          }}
        >
          {price}
        </span>
        {price !== 'Free' && (
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {billingPeriod}
          </span>
        )}
      </div>

      {/* Benefits List */}
      <div style={{ marginBottom: '2rem', flexGrow: 1 }}>
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gold-rich)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
          What's Included:
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {benefits.map((benefit, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'rgba(109, 27, 68, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-burgundy)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Check size={12} strokeWidth={3} />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'} btn-block btn-lg`}
        >
          {ctaText}
        </button>
      ) : (
        <CTAButton
          to={ctaTo}
          variant={isPopular ? 'primary' : 'secondary'}
          block
          size="lg"
        >
          {ctaText}
        </CTAButton>
      )}
    </div>
  );
}
