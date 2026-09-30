import React from 'react';

/**
 * SectionTitle Component
 * Provides unified, elegant typography hierarchy for all page sections.
 */
export default function SectionTitle({
  badge,
  badgeVariant = 'plum',
  title,
  highlight,
  subtitle,
  align = 'center',
  maxWidth = '750px',
  light = false,
  className = '',
}) {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  const marginClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`section-header ${alignClass} ${className}`} style={{ marginBottom: '3rem' }}>
      {badge && (
        <div style={{ marginBottom: '1rem' }}>
          <span className={`badge badge-${badgeVariant}`}>
            {badge}
          </span>
        </div>
      )}

      <h2
        style={{
          color: light ? '#FFFFFF' : 'var(--color-plum-deep)',
          marginBottom: '1rem',
          fontWeight: 800,
        }}
      >
        {title}{' '}
        {highlight && (
          <span className={light ? 'text-gold' : 'text-gradient'}>
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={marginClass}
          style={{
            maxWidth: maxWidth,
            fontSize: '1.08rem',
            color: light ? 'rgba(255, 255, 255, 0.82)' : 'var(--text-secondary)',
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
