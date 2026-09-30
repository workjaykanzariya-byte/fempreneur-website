import React from 'react';

/**
 * StatCard Component
 * Displays verified track record metrics with icon and label.
 */
export default function StatCard({
  icon: Icon,
  value,
  label,
  description,
  accentColor = 'var(--color-burgundy)',
  badge,
  className = '',
}) {
  return (
    <div
      className={`fem-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '1.25rem' }}>
        {Icon && (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(109, 27, 68, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accentColor,
            }}
          >
            <Icon size={24} />
          </div>
        )}
        {badge && (
          <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
            {badge}
          </span>
        )}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'var(--color-plum-deep)',
          lineHeight: 1,
          marginBottom: '0.4rem',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--color-burgundy)',
          marginBottom: '0.35rem',
        }}
      >
        {label}
      </div>

      {description && (
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 'auto' }}>
          {description}
        </p>
      )}
    </div>
  );
}
