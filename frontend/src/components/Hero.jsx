import React, { useState } from 'react';
import { Award, Ticket, Handshake, ShieldCheck, CheckCircle2, Sparkles, MapPin, Play, X } from 'lucide-react';
import CTAButton from './CTAButton';

export default function Hero({
  badge = "6th Edition • 2027 Dual-City Showcase",
  title = "India’s Women Entrepreneurs",
  highlight = "Redefining Success",
  featuredQuestion = "Will YOU Be Featured in Fempreneur 2027?",
  subtitle = "India's most comprehensive women-entrepreneurship platform. Dual-city edition in Ahmedabad & Delhi NCR. Built to recognise, connect, and amplify women leaders shaping the future of business, communities, and India.",
  cities = "Ahmedabad & Delhi NCR Hubs",
  primaryCtaText = "Apply Now",
  primaryCtaTo = "/nominate",
  primaryIcon = Award,
  secondaryCtaText = "Watch Video",
  secondaryCtaTo = "/events",
  secondaryIcon = Play,
  tertiaryCtaText = "Get Event Pass",
  tertiaryCtaTo = "/events",
  tertiaryIcon = Ticket,
  showTrustBadges = true,
}) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const PrimaryIcon = primaryIcon;
  const SecondaryIcon = secondaryIcon;
  const TertiaryIcon = tertiaryIcon;
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
        background: 'var(--gradient-hero)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Warm Ambient Glows */}
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
          {/* Top Location & Edition Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={13} />
              {badge}
            </span>
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

          {/* Main Hero Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--color-plum-deep)',
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
            }}
          >
            {title} <br />
            <span className="text-gradient font-serif" style={{ fontStyle: 'italic', fontWeight: 700 }}>
              {highlight}
            </span>
          </h1>

          {/* Featured Sub-headline Callout */}
          {featuredQuestion && (
            <div
              style={{
                fontSize: 'clamp(1.2rem, 2.4vw, 1.55rem)',
                fontWeight: 800,
                color: 'var(--color-burgundy)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              "{featuredQuestion}"
            </div>
          )}

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              maxWidth: '780px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {subtitle}
          </p>

          {/* Action CTAs Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            <CTAButton to={primaryCtaTo} variant="primary" size="lg" icon={PrimaryIcon}>
              {primaryCtaText}
            </CTAButton>
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <Play size={18} />
              <span>{secondaryCtaText}</span>
            </button>
            <CTAButton to={tertiaryCtaTo} variant="outline" size="lg" icon={TertiaryIcon}>
              {tertiaryCtaText}
            </CTAButton>
          </div>

          {/* Video Preview Modal */}
          {videoModalOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(15, 5, 25, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                backdropFilter: 'blur(6px)',
              }}
              onClick={() => setVideoModalOpen(false)}
            >
              <div
                style={{
                  background: '#1F0433',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(222, 180, 89, 0.4)',
                  padding: '2rem',
                  maxWidth: '700px',
                  width: '100%',
                  color: '#FFFFFF',
                  position: 'relative',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow-xl)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-gold-light)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Sparkles size={16} />
                  <span>Fempreneur 2027 Official Showcase Teaser</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
                  India’s Women Entrepreneurs Redefining Success
                </h3>
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: 'radial-gradient(circle, #3B0764 0%, #17022B 100%)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-plum-deep)', marginBottom: '1rem', boxShadow: '0 0 25px rgba(222, 180, 89, 0.5)' }}>
                    <Play size={30} fill="currentColor" style={{ marginLeft: '4px' }} />
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Fempreneur 2027 Dual-City Movement Teaser
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem', maxWidth: '440px' }}>
                    Documenting 500+ female founders, 35+ award categories, and keynotes at Ahmedabad Management Association (AMA) & Delhi NCR.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <CTAButton to="/nominate" variant="gold" size="sm" onClick={() => setVideoModalOpen(false)}>
                    Apply Now for 2027
                  </CTAButton>
                  <CTAButton to="/events" variant="secondary" size="sm" onClick={() => setVideoModalOpen(false)}>
                    View Event Details
                  </CTAButton>
                </div>
              </div>
            </div>
          )}

          {/* Trust Badges */}
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
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="var(--color-burgundy)" />
                <span>50% Jury Evaluation (7 Weighted Factors)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-rich)" />
                <span>50% Public Voting with Verified Shareable Links</span>
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
