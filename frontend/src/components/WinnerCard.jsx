import React from 'react';
import { Award, MapPin, Calendar, ExternalLink } from 'lucide-react';

/**
 * WinnerCard Component
 * Displays past award winners with category, edition year, city, and verified achievements.
 */
export default function WinnerCard({
  name,
  company,
  category,
  year,
  city,
  highlight,
  storyUrl,
  image,
  className = '',
}) {
  return (
    <div
      className={`fem-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.5rem',
      }}
    >
      {/* Top Media / Avatar Strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-plum-berry)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 800,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {image ? (
            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            name?.charAt(0) || 'F'
          )}
        </div>

        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.2rem' }}>
            {name}
          </h4>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-burgundy)' }}>
            {company}
          </div>
        </div>
      </div>

      {/* Badges: Category & Year */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
        <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem' }}>
          <Award size={12} />
          {category}
        </span>
        <span className="badge badge-gray" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem' }}>
          <Calendar size={12} />
          {year} Edition
        </span>
      </div>

      {/* City Location */}
      {city && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
          <MapPin size={14} color="var(--color-burgundy)" />
          <span>{city}</span>
        </div>
      )}

      {/* Highlight / Achievement */}
      {highlight && (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {highlight}
        </p>
      )}

      {/* Action Link to VyapaarJagat Story */}
      {storyUrl && (
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <a
            href={storyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--color-burgundy)',
            }}
          >
            <span>Read Story on VyapaarJagat</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}
    </div>
  );
}
