import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Users,
  BookOpen,
  Calendar,
  Sparkles,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Globe,
  ArrowRight,
  ChevronRight,
  Compass,
  FileText,
  Star,
  Layers,
  X,
} from 'lucide-react';

import {
  Hero,
  SectionTitle,
  CTAButton,
  StatCard,
  FeatureCard,
  AwardCategoryCard,
  WinnerCard,
  EmptyState,
  NewsletterForm,
} from '../components';

import { fetchPlatformStats } from '../services/api';

export default function HomePage() {
  const [liveStats, setLiveStats] = React.useState(null);

  React.useEffect(() => {
    fetchPlatformStats()
      .then((res) => {
        if (res.data) setLiveStats(res.data);
      })
      .catch((err) => console.log('Live platform stats notice:', err.message));
  }, []);

  // 1. Stats Bar (Impact Numbers connected to PostgreSQL live counts)
  const stats = [
    { value: liveStats?.editions || '6+', label: 'Editions Delivered', description: 'Celebrating women entrepreneurs since 2022.', icon: Award },
    { value: liveStats ? `${liveStats.womenEntrepreneurs}+` : '500+', label: 'Women Entrepreneurs', description: 'Honored and connected across India.', icon: Users },
    { value: '35–40+', label: 'Award Categories', description: 'Recognizing diverse business sectors.', icon: Sparkles },
    { value: liveStats ? `${Number(liveStats.totalStoriesDocumented).toLocaleString()}+` : '10,000+', label: 'Stories Published', description: 'Amplified across digital channels.', icon: BookOpen },
    { value: '60+', label: 'Expert Speakers', description: 'Guiding masterclasses and panel forums.', icon: TrendingUp },
    { value: '5L+', label: 'Digital Reach', description: 'Per edition across print & online networks.', icon: Globe },
  ];

  // 2. Three Pillars Framework
  const pillars = [
    {
      pillarNumber: '01',
      title: 'AWARD',
      subtitle: 'Recognise Excellence',
      description: 'Honoring women founders across 35–40+ categories through our transparent 50% Jury Evaluation + 50% Public Voting system.',
      bullets: ['50% Independent Jury Review (7 Weighted Factors)', '50% Verified Public Voting via personal shareable link', '100% Free nomination with zero hidden entry fees'],
      linkText: 'Explore Award Categories',
      linkTo: '/categories',
      badge: 'Flagship Program',
      badgeVariant: 'plum',
    },
    {
      pillarNumber: '02',
      title: 'CONNECT',
      subtitle: 'Structured National Community',
      description: 'Uniting women founders across 150+ business sectors with city chapter hubs in Ahmedabad, Delhi NCR, and expanding nationwide.',
      bullets: ['Active City Chapters hosting local networking meetups', 'Searchable Women Entrepreneur Business Directory', 'Peer circles, knowledge sharing, and mentor connects'],
      linkText: 'Join City Chapters',
      linkTo: '/city-chapters',
      badge: '150+ Sectors',
      badgeVariant: 'gold',
    },
    {
      pillarNumber: '03',
      title: 'AMPLIFY',
      subtitle: 'National Media & Storytelling',
      description: 'Broadcasting women entrepreneurship stories across India through digital publishing and our flagship annual hardbound publication.',
      bullets: ['Top 50 Women Entrepreneurs hardbound Coffee Table Book', '1,000 Stories Drive published on VyapaarJagat.com', 'National media exposure and permanent digital footprints'],
      linkText: 'Explore Coffee Table Book',
      linkTo: '/coffee-table-book',
      badge: 'Top 50 Showcase',
      badgeVariant: 'plum',
    },
  ];

  // 3. Award Categories Preview
  const previewCategories = [
    { code: 'CAT-01', name: 'Woman Entrepreneur of the Year', domain: 'Leadership', description: 'Honoring visionary leadership, sustained enterprise growth, and exceptional commercial excellence.' },
    { code: 'CAT-04', name: 'Startup Founder of the Year', domain: 'Startups', description: 'Celebrating women founders building high-growth, innovative, and scalable early-stage ventures.' },
    { code: 'CAT-05', name: 'Women-Led MSME of the Year', domain: 'Enterprise', description: 'Recognizing operational excellence, local job creation, and manufacturing or service leadership.' },
    { code: 'CAT-06', name: 'Innovation & Technology Leader', domain: 'Technology', description: 'Celebrating pioneering tech solutions, software innovation, and digital transformation in India.' },
  ];

  // 4. Six Sponsorship Tiers Preview
  const sponsorTiers = [
    { name: 'Title Sponsor', investment: '₹5,00,000', badge: 'Premier', highlight: 'Presented By naming rights, keynote slot, 2 stalls, double-spread in Coffee Table Book.' },
    { name: 'Powered By', investment: '₹3,00,000', badge: 'Co-Branded', highlight: 'Powered By branding, panel discussion seat, 1 stall, full-page feature in book.' },
    { name: 'Platinum', investment: '₹1,50,000', badge: 'High Visibility', highlight: 'Prominent logo placement, 1 stall, full-page feature, 8 VIP passes.' },
    { name: 'Gold', investment: '₹1,00,000', badge: 'Prominent', highlight: 'Event backdrop logo, half-page feature in book, 5 VIP passes, standard stall.' },
    { name: 'Silver', investment: '₹50,000', badge: 'Ecosystem', highlight: 'Website sponsor roll, book listing, 3 attendee passes, display banner.' },
    { name: 'Category Sponsor', investment: '₹10,000', badge: 'Specialized', highlight: 'Sole naming rights for 1 specific award category, stage presentation, 1 pass.' },
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <Hero
        title="India’s Women Entrepreneurs"
        highlight="Redefining Success"
        featuredQuestion="Will YOU Be Featured in Fempreneur 2027?"
        subtitle="India's most comprehensive women-entrepreneurship platform. Dual-city edition in Ahmedabad & Delhi NCR. Built to recognise, connect, and amplify women leaders shaping the future of business, communities, and India."
        primaryCtaText="NOMINATE YOURSELF"
        primaryCtaTo="/nominate"
        secondaryCtaText="GET DELEGATE PASS"
        secondaryCtaTo="/events"
        tertiaryCtaText="JOIN OUR COMMUNITY"
        tertiaryCtaTo="/community-hub"
      />

      {/* 2. FEMPRENEUR 2027 MOVEMENT BANNER WITH WOMEN ENTREPRENEURS COLLAGE */}
      <section
        style={{
          position: 'relative',
          background: 'radial-gradient(circle at 85% 30%, rgba(171, 71, 188, 0.3) 0%, transparent 60%), radial-gradient(circle at 15% 80%, rgba(233, 30, 99, 0.22) 0%, transparent 55%), linear-gradient(145deg, #1A042B 0%, #2E0848 50%, #4A126D 100%)',
          paddingTop: '3.75rem',
          paddingBottom: '4.25rem',
          color: '#FFFFFF',
          borderTop: '1.5px solid rgba(212, 175, 55, 0.35)',
          borderBottom: '1.5px solid rgba(212, 175, 55, 0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Decorative Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <style>{`
          .movement-banner-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.15fr);
            gap: 3.5rem;
            align-items: center;
          }
          @media (max-width: 980px) {
            .movement-banner-grid {
              grid-template-columns: 1fr;
              gap: 2.75rem;
            }
            .movement-banner-left {
              text-align: center !important;
              margin: 0 auto;
              max-width: 720px;
            }
            .movement-banner-ctas {
              justify-content: center !important;
            }
            .movement-banner-features {
              justify-content: center !important;
            }
            .movement-avatar-stack-row {
              justify-content: center !important;
            }
          }
          @media (max-width: 600px) {
            .movement-collage-box {
              transform: scale(0.8);
              transform-origin: center center;
              margin-top: -20px;
              margin-bottom: -20px;
            }
          }
          .movement-circle-avatar {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
            cursor: pointer;
          }
          .movement-circle-avatar:hover {
            transform: scale(1.15) translateY(-5px) !important;
            box-shadow: 0 16px 36px rgba(233, 30, 99, 0.6) !important;
            border-color: #FFFFFF !important;
            z-index: 10 !important;
          }
          .movement-center-card {
            transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
          }
          .movement-center-card:hover {
            transform: translate(-50%, -53%) scale(1.03) !important;
            box-shadow: 0 32px 75px -10px rgba(0, 0, 0, 0.85), 0 0 55px rgba(233, 30, 99, 0.5) !important;
          }
        `}</style>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1320px' }}>
          <div className="movement-banner-grid">
            {/* LEFT COLUMN: HEADLINE, DESCRIPTION, FEATURES, CTAS, SOCIAL PROOF */}
            <div className="movement-banner-left" style={{ textAlign: 'left' }}>
              <span
                className="badge badge-gold"
                style={{
                  marginBottom: '1rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  padding: '0.4rem 1rem',
                  display: 'inline-block',
                }}
              >
                FEMPRENEUR 2027
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.65rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1.15rem',
                  lineHeight: 1.22,
                  letterSpacing: '-0.02em',
                }}
              >
                "35+ Award Categories | 2 Cities | One Nationwide Women Entrepreneurship Movement"
              </h2>

              <p
                style={{
                  fontSize: 'clamp(0.96rem, 1.2vw, 1.08rem)',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.68,
                  marginBottom: '1.75rem',
                  maxWidth: '560px',
                }}
              >
                Celebrating 500+ inspiring women founders, MSME innovators, and changemakers across India. Evaluated 50% by an esteemed jury and 50% by public community votes.
              </p>

              {/* Feature Highlights */}
              <div
                className="movement-banner-features"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.85rem 1.75rem',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#F3D993', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#ECC880" />
                  <span>50% Jury Evaluation</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#F3D993', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#ECC880" />
                  <span>50% Public Voting</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#F3D993', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#ECC880" />
                  <span>35+ Curated Categories</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="movement-banner-ctas"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '2rem',
                }}
              >
                <CTAButton to="/winners" variant="gold" size="lg">
                  View Winners
                </CTAButton>
                <CTAButton to="/categories" variant="secondary" size="lg">
                  See Categories
                </CTAButton>
              </div>

              {/* Overlapping Avatar Stack of Real Women Founders */}
              <div
                className="movement-avatar-stack-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {[
                    '/images/entrepreneurs/priyanshi-shah.jpg',
                    '/images/entrepreneurs/sneha-patel.jpg',
                    '/images/entrepreneurs/dr-sunita-rao.jpg',
                    '/images/entrepreneurs/pooja-mehta.jpg',
                    '/images/entrepreneurs/dr-ananya-sen.jpg',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Women Leader"
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '2px solid #FFFFFF',
                        marginLeft: i > 0 ? '-10px' : '0',
                        objectFit: 'cover',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    />
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>
                    500+ Women Leaders Celebrated
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.72)' }}>
                    Ahmedabad &amp; Delhi NCR Dual Hubs
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LUXURY COLLAGE OF REAL WOMEN ENTREPRENEURS */}
            <div
              className="movement-collage-wrapper"
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="movement-collage-box"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '540px',
                  height: '490px',
                }}
              >
                {/* Radial Glow Aura */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '380px',
                    height: '380px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(233, 30, 99, 0.35) 0%, rgba(106, 27, 154, 0.2) 50%, transparent 72%)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                {/* Decorative Curved Connecting Dashed Lines */}
                <svg
                  viewBox="0 0 540 490"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <path
                    d="M 90 90 Q 200 40 270 120 T 450 90"
                    fill="none"
                    stroke="rgba(233, 30, 99, 0.3)"
                    strokeWidth="1.8"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M 80 350 Q 200 450 330 390 T 460 330"
                    fill="none"
                    stroke="rgba(212, 175, 55, 0.3)"
                    strokeWidth="1.8"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M 400 130 Q 480 240 420 350"
                    fill="none"
                    stroke="rgba(142, 36, 170, 0.35)"
                    strokeWidth="1.8"
                    strokeDasharray="4 5"
                  />
                </svg>

                {/* 1. CENTRAL FEATURED HONOREE CARD (Premier Award Ceremony Winner with Trophy) */}
                <Link
                  to="/winners"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '210px',
                    height: '275px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#2B1238',
                    border: '3.5px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(233, 30, 99, 0.4)',
                    zIndex: 6,
                    display: 'block',
                    textDecoration: 'none',
                  }}
                  className="movement-center-card"
                >
                  <img
                    src="/images/real-events/hero-center-award.png"
                    alt="National Women Entrepreneur Award Winner"
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
                      top: '10px',
                      left: '10px',
                      background: 'rgba(46, 8, 72, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: '#F3D993',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Award size={11} color="#ECC880" />
                    <span>Honoree 2025</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(28, 5, 46, 0.96) 100%)',
                      padding: '24px 10px 10px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '-0.01em' }}>
                      Women Leadership Awards
                    </div>
                    <div style={{ color: '#E879F9', fontSize: '0.68rem', fontWeight: 600 }}>
                      500+ Winners Celebrated
                    </div>
                  </div>
                </Link>

                {/* 2. CIRCULAR WOMAN FOUNDER 1: Top-Left (Priyanshi Shah - Fintech Pioneer) */}
                <Link
                  to="/winners"
                  className="movement-circle-avatar"
                  style={{
                    position: 'absolute',
                    top: '4%',
                    left: '5%',
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    border: '3.5px solid #E91E63',
                    boxShadow: '0 10px 28px rgba(233, 30, 99, 0.45)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    zIndex: 5,
                    display: 'block',
                  }}
                  title="Priyanshi Shah • Fintech Pioneer"
                >
                  <img
                    src="/images/entrepreneurs/priyanshi-shah.jpg"
                    alt="Priyanshi Shah"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                {/* 3. CIRCULAR WOMAN FOUNDER 2: Top-Right (Real Winner in Pink Saree) */}
                <Link
                  to="/winners"
                  className="movement-circle-avatar"
                  style={{
                    position: 'absolute',
                    top: '2%',
                    right: '6%',
                    width: '98px',
                    height: '98px',
                    borderRadius: '50%',
                    border: '3.5px solid #F43F5E',
                    boxShadow: '0 10px 28px rgba(244, 63, 94, 0.45)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    zIndex: 5,
                    display: 'block',
                  }}
                  title="Woman Entrepreneur Awardee"
                >
                  <img
                    src="/images/real-events/hero-top-pink.png"
                    alt="Woman Entrepreneur Awardee"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                </Link>

                {/* 4. CIRCULAR WOMAN FOUNDER 3: Mid-Left (Dr. Sunita Rao - HealthTech Leader) */}
                <Link
                  to="/winners"
                  className="movement-circle-avatar"
                  style={{
                    position: 'absolute',
                    top: '42%',
                    left: '0%',
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    border: '3.5px solid #EC4899',
                    boxShadow: '0 10px 24px rgba(236, 72, 153, 0.4)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    zIndex: 5,
                    display: 'block',
                  }}
                  title="Dr. Sunita Rao • HealthTech Innovator"
                >
                  <img
                    src="/images/entrepreneurs/dr-sunita-rao.jpg"
                    alt="Dr. Sunita Rao"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                {/* 5. CIRCULAR WOMAN FOUNDER 4: Mid-Right (Smiling Entrepreneur) */}
                <Link
                  to="/winners"
                  className="movement-circle-avatar"
                  style={{
                    position: 'absolute',
                    top: '38%',
                    right: '2%',
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    border: '3.5px solid #E11D48',
                    boxShadow: '0 10px 24px rgba(225, 29, 72, 0.4)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    zIndex: 5,
                    display: 'block',
                  }}
                  title="Smiling Founder • MSME Excellence"
                >
                  <img
                    src="/images/real-events/hero-bot-right-f.png"
                    alt="Smiling Founder"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </Link>

                {/* 6. CIRCULAR WOMAN FOUNDER 5: Bottom-Left (Sneha Patel - D2C Innovator) */}
                <Link
                  to="/winners"
                  className="movement-circle-avatar"
                  style={{
                    position: 'absolute',
                    bottom: '6%',
                    left: '8%',
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    border: '3.5px solid #F43F5E',
                    boxShadow: '0 10px 26px rgba(244, 63, 94, 0.4)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    zIndex: 5,
                    display: 'block',
                  }}
                  title="Sneha Patel • D2C Innovator"
                >
                  <img
                    src="/images/entrepreneurs/sneha-patel.jpg"
                    alt="Sneha Patel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                {/* 7. CIRCULAR WOMAN FOUNDER 6: Bottom-Right (Dr. Ananya Sen - CleanTech) */}
                <Link
                  to="/winners"
                  className="movement-circle-avatar"
                  style={{
                    position: 'absolute',
                    bottom: '4%',
                    right: '8%',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '3.5px solid #E91E63',
                    boxShadow: '0 10px 26px rgba(233, 30, 99, 0.4)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    zIndex: 5,
                    display: 'block',
                  }}
                  title="Dr. Ananya Sen • CleanTech Leader"
                >
                  <img
                    src="/images/entrepreneurs/dr-ananya-sen.jpg"
                    alt="Dr. Ananya Sen"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                {/* 8. FLOATING BADGE TOP: 35+ Award Categories */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #ECC880 0%, #D4AF37 50%, #AA771C 100%)',
                    color: '#1C1224',
                    borderRadius: '999px',
                    padding: '6px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 24px rgba(212, 175, 55, 0.45)',
                    zIndex: 8,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Sparkles size={13} color="#1C1224" />
                  <span>35+ Award Categories</span>
                </div>

                {/* 9. FLOATING BADGE BOTTOM: Dual City Hubs */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255, 255, 255, 0.96)',
                    color: 'var(--color-plum-deep)',
                    borderRadius: '999px',
                    padding: '6px 18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35)',
                    border: '1.5px solid rgba(106, 27, 154, 0.25)',
                    zIndex: 8,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MapPin size={13} color="#6A1B9A" />
                  <span>Ahmedabad &amp; Delhi NCR Hubs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT & COMMUNITY METRICS */}
      <section className="section-spacing-sm" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-plum" style={{ marginBottom: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 800 }}>
              IMPACT &amp; COMMUNITY METRICS
            </span>
            <h3 style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.85rem)', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
              500+ Women Entrepreneurs | 35+ Award Categories | 10,000+ Stories Published
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              Verified national impact across editions, connecting founders with funding, media, and peer support.
            </p>
            <CTAButton to="/impact" variant="outline" size="sm" icon={ArrowRight}>
              View Impact Report
            </CTAButton>
          </div>

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. THREE PILLARS SECTION */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionTitle
            badge="Three Pillars"
            badgeVariant="plum"
            title="The Framework Driving"
            highlight="Fempreneur"
            subtitle="Organized around three integrated pillars: Award to recognise, Connect to unite 150+ sectors, and Amplify to broadcast founder journeys."
          />

          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {pillars.map((pillar, idx) => (
              <FeatureCard key={idx} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. AWARD CATEGORIES PREVIEW SECTION */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Nominations Open"
            badgeVariant="gold"
            title="35–40+ Verified"
            highlight="Award Categories"
            subtitle="Spanning leadership honors, technology, healthcare, manufacturing, creative arts, and social enterprise. 100% Free nomination."
          />

          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {previewCategories.map((cat, idx) => (
              <AwardCategoryCard key={idx} {...cat} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <CTAButton to="/categories" variant="secondary" size="lg" icon={ArrowRight}>
              View All 35+ Award Categories
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 5. WHY NOMINATE & 50/50 FAIR PROCESS */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-12 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>
                Fair &amp; Transparent
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                The <span className="text-gradient">50/50 Dual Engine</span> Award Mechanics
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Fempreneur’s distinctive recognition model combines rigorous expert scrutiny with authentic public celebration. No competitor platform provides this level of transparent dual evaluation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(106, 27, 154, 0.1)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', fontWeight: 'bold' }}>
                    1
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>50% Independent Jury Evaluation</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Evaluated across 7 weighted criteria including leadership, innovation, scalability, and social impact.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(106, 27, 154, 0.1)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', fontWeight: 'bold' }}>
                    2
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>50% Verified Public Voting</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Every approved nominee receives a personal, shareable link with anti-fraud controls and rate limiting.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <CTAButton to="/awards" variant="primary" size="md">
                  How the Award Process Works
                </CTAButton>
                <CTAButton to="/nominate" variant="outline" size="md">
                  Start Free Nomination
                </CTAButton>
              </div>
            </div>

            {/* Visual Formula Card */}
            <div className="fem-card fem-card-gold" style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-burgundy)', fontWeight: 800, marginBottom: '0.75rem' }}>
                Composite Scoring Model
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1.5rem' }}>
                Formula for Excellence
              </h3>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.25rem', fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                Score = (Jury Score × 0.50) + (Public Vote × 0.50)
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>Leadership &amp; Vision (Strategic Direction)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>Innovation &amp; Differentiation (Novel Solutions)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>Productivity &amp; Growth (Financial Traction)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--color-burgundy)" />
                  <span>Scalability &amp; Market Potential (National Expansion)</span>
                </li>
              </ul>

              <Link to="/awards" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                <span>Read Full 7-Factor Rubric</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JURY PANEL PREVIEW STRIP */}
      <section className="section-spacing-sm" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-plum">Trust &amp; Credibility</span>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginTop: '0.35rem' }}>
                Independent Jury Panel 2027
              </h3>
            </div>
            <CTAButton to="/awards" variant="secondary" size="sm">
              Jury Mechanics &amp; Criteria
            </CTAButton>
          </div>

          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="fem-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-card-subtle)', border: '2px dashed var(--border-light)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontWeight: 'bold' }}>
                  J{j}
                </div>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.2rem' }}>
                  [Juror {j}: TBA]
                </h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Senior Industry Leader / Advisor
                </p>
                <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--color-gold-rich)', fontWeight: 600 }}>
                  Empanelment in Progress
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WINNER SPOTLIGHT SECTION */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionTitle
            badge="Hall of Fame"
            badgeVariant="plum"
            title="Celebrating Previous"
            highlight="Honorees"
            subtitle="Spotlighting women founders recognized across our 2022–2025 editions."
          />

          <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '2.5rem' }}>
            <WinnerCard
              name="Priyanshi Shah"
              company="Aarya Spatial Design Studio"
              category="Woman Entrepreneur of the Year — Leadership"
              year="2025"
              city="Ahmedabad Hub"
              highlight="Demonstrated exemplary commercial innovation, sustainable architectural design, and community employment generation recognized by VyapaarJagat."
              storyUrl="https://vyapaarjagat.com"
              image="/images/entrepreneurs/priyanshi-shah.jpg"
            />
            <WinnerCard
              name="Dr. Sunita Rao"
              company="Nova BioCare Diagnostics"
              category="Innovation & Technology Leader"
              year="2024"
              city="BSE Mumbai Edition"
              highlight="Built a scalable digital diagnostics solution serving enterprise healthcare clients and over 1,00,000 patients across India."
              storyUrl="https://vyapaarjagat.com"
              image="/images/entrepreneurs/dr-sunita-rao.jpg"
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <CTAButton to="/winners" variant="secondary" size="lg" icon={ArrowRight}>
              View All Winners
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 8. COFFEE TABLE BOOK SHOWCASE */}
      <section className="section-spacing" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="fem-card fem-card-gold" style={{ padding: '3.5rem 2.5rem' }}>
            <div className="grid grid-cols-2 gap-12 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 800 }}>
                  TOP 50 WOMEN ENTREPRENEURS
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
                  FEMPRENEUR COFFEE TABLE BOOK — <span className="font-serif text-gradient">TOP 50 WOMEN ENTREPRENEURS</span>
                </h2>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-burgundy)', marginBottom: '1rem' }}>
                  "Women Entrepreneurs Redefining Success"
                </div>
                <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  A premium hardbound collector's edition documenting the courageous stories, business wisdom, and achievements of India's leading female changemakers.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-burgundy)', lineHeight: 1 }}>5,000+</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Print Copies Distributed</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-burgundy)', lineHeight: 1 }}>5,00,000+</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Digital Readership Reach</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-burgundy)', lineHeight: 1 }}>Top 50</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Curated Founder Profiles</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <CTAButton to="/coffee-table-book" variant="primary" size="lg">
                    Order Now
                  </CTAButton>
                  <CTAButton to="/coffee-table-book" variant="secondary" size="lg">
                    Preview Pages
                  </CTAButton>
                  <CTAButton to="/coffee-table-book" variant="outline" size="lg">
                    Apply to Be Featured
                  </CTAButton>
                </div>
              </div>

              {/* Book Spread Mockup Frame */}
              <div
                style={{
                  background: 'var(--gradient-plum-berry)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-xl)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', fontWeight: 700 }}>
                    Hardbound Collector's Edition
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontStyle: 'italic', margin: '1rem 0' }}>
                    "Women Entrepreneurs Redefining Success"
                  </h3>
                  <p style={{ fontSize: '0.88rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                    Presented to corporate leaders, institutional libraries, Chambers of Commerce, and investors nationwide.
                  </p>
                  <CTAButton to="/coffee-table-book" variant="gold" size="sm">
                    Preview Sample Spreads
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SPONSORSHIP TIERS PREVIEW */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionTitle
            badge="Corporate Partnerships"
            badgeVariant="plum"
            title="Six Transparent"
            highlight="Sponsorship Tiers"
            subtitle="Partner with India's premier women entrepreneurship showcase. Structured packages designed for high brand visibility and CSR alignment."
          />

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '2.5rem' }}>
            {sponsorTiers.map((tier, idx) => (
              <div key={idx} className="fem-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    {tier.name}
                  </h4>
                  <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
                    {tier.badge}
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-burgundy)', marginBottom: '0.75rem' }}>
                  {tier.investment}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.5rem', flexGrow: 1 }}>
                  {tier.highlight}
                </p>

                <CTAButton to="/partners" variant="secondary" size="sm" block>
                  Inquire for Tier
                </CTAButton>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <CTAButton to="/partners" variant="primary" size="lg" icon={ArrowRight}>
              View Full 6-Tier Comparison Matrix
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 10. VYAPAARJAGAT 1,000 STORIES DRIVE */}
      <section className="section-spacing" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div
            className="fem-card"
            style={{
              background: 'linear-gradient(135deg, #2E0848 0%, #6A1B9A 100%)',
              color: '#FFFFFF',
              padding: '3.5rem 2.5rem',
            }}
          >
            <div className="grid grid-cols-2 gap-12 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
                  Storytelling Movement
                </span>
                <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.25 }}>
                  "An Event Lasts One Day. <br />
                  <span className="text-gold font-serif">A Story Lasts Forever."</span>
                </h2>
                <p style={{ fontSize: '1.02rem', opacity: 0.9, lineHeight: 1.65, marginBottom: '2rem' }}>
                  Join the VyapaarJagat 1,000 Stories Drive. Every woman entrepreneur has an inspiring journey of resilience, problem-solving, and triumph that deserves to be archived and shared with the nation.
                </p>
                <CTAButton to="/story-drive" variant="gold" size="lg">
                  Submit Your Story for Publication
                </CTAButton>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '1rem', fontWeight: 700 }}>
                  Why Submit Your Story?
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', opacity: 0.95 }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Permanent digital footprint on VyapaarJagat.com with strong Google SEO ranking.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Consideration for the annual Fempreneur Coffee Table Book.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>National reach across 5,00,000+ founders, investors, and corporate readers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. WHY AHMEDABAD & DELHI NCR TWO-CITY RATIONALE */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionTitle
            badge="Strategic Expansion"
            badgeVariant="plum"
            title="Why Ahmedabad &amp;"
            highlight="Delhi NCR?"
            subtitle="The 2027 edition unites Gujarat's manufacturing and trading heartland with the national capital's capital, policy, and media powerhouse."
          />

          <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* Ahmedabad Hub */}
            <div className="fem-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(106, 27, 154, 0.08)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    Ahmedabad Anchor Hub
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-rich)', fontWeight: 600 }}>The Entrepreneurial Legacy</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Gujarat's business ecosystem has anchored Fempreneur since 2022. Celebrated for industrial manufacturing, textile mastery, pharmaceutical innovation, and cooperative enterprise.
              </p>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                Venue: Ahmedabad Management Association (AMA)
              </div>
            </div>

            {/* Delhi NCR Hub */}
            <div className="fem-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(106, 27, 154, 0.08)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    Delhi NCR National Hub
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>Capital, Policy &amp; Scale</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                The national capital region provides direct interface with central ministries (MSME, DPIIT, Women &amp; Child Development), institutional venture capital, and national broadcasting media.
              </p>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                Venue: National Capital Showcase [Location TBA]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. EIGHT PATHWAYS TO PARTICIPATE */}
      <section className="section-spacing" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <SectionTitle
            badge="Ecosystem Pathways"
            badgeVariant="gold"
            title="8 Ways to"
            highlight="Participate in Fempreneur"
            subtitle="Whether you are an early-stage founder, MSME leader, corporate sponsor, or community builder, there is a dedicated pathway for you."
          />

          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[
              {
                title: '1. Nominate for Award',
                desc: '100% free nomination across 40 business & industry categories. Receive your verified public voting link.',
                to: '/nominate',
                link: 'Apply for Award',
                badge: 'Free Entry',
              },
              {
                title: '2. Attend the Summit',
                desc: 'Join 500+ leaders in Ahmedabad & Delhi NCR for keynotes, masterclasses, and national networking.',
                to: '/events',
                link: 'Get Event Pass',
                badge: 'Dual-City',
              },
              {
                title: '3. Sponsor the Movement',
                desc: '6 structured partnership tiers (₹10,000 to ₹5,00,000) with prominent branding and CSR alignment.',
                to: '/partners',
                link: 'Explore Packages',
                badge: 'Brand Visibility',
              },
              {
                title: '4. Coffee Table Book',
                desc: 'Hardbound collector volume featuring Top 50 Women Entrepreneurs with 5L+ digital readership.',
                to: '/coffee-table-book',
                link: 'Book Showcase',
                badge: 'Top 50',
              },
              {
                title: '5. Share Your Story',
                desc: 'Publish your founder journey on VyapaarJagat.com under the nationwide 1,000 Stories Drive.',
                to: '/story-drive',
                link: 'Submit Story',
                badge: '1,000 Stories',
              },
              {
                title: '6. Join City Chapters',
                desc: 'Connect with local regional chapters in Ahmedabad and Delhi NCR for masterclasses and peer circles.',
                to: '/city-chapters',
                link: 'Explore Chapters',
                badge: 'Regional Hubs',
              },
              {
                title: '7. Business Directory',
                desc: 'Get listed in India’s verified directory of women-owned businesses spanning 150+ sectors.',
                to: '/directory',
                link: 'Browse Directory',
                badge: '150+ Sectors',
              },
              {
                title: '8. Speak & Mentor',
                desc: 'Apply to lead panel discussions, mentor emerging founders, and deliver industry masterclasses.',
                to: '/speakers',
                link: 'Speaker Portal',
                badge: '60+ Speakers',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="fem-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.75rem 1.5rem',
                  height: '100%',
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-plum" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                    {p.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {p.desc}
                </p>
                <Link
                  to={p.to}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-burgundy)',
                    textDecoration: 'none',
                  }}
                >
                  <span>{p.link}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. SDG 5 ALIGNMENT & VIKSIT BHARAT @2047 */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div
            className="fem-card"
            style={{
              padding: '3rem 2.5rem',
              background: 'linear-gradient(135deg, #2E0848 0%, #4A126D 50%, #6A1B9A 100%)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <div className="grid grid-cols-2 gap-8 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 800 }}>
                  National Vision &amp; UN SDGs
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.25 }}>
                  Empowering Women Founders for <span className="text-gold font-serif">Viksit Bharat @2047</span>
                </h2>
                <p style={{ fontSize: '0.98rem', opacity: 0.9, lineHeight: 1.65, marginBottom: '1.75rem' }}>
                  Fempreneur directly champions United Nations Sustainable Development Goal 5 (Gender Equality), Goal 8 (Decent Work &amp; Economic Growth), and Goal 9 (Industry, Innovation &amp; Infrastructure) by creating tangible market access, institutional recognition, and funding bridges for female entrepreneurs.
                </p>
                <CTAButton to="/impact" variant="gold" size="md" icon={ArrowRight}>
                  Explore Full SDG &amp; Impact Blueprint
                </CTAButton>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFD54F', marginBottom: '0.25rem' }}>SDG 5</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>Gender Equality</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>Economic leadership &amp; equal entrepreneurial opportunities.</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFD54F', marginBottom: '0.25rem' }}>SDG 8</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>Decent Work &amp; Growth</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>MSME job creation and female-led commercial scaling.</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFD54F', marginBottom: '0.25rem' }}>SDG 9</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>Industry &amp; Innovation</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>Pioneering technology, deep-tech, and manufacturing innovation.</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFD54F', marginBottom: '0.25rem' }}>SDG 17</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>Partnerships for Goals</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>Cross-sector alliances between government, industry, and NGOs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. JOIN THE COMMUNITY CTA */}
      <section className="section-spacing" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="container-narrow">
          <span className="badge badge-gold" style={{ marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 800 }}>
            JOIN THE COMMUNITY
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1rem' }}>
            "Build a stronger future for women entrepreneurs together"
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            Connect with 500+ women leaders, list your business in our 150+ sector directory, or apply to launch a local city chapter in your region.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <CTAButton to="/membership" variant="primary" size="lg">
              Become Member
            </CTAButton>
            <CTAButton to="/city-chapters" variant="secondary" size="lg">
              Start City Chapter
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 13. NEWSLETTER SIGNUP */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="container-narrow">
          <div
            className="fem-card"
            style={{
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <span className="badge badge-plum" style={{ marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 800 }}>
              Stay Updated
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
              NEWSLETTER SIGNUP
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '580px', margin: '0 auto 2rem' }}>
              Subscribe to get updates on Fempreneur 2027 award deadlines, jury announcements, voting windows, and Coffee Table Book launch notifications.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <NewsletterForm inverted={false} placeholder="Enter your email address..." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
