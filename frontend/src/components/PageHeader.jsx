import React from 'react';
import { Sparkles, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import CTAButton from './CTAButton';

/**
 * PageHeader Component
 * Standardized full-screen hero banner for all internal pages.
 * Replicates the exact visual grandeur, centered typography, dual pill tags,
 * ambient glows, and trust badges of the Home page Hero (Image 2).
 */
export default function PageHeader({
  badge = 'Fempreneur Platform',
  title = 'Page Title',
  highlight = '',
  description = 'Page section description and overview details for visitors.',
  breadcrumbs, // Kept for signature compatibility, omitted from rendering
  cities = 'Ahmedabad & Delhi NCR Hubs',
  ctaText,
  ctaTo,
  ctaVariant = 'primary',
  secondaryCtaText,
  secondaryCtaTo,
  showTrustBadges = true,
}) {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '5.5rem',
        minHeight: '62vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--gradient-hero)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {/* Decorative Ambient Glows matching Home Hero */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(222, 180, 89, 0.12) 0%, rgba(244, 114, 182, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '2%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109, 27, 68, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Location & Edition Pill Row matching Home Hero */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {badge && (
              <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={13} />
                {badge}
              </span>
            )}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                color: 'var(--color-burgundy)',
                fontWeight: 600,
                background: 'rgba(109, 27, 68, 0.06)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(109, 27, 68, 0.12)',
              }}
            >
              <MapPin size={13} />
              {cities}
            </span>
          </div>

          {/* Main Title Centered & Wide */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--color-plum-deep)',
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em',
            }}
          >
            {title}{' '}
            {highlight && (
              <span className="text-gradient font-serif" style={{ fontStyle: 'italic', fontWeight: 700, display: 'inline-block' }}>
                {highlight}
              </span>
            )}
          </h1>

          {/* Subtitle / Description Centered */}
          {description && (
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.68,
                maxWidth: '780px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: (ctaText || secondaryCtaText) ? '2.5rem' : '0',
              }}
            >
              {description}
            </p>
          )}

          {/* Action CTAs Row */}
          {(ctaText || secondaryCtaText) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: showTrustBadges ? '2.5rem' : '0',
              }}
            >
              {ctaText && (
                <CTAButton to={ctaTo} variant={ctaVariant} size="lg">
                  {ctaText}
                </CTAButton>
              )}
              {secondaryCtaText && (
                <CTAButton to={secondaryCtaTo} variant="secondary" size="lg">
                  {secondaryCtaText}
                </CTAButton>
              )}
            </div>
          )}

          {/* Trust Badges Strip matching Home Hero */}
          {showTrustBadges && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.75rem',
                flexWrap: 'wrap',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginTop: '2.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="var(--color-burgundy)" />
                <span>50% Independent Jury Evaluation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#E91E63" />
                <span>50% Verified Public Voting</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <ShieldCheck size={16} color="var(--color-plum)" />
                <span>Organized by 1MEIF (NGO) &amp; VyapaarJagat.com</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
