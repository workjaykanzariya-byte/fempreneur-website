import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LoadingState Component
 * Displays elegant, branded loading spinners during data fetches.
 */
export default function LoadingState({
  message = 'Loading verified Fempreneur data...',
  height = '240px',
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: '100%',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid var(--border-light)',
          borderTopColor: 'var(--color-burgundy)',
          animation: 'fem-spin 0.85s linear infinite',
          marginBottom: '1rem',
        }}
      />
      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {message}
      </p>

      <style>{`
        @keyframes fem-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
