import React, { useState } from 'react';
import { Users, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, X, Heart, Star, Check } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
import { enrollMembership } from '../services/api';
import { initiateRazorpayPayment } from '../services/razorpay';

// =========================================================================
// PRICING CONFIGURATION
// =========================================================================
export const TEST_PRICE_MODE = false;

export const MEMBERSHIP_PRICES = {
  starter: 5000,
  growth: 7500,
  legacy: 10000,
};

export default function MembershipPage() {
  const [selectedTierModal, setSelectedTierModal] = useState(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    city: '',
    userPhoto: null,
    businessLogo: null,
  });
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [businessLogoPreview, setBusinessLogoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  const tiers = [
    {
      tierName: 'Starter Plan',
      subtitle: 'For solo women founders',
      badgeLabel: 'POPULAR',
      badgeBg: 'linear-gradient(135deg, #C026D3 0%, #9333EA 100%)',
      borderColor: '#C026D3',
      softBg: '#FDF4FF',
      numericPrice: MEMBERSHIP_PRICES.starter,
      price: `₹${MEMBERSHIP_PRICES.starter}`,
      monthlyPrice: `₹${Math.round(MEMBERSHIP_PRICES.starter / 12)}/mo`,
      periodPill: 'ANNUAL',
      validity: '1 Year',
      billingPeriod: '/ 1 Year',
      ctaText: 'Subscribe',
      features: [
        'Verified directory profile with member badge',
        'Monthly newsletter & Fempreneur award updates',
        'Access to open virtual knowledge webinars',
        'Invitations to local city chapter meetups',
        'Standard delegate pass discount (10% off)',
      ],
    },
    {
      tierName: 'Growth Plan',
      subtitle: 'For growing MSME leaders',
      badgeLabel: 'BEST VALUE',
      badgeBg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      borderColor: '#F97316',
      softBg: '#FFF7ED',
      numericPrice: MEMBERSHIP_PRICES.growth,
      price: `₹${MEMBERSHIP_PRICES.growth}`,
      monthlyPrice: `₹${Math.round(MEMBERSHIP_PRICES.growth / 24)}/mo`,
      periodPill: '2 YEARS',
      validity: '2 Years',
      billingPeriod: '/ 2 Years',
      ctaText: 'Subscribe',
      features: [
        'Everything in Starter Plan for 2 full years',
        'Priority directory listing & featured spotlight',
        'Exclusive masterclass recordings & growth toolkits',
        'Peer networking & founder mastermind circles',
        'Discounted delegate pass (25% off) for 2027 events',
      ],
    },
    {
      tierName: 'Legacy Plan',
      subtitle: 'For established scale-up founders',
      badgeLabel: 'BEST VALUE',
      badgeBg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
      borderColor: '#7C3AED',
      softBg: '#F5F3FF',
      numericPrice: MEMBERSHIP_PRICES.legacy,
      price: `₹${MEMBERSHIP_PRICES.legacy}`,
      monthlyPrice: `₹${Math.round(MEMBERSHIP_PRICES.legacy / 60)}/mo`,
      periodPill: '5 YEARS',
      validity: '5 Years',
      billingPeriod: '/ 5 Years',
      ctaText: 'Subscribe',
      features: [
        'Everything in Growth Plan for 5 full years',
        'Evaluation for Coffee Table Book feature',
        '1 VIP Delegate Pass (Ahmedabad or Delhi NCR)',
        'Speaking & panel discussion consideration',
        'Direct investor & corporate connect sessions',
      ],
    },
  ];

  const comparisonRows = [
    { feature: 'Verified Directory Profile & Badge', starter: true, growth: true, legacy: true },
    { feature: 'City Chapter Meetups & Webinars', starter: true, growth: true, legacy: true },
    { feature: 'Masterclass Recordings & Toolkits', starter: false, growth: true, legacy: true },
    { feature: 'Founder Mastermind Circles', starter: false, growth: true, legacy: true },
    { feature: '2027 Event Delegate Discount', starter: '10% Off', growth: '25% Off', legacy: '1 VIP Pass Included' },
    { feature: 'Coffee Table Book Evaluation', starter: false, growth: false, legacy: true },
    { feature: 'Speaking & Investor Connect Access', starter: false, growth: false, legacy: true },
  ];

  const handleOpenEnrollment = (tier) => {
    setSelectedTierModal(tier);
    setSubmitted(false);
    setEnrollError(null);
  };

  const handleSubmitEnrollment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setEnrollError(null);
    try {
      const payload = new FormData();
      payload.append('fullName', formData.fullName.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('tier', selectedTierModal?.tierName || 'Starter Plan');
      payload.append('businessName', formData.company ? formData.company.trim() : '');
      payload.append('companyName', formData.company ? formData.company.trim() : '');
      payload.append('designation', formData.designation ? formData.designation.trim() : '');
      payload.append('city', formData.city || 'Ahmedabad');
      if (formData.userPhoto) {
        payload.append('userPhoto', formData.userPhoto);
      }
      if (formData.businessLogo) {
        payload.append('businessLogo', formData.businessLogo);
      }

      const res = await enrollMembership(payload);

      const recordId = res?.data?.id || null;
      const tierName = selectedTierModal?.tierName || 'Starter Plan';
      const amount = Number(selectedTierModal?.numericPrice || MEMBERSHIP_PRICES.starter);
      const validityLabel = selectedTierModal?.validity || '1 Year';

      if (amount > 0) {
        await initiateRazorpayPayment({
          amount,
          module: 'community',
          recordId,
          title: 'Fempreneur Membership',
          description: `${tierName} (${validityLabel}) Membership`,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
        });
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setEnrollError(err.message || 'Failed to complete membership enrollment. Please try again.');
    }
  };

  return (
    <div>
      <PageHeader
        badge="Community Portal"
        badgeIcon={Sparkles}
        title="Fempreneur 365-Day"
        highlight="Membership Network"
        description="Connect with women leaders, scale your enterprise with growth masterclasses, and gain year-round access to capital and peer circles."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Membership' }]}
        ctaText="Explore Tiers"
        ctaTo="#tiers"
        ctaIcon={null}
        onCtaClick={(e) => {
          if (e && e.preventDefault) e.preventDefault();
          const el = document.getElementById('tiers');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryCtaText="Member Login"
        secondaryCtaTo="/login"
        image="/images/membership/membership-hero-portal.png"
        imageAlt="Fempreneur 365-Day Membership Network Portal"
        imageFramed={false}
        imageFilter="none"
        imageMaxWidth="680px"
      />

      {/* Section 1: Three Membership Tiers */}
      <section id="tiers" className="section-spacing" style={{ background: '#FFFFFF', scrollMarginTop: '80px' }}>
        <div className="container">
          <SectionTitle
            badge="Membership Tiers"
            badgeVariant="gold"
            title="Choose Your Level of"
            highlight="Community Engagement"
            subtitle="Tailored tiers supporting aspiring entrepreneurs, rising MSME leaders, and scale-up founders across India."
          />

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'stretch' }}>
            {tiers.map((tier, idx) => {
              const isActive = activeCardIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveCardIdx(idx)}
                  onClick={() => setActiveCardIdx(idx)}
                  style={{
                    position: 'relative',
                    background: '#FFFFFF',
                    border: `${isActive ? '2px' : '1.5px'} solid ${isActive ? tier.borderColor : '#E9D5FF'}`,
                    borderRadius: '18px',
                    boxShadow: isActive
                      ? '0 22px 44px rgba(106, 27, 154, 0.16), 0 0 0 4px rgba(162, 28, 175, 0.08)'
                      : '0 6px 20px rgba(106, 27, 154, 0.06)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: isActive ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
                    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Top-Left Ribbon Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      alignSelf: 'flex-start',
                      background: tier.badgeBg,
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      padding: '6px 14px',
                      borderBottomRightRadius: '14px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Star size={12} fill="#FFFFFF" color="#FFFFFF" />
                    <span>{tier.badgeLabel}</span>
                  </div>

                  {/* Plan Title + Subtitle + Price */}
                  <div style={{ padding: '1.1rem 1.4rem 0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#1C1224' }}>
                          {tier.tierName}
                        </h3>
                        <p style={{ margin: '2px 0 0', fontSize: '0.84rem', fontWeight: 600, color: '#7E22CE' }}>
                          {tier.subtitle}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1C1224', letterSpacing: '-0.02em', lineHeight: 1 }}>
                          {tier.price}
                        </div>
                        <span
                          style={{
                            display: 'inline-block',
                            marginTop: '4px',
                            background: '#F3F4F6',
                            color: '#6B7280',
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {tier.periodPill}
                        </span>
                      </div>
                    </div>

                    {/* Full-width Pill Subscribe CTA */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEnrollment(tier);
                      }}
                      style={{
                        width: '100%',
                        marginTop: '1.1rem',
                        background: isActive
                          ? 'linear-gradient(135deg, #A21CAF 0%, #6A1B9A 100%)'
                          : 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '999px',
                        padding: '0.72rem 1.35rem',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 6px 18px rgba(162, 28, 175, 0.25)',
                        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 10px 22px rgba(162, 28, 175, 0.34)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(162, 28, 175, 0.25)';
                      }}
                    >
                      {tier.ctaText}
                    </button>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: '#F3E8FF', margin: '0 1.4rem' }} />

                  {/* Validity & Subscription Type Footer */}
                  <div style={{ padding: '0.85rem 1.4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center', background: '#FAF5FF' }}>
                    <div>
                      <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                        VALIDITY
                      </div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1C1224' }}>
                        {tier.validity}
                      </div>
                    </div>
                    <div style={{ borderLeft: '1px solid #E9D5FF', paddingLeft: '1rem' }}>
                      <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                        SUBSCRIPTION TYPE
                      </div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1C1224' }}>
                        {tier.tierName}
                      </div>
                    </div>
                  </div>

                  {/* Feature List (Shopify-style itemized perks) */}
                  <div style={{ padding: '1rem 1.4rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
                    {tier.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.55rem',
                          fontSize: '0.86rem',
                          color: '#374151',
                          lineHeight: 1.45,
                        }}
                      >
                        <Check size={16} color="#7E22CE" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Enrollment Modal UI */}
      {selectedTierModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 10, 25, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem',
          }}
          onClick={() => setSelectedTierModal(null)}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FAF5FF 45%, #FDF2F8 100%)',
              borderRadius: '24px',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.25rem',
              boxShadow: '0 25px 50px -12px rgba(88, 28, 135, 0.25), 0 0 0 1px rgba(168, 85, 247, 0.15)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedTierModal(null)}
              style={{
                position: 'absolute',
                right: '1.25rem',
                top: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
              }}
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmitEnrollment}>
                <span className="badge badge-plum" style={{ marginBottom: '0.5rem' }}>
                  Membership Enrollment
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.25rem' }}>
                  Join as {selectedTierModal.tierName}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {selectedTierModal.price} {selectedTierModal.billingPeriod || ''} • Connect with 500+ women entrepreneurs.
                </p>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="founder@company.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your company / venture name"
                      className="form-input"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Founder & CEO"
                      className="form-input"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">City Hub</label>
                  <select
                    className="form-select"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="">Select City Hub</option>
                    <option value="Ahmedabad">Ahmedabad Hub</option>
                    <option value="Delhi NCR">Delhi NCR Hub</option>
                    <option value="Other">Other City / Pan-India</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-input"
                      style={{ padding: '0.45rem 0.65rem', fontSize: '0.8rem' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData({ ...formData, userPhoto: file });
                        setUserPhotoPreview(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    {userPhotoPreview && (
                      <img
                        src={userPhotoPreview}
                        alt="User preview"
                        style={{
                          marginTop: '0.5rem',
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #C026D3',
                        }}
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-input"
                      style={{ padding: '0.45rem 0.65rem', fontSize: '0.8rem' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData({ ...formData, businessLogo: file });
                        setBusinessLogoPreview(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    {businessLogoPreview && (
                      <img
                        src={businessLogoPreview}
                        alt="Business logo preview"
                        style={{
                          marginTop: '0.5rem',
                          width: '54px',
                          height: '54px',
                          borderRadius: '10px',
                          objectFit: 'contain',
                          background: '#FFFFFF',
                          border: '1px solid #E9D5FF',
                          padding: '3px',
                        }}
                      />
                    )}
                  </div>
                </div>

                {enrollError && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--color-coral-soft)',
                      border: '1px solid rgba(224, 93, 93, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {enrollError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={submitting}
                >
                  {submitting ? 'Registering Membership...' : 'Complete Membership Registration'}
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(37, 211, 102, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <CheckCircle2 size={30} color="#25D366" />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Membership Enrolled Successfully!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your membership enrollment for <strong>{selectedTierModal.tierName}</strong> has been registered with the Fempreneur secretariat. Check your email for membership verification and onboarding details.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedTierModal(null)}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
