import React, { useState } from 'react';
import { Handshake, Check, ShieldCheck, Download, Send, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
import { submitGeneralInquiry } from '../services/api';

export default function PartnersPage() {
  const [selectedTier, setSelectedTier] = useState('Title Sponsor (₹5,00,000)');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [partnerData, setPartnerData] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
  });

  const tiers = [
    {
      name: 'Title Sponsor',
      price: '₹5,00,000',
      badge: 'Exclusive',
      deliverables: [
        '"Presented By" naming rights across all event marketing',
        'Prominent central stage backdrop and entrance arch branding',
        '15-minute prime keynote address during inaugural ceremony',
        '2 premium exhibition stalls in main convention gallery',
        'Double-page spread corporate profile in Coffee Table Book',
        '20 VIP Executive Delegate Passes with lounge access',
        'Dedicated founder video interview on VyapaarJagat.com',
      ],
    },
    {
      name: 'Powered By Sponsor',
      price: '₹3,00,000',
      badge: 'Co-Branded',
      deliverables: [
        '"Powered By" co-branding on event collateral and digital reach',
        'Stage banner placement throughout both city ceremonies',
        'Seat on leadership panel discussion with industry pioneers',
        '1 prime exhibition stall in convention networking hub',
        'Full-page feature in the Fempreneur Coffee Table Book',
        '12 VIP Delegate Passes with priority seating',
        'VyapaarJagat article coverage and press release distribution',
      ],
    },
    {
      name: 'Platinum Sponsor',
      price: '₹1,50,000',
      badge: 'High Impact',
      deliverables: [
        'Logo placement on stage backdrops, banners, and digital promos',
        '1 exhibition stall in the 50-stall exhibition showcase',
        'Full-page feature in the Fempreneur Coffee Table Book',
        '8 VIP Delegate Passes with networking access',
        'On-stage presentation role for designated award categories',
        'Social media spotlight campaign across ecosystem handles',
      ],
    },
    {
      name: 'Gold Sponsor',
      price: '₹1,00,000',
      badge: 'Prominent',
      deliverables: [
        'Prominent logo on event backdrop and website partners page',
        'Half-page feature in the Fempreneur Coffee Table Book',
        '5 VIP Delegate Passes to keynote and awards ceremonies',
        '1 standard exhibition stall space in networking gallery',
        'Recognition during official valedictory announcements',
      ],
    },
    {
      name: 'Silver Sponsor',
      price: '₹50,000',
      badge: 'Ecosystem',
      deliverables: [
        'Logo on official website and event brochure sponsor roll',
        'Listing and acknowledgment in the Coffee Table Book',
        '3 Attendee passes to all conference tracks',
        'Display banner placement in open networking arena',
      ],
    },
    {
      name: 'Category Sponsor',
      price: '₹10,000',
      badge: 'Focused',
      deliverables: [
        'Sole naming rights for 1 specific award category',
        'Stage recognition during felicitation of category winner',
        '1 Delegate pass for the award ceremony',
        'Category branding in the digital winners catalog',
      ],
    },
  ];

  const partnersHeroCollage = (
    <div className="floating-collage-box">
      {/* Soft Purple Glow Aura */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '430px',
          height: '430px',
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

      {/* 1. Strategic Partners Floating Pill (Top-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          right: '6%',
          background: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)',
          color: '#FFFFFF',
          borderRadius: '999px',
          padding: '7px 16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.85rem',
          fontWeight: 700,
          boxShadow: '0 8px 22px rgba(106, 27, 154, 0.32)',
          zIndex: 8,
        }}
      >
        <ShieldCheck size={15} />
        <span>Strategic Partners</span>
      </div>

      {/* 2. Main Centerpiece: Authentic Founder Media & Interview Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '430px',
          maxWidth: '85%',
          height: '350px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 22px 50px rgba(106, 27, 154, 0.28), 0 8px 18px rgba(0,0,0,0.08)',
          border: '4px solid #FFFFFF',
          zIndex: 5,
        }}
      >
        <img
          src="/images/partners/partners-media-interview.png"
          alt="Fempreneur Media &amp; Corporate Partnerships Spotlight"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
          }}
        />
        {/* Floating badge on centerpiece image */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            background: 'rgba(30, 8, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Sparkles size={14} color="#E91E63" />
          <span>Media &amp; Corporate Spotlight</span>
        </div>
      </div>

      {/* 3. 500+ Founders Floating Pill (Mid-Left) */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '2%',
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
        <span>500+ Founders</span>
      </div>

      {/* 5. Packages Tier Floating Pill (Bottom-Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '4%',
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
        <Sparkles size={15} color="#D97706" />
        <span>₹10,000 – ₹5,00,000</span>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        badge="Corporate Partnerships 2027"
        badgeIcon={Handshake}
        title="Partner with India's"
        highlight="Women-Led Movement"
        description="Connect your organization with 500+ female business leaders, MSME owners, and innovators across Ahmedabad & Delhi NCR. Packages from ₹10,000 to ₹5,00,000."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Partners & Sponsors' }]}
        ctaText="Inquire for Sponsorship"
        ctaTo="#inquire"
        customVisual={partnersHeroCollage}
      />

      {/* Section 1: 6 Tiers Detailed Grid */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Official Proposal Framework"
            badgeVariant="gold"
            title="Six Structured"
            highlight="Sponsorship Tiers"
            subtitle="Transparent investment levels designed for maximum brand alignment, executive access, and corporate social responsibility (CSR) goals."
          />

          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '4rem' }}>
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className="fem-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2.25rem',
                  border: idx === 0 ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {t.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    Tier 0{idx + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.25rem' }}>
                  {t.name}
                </h3>

                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-burgundy)', margin: '0.85rem 0 1.5rem' }}>
                  {t.priceFormatted || t.price}
                </div>

                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gold-rich)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
                  Deliverables &amp; Entitlements:
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>
                  {t.deliverables.map((d, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Check size={15} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <CTAButton
                  to="#inquire"
                  onClick={() => setSelectedTier(`${t.name} (${t.priceFormatted || t.price})`)}
                  variant={idx === 0 ? 'primary' : 'secondary'}
                  block
                  size="md"
                >
                  Select {t.name}
                </CTAButton>
              </div>
            ))}
          </div>

          {/* Section 2: Sponsorship Inquiry Form */}
          <div id="inquire" className="container-narrow">
            <div
              className="fem-card"
              style={{
                padding: '3rem 2.5rem',
                background: 'linear-gradient(135deg, #FBF8FD 0%, #F5ECFA 50%, #FAF2FC 100%)',
                border: '1.5px solid rgba(106, 27, 154, 0.2)',
                boxShadow: '0 16px 40px rgba(106, 27, 154, 0.08), 0 4px 16px rgba(106, 27, 154, 0.04)',
                borderRadius: 'var(--radius-2xl)',
              }}
            >
              <span className="badge badge-plum" style={{ marginBottom: '0.75rem' }}>
                Corporate Desk
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                Request Corporate Partnership Deck
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Submit your brand requirements to receive the full itemized deliverables matrix and custom stall layouts.
              </p>

              {submitted ? (
                <div style={{ padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(106, 27, 154, 0.15)' }}>
                  <CheckCircle2 size={42} color="var(--color-burgundy)" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>Partnership Request Logged</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Our corporate relations desk has received your request for <strong>{selectedTier}</strong> and will share the proposal deck shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setError(null);
                  try {
                    await submitGeneralInquiry({
                      type: 'partner',
                      fullName: partnerData.contactPerson.trim(),
                      email: partnerData.email.trim(),
                      phone: partnerData.phone.trim(),
                      organization: partnerData.company.trim(),
                      subjectOrTier: selectedTier,
                      messageOrTopic: `Corporate sponsorship inquiry for ${selectedTier}`,
                    });
                    setLoading(false);
                    setSubmitted(true);
                  } catch (err) {
                    setLoading(false);
                    setError(err.message || 'Failed to submit partnership inquiry. Please try again.');
                  }
                }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="corpName">Company / Brand Name *</label>
                      <input
                        id="corpName"
                        type="text"
                        required
                        value={partnerData.company}
                        onChange={(e) => setPartnerData({ ...partnerData, company: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Tata Trusts / Reliance Foundation"
                        style={{ background: '#FFFFFF', borderColor: 'rgba(106, 27, 154, 0.2)' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactPerson">Contact Person Name *</label>
                      <input
                        id="contactPerson"
                        type="text"
                        required
                        value={partnerData.contactPerson}
                        onChange={(e) => setPartnerData({ ...partnerData, contactPerson: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Ritesh Kapoor"
                        style={{ background: '#FFFFFF', borderColor: 'rgba(106, 27, 154, 0.2)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="corpEmail">Official Corporate Email *</label>
                      <input
                        id="corpEmail"
                        type="email"
                        required
                        value={partnerData.email}
                        onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                        className="form-input"
                        placeholder="ritesh@company.com"
                        style={{ background: '#FFFFFF', borderColor: 'rgba(106, 27, 154, 0.2)' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="corpPhone">Phone Number *</label>
                      <input
                        id="corpPhone"
                        type="tel"
                        required
                        value={partnerData.phone}
                        onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
                        className="form-input"
                        placeholder="+91-XXXXX-XXXXX"
                        style={{ background: '#FFFFFF', borderColor: 'rgba(106, 27, 154, 0.2)' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="tierInterest">Selected Tier of Interest *</label>
                    <select
                      id="tierInterest"
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="form-select"
                      style={{ background: '#FFFFFF', borderColor: 'rgba(106, 27, 154, 0.2)' }}
                    >
                      <option value="Title Sponsor (₹5,00,000)">Title Sponsor (₹5,00,000)</option>
                      <option value="Powered By (₹3,00,000)">Powered By Sponsor (₹3,00,000)</option>
                      <option value="Platinum Sponsor (₹1,50,000)">Platinum Sponsor (₹1,50,000)</option>
                      <option value="Gold Sponsor (₹1,00,000)">Gold Sponsor (₹1,00,000)</option>
                      <option value="Silver Sponsor (₹50,000)">Silver Sponsor (₹50,000)</option>
                      <option value="Category Sponsor (₹10,000)">Category Sponsor (₹10,000)</option>
                    </select>
                  </div>

                  {error && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        background: 'var(--color-coral-soft)',
                        border: '1px solid rgba(224, 93, 93, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        color: '#DC2626',
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <CTAButton type="submit" variant="primary" size="lg" block icon={Send} disabled={loading}>
                    {loading ? 'Submitting Request...' : 'Submit Sponsorship Inquiry'}
                  </CTAButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
