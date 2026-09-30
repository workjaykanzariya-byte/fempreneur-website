import React, { useState } from 'react';
import { Users, CheckCircle2, Sparkles, Smartphone, TrendingUp, ArrowRight, ShieldCheck, X, Heart } from 'lucide-react';
import { PageHeader, SectionTitle, MembershipCard, CTAButton } from '../components';
import { enrollMembership } from '../services/api';

export default function MembershipPage() {
  const [selectedTierModal, setSelectedTierModal] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', company: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  const tiers = [
    {
      tierName: 'Community Member',
      price: 'Free',
      description: 'Access the national network of women founders, receive ecosystem newsletters, and join open virtual sessions.',
      benefits: [
        'Searchable directory profile access',
        'Monthly newsletter & award updates',
        'Access to open virtual knowledge webinars',
        'Invitations to local city chapter meetups',
      ],
      ctaText: 'Join for Free',
      isPopular: false,
    },
    {
      tierName: 'Pro Member',
      price: '₹5,00,000' === '₹5,000' ? '₹5,000' : '₹5,000',
      billingPeriod: '/year',
      description: 'Accelerate business visibility with priority directory listing, event discounts, and mastermind groups.',
      benefits: [
        'Priority verified directory profile with badge',
        'Exclusive masterclass recordings & toolkits',
        'Discounted delegate pass for 2027 events',
        'Access to peer networking & mastermind circles',
      ],
      ctaText: 'Become a Pro Member',
      isPopular: true,
    },
    {
      tierName: 'Elite Founder',
      price: '₹25,000',
      billingPeriod: '/year',
      description: 'For established founders seeking national recognition, VIP event access, and Coffee Table Book evaluation.',
      benefits: [
        'Evaluation for Coffee Table Book feature',
        '1 VIP Delegate Pass (Ahmedabad or Delhi NCR)',
        'Speaking & panel discussion consideration',
        'Direct investor & corporate connect sessions',
      ],
      ctaText: 'Apply for Elite Access',
      isPopular: false,
    },
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
      await enrollMembership({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        tier: selectedTierModal?.tierName || 'Community Member',
        businessName: formData.company ? formData.company.trim() : null,
        city: formData.city || 'Ahmedabad',
      });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setEnrollError(err.message || 'Failed to submit membership registration. Please try again.');
    }
  };

  return (
    <div>
      <PageHeader
        badge="Community Portal"
        title="Fempreneur 365-Day"
        highlight="Membership Network"
        description="Connect with women leaders, scale your enterprise with growth masterclasses, and gain year-round access to capital and peer circles."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Membership' }]}
        ctaText="Explore Tiers"
        ctaTo="#tiers"
        secondaryCtaText="Member Login"
        secondaryCtaTo="/login"
      />

      {/* Section 1: Three Membership Tiers */}
      <section id="tiers" className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Membership Tiers"
            badgeVariant="gold"
            title="Choose Your Level of"
            highlight="Community Engagement"
            subtitle="Tailored tiers supporting aspiring entrepreneurs, rising MSME leaders, and scale-up founders across India."
          />

          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '4rem' }}>
            {tiers.map((tier, idx) => (
              <MembershipCard
                key={idx}
                {...tier}
                onClick={() => handleOpenEnrollment(tier)}
              />
            ))}
          </div>

          {/* Planned Features: Investor Connect & Mobile App */}
          <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div className="fem-card" style={{ padding: '2rem', border: '1.5px dashed var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <TrendingUp size={22} color="var(--color-burgundy)" />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    Investor Connect Platform
                  </h4>
                </div>
                <span className="badge badge-planned">Planned Feature</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                A structured platform matching member startups with impact funds, angel syndicates, and venture debt providers specializing in gender-lens investing.
              </p>
            </div>

            <div className="fem-card" style={{ padding: '2rem', border: '1.5px dashed var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Smartphone size={22} color="var(--color-burgundy)" />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    Fempreneur Mobile App
                  </h4>
                </div>
                <span className="badge badge-gold">Coming Soon</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Member login, instant chapter notifications, directory search, and voting access from iOS and Android devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Enrollment Modal UI */}
      {selectedTierModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(58, 12, 39, 0.65)',
            backdropFilter: 'blur(5px)',
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
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '520px',
              width: '100%',
              padding: '2.25rem',
              boxShadow: 'var(--shadow-xl)',
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

                <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Enterprise Name</label>
                    <input
                      type="text"
                      placeholder="Your venture name"
                      className="form-input"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
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
