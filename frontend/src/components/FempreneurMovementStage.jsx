import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Heart, Trophy, ArrowRight } from 'lucide-react';
import CTAButton from './CTAButton';
import RecognitionHubModal from './RecognitionHubModal';

/**
 * FempreneurMovementStage Component
 * Exact match to the reference composition (Image 1 / Image 2 reference):
 * - Left Side: Left-aligned editorial headline, pill badge, description, 3 stats, CTA buttons, and avatar social proof
 * - Right Side: Large 3D Metallic Red 'Fempreneur' "F" Trophy mounted on pedestal with dramatic spotlight & glow
 * - Preserves all on-page modal triggers (View Winners, See Categories, etc.)
 */
export default function FempreneurMovementStage() {
  const [recognitionModalTab, setRecognitionModalTab] = useState(null);

  return (
    <section
      className="fem-movement-stage-section"
      style={{
        position: 'relative',
        background: 'radial-gradient(ellipse 90% 80% at 75% 45%, #3B0447 0%, #20022B 45%, #100118 100%)',
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        color: '#FFFFFF',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(233, 30, 99, 0.25)',
      }}
    >
      {/* Background Ambient Spotlight Glows (matching the dramatic spotlight on the right trophy) */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '8%',
          width: '680px',
          height: '680px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.32) 0%, rgba(142, 36, 170, 0.22) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '5%',
          width: '580px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255, 64, 129, 0.4) 0%, rgba(233, 30, 99, 0.2) 50%, transparent 80%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142, 36, 170, 0.2) 0%, transparent 65%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top diagonal ray / spotlight shimmer */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '18%',
          width: '280px',
          height: '480px',
          background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.18) 0%, rgba(233, 30, 99, 0.05) 50%, transparent 80%)',
          transform: 'rotate(-25deg)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Decorative Sparkles / Floating Dust Particles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px), radial-gradient(rgba(255, 105, 180, 0.6) 1.5px, transparent 1.5px)',
          backgroundSize: '180px 180px, 260px 260px',
          backgroundPosition: '0 0, 90px 90px',
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Bottom Luminous Wave / Swoop (matching Image 1) */}
      <div className="fem-stage-bottom-swoop">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path
            d="M 0,30 Q 360,80 720,38 T 1440,48 L 1440,90 L 0,90 Z"
            fill="rgba(16, 1, 24, 0.9)"
          />
          <path
            d="M 0,30 Q 360,80 720,38 T 1440,48"
            fill="none"
            stroke="url(#fem-stage-wave-grad)"
            strokeWidth="2.5"
          />
          <defs>
            <linearGradient id="fem-stage-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(233, 30, 99, 0.15)" />
              <stop offset="30%" stopColor="rgba(233, 30, 99, 0.7)" />
              <stop offset="50%" stopColor="rgba(255, 105, 180, 0.95)" />
              <stop offset="70%" stopColor="rgba(142, 36, 170, 0.7)" />
              <stop offset="100%" stopColor="rgba(106, 27, 154, 0.15)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        .fem-stage-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 2rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2.5rem;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1440px) {
          .fem-stage-grid {
            grid-template-columns: 1.08fr 0.92fr;
            padding: 0 3.5rem;
            gap: 2.5rem;
          }
        }

        /* Left Content Column (Left Aligned matching Image 1) */
        .fem-stage-left {
          text-align: left;
          position: relative;
          z-index: 3;
        }

        .fem-stage-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 9999px;
          background: rgba(35, 5, 50, 0.85);
          border: 1.5px solid rgba(233, 30, 99, 0.5);
          color: #F8BBD0;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
          box-shadow: 0 0 20px rgba(233, 30, 99, 0.3);
          backdrop-filter: blur(10px);
        }

        .fem-stage-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(2.1rem, 3.4vw, 3.4rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.16;
          letter-spacing: -0.015em;
          margin-bottom: 1.25rem;
        }

        .fem-stage-highlight {
          background: linear-gradient(135deg, #FF4081 0%, #E91E63 50%, #C2185B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          font-weight: 800;
        }

        .fem-stage-desc {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.65;
          max-width: 580px;
          margin: 0 0 2.2rem 0;
        }

        .fem-stage-stats-bar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1.75rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
        }

        .fem-stage-stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-align: left;
        }

        .fem-stage-stat-ico {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(45, 6, 68, 0.85);
          border: 1.5px solid rgba(171, 71, 188, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(171, 71, 188, 0.3);
        }

        .fem-stage-stat-val {
          font-size: 1.22rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .fem-stage-stat-name {
          font-size: 0.76rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          white-space: nowrap;
        }

        .fem-stage-stat-sep {
          width: 1px;
          height: 32px;
          background: rgba(255, 255, 255, 0.16);
        }

        .fem-stage-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1.15rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
        }

        .fem-stage-btn-gradient {
          background: linear-gradient(135deg, #8E24AA 0%, #D81B60 50%, #E91E63 100%);
          color: #FFFFFF !important;
          font-weight: 700;
          font-size: 0.96rem;
          border-radius: 9999px;
          padding: 0.85rem 2.2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          box-shadow: 0 10px 28px rgba(233, 30, 99, 0.45);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.25);
          text-decoration: none;
        }

        .fem-stage-btn-gradient:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 38px rgba(233, 30, 99, 0.65);
        }

        .fem-stage-btn-outline {
          background: rgba(255, 255, 255, 0.04);
          color: #FFFFFF !important;
          font-weight: 600;
          font-size: 0.96rem;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 9999px;
          padding: 0.85rem 2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .fem-stage-btn-outline:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #FFFFFF;
          transform: translateY(-3px);
        }

        .fem-stage-proof {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .fem-stage-avatar-chain {
          display: flex;
          align-items: center;
        }

        .fem-stage-proof-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #FFFFFF;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .fem-stage-proof-badge {
          background: #4A126D;
          color: #FFFFFF;
          border: 2px solid #FFFFFF;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.35rem 0.55rem;
          margin-left: -8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .fem-stage-proof-meta {
          text-align: left;
        }

        .fem-stage-proof-heading {
          font-size: 0.86rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .fem-stage-proof-sub {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.72);
        }

        /* Right Column: Trophy Display */
        .fem-stage-right {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 2;
          align-self: flex-end;
        }

        .fem-stage-trophy-wrapper {
          position: relative;
          width: 100%;
          max-width: 680px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-bottom: -4.5rem;
        }

        .fem-stage-trophy-glow {
          position: absolute;
          inset: -5% -5% 0% -5%;
          background: radial-gradient(circle, rgba(255, 64, 129, 0.45) 0%, rgba(142, 36, 170, 0.3) 50%, transparent 72%);
          filter: blur(55px);
          pointer-events: none;
          z-index: 0;
        }

        .fem-stage-trophy-img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: auto;
          max-height: 740px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 28px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 45px rgba(233, 30, 99, 0.45));
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .fem-stage-trophy-img:hover {
          transform: translateY(-8px) scale(1.02);
          filter: drop-shadow(0 34px 55px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 60px rgba(255, 64, 129, 0.65));
        }

        .fem-stage-bottom-swoop {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 65px;
          pointer-events: none;
          z-index: 3;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1040px) {
          .fem-stage-grid {
            grid-template-columns: minmax(0, 1fr);
            text-align: center;
            gap: 2.25rem;
            padding: 0 1.25rem;
            width: 100%;
            box-sizing: border-box;
          }
          .fem-stage-left,
          .fem-stage-right {
            min-width: 0;
            max-width: 100%;
          }
          .fem-stage-left {
            text-align: center;
          }
          .fem-stage-desc {
            margin: 0 auto 1.85rem auto;
          }
          .fem-stage-hero-ctas,
          .fem-stage-stats-bar,
          .fem-stage-actions,
          .fem-stage-proof {
            justify-content: center;
          }
          .fem-stage-trophy-wrapper {
            max-width: 440px;
            margin: 0 auto;
            margin-bottom: -4.25rem;
          }
        }

        @media (max-width: 680px) {
          .fem-movement-stage-section {
            padding-top: 2.25rem !important;
            padding-bottom: 3rem !important;
          }
          .fem-stage-grid {
            padding: 0 1rem;
            gap: 1.75rem;
          }
          .fem-stage-pill {
            font-size: 0.72rem;
            padding: 5px 14px;
            margin-bottom: 1.1rem;
          }
          .fem-stage-title {
            font-size: clamp(1.5rem, 6.2vw, 2.1rem);
            line-height: 1.22;
            margin-bottom: 1rem;
            overflow-wrap: break-word;
            word-break: normal;
          }
          .fem-stage-desc {
            font-size: 0.92rem;
            line-height: 1.6;
            max-width: 100%;
            margin-bottom: 1.6rem;
          }
          .fem-stage-stat-sep {
            display: none;
          }
          .fem-stage-stats-bar {
            gap: 0.9rem 1.25rem;
            margin-bottom: 1.75rem;
          }
          .fem-stage-stat-ico {
            width: 38px;
            height: 38px;
          }
          .fem-stage-stat-val {
            font-size: 1.08rem;
          }
          .fem-stage-stat-name {
            font-size: 0.74rem;
          }
          .fem-stage-trophy-wrapper {
            max-width: 300px;
            margin-bottom: -3rem;
          }
        }

        @media (max-width: 480px) {
          .fem-stage-hero-ctas,
          .fem-stage-actions {
            flex-direction: column;
            width: 100%;
            gap: 0.85rem !important;
            margin-bottom: 1.75rem !important;
          }
          .fem-stage-hero-ctas > *,
          .fem-stage-btn-gradient,
          .fem-stage-btn-outline {
            width: 100% !important;
            max-width: 100%;
            box-sizing: border-box;
            justify-content: center;
            text-align: center;
            padding: 0.82rem 1.15rem !important;
            font-size: 0.82rem !important;
            white-space: normal !important;
          }
          .fem-stage-proof {
            flex-direction: column;
            text-align: center;
            gap: 0.65rem;
          }
          .fem-stage-proof-meta {
            text-align: center;
          }
          .fem-stage-trophy-wrapper {
            max-width: 260px;
            margin-bottom: -2.75rem;
          }
        }
      `}</style>

      <div className="fem-stage-grid">
        {/* LEFT COLUMN: Editorial Text, Stats, Actions, Proof (Exact Match to Image 1) */}
        <div className="fem-stage-left">
          {/* Pill Capsule Badge */}
          <div className="fem-stage-pill">
            <Sparkles size={14} color="#FF66A1" />
            <span>FEMPRENEUR 2027</span>
          </div>

          {/* Editorial Title */}
          <h2 className="fem-stage-title">
            35+ Award Categories | One Nationwide<br />
            Women Entrepreneurship<br />
            Movement
          </h2>

          {/* Subtitle */}
          <p className="fem-stage-desc">
            Celebrating 500+ inspiring women founders, MSME innovators, and changemakers across India. Evaluated 50% by an esteemed jury and 50% by public community votes.
          </p>

          {/* Action CTAs Row: NOMINATE YOURSELF & GET DELEGATE PASS (Above 50% statistics) */}
          <div
            className="fem-stage-hero-ctas"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <CTAButton
              to="/nominate"
              variant="primary"
              size="lg"
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '0.88rem 2.2rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                boxShadow: '0 8px 24px rgba(106, 27, 154, 0.4), 0 4px 12px rgba(233, 30, 99, 0.35)',
              }}
            >
              Nominate Yourself for Award
            </CTAButton>
            <CTAButton
              to="/events"
              variant="secondary"
              size="lg"
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '0.88rem 2.2rem',
                borderRadius: '9999px',
                background: '#FFFFFF',
                color: 'var(--color-burgundy)',
                borderColor: 'rgba(106, 27, 154, 0.28)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              Get Delegate Pass
            </CTAButton>
          </div>

          {/* Three Circular Stats Highlights */}
          <div className="fem-stage-stats-bar">
            {/* Stat 1 */}
            <div className="fem-stage-stat-item">
              <div className="fem-stage-stat-ico">
                <Users size={18} color="#F48FB1" />
              </div>
              <div>
                <div className="fem-stage-stat-val">50%</div>
                <div className="fem-stage-stat-name">Jury Evaluation</div>
              </div>
            </div>

            <div className="fem-stage-stat-sep" />

            {/* Stat 2 */}
            <div className="fem-stage-stat-item">
              <div className="fem-stage-stat-ico" style={{ borderColor: 'rgba(233, 30, 99, 0.7)' }}>
                <Heart size={18} color="#FF4081" />
              </div>
              <div>
                <div className="fem-stage-stat-val">50%</div>
                <div className="fem-stage-stat-name">Public Voting</div>
              </div>
            </div>

            <div className="fem-stage-stat-sep" />

            {/* Stat 3 */}
            <div className="fem-stage-stat-item">
              <div className="fem-stage-stat-ico" style={{ borderColor: 'rgba(186, 104, 200, 0.7)' }}>
                <Trophy size={18} color="#E1BEE7" />
              </div>
              <div>
                <div className="fem-stage-stat-val">35+</div>
                <div className="fem-stage-stat-name">Curated Categories</div>
              </div>
            </div>
          </div>

          {/* Social Proof Avatars & Tagline */}
          <div className="fem-stage-proof">
            <div className="fem-stage-avatar-chain">
              {[
                { name: 'Dr. Ishani Hanspal', src: '/images/winners-2022/dr-ishani-hanspal.png' },
                { name: 'Shikha Mehra', src: '/images/winners-2022/shikha-mehra.png' },
                { name: 'Ruchi Aggarwal', src: '/images/winners-2022/ruchi-aggarwal.png' },
                { name: 'Kanisha Patel', src: '/images/winners-2022/kanisha-patel.png' },
              ].map((item, idx) => (
                <img
                  key={idx}
                  src={item.src}
                  alt={item.name}
                  className="fem-stage-proof-avatar"
                  style={{ marginLeft: idx > 0 ? '-10px' : 0 }}
                />
              ))}
              <div className="fem-stage-proof-badge">500+</div>
            </div>
            <div className="fem-stage-proof-meta">
              <div className="fem-stage-proof-heading">500+ Women Leaders Celebrated</div>
              <div className="fem-stage-proof-sub">Ahmedabad &amp; Delhi-NCR Dual Hubs</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D "Fempreneur" F Trophy Logo (Using uploaded 3rd file) */}
        <div className="fem-stage-right">
          <div className="fem-stage-trophy-wrapper">
            <div className="fem-stage-trophy-glow" />
            <img
              src="/images/fempreneur-f-trophy-nobg.png"
              alt="Fempreneur 2027 Award Trophy"
              className="fem-stage-trophy-img"
            />
          </div>
        </div>
      </div>

      {/* On-Page Recognition Hub Modal (Opens on the same page with zero redirect) */}
      <RecognitionHubModal
        isOpen={!!recognitionModalTab}
        initialTab={recognitionModalTab || 'winners'}
        onClose={() => setRecognitionModalTab(null)}
      />
    </section>
  );
}
