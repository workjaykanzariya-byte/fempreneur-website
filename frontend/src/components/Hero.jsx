import React, { useState } from 'react';
import {
  Award,
  Ticket,
  MapPin,
  Play,
  X,
  ArrowRight,
  Sparkles,
  Star,
  Users,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import CTAButton from './CTAButton';

export default function Hero({
  badge = "6TH EDITION • 2027",
  title = "India’s Women Entrepreneurs",
  highlight = "Redefining Success",
  featuredQuestion = "Will YOU Be Featured in Fempreneur 2027?",
  subtitle = "India's most comprehensive women-entrepreneurship platform. Dual-city edition in Ahmedabad & Delhi NCR. Built to recognise, connect, and amplify women leaders shaping the future of business, communities, and India.",
  cities = "Ahmedabad & Delhi NCR Hubs",
  primaryCtaText = "Apply Now",
  primaryCtaTo = "/nominate",
  primaryIcon = ArrowRight,
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
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        background: 'linear-gradient(180deg, #FDFBFE 0%, #F9F2FB 40%, #FAF5FC 100%)',
        borderBottom: '1px solid rgba(106, 27, 154, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Responsive Stylesheet */}
      <style>{`
        .hero-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 1080px) {
          .hero-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 2rem;
          }
        }
        @media (max-width: 960px) {
          .hero-main-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-left-content {
            text-align: center !important;
            max-width: 720px;
            margin: 0 auto;
          }
          .hero-pills-row {
            justify-content: center !important;
          }
          .hero-ctas-row {
            justify-content: center !important;
          }
          .hero-collage-box {
            transform: scale(0.92);
            transform-origin: center center;
          }
        }
        @media (max-width: 600px) {
          .hero-collage-box {
            transform: scale(0.76);
            transform-origin: center center;
            margin-top: -30px;
            margin-bottom: -40px;
          }
          .hero-trust-bar {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

      {/* Ambient background glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '0%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142, 36, 170, 0.12) 0%, rgba(106, 27, 154, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106, 27, 154, 0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px' }}>
        <div className="hero-main-grid">
          {/* LEFT COLUMN: Headings, Callout, Paragraph, CTAs */}
          <div className="hero-left-content" style={{ textAlign: 'left' }}>
            {/* Top Badges Row */}
            <div
              className="hero-pills-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--color-burgundy)',
                  background: 'rgba(106, 27, 154, 0.08)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(106, 27, 154, 0.18)',
                  letterSpacing: '0.02em',
                }}
              >
                <Star size={13} fill="currentColor" />
                <span>{badge}</span>
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)',
                  background: 'rgba(106, 27, 154, 0.08)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(106, 27, 154, 0.18)',
                }}
              >
                <MapPin size={13} />
                <span>{cities}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.4vw, 3.9rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                color: 'var(--color-plum-deep)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em',
              }}
            >
              {title} <br />
              <span
                className="font-serif"
                style={{
                  fontStyle: 'italic',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #7B1FA2 0%, #A21CAF 50%, #C2185B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {highlight}
              </span>
            </h1>

            {/* Featured Sub-headline Callout */}
            {featuredQuestion && (
              <div
                style={{
                  fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                  fontWeight: 800,
                  color: 'var(--color-burgundy)',
                  marginBottom: '1.15rem',
                  letterSpacing: '-0.01em',
                }}
              >
                "{featuredQuestion}"
              </div>
            )}

            {/* Subtitle Description */}
            <p
              style={{
                fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.68,
                marginBottom: '2.5rem',
                maxWidth: '560px',
              }}
            >
              {subtitle}
            </p>

            {/* Action CTAs Row */}
            <div
              className="hero-ctas-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <CTAButton to={primaryCtaTo} variant="primary" size="lg" icon={PrimaryIcon} iconPosition="right">
                {primaryCtaText}
              </CTAButton>
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="btn btn-secondary btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  borderColor: 'rgba(106, 27, 154, 0.28)',
                  color: 'var(--color-burgundy)',
                  fontWeight: 700,
                }}
              >
                <Play size={18} fill="currentColor" />
                <span>{secondaryCtaText}</span>
              </button>
              <CTAButton
                to={tertiaryCtaTo}
                variant="outline"
                size="lg"
                icon={TertiaryIcon}
                iconPosition="right"
                style={{
                  borderColor: 'rgba(106, 27, 154, 0.35)',
                  color: 'var(--color-burgundy)',
                  fontWeight: 700,
                }}
              >
                {tertiaryCtaText}
              </CTAButton>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Collage with Women Entrepreneurs, Hubs, Floating Pills */}
          <div
            className="hero-right-visual"
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="hero-collage-box"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                height: '510px',
              }}
            >
              {/* Soft Purple Glow Aura */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '52%',
                  transform: 'translate(-50%, -50%)',
                  width: '380px',
                  height: '380px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(142, 36, 170, 0.25) 0%, rgba(106, 27, 154, 0.1) 50%, transparent 72%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Decorative Subtle Curved Dashed Lines */}
              <svg
                viewBox="0 0 540 500"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              >
                <path
                  d="M 120 80 Q 220 20 310 90 T 470 120"
                  fill="none"
                  stroke="rgba(142, 36, 170, 0.35)"
                  strokeWidth="1.8"
                  strokeDasharray="4 5"
                />
                <path
                  d="M 150 260 Q 220 220 280 250 T 450 280"
                  fill="none"
                  stroke="rgba(142, 36, 170, 0.35)"
                  strokeWidth="1.8"
                  strokeDasharray="4 5"
                />
                <path
                  d="M 440 180 Q 420 330 380 430"
                  fill="none"
                  stroke="rgba(142, 36, 170, 0.35)"
                  strokeWidth="1.8"
                  strokeDasharray="4 5"
                />
              </svg>

              {/* 1. Ahmedabad Hub Card (Top-Left) */}
              <div
                style={{
                  position: 'absolute',
                  top: '4%',
                  left: '2%',
                  width: '135px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '7px 7px 9px 7px',
                  boxShadow: '0 12px 30px rgba(106, 27, 154, 0.14), 0 3px 8px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(106, 27, 154, 0.14)',
                  zIndex: 6,
                }}
              >
                <img
                  src="/images/hubs/ahmedabad-hub-roundtable.png"
                  alt="Ahmedabad Hub Roundtable"
                  style={{ width: '100%', height: '82px', borderRadius: '11px', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                />
                <div style={{ padding: '6px 2px 1px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-plum-deep)', textAlign: 'left', lineHeight: 1.2 }}>
                  Ahmedabad<br />Hub
                </div>
              </div>

              {/* 2. Top-Center Portrait */}
              {/* 2. Top-Center Woman Leader Portrait */}
              <div
                style={{
                  position: 'absolute',
                  top: '2%',
                  left: '37%',
                  width: '108px',
                  height: '132px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 28px rgba(106, 27, 154, 0.16)',
                  border: '3px solid #FFFFFF',
                  zIndex: 4,
                }}
              >
                <img
                  src="/images/real-events/hero-top-pink.png"
                  alt="Fempreneur Award Winner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>

              {/* 3. Learn Floating Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '11%',
                  left: '64%',
                  background: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(106, 27, 154, 0.32)',
                  zIndex: 8,
                }}
              >
                <Sparkles size={14} />
                <span>Learn</span>
              </div>

              {/* 4. Top-Right Portrait */}
              <div
                style={{
                  position: 'absolute',
                  top: '6%',
                  right: '2%',
                  width: '125px',
                  height: '148px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 30px rgba(106, 27, 154, 0.18)',
                  border: '3.5px solid #FFFFFF',
                  zIndex: 5,
                }}
              >
                <img
                  src="/images/real-events/hero-top-stage.png"
                  alt="Fempreneur Stage Winners"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>

              {/* 5. Grow Floating Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '44%',
                  right: '2%',
                  background: '#FFFFFF',
                  color: 'var(--color-plum-deep)',
                  borderRadius: '999px',
                  padding: '7px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.16)',
                  border: '1.5px solid rgba(106, 27, 154, 0.16)',
                  zIndex: 8,
                }}
              >
                <TrendingUp size={15} color="var(--color-burgundy)" />
                <span>Grow</span>
              </div>

              {/* 6. Main Center Woman Leader Portrait */}
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '40%',
                  width: '190px',
                  height: '248px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 48px rgba(106, 27, 154, 0.28), 0 8px 18px rgba(0,0,0,0.08)',
                  border: '4px solid #FFFFFF',
                  zIndex: 6,
                }}
              >
                <img
                  src="/images/real-events/hero-center-award.png"
                  alt="Fempreneur Award Ceremony Winner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>

              {/* 7. Connect Floating Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '51%',
                  left: '12%',
                  background: '#FFFFFF',
                  color: 'var(--color-plum-deep)',
                  borderRadius: '999px',
                  padding: '7px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.16)',
                  border: '1.5px solid rgba(106, 27, 154, 0.16)',
                  zIndex: 8,
                }}
              >
                <Users size={15} color="var(--color-burgundy)" />
                <span>Connect</span>
              </div>

              {/* 8. Bottom-Left Portrait */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2%',
                  left: '18%',
                  width: '130px',
                  height: '145px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 30px rgba(106, 27, 154, 0.16)',
                  border: '3.5px solid #FFFFFF',
                  zIndex: 7,
                }}
              >
                <img
                  src="/images/real-events/hero-bot-audience.png"
                  alt="Fempreneur Summit Audience Leader"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>

              {/* 9. Delhi NCR Hub Card (Bottom-Center/Right) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2%',
                  left: '52%',
                  width: '142px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '7px 7px 9px 7px',
                  boxShadow: '0 14px 32px rgba(106, 27, 154, 0.16), 0 4px 10px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(106, 27, 154, 0.14)',
                  zIndex: 7,
                }}
              >
                <img
                  src="/images/hubs/delhi-hub-banner.png"
                  alt="Delhi NCR Hub Leaders"
                  style={{ width: '100%', height: '82px', borderRadius: '11px', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                />
                <div style={{ padding: '6px 2px 1px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-plum-deep)', textAlign: 'left', lineHeight: 1.2 }}>
                  Delhi NCR<br />Hub
                </div>
              </div>

              {/* 10. Bottom-Right Portrait */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8%',
                  right: '2%',
                  width: '110px',
                  height: '135px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 28px rgba(106, 27, 154, 0.15)',
                  border: '3px solid #FFFFFF',
                  zIndex: 5,
                }}
              >
                <img
                  src="/images/real-events/hero-bot-right-f.png"
                  alt="Fempreneur Winner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>
            </div>
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
                  background: 'linear-gradient(135deg, #1C052B 0%, #2A0840 50%, #3B0D58 100%)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px solid rgba(106, 27, 154, 0.4)',
                  padding: '2rem',
                  maxWidth: '780px',
                  width: '100%',
                  color: '#FFFFFF',
                  position: 'relative',
                  textAlign: 'left',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(106, 27, 154, 0.25)',
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
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background var(--transition-fast)',
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
                >
                  <X size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Sparkles size={16} color="var(--color-burgundy-light)" />
                  <span>Fempreneur Conference &amp; Awards Official Broadcast</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem' }}>
                  Fempreneur Awards — Celebrating Women Entrepreneurs
                </h3>

                {/* Responsive Embedded YouTube Video */}
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid rgba(106, 27, 154, 0.35)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
                    marginBottom: '1.5rem',
                    background: '#000000',
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/nHMEGtAs9IQ?autoplay=1&rel=0&modestbranding=1"
                    title="Fempreneur Conference & Awards Official Event"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.86rem', margin: 0 }}>
                    Official event coverage hosted by VyapaarJagat.com &amp; 1MEIF.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <CTAButton to="/nominate" variant="primary" size="sm" onClick={() => setVideoModalOpen(false)}>
                      Nominate for 2027
                    </CTAButton>
                    <CTAButton to="/events" variant="secondary" size="sm" onClick={() => setVideoModalOpen(false)}>
                      View Event Hubs
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM TRUST BADGES (FULL WIDTH SPAN) */}
          {showTrustBadges && (
            <div
              className="hero-trust-bar"
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.75rem',
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(106, 27, 154, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-burgundy) 0%, var(--color-burgundy-light) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(106, 27, 154, 0.28)',
                    flexShrink: 0,
                  }}
                >
                  <Star size={18} fill="currentColor" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-plum-deep)' }}>
                    50% Jury Evaluation
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    (7 Weighted Factors)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(106, 27, 154, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-burgundy)',
                    flexShrink: 0,
                  }}
                >
                  <Users size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-plum-deep)' }}>
                    50% Public Voting
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    with Verified Shareable Links
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(106, 27, 154, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-burgundy)',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-plum-deep)' }}>
                    Organized by 1MEIF (NGO)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    &amp; VyapaarJagat.com
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

