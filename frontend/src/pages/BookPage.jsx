import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Send,
  ArrowRight,
  Check,
  ShieldCheck,
  Share2,
  Users,
  Award
} from 'lucide-react';
import { PageHeader, CTAButton } from '../components';
import { orderCoffeeTableBook, submitGeneralInquiry } from '../services/api';

export default function BookPage() {
  const [quantity, setQuantity] = useState(1);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const [featureSubmitted, setFeatureSubmitted] = useState(false);
  const [featureLoading, setFeatureLoading] = useState(false);
  const [featureError, setFeatureError] = useState(null);

  const [orderData, setOrderData] = useState({ name: '', email: '', phone: '', address: '' });
  const [featureData, setFeatureData] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    packageSelection: 'Inside Feature Story (₹15,000)',
    message: '',
  });

  const pricePerBook = 2999;

  // Feature Slots Table Data (Matching Reference)
  const featurePackages = [
    {
      name: 'Cover Story',
      price: '₹2,00,000',
      desc: 'Premium front cover position + 4-page spread',
      badge: 'SOLD OUT',
      badgeColor: '#EF4444',
      badgeBg: '#FEF2F2',
      selectable: false,
    },
    {
      name: 'Back Cover',
      price: '₹50,000',
      desc: 'High-visibility rear exterior placement',
      badge: '1 SLOT ONLY',
      badgeColor: '#D97706',
      badgeBg: '#FFFBEB',
      selectable: true,
    },
    {
      name: 'Inside Front/Back Cover',
      price: '₹40,000',
      desc: 'First or last interior page placement',
      badge: '1 SLOT ONLY',
      badgeColor: '#D97706',
      badgeBg: '#FFFBEB',
      selectable: true,
    },
    {
      name: 'Full-Page Advertisement',
      price: '₹20,000',
      desc: 'Curated design service included',
      badge: 'LIMITED',
      badgeColor: '#D97706',
      badgeBg: '#FFFBEB',
      selectable: true,
    },
    {
      name: 'Inside Feature Story',
      price: '₹15,000',
      desc: '2-page pictorial business narrative',
      badge: 'OPEN',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      selectable: true,
    },
    {
      name: 'Editorial Spread',
      price: '₹10,000',
      desc: 'Sector-specific expert feature',
      badge: 'LIMITED',
      badgeColor: '#D97706',
      badgeBg: '#FFFBEB',
      selectable: true,
    },
    {
      name: 'Inside Feature (Members)',
      price: '₹5,000',
      desc: 'Exclusively for 1MEIF / Fempreneur Community Members',
      badge: 'MEMBERS ONLY',
      badgeColor: '#6A1B9A',
      badgeBg: '#FAF5FC',
      selectable: true,
    },
    {
      name: 'Extra Print Copies',
      price: '₹300 / copy',
      desc: 'Reserve additional hardbound copies',
      badge: 'OPEN',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      selectable: true,
    },
  ];

  const handleSelectPackage = (pkgName, pkgPrice) => {
    const formatted = `${pkgName} (${pkgPrice})`;
    setFeatureData((prev) => ({ ...prev, packageSelection: formatted }));
    const formElem = document.getElementById('apply');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderError(null);
    setOrderLoading(true);
    try {
      await orderCoffeeTableBook({
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        shippingAddress: orderData.address,
        quantity: Number(quantity),
        totalAmount: quantity * pricePerBook,
      });
      setOrderSubmitted(true);
    } catch (err) {
      setOrderError(err.message || 'Failed to place pre-order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleFeatureSubmit = async (e) => {
    e.preventDefault();
    setFeatureError(null);
    setFeatureLoading(true);
    try {
      await submitGeneralInquiry({
        type: 'book_feature',
        fullName: featureData.fullName,
        company: featureData.businessName,
        email: featureData.email,
        phone: featureData.phone,
        messageOrTopic: `Package: ${featureData.packageSelection}. Notes: ${featureData.message}`,
      });
      setFeatureSubmitted(true);
    } catch (err) {
      setFeatureError(err.message || 'Failed to submit feature application. Please try again.');
    } finally {
      setFeatureLoading(false);
    }
  };

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
      {/* SECTION 1: HERO HEADER */}
      <PageHeader
        badge="Annual Hardbound Volume"
        badgeIcon={BookOpen}
        title="Fempreneur Coffee Table Book —"
        highlight="Top 50 Women Entrepreneurs"
        description="A collector's volume celebrating 50 visionary female founders. Distributed to corporate leaders, institutional libraries, Chambers of Commerce, and 5,00,000+ digital readers."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Coffee Table Book' }]}
        ctaText="Pre-Order Book Copy"
        ctaTo="#order"
        secondaryCtaText="Apply to Be Featured"
        secondaryCtaTo="#apply"
        image="/images/coffee-table-book/coffee-table-book-hero.png"
        imageAlt="Fempreneur Top 50 Women Entrepreneurs Coffee Table Book"
        imageFramed={false}
        imageFilter="none"
        imageMaxWidth="700px"
      />

      {/* SECTION 2: STATS PROOF BAR */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: 800, color: '#6A1B9A' }}>
                Top 50
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Featured Founders
              </span>
            </div>

            <div>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: 800, color: '#4A126D' }}>
                5,000+
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Hardbound Print Copies
              </span>
            </div>

            <div>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: 800, color: '#6A1B9A' }}>
                5,00,000+
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Digital Readership
              </span>
            </div>

            <div>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: 800, color: '#4A126D' }}>
                2 Hubs
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Live Stage Launch
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUNDER QUOTE SECTION (Matching Screenshot 4) */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#FFFFFF', position: 'relative' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg, #6A1B9A, #E91E63)', margin: '0 auto 2.25rem', borderRadius: '9999px' }} />
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
              color: '#1C1224',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: '2rem',
              padding: '0 1rem',
            }}
          >
            "Nomination is FREE. Always. This is our way of celebrating India's women entrepreneurs. This book is the permanent record of that celebration."
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '0.75rem',
                border: '2.5px solid #6A1B9A',
                boxShadow: '0 4px 16px rgba(106, 27, 154, 0.25)',
              }}
            >
              <img
                src="/images/pravin.png"
                alt="Dr. Pravin Parmar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.65)',
                  transformOrigin: '50% 32%',
                }}
              />
            </div>
            <p style={{ fontWeight: 800, color: '#1C1224', fontSize: '0.95rem', margin: '0 0 0.2rem 0' }}>
              Dr. Pravin Parmar
            </p>
            <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6A1B9A', fontWeight: 800, margin: 0 }}>
              FOUNDER, 1MEIF
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: DISTRIBUTION & REACH SECTION (Matching Screenshot 3) */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#FAF6FC', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            {/* Left 2 Highlight Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {/* Card 1: Premium Print */}
              <div
                style={{
                  padding: '2.25rem 2rem',
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #EBECEF',
                  boxShadow: '0 4px 20px rgba(46, 8, 72, 0.04)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#FAF5FC',
                    color: '#6A1B9A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <BookOpen size={24} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', color: '#1C1224', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                  Premium Print
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#5C4E65', lineHeight: 1.6, margin: 0 }}>
                  High-GSM textured papers, luxury hardbound gold embossing cover designed for library and lobby archives.
                </p>
              </div>

              {/* Card 2: 5,00,000+ Reach */}
              <div
                style={{
                  padding: '2.25rem 2rem',
                  background: 'linear-gradient(145deg, #2E0848 0%, #4A126D 100%)',
                  color: '#FFFFFF',
                  borderRadius: '24px',
                  boxShadow: '0 12px 32px rgba(46, 8, 72, 0.25)',
                  marginTop: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FAF5FC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Share2 size={24} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', color: '#FFFFFF', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                  5,00,000+ Reach
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.6, margin: 0 }}>
                  Massive digital distributions to central and state nodal ministries, corporate ESG teams, and directories.
                </p>
              </div>
            </div>

            {/* Right Text Description & Bullets */}
            <div>
              <span style={{ color: '#6A1B9A', fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                DISTRIBUTION &amp; REACH
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 700, color: '#1C1224', lineHeight: 1.25, margin: '0 0 1.25rem 0' }}>
                Capturing the Women Entrepreneurship Legacy
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#5C4E65', lineHeight: 1.65, marginBottom: '2rem' }}>
                The Fempreneur 2027 Coffee Table Book is a premium publication launched at our main awards gala. It stands as a permanent record of sustainable innovations and is distributed directly to decision-makers in the ecosystem.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', color: '#374151' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6A1B9A', flexShrink: 0 }} />
                  <span>Distributed to all 500+ conclave delegates</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', color: '#374151' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6A1B9A', flexShrink: 0 }} />
                  <span>Showcased across Fempreneur &amp; Peers Global Business Platforms</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', color: '#374151' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6A1B9A', flexShrink: 0 }} />
                  <span>Included pictorial lifetime listing in Vyapaar Jagat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURE PACKAGES / BOOK INCLUSION & PRICING TABLE (Matching Screenshot 2) */}
      <section id="packages" style={{ padding: '5.5rem 1.5rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.78rem', display: 'block', marginBottom: '0.6rem' }}>
              FEATURE PACKAGES
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.1rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
              Book Inclusion &amp; Pricing
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#72627C', marginTop: '0.6rem' }}>
              No GST is applicable on these contributions since payments support Section 8 NGO projects.
            </p>
          </div>

          {/* Pricing Table Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #ECEEF1',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(46, 8, 72, 0.05)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #2E0848 0%, #4A126D 100%)', color: '#FFFFFF', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    <th style={{ padding: '1.25rem 1.5rem' }}>FEATURE SLOT</th>
                    <th style={{ padding: '1.25rem 1.5rem' }}>INVESTMENT</th>
                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>AVAILABILITY</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.88rem' }}>
                  {featurePackages.map((pkg, idx) => (
                    <tr
                      key={idx}
                      onClick={() => pkg.selectable && handleSelectPackage(pkg.name, pkg.price)}
                      style={{
                        borderBottom: '1px solid #F0E6F4',
                        cursor: pkg.selectable ? 'pointer' : 'default',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (pkg.selectable) e.currentTarget.style.background = '#FAF5FC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#FFFFFF';
                      }}
                    >
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.96rem', color: '#1C1224' }}>
                          {pkg.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#72627C', marginTop: '0.2rem' }}>
                          {pkg.desc}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#6A1B9A', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                        {pkg.price}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: pkg.badgeColor,
                            background: pkg.badgeBg,
                            border: `1px solid ${pkg.badgeColor}33`,
                          }}
                        >
                          {pkg.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: APPLY FOR FEATURE FORM (Matching Screenshot 1) */}
      <section id="apply" style={{ padding: '5.5rem 1.5rem', background: 'linear-gradient(145deg, #2E0848 0%, #4A126D 100%)', color: '#FFFFFF' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              padding: '3rem 2.25rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.35rem 0' }}>
              Apply for Feature
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 2rem 0' }}>
              Submit details below. Our editorial board will contact you to request photos and draft copy.
            </p>

            {featureError && (
              <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                {featureError}
              </div>
            )}

            {featureSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={54} color="#D8B4FE" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Application Recorded
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
                  Thank you, <strong>{featureData.fullName}</strong>. Your request to feature <strong>{featureData.businessName}</strong> has been sent to our editorial desk. We will reach out on WhatsApp/Email.
                </p>
                <button
                  type="button"
                  onClick={() => setFeatureSubmitted(false)}
                  style={{
                    marginTop: '1.75rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeatureSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={featureData.fullName}
                      onChange={(e) => setFeatureData({ ...featureData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(0, 0, 0, 0.25)',
                        fontSize: '0.92rem',
                        color: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      MOBILE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={featureData.phone}
                      onChange={(e) => setFeatureData({ ...featureData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(0, 0, 0, 0.25)',
                        fontSize: '0.92rem',
                        color: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@company.com"
                    value={featureData.email}
                    onChange={(e) => setFeatureData({ ...featureData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(0, 0, 0, 0.25)',
                      fontSize: '0.92rem',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    BUSINESS NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter company name"
                    value={featureData.businessName}
                    onChange={(e) => setFeatureData({ ...featureData, businessName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(0, 0, 0, 0.25)',
                      fontSize: '0.92rem',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    INCLUSION PACKAGE SELECTION
                  </label>
                  <select
                    value={featureData.packageSelection}
                    onChange={(e) => setFeatureData({ ...featureData, packageSelection: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: '#240838',
                      fontSize: '0.92rem',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                  >
                    <option value="Cover Story (₹2,00,000)">Cover Story (₹2,00,000) - Sold Out</option>
                    <option value="Back Cover (₹50,000)">Back Cover (₹50,000)</option>
                    <option value="Inside Front/Back Cover (₹40,000)">Inside Front/Back Cover (₹40,000)</option>
                    <option value="Full-Page Advertisement (₹20,000)">Full-Page Advertisement (₹20,000)</option>
                    <option value="Inside Feature Story (₹15,000)">Inside Feature Story (₹15,000)</option>
                    <option value="Editorial Spread (₹10,000)">Editorial Spread (₹10,000)</option>
                    <option value="Inside Feature (Members) (₹5,000)">Inside Feature (Members) (₹5,000)</option>
                    <option value="Extra Print Copies (₹300 / copy)">Extra Print Copies (₹300 / copy)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    BRIEF MESSAGE (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific requests or category mentions..."
                    value={featureData.message}
                    onChange={(e) => setFeatureData({ ...featureData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(0, 0, 0, 0.25)',
                      fontSize: '0.92rem',
                      color: '#FFFFFF',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={featureLoading}
                  style={{
                    width: '100%',
                    padding: '1.05rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(106, 27, 154, 0.45)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(233, 30, 99, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.45)';
                  }}
                >
                  {featureLoading ? 'SUBMITTING...' : 'SUBMIT FEATURE REQUEST'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: PRE-ORDER HARDBOUND COPY */}
      <section id="order" style={{ padding: '5.5rem 1.5rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div
            style={{
              padding: '3rem 2.25rem',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 8px 32px rgba(46, 8, 72, 0.05)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: '#FAF5FC',
                color: '#6A1B9A',
                fontWeight: 800,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Order Hardbound Copy
            </span>

            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.9rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.5rem' }}>
              Pre-Order Collector Edition
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#5C4E65', marginBottom: '1.75rem' }}>
              ₹{pricePerBook.toLocaleString('en-IN')} per copy (includes pan-India doorstep courier).
            </p>

            {orderError && (
              <div style={{ padding: '0.85rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                {orderError}
              </div>
            )}

            {orderSubmitted ? (
              <div style={{ padding: '2.5rem', background: '#FAF6FC', borderRadius: '16px', textAlign: 'center', border: '1px solid #EFE4F4' }}>
                <CheckCircle2 size={44} color="#6A1B9A" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.35rem' }}>Pre-Order Received</h4>
                <p style={{ fontSize: '0.9rem', color: '#5C4E65', margin: 0 }}>
                  Our team will contact you with shipping and invoice details.
                </p>
                <button
                  type="button"
                  onClick={() => setOrderSubmitted(false)}
                  style={{
                    marginTop: '1.5rem',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #E6D5EC',
                    color: '#6A1B9A',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Place Another Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1C1224', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.name}
                      onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E6D5EC', background: '#FAFAFA', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="e.g. Radhika Sharma"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1C1224', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E6D5EC', background: '#FAFAFA', fontSize: '0.92rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1C1224', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={orderData.email}
                      onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E6D5EC', background: '#FAFAFA', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="radhika@example.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1C1224', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderData.phone}
                      onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E6D5EC', background: '#FAFAFA', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="+91-XXXXX-XXXXX"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1C1224', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>
                    Doorstep Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={orderData.address}
                    onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E6D5EC', background: '#FAFAFA', fontSize: '0.92rem', outline: 'none', lineHeight: 1.5 }}
                    placeholder="Full Postal Address with Pincode"
                  />
                </div>

                <button
                  type="submit"
                  disabled={orderLoading}
                  style={{
                    width: '100%',
                    padding: '1.05rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
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
                  <ShoppingBag size={18} />
                  <span>{orderLoading ? 'Processing Order...' : `Confirm Pre-Order (₹${(quantity * pricePerBook).toLocaleString('en-IN')})`}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
