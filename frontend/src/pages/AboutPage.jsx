import React from 'react';
import { Award, Users, BookOpen, ShieldCheck, Heart, Sparkles, Building2, Globe, CheckCircle2, ArrowRight, UserCheck, TrendingUp } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';

export default function AboutPage() {
  const milestones = [
    { year: '2022', title: 'Fempreneur Conference & Award', venue: 'BSE Mumbai', note: 'Foundational national edition establishing the Fempreneur platform.' },
    { year: '2023', title: 'Fempreneur 2023 & Book Launch', venue: 'AMA Ahmedabad', note: 'Coffee Table Book launched; 35 award categories established.' },
    { year: '2024', title: 'Fempreneur 2024 National Edition', venue: 'BSE Mumbai', note: 'Initiation of nationwide storytelling drive via VyapaarJagat.com.' },
    { year: '2025', title: 'Fempreneur 2025 Annual Convention', venue: 'DevX Ahmedabad', note: '40+ award winners honored and Fempreneur Book Launch.' },
    { year: '2027', title: '6th Edition Dual-City Showcase', venue: 'Ahmedabad & Delhi NCR', note: 'Expansion to 150+ categories; open to participants across India.' },
  ];

  const sdgs = [
    { code: 'SDG 5', title: 'Gender Equality', desc: 'Accelerating female workforce participation, leadership equity, and enterprise ownership.' },
    { code: 'SDG 8', title: 'Decent Work & Economic Growth', desc: 'Fostering inclusive economic formalization and local job creation through MSMEs.' },
    { code: 'SDG 9', title: 'Industry, Innovation & Infrastructure', desc: 'Encouraging women innovators in technology, sustainable manufacturing, and patents.' },
    { code: 'SDG 10', title: 'Reduced Inequalities', desc: 'Bridging access to capital and markets for women founders from Tier 2/3 towns.' },
    { code: 'SDG 17', title: 'Partnerships for the Goals', desc: 'Forging collaborative ecosystems with 1MEIF NGO, industry chambers, and media.' },
  ];

  const viksitPillars = [
    'Economic formalization of grassroots and women-led home enterprises',
    'Enhancement of export competitiveness in artisanal, MSME, and technical sectors',
    'Acceleration of female labor force participation and high-value leadership roles',
    'Democratization of venture capital and credit into Tier 2 and Tier 3 cities',
    'Grassroots innovation addressing local community and environmental challenges',
    'Sustainable transformation aligning commercial growth with national prosperity',
  ];

  const teamRoles = [
    { role: 'Program Director', department: 'Executive Leadership', desc: 'Oversees overall ecosystem strategy, dual-city expansion, and national advisory alliances.' },
    { role: 'Awards Coordinator', department: 'Nomination & Jury Secretariat', desc: 'Manages the 7-weighted criteria evaluation engine, juror liaisons, and verified public voting.' },
    { role: 'Media Manager', department: 'Editorial & Storytelling', desc: 'Leads the 1,000 Stories Drive on VyapaarJagat.com, press releases, and Coffee Table Book publishing.' },
    { role: 'Community Manager', department: 'Chapters & Membership', desc: 'Directs City Chapters, member networking roundtables, and the 150+ sector directory.' },
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

      {/* Decorative Subtle Curved Dashed Lines (Matching Home Page) */}
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
          src="/images/hubs/ahmedabad-hub.jpg"
          alt="Ahmedabad Hub"
          style={{ width: '100%', height: '76px', borderRadius: '11px', objectFit: 'cover', display: 'block' }}
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
        {/* Subtle Floating pill badge on image */}
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
          src="/images/hubs/delhi-hub.jpg"
          alt="Delhi NCR Hub"
          style={{ width: '100%', height: '76px', borderRadius: '11px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '6px 2px 1px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-plum-deep)', textAlign: 'left', lineHeight: 1.2 }}>
          Delhi NCR<br />Hub
        </div>
      </div>
    </div>
  );

  return (
    <div>
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

      {/* Section 1: Mission Statement & What is Women Entrepreneurship */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-12 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>
                Our Core Purpose
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1.25rem', lineHeight: 1.25 }}>
                Women Entrepreneurs <br />
                <span className="text-gradient">Redefining Success</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                Fempreneur 2027 is India’s comprehensive platform for women entrepreneurs — bringing together ambitious women, business leaders, mentors, experts, and ecosystem partners to create meaningful connections, opportunities, and growth.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Three pillars drive the platform: <strong>Award</strong> (recognising women founders through a fair process with 50% jury evaluation and 50% public voting), <strong>Connect</strong> (structured community across 150+ business and industry categories), and <strong>Amplify</strong> (1,000 Stories Drive on VyapaarJagat.com + annual collector’s Coffee Table Book).
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <CTAButton to="/nominate" variant="primary" size="md">
                  Nominate a Woman Leader
                </CTAButton>
                <CTAButton to="/membership" variant="secondary" size="md">
                  Join Community
                </CTAButton>
              </div>
            </div>

            {/* What is Women Entrepreneurship Definition Box */}
            <div className="fem-card fem-card-gold" style={{ padding: '2.5rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Definition &amp; Scope
              </span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1rem' }}>
                What Is Women Entrepreneurship?
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Women entrepreneurship brings together women building businesses, creating employment, driving innovation, leading MSMEs and startups, and contributing to economic and social development. They are purpose-driven in addressing social, industrial, and consumer challenges through innovative, sustainable solutions.
              </p>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>500+ Women Entrepreneurs Honored &amp; Connected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>150+ Business &amp; Industry Categories Covered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-burgundy)"' }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>10,000+ Inspiring Stories Published Digitally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Platform Milestones Timeline */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <SectionTitle
            badge="Historical Editions"
            badgeVariant="plum"
            title="Our History &amp;"
            highlight="Milestones"
            subtitle="Tracing our proven progression from the inaugural 2022 forum at BSE Mumbai to the 2027 dual-city national program."
          />

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="fem-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.5rem 2rem',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: 'var(--color-burgundy)',
                    minWidth: '90px',
                  }}
                >
                  {m.year}
                </div>
                <div style={{ flexGrow: 1, minWidth: '220px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.2rem' }}>
                    {m.title}
                  </h4>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-gold-rich)', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Venue: {m.venue}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {m.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Organizers Behind Fempreneur */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Institutional Leadership"
            badgeVariant="gold"
            title="Organizers &amp;"
            highlight="Ecosystem Partners"
            subtitle="Led by registered non-profits, enterprise forums, and business storytelling media with anchor presence in Ahmedabad & Delhi NCR."
          />

          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
            <div className="fem-card" style={{ padding: '2.5rem' }}>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>Registered NGO</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                1 Million Entrepreneurs International Forum (1MEIF)
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                An international non-profit forum committed to nurturing entrepreneurial spirit, business formalization, and inclusive ecosystem support for women and emerging founders across India.
              </p>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                Role: Program Governance &amp; Advisory Oversight
              </div>
            </div>

            <div className="fem-card fem-card-gold" style={{ padding: '2.5rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Media &amp; Publishing</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                VyapaarJagat.com
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                One of India’s premier digital business platforms dedicated to covering startups, MSMEs, innovator journeys, and women entrepreneurs through video journalism and digital reach.
              </p>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                Role: National Media Partner &amp; 1,000 Stories Drive Host
              </div>
            </div>

            <div className="fem-card" style={{ padding: '2.5rem' }}>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>Host Venue Anchor</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                Ahmedabad Management Association (AMA)
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Premier management institute and convention institution hosting Western India’s leading enterprise forums, executive masterclasses, and annual convenings.
              </p>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                Role: Anchor Venue &amp; Academic Ecosystem Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Team Roles Structure */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <SectionTitle
            badge="Secretariat Operations"
            badgeVariant="plum"
            title="Program Secretariat &amp;"
            highlight="Coordination Desks"
            subtitle="The operational management structure executing the 2027 dual-city convention and national storytelling drive."
          />

          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {teamRoles.map((t, idx) => (
              <div key={idx} className="fem-card" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(106, 27, 154, 0.08)',
                    color: 'var(--color-burgundy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <UserCheck size={26} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.3rem' }}>
                  {t.role}
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-rich)', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {t.department}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: SDG Alignment & Viksit Bharat @2047 */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Global & National Frameworks"
            badgeVariant="gold"
            title="Strategic Alignment with"
            highlight="UN SDGs &amp; Viksit Bharat @2047"
            subtitle="Demonstrating how recognizing, connecting, and amplifying female entrepreneurs directly advances India's national development goals."
          />

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '3.5rem' }}>
            {sdgs.map((sdg, idx) => (
              <div key={idx} className="fem-card" style={{ padding: '1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-burgundy)', marginBottom: '0.5rem' }}>
                  {sdg.code}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.65rem' }}>
                  {sdg.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {sdg.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Viksit Bharat @2047 Six-Point Narrative */}
          <div className="fem-card fem-card-gold" style={{ padding: '2.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              National Vision Alignment
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1rem' }}>
              How Fempreneur Directly Powers Viksit Bharat @2047
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              As India charts its journey toward becoming a developed nation by 2047, women-led enterprise is the single most vital catalyst for GDP formalization, job creation, and export expansion:
            </p>

            <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {viksitPillars.map((pillar, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={17} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
