import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * FeatureCard Component
 * Versatile card for Three Pillars, Program Elements, and Value Propositions.
 */
export default function FeatureCard({
  icon: Icon,
  pillarNumber,
  title,
  subtitle,
  description,
  bullets = [],
  linkText,
  linkTo,
  badge,
  badgeVariant = 'plum',
  variant = 'default',
  className = '',
}) {
  const isPlum = variant === 'plum';
  const isGold = variant === 'gold';
  const cardVariantClass = isPlum ? 'fem-card-plum' : isGold ? 'fem-card-gold' : 'fem-card';

  return (
    <div
      className={`${cardVariantClass} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Top Header Row with Icon / Pillar ID */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        {Icon ? (
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: isPlum ? 'rgba(255, 255, 255, 0.15)' : 'rgba(106, 27, 154, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isPlum ? '#FFFFFF' : 'var(--color-burgundy)',
            }}
          >
            <Icon size={26} />
          </div>
        ) : pillarNumber ? (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: isPlum ? 'var(--color-gold-light)' : 'var(--color-burgundy)',
              letterSpacing: '0.05em',
            }}
          >
            PILLAR {pillarNumber}
          </span>
        ) : null}

        {badge && (
          <span className={`badge badge-${badgeVariant}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '1.4rem',
          fontWeight: 700,
          color: isPlum ? '#FFFFFF' : 'var(--color-plum-deep)',
          marginBottom: subtitle ? '0.25rem' : '0.85rem',
        }}
      >
        {title}
      </h3>

      {subtitle && (
        <div
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: isPlum ? 'var(--color-gold-light)' : 'var(--color-gold-rich)',
            marginBottom: '0.85rem',
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Description */}
      <p
        style={{
          fontSize: '0.94rem',
          color: isPlum ? 'rgba(255, 255, 255, 0.88)' : 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: bullets.length > 0 ? '1rem' : '1.5rem',
        }}
      >
        {description}
      </p>

      {/* Optional Bullet Points */}
      {bullets.length > 0 && (
        <ul style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {bullets.map((bullet, i) => (
            <li
              key={i}
              style={{
                fontSize: '0.88rem',
                color: isPlum ? '#FFFFFF' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              <span style={{ color: isPlum ? 'var(--color-gold-light)' : 'var(--color-burgundy)', fontWeight: 'bold' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Action Link */}
      {linkText && linkTo && (
        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <Link
            to={linkTo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 700,
              fontSize: '0.92rem',
              color: isPlum ? '#FFFFFF' : 'var(--color-burgundy)',
              transition: 'gap var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = '0.65rem')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '0.4rem')}
          >
            <span>{linkText}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
