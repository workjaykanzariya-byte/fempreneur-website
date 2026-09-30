import React from 'react';
import { User, MapPin, Globe, CheckCircle, Sparkles } from 'lucide-react';

/**
 * DirectoryCard Component
 * Displays women-led businesses with authentic entrepreneur portrait photos,
 * founder roles, verification badges, and purple brand accents.
 */
export default function DirectoryCard({
  businessName,
  founderName,
  founderRole,
  founderPhoto,
  category,
  sector,
  city,
  description,
  websiteUrl,
  isCertified = false,
  isNominee = false,
  className = '',
}) {
  return (
    <div
      className={`fem-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.75rem',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid rgba(106, 27, 154, 0.12)',
        boxShadow: '0 8px 24px rgba(106, 27, 154, 0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Top Header: Woman Entrepreneur Photo + Details */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.1rem', marginBottom: '1.15rem' }}>
        {/* Woman Entrepreneur Photo */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {founderPhoto ? (
            <img
              src={founderPhoto}
              alt={`${founderName} - ${businessName}`}
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '16px',
                objectFit: 'cover',
                border: '2.5px solid #6A1B9A',
                boxShadow: '0 6px 16px rgba(106, 27, 154, 0.18)',
                display: 'block',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(106, 27, 154, 0.1), rgba(233, 30, 99, 0.1))',
                color: '#6A1B9A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.5rem',
                border: '2px solid rgba(106, 27, 154, 0.2)',
              }}
            >
              {businessName?.charAt(0) || 'B'}
            </div>
          )}
        </div>

        {/* Business & Founder Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4A126D', margin: 0, lineHeight: 1.3 }}>
              {businessName}
            </h4>
            {/* Verification / Certification Tag */}
            {isCertified ? (
              <span className="badge badge-gold" title="Fempreneur Certified Business" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                <CheckCircle size={11} /> Certified
              </span>
            ) : isNominee ? (
              <span
                className="badge"
                title="2027 Award Nominee"
                style={{
                  fontSize: '0.68rem',
                  padding: '0.2rem 0.6rem',
                  background: 'rgba(106, 27, 154, 0.1)',
                  color: '#6A1B9A',
                  border: '1px solid rgba(106, 27, 154, 0.25)',
                  fontWeight: 700,
                }}
              >
                <Sparkles size={11} /> Nominee
              </span>
            ) : null}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.92rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.2rem' }}>
            <User size={14} color="#6A1B9A" />
            <span>{founderName}</span>
          </div>

          {founderRole && (
            <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 500 }}>
              {founderRole}
            </div>
          )}
        </div>
      </div>

      {/* Sector & City Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.95rem' }}>
        <span
          style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            background: 'rgba(106, 27, 154, 0.07)',
            color: '#6A1B9A',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(106, 27, 154, 0.15)',
          }}
        >
          {category || sector}
        </span>
        {city && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#5C287A', fontWeight: 600 }}>
            <MapPin size={13} color="#6A1B9A" />
            {city}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          {description}
        </p>
      )}

      {/* Website & Actions */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(106, 27, 154, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {websiteUrl ? (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#6A1B9A',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E91E63')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6A1B9A')}
          >
            <Globe size={14} color="currentColor" />
            <span>Visit Website</span>
          </a>
        ) : (
          <span style={{ fontSize: '0.8rem', color: '#5C287A' }}>Verified Business</span>
        )}

        <span
          style={{
            fontSize: '0.76rem',
            color: '#6A1B9A',
            fontWeight: 700,
            background: 'rgba(106, 27, 154, 0.08)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          150+ Network
        </span>
      </div>
    </div>
  );
}
