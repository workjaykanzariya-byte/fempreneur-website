import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ShoppingBag, Sparkles, Send, ArrowRight } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
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
  const [featureData, setFeatureData] = useState({ founder: '', venture: '', email: '', highlight: '' });

  const pricePerBook = 2999;

  return (
    <div>
      <PageHeader
        badge="Annual Hardbound Volume"
        title="Fempreneur Coffee Table Book —"
        highlight="Top 50 Women Entrepreneurs"
        description="A collector's volume celebrating 50 visionary female founders. Distributed to corporate leaders, institutional libraries, Chambers of Commerce, and 5,00,000+ digital readers."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Coffee Table Book' }]}
        ctaText="Pre-Order Book Copy"
        ctaTo="#order"
        secondaryCtaText="Apply to Be Featured"
        secondaryCtaTo="#apply-feature"
      />

      {/* Section 1: Book Specifications */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-12 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* Visual Book Cover Presentation */}
            <div
              className="fem-card"
              style={{
                background: 'linear-gradient(135deg, #2E0848 0%, #6A1B9A 60%, #C59A3F 100%)',
                color: '#FFFFFF',
                padding: '4rem 3rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xl)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div style={{ border: '2px solid rgba(222, 180, 89, 0.45)', borderRadius: 'var(--radius-lg)', padding: '2.5rem 1.5rem' }}>
                <span className="badge badge-gold" style={{ marginBottom: '1.25rem' }}>
                  2027 Edition • Hardbound
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontStyle: 'italic', marginBottom: '1rem', color: '#FFFFFF' }}>
                  "Women Entrepreneurs Redefining Success"
                </h2>
                <div style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold-light)', fontWeight: 700 }}>
                  Top 50 Women Entrepreneurs
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '1.5rem' }}>
                  Published by 1MEIF &amp; VyapaarJagat.com
                </div>
              </div>
            </div>

            {/* Specifications Details */}
            <div>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>
                Verified Specifications
              </span>
              <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1rem' }}>
                A Tangible Honor for <span className="text-gradient">Generations</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                The Fempreneur Coffee Table Book elevates female achievement from ephemeral social media posts into a lasting physical archive presented to industry titans and government ministers.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}><strong>5,000+ Print Copies:</strong> Hand-delivered to industry leaders and corporate boards.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}><strong>5,00,000+ Digital Reach:</strong> Downloadable e-edition shared with global founders.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}><strong>Curated Top 50:</strong> Evaluated based on innovation, resilience, and commercial growth.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}><strong>Unveiled Live on Stage:</strong> Formal book launch at both Ahmedabad and Delhi NCR hubs.</span>
                </div>
              </div>

              <CTAButton to="#order" variant="primary" size="lg" icon={ShoppingBag}>
                Pre-Order Hardbound Copy (₹2,999)
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pre-Order E-Commerce Form */}
      <section id="order" className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-narrow">
          <div className="fem-card fem-card-gold" style={{ padding: '3rem 2.5rem' }}>
            <SectionTitle
              badge="Pre-Order Hardbound Copy"
              badgeVariant="gold"
              title="Reserve Your"
              highlight="Collector's Edition"
              subtitle="Pre-order copies for your office library, executive reception, or personal collection."
            />

            {orderSubmitted ? (
              <div style={{ padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle2 size={44} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.75rem' }} />
                <h3 style={{ color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>Pre-Order Reserved!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Your pre-order for {quantity} hardbound cop{quantity > 1 ? 'ies' : 'y'} (Total: ₹{(quantity * pricePerBook).toLocaleString()}) has been recorded. Dispatch notifications will follow.
                </p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setOrderLoading(true);
                setOrderError(null);
                try {
                  await orderCoffeeTableBook({
                    customerName: orderData.name.trim(),
                    email: orderData.email.trim(),
                    phone: orderData.phone.trim(),
                    quantity: quantity,
                    deliveryAddress: orderData.address.trim(),
                  });
                  setOrderLoading(false);
                  setOrderSubmitted(true);
                } catch (err) {
                  setOrderLoading(false);
                  setOrderError(err.message || 'Failed to submit pre-order. Please verify your details and try again.');
                }
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="custName">Recipient Full Name *</label>
                    <input
                      id="custName"
                      type="text"
                      required
                      value={orderData.name}
                      onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Shalini Verma"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="custEmail">Email Address *</label>
                    <input
                      id="custEmail"
                      type="email"
                      required
                      value={orderData.email}
                      onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                      className="form-input"
                      placeholder="shalini@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="custPhone">Phone Number *</label>
                    <input
                      id="custPhone"
                      type="tel"
                      required
                      value={orderData.phone}
                      onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                      className="form-input"
                      placeholder="+91-XXXXX-XXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="quantity">Quantity (₹2,999 each)</label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="form-select"
                    >
                      <option value={1}>1 Hardbound Copy (₹2,999)</option>
                      <option value={2}>2 Copies (₹5,998)</option>
                      <option value={5}>5 Copies (Corporate Pack - ₹14,995)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Delivery Street Address *</label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    value={orderData.address}
                    onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                    className="form-textarea"
                    placeholder="Complete postal address for courier delivery..."
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Total Investment:</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-burgundy)' }}>
                    ₹{(quantity * pricePerBook).toLocaleString()}
                  </span>
                </div>

                {orderError && (
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
                    {orderError}
                  </div>
                )}

                <CTAButton type="submit" variant="primary" size="lg" block disabled={orderLoading}>
                  {orderLoading ? 'Reserving Pre-Order...' : 'Complete Pre-Order Reservation'}
                </CTAButton>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Apply to Be Featured (Pathway 04) */}
      <section id="apply-feature" className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container-narrow">
          <div className="fem-card" style={{ padding: '3rem 2.5rem' }}>
            <span className="badge badge-plum" style={{ marginBottom: '0.75rem' }}>
              Pathway 04: Feature Opportunity
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
              Apply for Inclusion in the "Top 50 Women Entrepreneurs"
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Are you a founder with an inspiring track record of enterprise scaling? Submit your profile to our editorial curation committee for consideration.
            </p>

            {featureSubmitted ? (
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.5rem' }} />
                <h4>Editorial Application Logged</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Our editorial panel will review your profile against the Top 50 curation standards.
                </p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setFeatureLoading(true);
                setFeatureError(null);
                try {
                  await submitGeneralInquiry({
                    type: 'book_feature',
                    fullName: featureData.founder.trim(),
                    email: (featureData.email || `${featureData.founder.toLowerCase().replace(/\s+/g, '')}@example.com`).trim(),
                    organization: featureData.venture.trim(),
                    messageOrTopic: featureData.highlight.trim(),
                  });
                  setFeatureLoading(false);
                  setFeatureSubmitted(true);
                } catch (err) {
                  setFeatureLoading(false);
                  setFeatureError(err.message || 'Failed to submit feature application. Please try again.');
                }
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="appFounder">Founder Name *</label>
                    <input
                      id="appFounder"
                      type="text"
                      required
                      value={featureData.founder}
                      onChange={(e) => setFeatureData({ ...featureData, founder: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Nandita Sen"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="appVenture">Venture / Brand Name *</label>
                    <input
                      id="appVenture"
                      type="text"
                      required
                      value={featureData.venture}
                      onChange={(e) => setFeatureData({ ...featureData, venture: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Zen Organics"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="appHighlight">Why Should Your Story Be Featured? *</label>
                  <textarea
                    id="appHighlight"
                    required
                    rows={3}
                    value={featureData.highlight}
                    onChange={(e) => setFeatureData({ ...featureData, highlight: e.target.value })}
                    className="form-textarea"
                    placeholder="Highlight your market innovation, revenue milestone, or community job creation..."
                  />
                </div>

                {featureError && (
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
                    {featureError}
                  </div>
                )}

                <CTAButton type="submit" variant="secondary" size="md" block icon={Send} disabled={featureLoading}>
                  {featureLoading ? 'Submitting Application...' : 'Submit Feature Application'}
                </CTAButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
