import React, { useState } from 'react';
import {
  Handshake,
  Check,
  ShieldCheck,
  Download,
  Send,
  CheckCircle2,
  Users,
  Sparkles,
  Building,
  Award,
  Shield,
  TrendingUp,
  UserCheck,
  Mail,
  Phone,
  FileText,
  Briefcase,
  ArrowRight,
  Store
} from 'lucide-react';
import { PageHeader } from '../components';
import { submitGeneralInquiry } from '../services/api';

export default function PartnersPage() {
  const [selectedTier, setSelectedTier] = useState('Title Sponsor (₹2,00,000)');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    tier: 'Title Sponsor (₹2,00,000)',
    requirements: '',
  });

  // Master List of Supporters & Corporate Partners (Using original logo assets)
  const supporters = [
    // Row 1
    {
      tier: 'TITLE SPONSOR',
      name: 'Broghar Realty',
      logo: '/images/sponsors/Broghar Realty.png',
    },
    {
      tier: 'POWERED BY',
      name: 'Armorfire',
      logo: '/images/sponsors/Armorfire.jpeg',
    },
    {
      tier: 'PLATINUM SPONSOR',
      name: 'Aerolam',
      logo: '/images/sponsors/Aerolam.png',
    },
    {
      tier: 'PLATINUM SPONSOR',
      name: 'Porcious',
      logo: '/images/sponsors/Porcious.jpg',
    },
    {
      tier: 'POWERED BY',
      name: 'Sun Wave Energy',
      logo: '/images/sponsors/Sun Wave Energy.jpg',
    },
    // Row 2
    {
      tier: 'GOLD SPONSOR',
      name: 'CampusDean',
      logo: '/images/sponsors/CampusDean.jpg',
    },
    {
      tier: 'GOLD SPONSOR',
      name: 'CampusJobs.ai',
      logo: '/images/sponsors/CampusJobs.jpg',
    },
    {
      tier: 'GOLD SPONSOR',
      name: 'Nature Coat',
      logo: '/images/sponsors/Nature Coat.jpg',
    },
    {
      tier: 'GOLD SPONSOR',
      name: 'Zybra',
      logo: '/images/sponsors/Zybra.jpg',
    },
    {
      tier: 'ASSOCIATE PARTNER',
      name: 'CEED',
      logo: '/images/sponsors/CEED.jpg',
    },
    // Row 3
    {
      tier: 'PR PARTNER',
      name: 'TVM',
      logo: '/images/sponsors/TVM.jpg',
    },
    {
      tier: 'EVENT MANAGED BY',
      name: 'Shaadi Vows',
      logo: '/images/sponsors/Shaadi Vows.jpg',
    },
    {
      tier: 'DIGITAL DISPLAY PARTNER',
      name: 'Wide Reach',
      logo: '/images/sponsors/Wide Reach.jpg',
    },
    {
      tier: 'ASSOCIATE PARTNER',
      name: 'Fempreneur',
      logo: '/images/sponsors/Fempreneur.png',
    },
    {
      tier: 'ORGANIZED BY',
      name: 'Peers Global',
      logo: '/images/sponsors/Peers Global.png',
    },
    // Row 4
    {
      tier: 'MEDIA PARTNER',
      name: 'VyapaarJagat.com',
      logo: '/images/sponsors/VyapaarJagat.png',
    },
    {
      tier: 'ORGANIZED BY',
      name: '1 Million Entrepreneurs Intern...',
      logo: '/images/sponsors/1 Million Entrepreneurs.png',
    },
    {
      tier: 'TECHNOLOGY PARTNER',
      name: 'Aequitas Infotech Technology P...',
      logo: '/images/sponsors/AequitasInfotech.png',
    },
  ];

  // 4 Core Value Propositions
  const valueProps = [
    {
      icon: Shield,
      title: 'Brand Visibility',
      description: 'Logo presence on all digital and offline promotional collaterals, backdrops, folders, and national press releases.',
    },
    {
      icon: Users,
      title: 'Elite Networking',
      description: 'Direct engagement with 500+ attendees including decision-makers, venture investors, and policy authorities.',
    },
    {
      icon: Handshake,
      title: 'Diversity & ESG Leadership',
      description: 'Demonstrate alignment with UN SDGs, female economic inclusion, and Viksit Bharat @2047 on a national stage.',
    },
    {
      icon: TrendingUp,
      title: 'Measurable Leads',
      description: 'Structured data access to attendee demographics, enterprise profiles, and matching procurement directories.',
    },
  ];

  // 3 Primary Featured Sponsorship Tiers (Matching Screenshot 2)
  const primaryTiers = [
    {
      name: 'Title Sponsor',
      subTag: 'PRESENTED BY YOUR BRAND',
      price: '₹2,00,000',
      badge: 'ELITE TIER',
      badgeColor: '#6A1B9A',
      features: [
        'Exclusive Event Naming Rights: Presented By logo lockup',
        'Logo placement on ALL main backdrops, brochures, trophies',
        'Keynote speaking slot (15 mins) during main summit',
        'Full post-event attendee insights and matching logs',
        'Premium full-page feature story in Coffee Table Book',
        'Featured logo in all media drives on VyapaarJagat.com',
      ],
    },
    {
      name: 'Powered By',
      subTag: 'CO-BRANDING STAGE BACKDROP',
      price: '₹1,00,000',
      badge: 'CO-BRANDED',
      badgeColor: '#4A126D',
      features: [
        'Co-branding logotype placement on main stage backdrop',
        'Speaking slot during panel discussions (8-10 mins)',
        'Full page feature profile story in Coffee Table Book',
        'Featured logo on event registration page and email updates',
        'Story integration on VyapaarJagat.com channels',
      ],
    },
    {
      name: 'Platinum Sponsor',
      subTag: 'HIGH IMPACT POSITIONING',
      price: '₹75,000',
      badge: 'HIGH IMPACT',
      badgeColor: '#6A1B9A',
      features: [
        'Large logo placement on all offline standees and banners',
        'On-stage logo branding slide during award presentation',
        'VIP delegate passes (6) including premium gala dinner seats',
        'Full-page advertisement in Coffee Table Book',
        'Featured social media blast across ecosystem handles',
      ],
    },
  ];

  // Exhibition Stalls Data (Matching Reference Design)
  const exhibitionStalls = [
    {
      title: 'Standard Stall',
      size: 'Size: 6 × 6 ft',
      points: [
        '1 table and 2 chairs',
        'Standard backdrop system',
        'Power connection points',
        '2 general event entry passes',
      ],
      tierName: 'Standard Exhibition Stall (6×6 ft)',
    },
    {
      title: 'Premium Stall',
      size: 'Size: 10 × 10 ft',
      points: [
        '2 tables and 4 chairs',
        'Premium banner setup + backdrop space',
        'Dedicated spotlights and power systems',
        '4 general passes + 1 VIP pass',
      ],
      tierName: 'Premium Exhibition Stall (10×10 ft)',
    },
  ];

  const handleEnquireClick = (tierName, price) => {
    const formatted = price ? `${tierName} (${price})` : tierName;
    setSelectedTier(formatted);
    setFormData((prev) => ({ ...prev, tier: formatted }));
    const formElem = document.getElementById('corporate-enquiry-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await submitGeneralInquiry({
        type: 'partner',
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        messageOrTopic: `Tier: ${formData.tier}. Requirements: ${formData.requirements}`,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit proposal request. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
      {/* HERO SECTION */}
      <PageHeader
        badge="Corporate Partnerships &amp; ESG Leadership"
        badgeIcon={Handshake}
        title="Partnership &amp; Sponsorship"
        highlight="Opportunities 2027"
        description="Position your brand alongside India's fastest growing women-led enterprises. Connect with 500+ female founders, MSME decision-makers, and institutional leaders at Ahmedabad &amp; Delhi NCR."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Partnerships 2027' }]}
        ctaText="Request Proposal"
        ctaTo="#corporate-enquiry-form"
        secondaryCtaText="Explore Tiers"
        secondaryCtaTo="#impact-tiers"
        image="/images/partners/corporate-partner-signing.jpg"
        imageAlt="Corporate Partnership Signing"
        imageBadge="Premier Brand Association"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* SECTION 1: EVENT SPONSORS & PARTNERS (Matching Reference Images 2 & 3) */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid #F0E6F4', borderBottom: '1px solid #F0E6F4' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#8A6D3B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.78rem', display: 'block', marginBottom: '0.5rem' }}>
              OUR SUPPORTERS
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
              Event Sponsors &amp; Partners 2027
            </h2>
            <div style={{ width: '48px', height: '3px', background: '#C29336', margin: '0.85rem auto 0', borderRadius: '9999px' }} />
          </div>

          {/* Grid of Partners & Sponsors - 5 columns matching Reference Images */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {supporters.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #ECEEF1',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                  padding: '1.25rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '190px',
                  boxSizing: 'border-box',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(106, 27, 154, 0.08)';
                  e.currentTarget.style.borderColor = '#D6B4E8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = '#ECEEF1';
                }}
              >
                {/* 1. TOP BADGE */}
                <span
                  style={{
                    background: '#F7EFE3',
                    color: '#8A6D3B',
                    fontSize: '0.64rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '0.28rem 0.75rem',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                  }}
                >
                  {item.tier}
                </span>

                {/* 2. ORIGINAL LOGO IN CENTER */}
                <div
                  style={{
                    height: '75px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* 3. PARTNER NAME AT BOTTOM */}
                <span
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#1F2937',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE VALUE PROPOSITION (Matching Screenshot 3) */}
      <section style={{ padding: '5.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.6rem' }}>
              THE VALUE PROPOSITION
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
              Why Partner with Fempreneur?
            </h2>
          </div>
          <p style={{ fontSize: '0.96rem', color: '#5C4E65', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
            Position your brand at the center of the women entrepreneurship dialogue and connect with the pioneers of India's growth future.
          </p>
        </div>

        {/* 4 Value Proposition Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {valueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #EFE4F4',
                  boxShadow: '0 8px 24px rgba(46, 8, 72, 0.04)',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#F6EEFA',
                    color: '#6A1B9A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#5C4E65', lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: SPONSORSHIP TIERS / SELECT YOUR IMPACT LEVEL (Matching Screenshot 2) */}
      <section id="impact-tiers" style={{ padding: '5.5rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.6rem' }}>
              INVESTMENT OPTIONS
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.1rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
              Select Your Impact Level
            </h2>
            <div style={{ width: '60px', height: '3px', background: '#6A1B9A', margin: '1rem auto 0', borderRadius: '9999px' }} />
          </div>

          {/* 3 Column Tier Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              alignItems: 'stretch',
            }}
          >
            {primaryTiers.map((tier, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: idx === 0 ? '2px solid #6A1B9A' : '1px solid #EFE4F4',
                  boxShadow: idx === 0 ? '0 12px 40px rgba(106, 27, 154, 0.12)' : '0 8px 30px rgba(46, 8, 72, 0.05)',
                  padding: '3rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {/* Top Badge */}
                {tier.badge && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        background: tier.badgeColor,
                        color: '#FFFFFF',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Tier Title & SubTag */}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: '#1C1224',
                    margin: '0 0 0.35rem 0',
                  }}
                >
                  {tier.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#72627C',
                    display: 'block',
                    marginBottom: '1.75rem',
                  }}
                >
                  {tier.subTag}
                </span>

                {/* Price Display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#1C1224', lineHeight: 1 }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase' }}>
                    INR INVESTMENT
                  </span>
                </div>

                {/* Feature Bullets */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 2.5rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    flexGrow: 1,
                  }}
                >
                  {tier.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: 1.5,
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#F6EEFA',
                          color: '#6A1B9A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => handleEnquireClick(tier.name, tier.price)}
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.5rem',
                    borderRadius: '12px',
                    background:
                      idx === 0
                        ? 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)'
                        : 'linear-gradient(135deg, #4A126D 0%, #6A1B9A 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(106, 27, 154, 0.25)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  ENQUIRE NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: EXHIBITION STALLS (Matching Reference Design) */}
      <section style={{ padding: '5rem 1.5rem', background: '#FAF6FC' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#8A6D3B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.78rem', display: 'block', marginBottom: '0.6rem' }}>
              SHOWCASE SPACE
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.1rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
              Exhibition Stalls
            </h2>
            <p style={{ fontSize: '0.96rem', color: '#5C4E65', maxWidth: '620px', margin: '0.75rem auto 0', lineHeight: 1.6 }}>
              Exhibit your eco-friendly and innovative products and solutions to 500+ delegates. Stalls are limited.
            </p>
          </div>

          {/* Stalls 2-Column Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              alignItems: 'stretch',
            }}
          >
            {exhibitionStalls.map((stall, sIdx) => (
              <div
                key={sIdx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #ECEEF1',
                  boxShadow: '0 4px 20px rgba(46, 8, 72, 0.04)',
                  padding: '2.5rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(106, 27, 154, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(46, 8, 72, 0.04)';
                }}
              >
                <div>
                  {/* Top Header Row with Icon, Title and Size Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: '#FAF5FC',
                          color: '#6A1B9A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: '1px solid #F0E6F4',
                        }}
                      >
                        <Store size={20} />
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#1C1224', margin: 0 }}>
                        {stall.title}
                      </h3>
                    </div>

                    {/* Size Badge */}
                    <span
                      style={{
                        background: '#F7EFE3',
                        color: '#8A6D3B',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '6px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {stall.size}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 2.5rem 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.9rem',
                    }}
                  >
                    {stall.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.92rem',
                          color: '#4B5563',
                          lineHeight: 1.4,
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#15803D',
                            flexShrink: 0,
                          }}
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Stall Space CTA Button */}
                <button
                  type="button"
                  onClick={() => handleEnquireClick(stall.tierName)}
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.5rem',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1.5px solid #C29336',
                    color: '#8A6D3B',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#6A1B9A';
                    e.currentTarget.style.borderColor = '#6A1B9A';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(106, 27, 154, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#C29336';
                    e.currentTarget.style.color = '#8A6D3B';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  BOOK STALL SPACE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CORPORATE ENQUIRY FORM (Matching Fempreneur brand identity) */}
      <section id="corporate-enquiry-form" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '1180px', margin: '0 auto' }}>
        {/* Outer Large Rounded White Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '28px',
            border: '1px solid #EFE4F4',
            boxShadow: '0 16px 48px rgba(46, 8, 72, 0.07)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Left Dark Box - Fempreneur Royal Purple Gradient */}
          <div
            style={{
              background: 'linear-gradient(145deg, #2E0848 0%, #4A126D 100%)',
              borderRadius: '24px',
              padding: '3rem 2.25rem',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 12px 32px rgba(46, 8, 72, 0.28)',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#E9D5FF',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              SECURE YOUR TIER
            </span>

            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2.3rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              Corporate Enquiry
            </h3>

            <p style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65, marginBottom: '3rem' }}>
              Let's discuss how we can customize our sponsorship options to deliver maximum value for your brand and support your ESG targets.
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Partnership Lead */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#F3E8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Users size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>
                    PARTNERSHIP LEAD
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: '#FFFFFF', display: 'block' }}>
                    Vishal Parmar (Director)
                  </strong>
                  <span style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                    +91 70411 51714
                  </span>
                </div>
              </div>

              {/* Enquiry Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#F3E8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>
                    ENQUIRY EMAIL
                  </span>
                  <a
                    href="mailto:hello@fempreneur.in"
                    style={{ fontSize: '0.94rem', color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
                  >
                    hello@fempreneur.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Container (Inside outer white card) */}
          <div
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {error && (
              <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                {error}
              </div>
            )}

            {submitted ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
                <CheckCircle2 size={52} color="#6A1B9A" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.5rem' }}>
                  Partnership Inquiry Received
                </h4>
                <p style={{ fontSize: '0.94rem', color: '#5C4E65', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                  Our corporate partnerships lead will contact you within 24 hours with a custom sponsorship deck and pricing schedule.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    background: '#FAF6FC',
                    border: '1px solid #E6D5EC',
                    color: '#6A1B9A',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        background: '#FAFAFA',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6A1B9A';
                        e.target.style.background = '#FFFFFF';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E7EB';
                        e.target.style.background = '#FAFAFA';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      ORGANIZATION / COMPANY
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Company Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        background: '#FAFAFA',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6A1B9A';
                        e.target.style.background = '#FFFFFF';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E7EB';
                        e.target.style.background = '#FAFAFA';
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      WORK EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        background: '#FAFAFA',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6A1B9A';
                        e.target.style.background = '#FFFFFF';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E7EB';
                        e.target.style.background = '#FAFAFA';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      CONTACT NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 70411 51714"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        background: '#FAFAFA',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6A1B9A';
                        e.target.style.background = '#FFFFFF';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E7EB';
                        e.target.style.background = '#FAFAFA';
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    SPONSORSHIP TIER OF INTEREST
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => {
                      setFormData({ ...formData, tier: e.target.value });
                      setSelectedTier(e.target.value);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #E5E7EB',
                      background: '#FAFAFA',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6A1B9A';
                      e.target.style.background = '#FFFFFF';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                      e.target.style.background = '#FAFAFA';
                    }}
                  >
                    <option value="Title Sponsor (₹2,00,000)">Title Sponsor (₹2,00,000)</option>
                    <option value="Powered By (₹1,00,000)">Powered By (₹1,00,000)</option>
                    <option value="Platinum Sponsor (₹75,000)">Platinum Sponsor (₹75,000)</option>
                    <option value="Gold Sponsor (₹50,000)">Gold Sponsor (₹50,000)</option>
                    <option value="Associate Partner (₹25,000)">Associate Partner (₹25,000)</option>
                    <option value="Exhibition Stall Space (₹15,000)">Exhibition Stall Space (₹15,000)</option>
                    <option value="Custom CSR / ESG Brand Package">Custom CSR / ESG Brand Package</option>
                  </select>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    ADDITIONAL REQUIREMENTS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your brand's promotional goals..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #E5E7EB',
                      background: '#FAFAFA',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6A1B9A';
                      e.target.style.background = '#FFFFFF';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                      e.target.style.background = '#FAFAFA';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1.05rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(106, 27, 154, 0.3)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(106, 27, 154, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.3)';
                  }}
                >
                  {loading ? 'SUBMITTING...' : 'REQUEST PROPOSAL'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
