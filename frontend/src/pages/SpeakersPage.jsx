import React, { useState } from 'react';
import { Users, Mic, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
import { submitGeneralInquiry } from '../services/api';

export default function SpeakersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [speakerData, setSpeakerData] = useState({
    name: '',
    email: '',
    topic: '',
  });

  const sampleSpeakers = [
    { name: '[Keynote Speaker: TBA]', role: 'Venture Capital Partner', topic: 'Gender-Lens Investing & Access to Growth Capital' },
    { name: '[Masterclass Lead: TBA]', role: 'Brand & Marketing Strategist', topic: 'Scaling D2C Consumer Brands Beyond Tier 1 Cities' },
    { name: '[Panelist: TBA]', role: 'MSME Manufacturing Founder', topic: 'Overcoming Supply Chain Disruption & Global Exports' },
    { name: '[Panelist: TBA]', role: 'Tech & AI Innovator', topic: 'Automating Operational Productivity in Small Business' },
  ];

  return (
    <div>
      <PageHeader
        badge="60+ Expert Speakers Track Record"
        title="Speakers, Keynotes &amp;"
        highlight="Masterclass Leaders"
        description="Learn directly from seasoned investors, successful women founders, and corporate policymakers during our 2027 sessions."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Speakers 2027' }]}
        ctaText="Apply to Speak"
        ctaTo="#apply-speak"
        secondaryCtaText="Event Schedule"
        secondaryCtaTo="/events"
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Expert Thought Leadership"
            badgeVariant="plum"
            title="2027 Keynote Roster &amp;"
            highlight="Session Topics"
            subtitle="The official 2027 speaker lineup is currently being confirmed by the 1MEIF Advisory Board. Check back for announcements."
          />

          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '4rem' }}>
            {sampleSpeakers.map((s, idx) => (
              <div key={idx} className="fem-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px dashed var(--border-light)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontWeight: 800 }}>
                  <Mic size={24} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.25rem' }}>
                  {s.name}
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-burgundy)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {s.role}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong>Topic:</strong> {s.topic}
                </p>
                <div style={{ marginTop: '1rem', fontSize: '0.72rem', color: 'var(--color-gold-rich)', fontWeight: 700 }}>
                  Announcement Coming Soon
                </div>
              </div>
            ))}
          </div>

          {/* Pathway 08: Speaker Application Form */}
          <div id="apply-speak" className="container-narrow">
            <div className="fem-card fem-card-gold" style={{ padding: '2.5rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Pathway 08: Share Your Expertise
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                Apply to Speak or Host a Masterclass
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Are you an established woman entrepreneur, venture investor, or subject matter specialist? Submit your proposed masterclass topic or panel interest.
              </p>

              {error && (
                <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              {submitted ? (
                <div style={{ padding: '1.5rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle2 size={36} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.5rem' }} />
                  <h4>Speaker Proposal Received</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Our programming committee will review your proposed topic and reach out.
                  </p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setLoading(true);
                  try {
                    await submitGeneralInquiry({
                      type: 'speaker',
                      fullName: speakerData.name,
                      email: speakerData.email,
                      messageOrTopic: speakerData.topic,
                    });
                    setSubmitted(true);
                  } catch (err) {
                    setError(err.message || 'Failed to submit speaker application. Please check network.');
                  } finally {
                    setLoading(false);
                  }
                }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="speakerName">Full Name *</label>
                      <input
                        id="speakerName"
                        type="text"
                        required
                        value={speakerData.name}
                        onChange={(e) => setSpeakerData({ ...speakerData, name: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Dr. Meera Nambiar"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="speakerEmail">Email Address *</label>
                      <input
                        id="speakerEmail"
                        type="email"
                        required
                        value={speakerData.email}
                        onChange={(e) => setSpeakerData({ ...speakerData, email: e.target.value })}
                        className="form-input"
                        placeholder="meera@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="speakerTopic">Proposed Topic or Masterclass Theme *</label>
                    <input
                      id="speakerTopic"
                      type="text"
                      required
                      value={speakerData.topic}
                      onChange={(e) => setSpeakerData({ ...speakerData, topic: e.target.value })}
                      className="form-input"
                      placeholder="e.g. How to Prepare a Female-Led Startup for Institutional Venture Capital"
                    />
                  </div>

                  <CTAButton type="submit" variant="primary" size="lg" block icon={Send} disabled={loading}>
                    {loading ? 'Submitting Application...' : 'Submit Speaker Application'}
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
