import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import CTAButton from './CTAButton';

/**
 * EventCard Component
 * Displays event-day agenda items, masterclasses, and ceremonies for Ahmedabad & Delhi NCR.
 */
export default function EventCard({
  title,
  time,
  city = 'Ahmedabad & Delhi NCR',
  type = 'Ceremony',
  description,
  venue,
  capacity,
  ctaText = 'Register for Pass',
  ctaTo = '/events',
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
      }}
    >
      {/* Top Meta Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span className="badge badge-plum" style={{ fontSize: '0.72rem' }}>
          {type}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--color-gold-rich)', fontWeight: 600 }}>
          <Clock size={13} />
          <span>{time}</span>
        </div>
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-plum-deep)',
          marginBottom: '0.75rem',
          lineHeight: 1.35,
        }}
      >
        {title}
      </h4>

      {/* Description */}
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        {description}
      </p>

      {/* Details Row: City & Venue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem', background: 'var(--bg-card-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <MapPin size={14} color="var(--color-burgundy)" />
          <span><strong>Hub:</strong> {city}</span>
        </div>
        {venue && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Calendar size={14} color="var(--color-burgundy)" />
            <span><strong>Venue:</strong> {venue}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CTAButton to={ctaTo} variant="primary" size="sm" icon={ArrowRight}>
          {ctaText}
        </CTAButton>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 500 }}>
          Edition 2027
        </span>
      </div>
    </div>
  );
}
