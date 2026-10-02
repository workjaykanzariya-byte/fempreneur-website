import React from 'react';
import { Sparkles, MapPin, ShieldCheck, CheckCircle2, Star, ArrowRight, Trophy, Award } from 'lucide-react';
import CTAButton from './CTAButton';

/**
 * PageHeader Component
 * Standardized hero banner for internal pages.
 * Supports:
 * - 2-Column responsive layout when `image` prop is provided (matching the reference designs).
 * - Centered layout when `image` is not provided.
 * Preserves all data, props, and brand purple colors.
 */
export default function PageHeader({
  badge = 'Fempreneur Platform',
  badgeIcon = null,
  title = 'Page Title',
  highlight = '',
  description = 'Page section description and overview details for visitors.',
  breadcrumbs, // Kept for signature compatibility
  cities = 'Ahmedabad & Delhi NCR Hubs',
  ctaText,
  ctaTo,
  ctaVariant = 'primary',
  ctaIcon = ArrowRight,
  onCtaClick,
  secondaryCtaText,
  secondaryCtaTo,
  onSecondaryCtaClick,
  showTrustBadges = true,
  image,
  imageAlt = 'Fempreneur Visual Feature',
  imageBadge,
  imageFramed = true,
  imageFilter = null,
  imageMaxWidth = null,
  imageMaxHeight = null,
  floatingPills = null,
  customVisual = null,
}) {
  const ResolvedBadgeIcon = badgeIcon || (badge && badge.toLowerCase().includes('award') ? Trophy : (badge && badge.toLowerCase().includes('showcase') ? Sparkles : Star));
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: image || customVisual ? '4rem' : '5rem',
        paddingBottom: image || customVisual ? '4.5rem' : '5.5rem',
        minHeight: image || customVisual ? 'auto' : '62vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #FDFBFE 0%, #F9F2FB 40%, #FAF5FC 100%)',
        borderBottom: '1px solid rgba(106, 27, 154, 0.1)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Responsive Stylesheet */}
      <style>{`
        .pageheader-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 1040px) {
          .pageheader-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 2.25rem;
          }
        }
        @media (max-width: 900px) {
          .pageheader-grid {
            grid-template-columns: 1fr;
            gap: 2.75rem;
          }
          .pageheader-left-col {
            text-align: center !important;
            max-width: 720px;
            margin: 0 auto;
          }
          .pageheader-pills-row {
            justify-content: center !important;
          }
          .pageheader-ctas-row {
            justify-content: center !important;
          }
        }
        .floating-collage-box {
          position: relative;
          width: 100%;
          max-width: 560px;
          height: 510px;
        }
        @media (max-width: 960px) {
          .floating-collage-box {
            transform: scale(0.92);
            transform-origin: center center;
          }
        }
        @media (max-width: 600px) {
          .floating-collage-box {
            transform: scale(0.76);
            transform-origin: center center;
            margin-top: -30px;
            margin-bottom: -40px;
          }
          .pageheader-trust-bar {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

      {/* Decorative Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-12%',
          right: '2%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142, 36, 170, 0.12) 0%, rgba(106, 27, 154, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-12%',
          left: '2%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106, 27, 154, 0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: image || customVisual ? '1280px' : '920px' }}>
        {image || customVisual ? (
          /* ==============================================================
             TWO-COLUMN LAYOUT (WHEN IMAGE OR CUSTOM VISUAL IS SUPPLIED)
             ============================================================== */
          <div className="pageheader-grid">
            {/* Left Column: Badges, Title, Description, CTAs */}
            <div className="pageheader-left-col" style={{ textAlign: 'left' }}>
              {/* Badges Row */}
              <div
                className="pageheader-pills-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.4rem',
                  flexWrap: 'wrap',
                }}
              >
                {badge && (
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
                    <ResolvedBadgeIcon size={13} fill={ResolvedBadgeIcon === Star ? "currentColor" : "none"} />
                    <span>{badge}</span>
                  </span>
                )}
                {cities && (
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
                )}
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.7rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: 'var(--color-plum-deep)',
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.03em',
                }}
              >
                {title}{' '}
                {highlight && (
                  <span
                    className="font-serif"
                    style={{
                      fontStyle: 'italic',
                      fontWeight: 700,
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #7B1FA2 0%, #A21CAF 50%, #C2185B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {highlight}
                  </span>
                )}
              </h1>

              {/* Description */}
              {description && (
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.68,
                    maxWidth: '560px',
                    marginBottom: ctaText || secondaryCtaText ? '2.25rem' : '0',
                  }}
                >
                  {description}
                </p>
              )}

              {/* Action Buttons */}
              {(ctaText || secondaryCtaText) && (
                <div
                  className="pageheader-ctas-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
                  }}
                >
                  {ctaText && (
                    <CTAButton
                      to={onCtaClick ? undefined : ctaTo}
                      onClick={onCtaClick}
                      variant={ctaVariant}
                      size="lg"
                      icon={ctaIcon === null ? undefined : ctaIcon}
                      iconPosition="right"
                    >
                      {ctaText}
                    </CTAButton>
                  )}
                  {secondaryCtaText && (
                    <CTAButton
                      to={onSecondaryCtaClick ? undefined : secondaryCtaTo}
                      onClick={onSecondaryCtaClick}
                      variant="secondary"
                      size="lg"
                      style={{
                        borderColor: 'rgba(106, 27, 154, 0.28)',
                        color: 'var(--color-burgundy)',
                        fontWeight: 700,
                      }}
                    >
                      {secondaryCtaText}
                    </CTAButton>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Hero Visual Card / Floating Collage */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {customVisual ? (
                customVisual
              ) : (
                <>
                  {/* Soft purple radial aura behind image */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '380px',
                      height: '380px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(142, 36, 170, 0.25) 0%, rgba(106, 27, 154, 0.1) 50%, transparent 72%)',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />

                  {imageFramed ? (
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        maxWidth: imageMaxWidth || '560px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 48px -10px rgba(106, 27, 154, 0.25), 0 8px 24px rgba(0,0,0,0.06)',
                        border: '4px solid #FFFFFF',
                        background: '#FAF5FC',
                      }}
                    >
                      <img
                        src={image}
                        alt={imageAlt}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: imageMaxHeight || '480px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />

                      {/* Subtle Floating pill badge on image */}
                      {imageBadge && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '1rem',
                            background: 'rgba(30, 8, 42, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: '#FFFFFF',
                            padding: '0.4rem 0.9rem',
                            borderRadius: 'var(--radius-pill)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          <Sparkles size={13} color="#E91E63" />
                          <span>{imageBadge}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        maxWidth: imageMaxWidth || '580px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Optional Floating Pills */}
                      {floatingPills &&
                        floatingPills.map((pill, idx) => {
                          const PillIcon = pill.icon || Sparkles;
                          return (
                            <div
                              key={idx}
                              style={{
                                position: 'absolute',
                                ...pill.position,
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
                              <PillIcon size={14} color="var(--color-burgundy)" />
                              <span>{pill.text}</span>
                            </div>
                          );
                        })}

                      {/* Main Transparent Graphic */}
                      <img
                        src={image}
                        alt={imageAlt}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '520px',
                          objectFit: 'contain',
                          display: 'block',
                          filter: imageFilter !== null ? imageFilter : 'drop-shadow(0 20px 40px rgba(106, 27, 154, 0.15))',
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Trust Badges (Span Full Width) */}
            {showTrustBadges && (
              <div
                className="pageheader-trust-bar"
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
                      50% Independent Jury Evaluation
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
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-plum-deep)' }}>
                      50% Verified Public Voting
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
        ) : (
          /* ==============================================================
             ORIGINAL CENTERED LAYOUT (FOR PAGES WITHOUT IMAGE PROP)
             ============================================================== */
          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
            {/* Top Location & Edition Pill Row */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {badge && (
                <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={13} />
                  {badge}
                </span>
              )}
              {cities && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: 'var(--color-burgundy)',
                    fontWeight: 600,
                    background: 'rgba(106, 27, 154, 0.06)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(106, 27, 154, 0.12)',
                  }}
                >
                  <MapPin size={13} />
                  {cities}
                </span>
              )}
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
                  marginBottom: ctaText || secondaryCtaText ? '2.5rem' : '0',
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
                  <CTAButton
                    to={onCtaClick ? undefined : ctaTo}
                    onClick={onCtaClick}
                    variant={ctaVariant}
                    size="lg"
                  >
                    {ctaText}
                  </CTAButton>
                )}
                {secondaryCtaText && (
                  <CTAButton
                    to={onSecondaryCtaClick ? undefined : secondaryCtaTo}
                    onClick={onSecondaryCtaClick}
                    variant="secondary"
                    size="lg"
                  >
                    {secondaryCtaText}
                  </CTAButton>
                )}
              </div>
            )}

            {/* Trust Badges Strip */}
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
        )}
      </div>
    </section>
  );
}

