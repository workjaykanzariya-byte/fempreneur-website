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

  const speakersHeroCollage = (
    <div className="floating-collage-box">
      {/* Soft Purple Glow Aura */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '440px',
          height: '440px',
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
          d="M 80 120 Q 210 40 340 90 T 480 110"
          fill="none"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
        <path
          d="M 60 290 Q 180 250 280 280 T 480 320"
          fill="none"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
        <path
          d="M 450 160 Q 460 300 400 420"
          fill="none"
          stroke="rgba(142, 36, 170, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="4 5"
        />
      </svg>

      {/* 1. Keynote Floating Pill (Top-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          right: '8%',
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
        <Mic size={15} />
        <span>Keynote</span>
      </div>

      {/* 2. Main Centerpiece: Real Speaker with Mic at Fempreneur Event */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '430px',
          maxWidth: '85%',
          height: '370px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 22px 50px rgba(106, 27, 154, 0.28), 0 8px 18px rgba(0,0,0,0.08)',
          border: '4px solid #FFFFFF',
          zIndex: 5,
        }}
      >
        <img
          src="/images/speakers/speakers-keynote-real.png"
          alt="Fempreneur Keynote Speaker"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Floating badge on speaker image */}
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
          <span>Keynote &amp; Masterclasses</span>
        </div>
      </div>

      {/* 3. Masterclass Floating Pill (Mid-Left) */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '2%',
          background: '#FFFFFF',
          color: 'var(--color-plum-deep)',
          borderRadius: '999px',
          padding: '8px 18px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          fontSize: '0.85rem',
          fontWeight: 800,
          boxShadow: '0 8px 24px rgba(106, 27, 154, 0.16)',
          border: '1.5px solid rgba(106, 27, 154, 0.16)',
          zIndex: 8,
        }}
      >
        <Sparkles size={15} color="var(--color-burgundy)" />
        <span>Masterclass</span>
      </div>

      {/* 4. Inspire Floating Pill (Bottom-Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '4%',
          background: '#FFFFFF',
          color: 'var(--color-plum-deep)',
          borderRadius: '999px',
          padding: '8px 18px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          fontSize: '0.85rem',
          fontWeight: 800,
          boxShadow: '0 8px 24px rgba(106, 27, 154, 0.16)',
          border: '1.5px solid rgba(106, 27, 154, 0.16)',
          zIndex: 8,
        }}
      >
        <Users size={15} color="var(--color-burgundy)" />
        <span>Inspire</span>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        badge="60+ Expert Speakers Track Record"
        badgeIcon={Mic}
        title="Speakers, Keynotes &amp;"
        highlight="Masterclass Leaders"
        description="Learn directly from seasoned investors, successful women founders, and corporate policymakers during our 2027 sessions."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Speakers 2027' }]}
        ctaText="Apply to Speak"
        ctaTo="#apply-speak"
        secondaryCtaText="Event Schedule"
        secondaryCtaTo="/events"
        customVisual={speakersHeroCollage}
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
            <div
              className="fem-card"
              style={{
                padding: '2.5rem',
                background: 'linear-gradient(135deg, #FBF8FD 0%, #F5ECFA 50%, #FAF2FC 100%)',
                border: '1.5px solid rgba(106, 27, 154, 0.2)',
                boxShadow: '0 16px 40px rgba(106, 27, 154, 0.08), 0 4px 16px rgba(106, 27, 154, 0.04)',
                borderRadius: 'var(--radius-2xl)',
              }}
            >
              <span className="badge badge-plum" style={{ marginBottom: '0.75rem' }}>
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
