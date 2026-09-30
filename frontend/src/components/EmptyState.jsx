import React from 'react';
import { Sparkles, Search, Clock } from 'lucide-react';
import CTAButton from './CTAButton';

/**
 * EmptyState Component
 * Standardized placeholder state guaranteeing zero invented data.
 */
export default function EmptyState({
  icon: Icon = Clock,
  badge = 'Archive In Progress',
  title = 'Information Being Digitized',
  description = 'Official verified records for this section are being finalized by the organizing committee. Please check back shortly.',
  actionText,
  actionTo,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`fem-card ${className}`}
      style={{
        textAlign: 'center',
        padding: '3.5rem 2rem',
        maxWidth: '680px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FDFBF8 100%)',
        border: '1.5px dashed var(--border-light)',
      }}
    >
      {badge && (
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="badge badge-gold">
            {badge}
          </span>
        </div>
      )}

      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(109, 27, 68, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-burgundy)',
          marginBottom: '1.25rem',
        }}
      >
        <Icon size={28} />
      </div>

      <h3
        style={{
          fontSize: '1.45rem',
          fontWeight: 700,
          color: 'var(--color-plum-deep)',
          marginBottom: '0.65rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.94rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '520px',
          marginBottom: actionText ? '1.75rem' : '0',
        }}
      >
        {description}
      </p>

      {actionText && (
        <CTAButton
          to={actionTo}
          onClick={onAction}
          variant="primary"
          size="md"
        >
          {actionText}
        </CTAButton>
      )}
    </div>
  );
}
