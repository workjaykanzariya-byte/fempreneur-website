import React, { useState } from 'react';
import { Handshake, Check, ShieldCheck, Download, Send, CheckCircle2 } from 'lucide-react';
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

  return (
    <div>
      <PageHeader
        badge="Corporate Partnerships 2027"
        title="Partner with India's"
        highlight="Women-Led Movement"
        description="Connect your organization with 500+ female business leaders, MSME owners, and innovators across Ahmedabad & Delhi NCR. Packages from ₹10,000 to ₹5,00,000."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Partners & Sponsors' }]}
        ctaText="Inquire for Sponsorship"
        ctaTo="#inquire"
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
            <div className="fem-card fem-card-gold" style={{ padding: '3rem 2.5rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Corporate Desk
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                Request Corporate Partnership Deck
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Submit your brand requirements to receive the full itemized deliverables matrix and custom stall layouts.
              </p>

              {submitted ? (
                <div style={{ padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.75rem' }} />
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
