import React from 'react';
import { Award, Users, BookOpen, ShieldCheck, Heart, Sparkles, Building2, Globe, CheckCircle2, ArrowRight, UserCheck, TrendingUp, Newspaper, HelpCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader, CTAButton } from '../components';

export default function AboutPage() {
  const journeys = [
    {
      year: '2025',
      location: 'BSE India, Mumbai',
      theme: 'Scaling Women-Led Enterprise & Equity',
      desc: 'Partnered with premier chambers and BSE India, felicitating 85+ women founders and enterprise leaders with nationwide media broadcast coverage.',
    },
    {
      year: '2024',
      location: 'AMA Ahmedabad',
      theme: 'MSME & Grassroots Women Tech',
      desc: 'Brought together 400+ delegates in Gujarat, focusing heavily on MSME innovation, sustainable retail product lines, and women-led manufacturing.',
    },
    {
      year: '2023',
      location: 'CEE (Centre for Environment Education), Ahmedabad',
      theme: 'Impact, Education & Social Enterprise',
      desc: 'Aligned directly with premier national institutions, evaluating innovations in education, crafts, healthcare, and sustainable consumer solutions.',
    },
    {
      year: '2022',
      location: 'VyapaarJagat Digital Conclave',
      theme: 'Inaugural National Digital Showcase',
      desc: 'An intensive digital convention celebrating women enterprise resilience, digital transformation, and early-stage women-led startups across 20+ states.',
    },
  ];

  const aboutHeroCollage = (
    <div className="floating-collage-box">
      {/* Soft Purple Glow Aura */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142, 36, 170, 0.25) 0%, rgba(106, 27, 154, 0.08) 50%, transparent 72%)',
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
          d="M 110 90 Q 210 25 320 85 T 460 110"
          fill="none"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
        <path
          d="M 120 270 Q 200 230 290 260 T 460 300"
          fill="none"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
        <path
          d="M 430 170 Q 440 320 380 440"
          fill="none"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
      </svg>

      {/* 1. Ahmedabad Hub Floating Card (Top-Left) */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '2%',
          width: '135px',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '7px 7px 9px 7px',
          boxShadow: '0 12px 30px rgba(106, 27, 154, 0.16), 0 3px 8px rgba(0,0,0,0.06)',
          border: '1.5px solid rgba(106, 27, 154, 0.14)',
          zIndex: 7,
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

      {/* 2. Empower Floating Pill (Top-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '5%',
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
        <span>Empower</span>
      </div>

      {/* 3. Main Centerpiece: User's Ready Networking Event Photo */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          left: '16%',
          width: '380px',
          height: '260px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 48px rgba(106, 27, 154, 0.26), 0 8px 18px rgba(0,0,0,0.08)',
          border: '4px solid #FFFFFF',
          zIndex: 5,
        }}
      >
        <img
          src="/images/about/about-networking-event.png"
          alt="Fempreneur Networking Summit"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
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
          <span>A Brighter India Together</span>
        </div>
      </div>

      {/* 4. Connect Floating Pill (Mid-Left) */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '4%',
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

      {/* 5. Grow Floating Pill (Mid-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          right: '1%',
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

      {/* 6. Delhi NCR Hub Floating Card (Bottom-Right) */}
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
          border: '1.5px solid rgba(106, 27, 154, 0.14)',
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
    </div>
  );

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh' }}>
      {/* Standardized Hero Header matching all other website pages */}
      <PageHeader
        badge="About Fempreneur"
        title="India's Comprehensive"
        highlight="Women-Entrepreneurship Platform"
        description="Built on the conviction that empowered women entrepreneurs shape the future of business, local communities, and the economic destiny of India."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'About Us' }]}
        ctaText="Explore Awards 2027"
        ctaTo="/awards"
        secondaryCtaText="Contact Team"
        secondaryCtaTo="/contact"
        customVisual={aboutHeroCollage}
      />

      {/* SECTION 2: STATS COUNTER BAR (Matching Greenpreneur 4-Col Bar) */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {/* Stat 1 */}
            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-gold-rich)' }}>
                2027
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                National Dual-City Edition
              </span>
            </div>

            {/* Stat 2 */}
            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-burgundy)' }}>
                1,000+
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Stories Published
              </span>
            </div>

            {/* Stat 3 */}
            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-gold-rich)' }}>
                150+
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Sectors Vetted
              </span>
            </div>

            {/* Stat 4 */}
            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-burgundy)' }}>
                5,000+
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Community Members
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHO WE ARE & DUAL ORGANIZER PARTNER CARDS (Matching Greenpreneur 7-col + 5-col sticky layout) */}
      <section style={{ padding: '5.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'flex-start' }}>
          {/* Left Column: Mission Narrative & Objectives (7 cols) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <span style={{ color: 'var(--color-gold-rich)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', display: 'block' }}>
              Who We Are
            </span>

            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', fontFamily: 'serif, Georgia', fontWeight: 800, color: 'var(--color-plum-deep)', lineHeight: 1.25 }}>
              A Noble Movement Driven by Passion &amp; Women Empowerment
            </h2>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Fempreneur is not just an award program; it is India’s premier network of women-led business architects. In 2027, we celebrate our national dual-city showcase spanning <strong style={{ color: 'var(--color-plum-deep)' }}>Ahmedabad &amp; Delhi NCR</strong>.
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              The platform was born from a simple realization: while traditional business awards focus purely on financial top-lines, our economy requires a system that honors women founders, MSME drivers, and innovators through a structured, multi-tier evaluation featuring <strong>50% expert jury audit and 50% verified public voting</strong>.
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Over the years, we have brought together women innovators in Tech &amp; AI, MSMEs, manufacturing, sustainable fashion, healthcare, organic consumer goods, and education, creating opportunities for them to meet investors, corporate buyers, and institutional mentors.
            </p>

            {/* Core Objectives Box (Matching Greenpreneur Core Objectives) */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #EFE4F4', boxShadow: '0 4px 16px rgba(46, 8, 72, 0.04)', marginTop: '0.75rem' }}>
              <h4 style={{ fontWeight: 800, color: 'var(--color-plum-deep)', fontSize: '1.05rem', marginBottom: '1rem' }}>
                Our Core Objectives:
              </h4>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Award size={18} color="var(--color-gold-rich)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong style={{ color: 'var(--color-plum-deep)' }}>Celebrate Excellence:</strong> Felicitating women entrepreneurs who demonstrate visionary leadership and measurable economic impact.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Users size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong style={{ color: 'var(--color-plum-deep)' }}>Build Networks:</strong> Bridging the gap between women founders, MSMEs, corporate ESG procurement, and investor circles.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Globe size={18} color="var(--color-gold-rich)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong style={{ color: 'var(--color-plum-deep)' }}>Amplify Voice:</strong> Generating national visibility for women’s entrepreneurial journeys via VyapaarJagat.com and collector’s books.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Two Organizer & Media Partner Cards (5 cols) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Card 1: 1MEIF NGO Organizer */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #EFE4F4', boxShadow: '0 4px 16px rgba(46, 8, 72, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
                <div style={{ width: '46px', height: '46px', background: 'var(--color-plum-deep)', color: '#FFFFFF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={24} color="var(--color-gold-rich)" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, color: 'var(--color-plum-deep)', fontSize: '1.2rem', margin: 0 }}>MEIF</h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-gold-rich)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    NGO Organizer
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                <strong>1 Million Entrepreneurs International Forum (MEIF)</strong> is a registered Section 8 Company in India (NGO) with active <strong>80G &amp; 12A</strong> certifications. They are fully certified under CSR (CSR00106194) and NITI Aayog Darpan to implement impactful national development initiatives.
              </p>

              <div style={{ fontSize: '0.72rem', borderTop: '1px solid #F0E5F5', paddingTop: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>PAN: AACCZ1279M</span>
                <span>Founding Dir: Dr. Pravin Parmar</span>
              </div>
            </div>

            {/* Card 2: VyapaarJagat.com Media & Tech Partner */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #EFE4F4', boxShadow: '0 4px 16px rgba(46, 8, 72, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
                <div style={{ width: '46px', height: '46px', background: '#3D0E54', color: '#FFFFFF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe size={24} color="var(--color-gold-rich)" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, color: 'var(--color-plum-deep)', fontSize: '1.2rem', margin: 0 }}>VyapaarJagat.com</h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-burgundy)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Media &amp; Tech Partner
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                VyapaarJagat.com is one of India’s leading business platforms documenting entrepreneur stories. It serves as the primary media engine for Fempreneur, archiving and publishing editorial features on women-led businesses to drive organic reach and national recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEMPRENEUR MOBILE EXPERIENCE (Matching Greenpreneur App Showcase) */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FAF4FC 0%, #FFFFFF 50%, #F6ECF9 100%)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
          overflow: 'hidden',
          padding: '5.5rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left Column: App Features & Store Badges */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  paddingLeft: '0.85rem',
                  borderLeft: '4px solid var(--color-burgundy)',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-plum-deep)',
                  }}
                >
                  FEMPRENEUR MOBILE EXPERIENCE
                </span>
              </div>

              <h2
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--color-plum-deep)',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                Your Women-Led Network <br />
                <span className="text-gradient">on the Go</span>
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                }}
              >
                Stay connected to the Fempreneur network. Manage your profile, view upcoming events, collaborate across city hubs, and access directories anywhere.
              </p>

              {/* 4 Feature Items (2x2 Grid) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(106, 27, 154, 0.1)',
                      color: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.3rem' }}>
                      Leadership Skills
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Access specialized masterclasses and roundtables by visionary industry leaders.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(106, 27, 154, 0.1)',
                      color: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.3rem' }}>
                      Peer Networking Directory
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Directly message and discover women founder circles to scale your business.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(106, 27, 154, 0.1)',
                      color: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.3rem' }}>
                      City Hubs &amp; Circles
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Join local city chapters and sector groups tailored for women entrepreneurs.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(106, 27, 154, 0.1)',
                      color: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.3rem' }}>
                      Impact &amp; Awards Tracker
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Track your nominations, voting status, jury milestones, and published features.
                    </p>
                  </div>
                </div>
              </div>

              {/* App Store & Google Play Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a
                  href="#download-ios"
                  onClick={(e) => { e.preventDefault(); alert('Fempreneur iOS App coming soon! Nominations & directory are fully active on web.'); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#0F0914',
                    color: '#FFFFFF',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: '1.5px solid #2B163B',
                    boxShadow: '0 6px 18px rgba(15, 9, 20, 0.2)',
                  }}
                >
                  <svg width="22" height="26" viewBox="0 0 170 170" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.19-9.56-11.08-20.91-14.67-34.05-3.59-13.14-5.38-25.33-5.38-36.57 0-14.9 3.63-27.18 10.89-36.85 7.26-9.67 16.5-14.63 27.72-14.88 4.35 0 9.29 1.16 14.83 3.49 5.54 2.33 9.4 3.54 11.58 3.64 1.8.1 5.92-1.22 12.38-3.97 6.45-2.75 11.83-3.92 16.14-3.5 11.85.95 21.2 5.4 28.05 13.35-10.45 6.34-15.56 15.11-15.35 26.31.22 8.78 3.52 16.03 9.9 21.75 6.38 5.72 13.78 8.94 22.2 9.68-2.33 7.09-5.18 14.34-8.56 21.75zM119.22 31.84c0-7.3 2.66-14.17 7.98-20.61 5.32-6.44 11.91-10.42 19.78-11.23.21 1.06.32 2.01.32 2.86 0 7.09-2.73 14.07-8.19 20.95-5.46 6.88-12.19 10.9-20.19 11.01-.1-.85-.15-1.84-.15-2.98z" />
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.85 }}>Download on the</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>App Store</div>
                  </div>
                </a>

                <a
                  href="#download-android"
                  onClick={(e) => { e.preventDefault(); alert('Fempreneur Android App coming soon! Nominations & directory are fully active on web.'); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#0F0914',
                    color: '#FFFFFF',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: '1.5px solid #2B163B',
                    boxShadow: '0 6px 18px rgba(15, 9, 20, 0.2)',
                  }}
                >
                  <svg width="22" height="24" viewBox="0 0 512 512" fill="none">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#EA4335" />
                    <path d="M47 0C44 3.2 42.2 7.7 42.2 13v486c0 5.3 1.8 9.8 4.8 13l240.7-241L47 0z" fill="#4285F4" />
                    <path d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" fill="#34A853" />
                    <path d="M457.6 237.9L385.4 196l-60.1 60.1 60.1 60.1 72.2-41.9c13.7-7.9 13.7-24.5 0-32.4z" fill="#FBBC04" />
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.85 }}>GET IT ON</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>Google Play</div>
                  </div>
                </a>
              </div>

              {/* Stats Counters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.75rem' }}>
                <div>
                  <div style={{ fontFamily: 'serif, Georgia', fontSize: '2.1rem', fontWeight: 800, color: 'var(--color-plum-deep)', lineHeight: 1, marginBottom: '0.35rem' }}>
                    500+
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Women Leaders</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'serif, Georgia', fontSize: '2.1rem', fontWeight: 800, color: 'var(--color-plum-deep)', lineHeight: 1, marginBottom: '0.35rem' }}>
                    90%+
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Engagement</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Showcase Presentation Poster */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div
                style={{
                  background: 'linear-gradient(165deg, #FBF6FD 0%, #FFFFFF 45%, #F7EEFA 100%)',
                  borderRadius: '40px',
                  padding: '2.5rem 1.75rem 2.5rem',
                  border: '1.5px solid rgba(106, 27, 154, 0.16)',
                  boxShadow: '0 25px 60px rgba(74, 18, 109, 0.1), 0 8px 24px rgba(0, 0, 0, 0.03)',
                  position: 'relative',
                  overflow: 'visible',
                  width: '100%',
                  maxWidth: '410px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Brand Title & Subtitle */}
                <div style={{ textAlign: 'center', marginBottom: '1.4rem', position: 'relative', zIndex: 3 }}>
                  <div
                    style={{
                      fontFamily: 'serif, Georgia, "Times New Roman"',
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#5B1E78',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }}
                  >
                    <span>Fempreneur</span>
                    <span style={{ fontSize: '0.9rem', marginLeft: '2px', fontWeight: 600 }}>®</span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      fontWeight: 800,
                      letterSpacing: '0.01em',
                      marginTop: '4px',
                    }}
                  >
                    Grow Together. Lead Better.
                  </div>
                </div>

                {/* Smartphone Container */}
                <div style={{ position: 'relative', width: '304px', zIndex: 2 }}>
                  <div
                    style={{
                      width: '304px',
                      height: '590px',
                      background: '#1A0E24',
                      borderRadius: '42px',
                      padding: '8px',
                      boxShadow: '0 26px 55px rgba(26, 14, 36, 0.38), 0 10px 20px rgba(0, 0, 0, 0.18), inset 0 0 2px 2px rgba(255, 255, 255, 0.2)',
                      border: '2px solid #371B48',
                      position: 'relative',
                    }}
                  >
                    {/* Screen */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#FAF7FC',
                        borderRadius: '34px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                      }}
                    >
                      {/* Status Bar */}
                      <div
                        style={{
                          height: '28px',
                          background: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 0.9rem',
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          color: '#1C1224',
                          borderBottom: '1px solid #F4ECF6',
                        }}
                      >
                        <span>4:09</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.58rem' }}>
                          <span>22.0 KB/s</span>
                          <span style={{ fontSize: '0.54rem' }}>5G</span>
                          <span>66%</span>
                          <div style={{ width: '13px', height: '7px', border: '1.2px solid #1C1224', borderRadius: '2px', padding: '1px' }}>
                            <div style={{ width: '66%', height: '100%', background: '#1C1224', borderRadius: '1px' }} />
                          </div>
                        </div>
                      </div>

                      {/* Header Row */}
                      <div
                        style={{
                          background: '#FFFFFF',
                          padding: '0.4rem 0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #EFE4F4',
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#1E88E5',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          HU
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#4A3D54' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="5" height="5" x="3" y="3" rx="1"/>
                            <rect width="5" height="5" x="16" y="3" rx="1"/>
                            <rect width="5" height="5" x="3" y="16" rx="1"/>
                            <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                            <path d="M21 21v.01"/>
                            <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                            <path d="M3 12h.01"/>
                            <path d="M12 3h.01"/>
                            <path d="M12 16v.01"/>
                            <path d="M16 12h1"/>
                            <path d="M21 12v.01"/>
                            <path d="M12 21v-1"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Screen Body */}
                      <div
                        style={{
                          flex: 1,
                          padding: '0.45rem 0.6rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.4rem',
                          background: '#FAF7FC',
                          position: 'relative',
                        }}
                      >
                        {/* Upgrade Banner */}
                        <div
                          style={{
                            background: '#FFFFFF',
                            borderRadius: '10px',
                            padding: '0.45rem 0.6rem',
                            borderLeft: '4px solid #7B1FA2',
                            boxShadow: '0 2px 6px rgba(123, 31, 162, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.35rem',
                          }}
                        >
                          <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#1C1224', lineHeight: 1.25 }}>
                            Upgrade Now to unlock all<br />premium features.
                          </div>
                          <button
                            style={{
                              background: '#6A1B9A',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '0.32rem 0.65rem',
                              fontSize: '0.58rem',
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            UPGRADE
                          </button>
                        </div>

                        {/* Suggested Matches */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.1rem 0.15rem 0' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1C1224' }}>
                            Suggested Matches
                          </span>
                          <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#7B1FA2', cursor: 'pointer' }}>
                            See All
                          </span>
                        </div>

                        {/* 1. Member: USER 125 */}
                        <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '0.4rem 0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)', border: '1px solid #F0E6F4' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#8E24AA', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              U1
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1C1224' }}>USER 125</span>
                                <span style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700 }}>👤 0</span>
                              </div>
                              <div style={{ fontSize: '0.55rem', color: '#757575', lineHeight: 1.15 }}>📍 Ahmedabad</div>
                              <div style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700, lineHeight: 1.15 }}>Tech &amp; AI</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>👤⁻</div>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>💬</div>
                          </div>
                        </div>

                        {/* 2. Member: ADMIN USER */}
                        <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '0.4rem 0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)', border: '1px solid #F0E6F4' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1E88E5', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              AU
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1C1224' }}>ADMIN USER</span>
                                <span style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700 }}>👤 0</span>
                              </div>
                              <div style={{ fontSize: '0.55rem', color: '#757575', lineHeight: 1.15 }}>📍 Abhayapuri</div>
                              <div style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700, lineHeight: 1.15 }}>It</div>
                              <div style={{ fontSize: '0.52rem', color: '#9E9E9E', lineHeight: 1.15 }}>Real Estate Broker (R...</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>👤⁻</div>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>💬</div>
                          </div>
                        </div>

                        {/* 3. Member: DEMO USER */}
                        <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '0.4rem 0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)', border: '1px solid #F0E6F4' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#121212', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              DU
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1C1224' }}>DEMO USER</span>
                                <span style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700 }}>👤 6</span>
                              </div>
                              <div style={{ fontSize: '0.55rem', color: '#757575', lineHeight: 1.15 }}>📍 Ahmedabad</div>
                              <div style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700, lineHeight: 1.15 }}>It</div>
                              <div style={{ fontSize: '0.52rem', color: '#9E9E9E', lineHeight: 1.15 }}>Steel Manufacturing</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>👤⁻</div>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>💬</div>
                          </div>
                        </div>

                        {/* 4. Member: TEST IDK */}
                        <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '0.4rem 0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)', border: '1px solid #F0E6F4' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3F51B5', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              TI
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1C1224' }}>TEST IDK</span>
                                <span style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700 }}>👤 0</span>
                              </div>
                              <div style={{ fontSize: '0.55rem', color: '#757575', lineHeight: 1.15 }}>📍 Abohar</div>
                              <div style={{ fontSize: '0.55rem', color: '#5C6BC0', fontWeight: 700, lineHeight: 1.15 }}>Testing</div>
                              <div style={{ fontSize: '0.52rem', color: '#9E9E9E', lineHeight: 1.15 }}>Artificial Intelligence ...</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>👤⁻</div>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5EDF8', color: '#4A3D54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem' }}>💬</div>
                          </div>
                        </div>

                        {/* Floating Purple Action Button */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#7B1FA2',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 300,
                            boxShadow: '0 4px 10px rgba(123, 31, 162, 0.45)',
                            zIndex: 4,
                          }}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    {/* Curving Extension Paper */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-18px',
                        left: '-12px',
                        right: '-8px',
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '0.65rem 0.75rem 0.5rem',
                        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.22), 0 4px 10px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        transform: 'rotate(-4deg) perspective(400px) rotateX(6deg)',
                        transformOrigin: 'bottom left',
                        zIndex: 10,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: '#8E24AA',
                            color: '#FFFFFF',
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          KS
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1C1224', lineHeight: 1.1 }}>
                            KRUPA SHA...
                          </div>
                          <div style={{ fontSize: '0.5rem', color: '#757575' }}>
                            06 Feb 2026, 08:19 AM
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.54rem', color: '#424242', lineHeight: 1.35, marginBottom: '0.35rem' }}>
                        Customized leadership &amp; networking and executed for Ahmedabad's renowned enterprise leaders... <span style={{ color: '#7B1FA2', fontWeight: 800 }}>Read more</span>
                      </p>

                      <div style={{ borderRadius: '8px', overflow: 'hidden', height: '62px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <img
                          src="/images/about/about-networking-event.png"
                          alt="Networking Summit"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR JOURNEY / CHRONICLES (Matching Greenpreneur 4-Card Journey Grid) */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#FFFFFF', borderBottom: '1px solid #EFE4F4' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--color-gold-rich)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', display: 'block', marginBottom: '0.75rem' }}>
              Our Journey
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontFamily: 'serif, Georgia', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0 }}>
              Chronicles of Women Entrepreneurship
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '620px', margin: '0.75rem auto 0', lineHeight: 1.6 }}>
              Fempreneur has travelled across key institutional anchors and leading business centers, celebrating women-led change across India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {journeys.map((j, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAF6FC',
                  padding: '1.75rem',
                  borderRadius: '16px',
                  border: '1px solid #EFE4F4',
                  position: 'relative',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-gold-rich)', marginBottom: '0.5rem', opacity: 0.8 }}>
                  {j.year}
                </span>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--color-burgundy)', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>
                  {j.location}
                </span>
                <h4 style={{ fontWeight: 800, color: 'var(--color-plum-deep)', fontSize: '0.98rem', marginBottom: '0.75rem' }}>
                  {j.theme}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {j.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FOUNDER'S VISION (Matching Greenpreneur Founder Section) */}
      <section style={{ padding: '5.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1C0626 0%, #2D0B3D 60%, #150220 100%)',
            color: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(28, 6, 38, 0.25)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            padding: '3.5rem 2.5rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Left: Founder Portrait */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    border: '2px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    width: '190px',
                    height: '190px',
                    borderRadius: '50%',
                    border: '4px solid var(--color-gold-rich)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                  }}
                >
                  <img
                    src="/images/about/pravin.png"
                    alt="Dr. Pravin Parmar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.7)',
                      transformOrigin: '50% 40%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Founder Quote & Details */}
            <div>
              <span style={{ color: 'var(--color-gold-rich)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', display: 'block', marginBottom: '0.5rem' }}>
                Founder's Vision
              </span>

              <h3 style={{ fontFamily: 'serif, Georgia', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                Dr. Pravin Parmar
              </h3>

              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 300 }}>
                "Our vision is clear: we want to create an empowering national collaborative platform where women entrepreneurs, innovators, and established MSMEs don't operate in silos. By sharing stories and validating impactful models through transparent evaluation, we align Indian women enterprise with the national agenda of Viksit Bharat @2047. Fempreneur is a dedication to empowering India's future economic leaders."
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.84rem' }}>
                <span style={{ fontWeight: 800, color: '#FFFFFF' }}>Founder, MEIF &amp; VyapaarJagat.com</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Organiser of Fempreneur Mega Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: BOTTOM CTA BANNER (Matching Greenpreneur Celebration Event CTA) */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1C0626 0%, #2A0938 100%)',
          color: '#FFFFFF',
          padding: '4.5rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'serif, Georgia', fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#FFFFFF' }}>
            Be part of the Fempreneur 2027 National Showcase.
          </h2>

          <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem' }}>
            Nominate your business for free or secure a delegate pass to network with 500+ women leaders, mentors, and ecosystem partners.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/nominate"
              style={{
                background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
                color: '#FFFFFF',
                padding: '0.85rem 2rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(233, 30, 99, 0.35)',
                transition: 'transform 0.2s ease',
              }}
            >
              Nominate Now (FREE)
            </Link>

            <Link
              to="/membership"
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.6)',
                padding: '0.85rem 2rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.88rem',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
            >
              Get Delegate Pass
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
