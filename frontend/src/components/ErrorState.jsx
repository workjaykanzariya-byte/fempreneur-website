import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import CTAButton from './CTAButton';

/**
 * ErrorState Component
 * Displays actionable error messages with optional retry callback.
 */
export default function ErrorState({
  title = 'Unable to Load Content',
  message = 'An unexpected error occurred while fetching information. Please verify your connection or try again.',
  onRetry,
  retryText = 'Try Again',
  className = '',
}) {
  return (
    <div
      className={`fem-card ${className}`}
      style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        maxWidth: '540px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1.5px solid rgba(224, 93, 93, 0.25)',
        background: '#FFFDFD',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-coral-soft)',
          color: 'var(--color-coral)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <AlertCircle size={28} />
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--color-plum-deep)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: onRetry ? '1.5rem' : '0',
        }}
      >
        {message}
      </p>

      {onRetry && (
        <CTAButton
          onClick={onRetry}
          variant="outline"
          size="md"
          icon={RotateCcw}
        >
          {retryText}
        </CTAButton>
      )}
    </div>
  );
}
