import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Heart, Trophy, ArrowRight } from 'lucide-react';

/**
 * FempreneurMovementStage Component
 * Recreated to match the exact visual style and composition of the reference design (Image 1):
 * - Deep royal purple ambient stage with glowing radial orbs and curved arcs
 * - Centered editorial headline with luminous gradient "2 Cities"
 * - 3 circular glowing stat highlights (Jury Evaluation, Public Voting, Curated Categories)
 * - Gradient & glass CTA buttons
 * - 500+ Social proof avatar stack
 * - Left & Right staggered floating cards featuring verified women leaders
 *   sourced strictly from the local Desktop collection (winners-2022).
 */
export default function FempreneurMovementStage() {
  return (
    <section
      className="fem-movement-stage-section"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #150221 0%, #1F0332 35%, #2B0544 70%, #160223 100%)',
        paddingTop: '4.5rem',
        paddingBottom: '5.25rem',
        color: '#FFFFFF',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(233, 30, 99, 0.25)',
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '-5%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.24) 0%, rgba(106, 27, 154, 0.14) 50%, transparent 72%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '18%',
          right: '-5%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142, 36, 170, 0.28) 0%, rgba(233, 30, 99, 0.18) 50%, transparent 72%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Decorative Dot Matrix on Left and Right (matching Image 1) */}
      <div className="fem-stage-dots fem-stage-dots-tl" />
      <div className="fem-stage-dots fem-stage-dots-bl" />
      <div className="fem-stage-dots fem-stage-dots-tr" />

      {/* Decorative Curved Thin Arcs (matching Image 1) */}
      <svg
        className="fem-stage-bg-arcs"
        viewBox="0 0 1440 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 120 40 C 230 15, 330 110, 310 280 C 290 450, 180 540, 90 590"
          stroke="rgba(233, 30, 99, 0.32)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <path
          d="M 50 140 C 180 120, 240 230, 220 390"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.2"
        />
        <path
          d="M 1320 40 C 1210 15, 1110 110, 1130 280 C 1150 450, 1260 540, 1350 590"
          stroke="rgba(233, 30, 99, 0.32)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <path
          d="M 1390 140 C 1260 120, 1200 230, 1220 390"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Bottom Luminous Wave / Swoop (matching Image 1) */}
      <div className="fem-stage-bottom-swoop">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M 0,35 Q 360,95 720,45 T 1440,55 L 1440,100 L 0,100 Z"
            fill="rgba(16, 2, 25, 0.85)"
          />
          <path
            d="M 0,35 Q 360,95 720,45 T 1440,55"
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
        .fem-movement-stage-container {
          display: grid;
          grid-template-columns: 310px minmax(520px, 1fr) 310px;
          gap: 2rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1440px) {
          .fem-movement-stage-container {
            grid-template-columns: 320px minmax(560px, 1fr) 320px;
            gap: 2.75rem;
          }
        }

        /* Flank Column Canvas */
        .fem-stage-flank {
          position: relative;
          width: 100%;
          height: 590px;
        }

        /* Left Flank Card Positions */
        .fem-slot-l1 { top: 12px; left: 0px; width: 148px; height: 210px; z-index: 2; }
        .fem-slot-l2 { top: 92px; left: 126px; width: 154px; height: 220px; z-index: 3; }
        .fem-slot-l3 { top: 238px; left: 0px; width: 150px; height: 220px; z-index: 4; }
        .fem-slot-l4 { top: 330px; left: 110px; width: 156px; height: 225px; z-index: 5; }

        /* Right Flank Card Positions */
        .fem-slot-r1 { top: 14px; left: 12px; width: 148px; height: 210px; z-index: 2; }
        .fem-slot-r2 { top: 26px; left: 136px; width: 148px; height: 215px; z-index: 3; }
        .fem-slot-r3 { top: 168px; left: 0px; width: 154px; height: 225px; z-index: 4; }
        .fem-slot-r4 { top: 262px; left: 130px; width: 152px; height: 220px; z-index: 3; }
        .fem-slot-r5 { top: 358px; left: 20px; width: 156px; height: 225px; z-index: 5; }

        .fem-stage-card-slot {
          position: absolute;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.2s ease;
        }

        .fem-stage-card-slot:hover {
          transform: translateY(-8px) scale(1.05);
          z-index: 12 !important;
        }

        /* Backdrop glowing gradient frame */
        .fem-stage-card-backdrop {
          position: absolute;
          top: -10px;
          left: -8px;
          width: calc(100% + 16px);
          height: calc(100% + 18px);
          border-radius: 22px;
          background: linear-gradient(135deg, rgba(142, 36, 170, 0.5) 0%, rgba(233, 30, 99, 0.35) 100%);
          border: 1.5px solid rgba(233, 30, 99, 0.45);
          box-shadow: 0 0 25px rgba(233, 30, 99, 0.25);
          pointer-events: none;
          transition: all 0.35s ease;
        }

        .fem-stage-card-slot:hover .fem-stage-card-backdrop {
          background: linear-gradient(135deg, rgba(142, 36, 170, 0.8) 0%, rgba(233, 30, 99, 0.65) 100%);
          border-color: rgba(255, 255, 255, 0.75);
          box-shadow: 0 0 35px rgba(233, 30, 99, 0.65);
        }

        /* Front card containing image */
        .fem-stage-card-front {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          background: #1C0428;
          border: 2px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65);
          transition: all 0.35s ease;
        }

        .fem-stage-card-slot:hover .fem-stage-card-front {
          border-color: #FFFFFF;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.85), 0 0 32px rgba(233, 30, 99, 0.55);
        }

        .fem-stage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Center Column Typography & Layout */
        .fem-stage-center {
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
          position: relative;
          z-index: 4;
        }

        .fem-stage-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 9999px;
          background: rgba(40, 8, 60, 0.75);
          border: 1.5px solid rgba(233, 30, 99, 0.45);
          color: #F8BBD0;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1.35rem;
          box-shadow: 0 0 24px rgba(233, 30, 99, 0.3);
          backdrop-filter: blur(10px);
        }

        .fem-stage-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(2rem, 3.2vw, 3.2rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.18;
          letter-spacing: -0.015em;
          margin-bottom: 1.25rem;
        }

        .fem-stage-highlight {
          background: linear-gradient(135deg, #FF66A1 0%, #E91E63 50%, #D843B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .fem-stage-desc {
          font-size: clamp(0.95rem, 1.15vw, 1.06rem);
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.68;
          max-width: 620px;
          margin: 0 auto 2.25rem;
        }

        .fem-stage-stats-bar {
          display: flex;
          align-items: center;
          justify-content: center;
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
          background: rgba(46, 8, 70, 0.85);
          border: 1.5px solid rgba(171, 71, 188, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(171, 71, 188, 0.3);
        }

        .fem-stage-stat-val {
          font-size: 1.25rem;
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
          justify-content: center;
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
          justify-content: center;
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

        /* Matrix Dots */
        .fem-stage-dots {
          position: absolute;
          width: 72px;
          height: 72px;
          background-image: radial-gradient(rgba(233, 30, 99, 0.4) 1.5px, transparent 1.5px);
          background-size: 14px 14px;
          pointer-events: none;
          z-index: 1;
        }

        .fem-stage-dots-tl { top: 35px; left: 20px; }
        .fem-stage-dots-bl { bottom: 55px; left: 25px; }
        .fem-stage-dots-tr { top: 75px; right: 25px; }

        .fem-stage-bg-arcs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .fem-stage-bottom-swoop {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 65px;
          pointer-events: none;
          z-index: 2;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1140px) {
          .fem-movement-stage-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .fem-stage-flank {
            display: none;
          }
          .fem-stage-mobile-gallery {
            display: grid !important;
          }
        }

        .fem-stage-mobile-gallery {
          display: none;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 2.5rem;
        }

        @media (max-width: 680px) {
          .fem-stage-mobile-gallery {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
          }
          .fem-stage-stat-sep {
            display: none;
          }
          .fem-stage-stats-bar {
            gap: 1.25rem;
          }
        }
      `}</style>

      <div className="fem-movement-stage-container">
        {/* 1. LEFT FLANK: 4 STAGGERED PORTRAIT CARDS (EXACT MATCH TO IMAGE 1) */}
        <div className="fem-stage-flank">
          {/* Card 1: Top Outer (Naisargi Shah) */}
          <div className="fem-stage-card-slot fem-slot-l1" title="Naisargi Shah • Founder of the Year">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/naisargi-shah.png"
                alt="Naisargi Shah"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 2: Top Inner (Shweta Raval) */}
          <div className="fem-stage-card-slot fem-slot-l2" title="Shweta Raval • Business Leader of the Year">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/shweta-raval.png"
                alt="Shweta Raval"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 3: Bottom Outer (Dr. Seema Yadav - yellow saree, exact match to Image 1) */}
          <div className="fem-stage-card-slot fem-slot-l3" title="Dr. Seema Yadav • Community Service Leader">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/dr-seema-yadav.png"
                alt="Dr. Seema Yadav"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 4: Bottom Inner (Adv Ashwini C - striped shirt, exact match to Image 1) */}
          <div className="fem-stage-card-slot fem-slot-l4" title="Adv Ashwini C • Trend Setter of the Year">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/adv-ashwini-c.png"
                alt="Adv Ashwini C"
                className="fem-stage-img"
              />
            </Link>
          </div>
        </div>

        {/* 2. CENTER COLUMN: EDITORIAL HEADLINE, STATS, CTAS & SOCIAL PROOF */}
        <div className="fem-stage-center">
          {/* Pill Capsule Badge */}
          <div className="fem-stage-pill">
            <Sparkles size={14} color="#FF66A1" />
            <span>FEMPRENEUR 2027</span>
          </div>

          {/* Editorial Title with Gradient Cities */}
          <h2 className="fem-stage-title">
            35+ Award Categories |<br />
            <span className="fem-stage-highlight">2 Cities</span> | One Nationwide<br />
            Women Entrepreneurship<br />
            Movement
          </h2>

          {/* Subtitle */}
          <p className="fem-stage-desc">
            Celebrating 500+ inspiring women founders, MSME innovators, and changemakers across India. Evaluated 50% by an esteemed jury and 50% by public community votes.
          </p>

          {/* Three Circular Stats Highlights */}
          <div className="fem-stage-stats-bar">
            {/* Stat 1 */}
            <div className="fem-stage-stat-item">
              <div className="fem-stage-stat-ico" style={{ borderColor: 'rgba(171, 71, 188, 0.65)' }}>
                <Users size={18} color="#FFFFFF" />
              </div>
              <div>
                <div className="fem-stage-stat-val">50%</div>
                <div className="fem-stage-stat-name">Jury Evaluation</div>
              </div>
            </div>

            <div className="fem-stage-stat-sep" />

            {/* Stat 2 */}
            <div className="fem-stage-stat-item">
              <div className="fem-stage-stat-ico" style={{ borderColor: 'rgba(233, 30, 99, 0.75)' }}>
                <Heart size={18} color="#FF66A1" />
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

          {/* Buttons: Primary Gradient + Secondary Glass */}
          <div className="fem-stage-actions">
            <Link to="/winners" className="fem-stage-btn-gradient">
              <span>View Winners</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/categories" className="fem-stage-btn-outline">
              <span>See Categories</span>
            </Link>
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
              <div className="fem-stage-proof-sub">Ahmedabad &amp; Delhi NCR Dual Hubs</div>
            </div>
          </div>

          {/* Tablet & Mobile Fallback Showcase Gallery */}
          <div className="fem-stage-mobile-gallery">
            {[
              { name: 'Dr. Seema Yadav', img: '/images/winners-2022/dr-seema-yadav.png' },
              { name: 'Adv Ashwini C', img: '/images/winners-2022/adv-ashwini-c.png' },
              { name: 'Pallavi Walia Raj', img: '/images/winners-2022/pallavi-walia-raj.png' },
              { name: 'Meghana Mojjada', img: '/images/winners-2022/meghana-mojjada.png' },
              { name: 'Ami Shah', img: '/images/winners-2022/ami-shah.png' },
              { name: 'Naisargi Shah', img: '/images/winners-2022/naisargi-shah.png' },
              { name: 'Shweta Raval', img: '/images/winners-2022/shweta-raval.png' },
              { name: 'Belaa Mitthani', img: '/images/winners-2022/belaa-mitthani.png' },
            ].map((w, idx) => (
              <Link
                key={idx}
                to="/winners"
                style={{
                  display: 'block',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(233, 30, 99, 0.4)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  height: '175px',
                }}
              >
                <img
                  src={w.img}
                  alt={w.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* 3. RIGHT FLANK: 5 STAGGERED PORTRAIT CARDS (EXACT MATCH TO IMAGE 1) */}
        <div className="fem-stage-flank">
          {/* Card 5: Top Inner (Nancy Jain) */}
          <div className="fem-stage-card-slot fem-slot-r1" title="Nancy Jain • Social Entrepreneur">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/nancy-jain.png"
                alt="Nancy Jain"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 6: Top Outer (Belaa Mitthani) */}
          <div className="fem-stage-card-slot fem-slot-r2" title="Belaa Mitthani • CEO of the Year">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/belaa-mitthani.png"
                alt="Belaa Mitthani"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 7: Middle (Pallavi Walia Raj - black dress, exact match to Image 1) */}
          <div className="fem-stage-card-slot fem-slot-r3" title="Pallavi Walia Raj • Trend Setter Woman of the Year">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/pallavi-walia-raj.png"
                alt="Pallavi Walia Raj"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 8: Lower Outer (Ami Shah - saree, exact match to Image 1) */}
          <div className="fem-stage-card-slot fem-slot-r4" title="Ami Shah • Rising Entrepreneur">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/ami-shah.png"
                alt="Ami Shah"
                className="fem-stage-img"
              />
            </Link>
          </div>

          {/* Card 9: Bottom Inner (Meghana Mojjada - blue blazer, exact match to Image 1) */}
          <div className="fem-stage-card-slot fem-slot-r5" title="Meghana Mojjada • Young Business Woman of the Year">
            <div className="fem-stage-card-backdrop" />
            <Link to="/winners" className="fem-stage-card-front">
              <img
                src="/images/winners-2022/meghana-mojjada.png"
                alt="Meghana Mojjada"
                className="fem-stage-img"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
