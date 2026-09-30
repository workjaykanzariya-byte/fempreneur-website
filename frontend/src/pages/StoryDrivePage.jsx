import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Globe, Sparkles, Send, ExternalLink, Heart, ShieldCheck } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
import { submitFounderStory } from '../services/api';

export default function StoryDrivePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    founder: '',
    venture: '',
    email: '',
    phone: '',
    city: '',
    title: '',
    narrative: '',
  });

  return (
    <div>
      <PageHeader
        badge="Pathway 05: VyapaarJagat Storytelling"
        title="VyapaarJagat 1,000"
        highlight="Stories Drive"
        description="'An event lasts one day. A story lasts forever.' Submit your entrepreneurial journey to be archived, broadcast, and discovered by over 5,00,000 readers nationwide."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: '1,000 Stories Drive' }]}
        ctaText="Submit Your Story"
        ctaTo="#submit-story"
      />

      {/* Section 1: Three-Way Value Proposition */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Why Document Your Journey?"
            badgeVariant="gold"
            title="The Three-Fold Impact of"
            highlight="1,000 Stories"
            subtitle="How publishing verified female founder stories transforms individual ventures, corporate partners, and the nation."
          />

          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
            {/* For Entrepreneurs */}
            <div className="fem-card" style={{ padding: '2.25rem' }}>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>For Entrepreneurs</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                Permanent Digital Footprint
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Published on VyapaarJagat.com with strong Google SEO ranking. When potential clients, partners, or investors search your name, your verified story appears first.
              </p>
            </div>

            {/* For Sponsors & Partners */}
            <div className="fem-card fem-card-gold" style={{ padding: '2.25rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>For Corporate Sponsors</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                Grassroots Empowerment
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Directly aligns your brand with real female job creators across diverse Indian towns and cities, providing measurable CSR and ESG impact reporting.
              </p>
            </div>

            {/* For India */}
            <div className="fem-card" style={{ padding: '2.25rem' }}>
              <span className="badge badge-plum" style={{ marginBottom: '1rem' }}>For India @2047</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                Archiving Nari Shakti
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Creating a historical digital repository documenting how female enterprise is driving economic self-reliance, export competitiveness, and grassroots innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Story Submission Intake Portal */}
      <section id="submit-story" className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-narrow">
          <div className="fem-card" style={{ padding: '3rem 2.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Official Intake Portal
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
              Submit Your Story for Publication
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Every woman entrepreneur's journey matters. Fill in the intake details below for our editorial team to review and draft your feature.
            </p>

            {submitted ? (
              <div style={{ padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle2 size={44} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ fontSize: '1.25rem', color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>Story Intake Received!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Thank you, <strong>{formData.founder}</strong>! Your founder story submission has been saved to the VyapaarJagat 1,000 Stories repository. Our editorial desk will review your narrative and reach out at <strong>{formData.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
                try {
                  await submitFounderStory({
                    founderName: formData.founder.trim(),
                    ventureName: formData.venture.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim() || '+91 98765 43210',
                    storyTitle: formData.title.trim() || `Journey of ${formData.founder}`,
                    narrative: formData.narrative.trim(),
                    impactMilestone: `Operating in ${formData.city || 'India'}`,
                  });
                  setLoading(false);
                  setSubmitted(true);
                } catch (err) {
                  setLoading(false);
                  setError(err.message || 'Failed to submit founder story. Please try again.');
                }
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="storyFounder">Founder Name *</label>
                    <input
                      id="storyFounder"
                      type="text"
                      required
                      value={formData.founder}
                      onChange={(e) => setFormData({ ...formData, founder: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Shalini Agarwal"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="storyVenture">Venture / Company Name *</label>
                    <input
                      id="storyVenture"
                      type="text"
                      required
                      value={formData.venture}
                      onChange={(e) => setFormData({ ...formData, venture: e.target.value })}
                      className="form-input"
                      placeholder="e.g. EcoSutra Crafts"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="storyEmail">Email Address *</label>
                    <input
                      id="storyEmail"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                      placeholder="shalini@ecosutra.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="storyPhone">Phone / WhatsApp *</label>
                    <input
                      id="storyPhone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="storyCity">Operating City &amp; State *</label>
                    <input
                      id="storyCity"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Surat, Gujarat"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="storyTitle">Suggested Headline / Story Title *</label>
                  <input
                    id="storyTitle"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    placeholder="e.g. How Shalini Scaled EcoSutra into a Zero-Waste D2C Brand"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="storyNarrative">Your Journey &amp; Breakthrough Moments (500–1,000 words) *</label>
                  <textarea
                    id="storyNarrative"
                    required
                    rows={6}
                    value={formData.narrative}
                    onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                    className="form-textarea"
                    placeholder="Describe how you started, obstacles you overcame, key milestones, and your advice for other women founders..."
                  />
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
                  {loading ? 'Submitting Story...' : 'Submit Story to VyapaarJagat Editorial Desk'}
                </CTAButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
