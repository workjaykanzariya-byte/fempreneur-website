import React, { useState } from 'react';
import { MapPin, Users, Building2, CheckCircle2, Sparkles, Send, ArrowRight } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
import { submitGeneralInquiry } from '../services/api';

export default function CityChaptersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    motivation: '',
  });

  const chapters = [
    { city: 'Ahmedabad Hub', state: 'Gujarat', status: 'Anchor Hub (Active)', lead: 'AMA Coordination Team', meetups: 'Monthly Roundtables' },
    { city: 'Delhi NCR Hub', state: 'National Capital', status: 'Active (2027 Expansion)', lead: 'Regional Executive Chapter', meetups: 'Bi-Monthly Mixers' },
    { city: 'Mumbai Chapter', state: 'Maharashtra', status: 'Upcoming Node', lead: 'Applications Open', meetups: 'Quarterly Forums' },
    { city: 'Bengaluru Chapter', state: 'Karnataka', status: 'Upcoming Node', lead: 'Applications Open', meetups: 'Founder Circles' },
    { city: 'Pune Chapter', state: 'Maharashtra', status: 'Upcoming Node', lead: 'Applications Open', meetups: 'MSME Roundtables' },
    { city: 'Jaipur Chapter', state: 'Rajasthan', status: 'Upcoming Node', lead: 'Applications Open', meetups: 'Artisan & D2C Hub' },
  ];

  const benefits = [
    'Official recognition as the Fempreneur Chapter Leader in your city',
    'Curated event toolkits, social media templates, and organizer collateral',
    'Direct interface with 1MEIF national leadership and VyapaarJagat editorial desk',
    'Opportunity to nominate outstanding local women founders for national awards',
    'Feature profile on the national Fempreneur website directory',
  ];

  const chaptersHeroCollage = (
    <div className="floating-collage-box">
      {/* Soft Purple Glow Aura */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142, 36, 170, 0.25) 0%, rgba(106, 27, 154, 0.08) 50%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Decorative Subtle Curved Dashed Lines (Matching Home Page) */}
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

      {/* 1. Ahmedabad Hub Floating Card (Top-Left) */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '2%',
          width: '135px',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '7px 7px 9px 7px',
          boxShadow: '0 12px 30px rgba(106, 27, 154, 0.16), 0 3px 8px rgba(0,0,0,0.06)',
          border: '1.5px solid rgba(106, 27, 154, 0.14)',
          zIndex: 7,
        }}
      >
        <img
          src="/images/hubs/ahmedabad-hub-roundtable.png"
          alt="Ahmedabad Hub Roundtable"
          style={{ width: '100%', height: '82px', borderRadius: '11px', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
        />
        <div style={{ padding: '6px 2px 1px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-plum-deep)', textAlign: 'left', lineHeight: 1.2 }}>
          Ahmedabad<br />Hub
        </div>
      </div>

      {/* 2. Chapters Floating Pill (Top-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '5%',
          background: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)',
          color: '#FFFFFF',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.82rem',
          fontWeight: 700,
          boxShadow: '0 8px 20px rgba(106, 27, 154, 0.32)',
          zIndex: 8,
        }}
      >
        <MapPin size={14} />
        <span>Chapters</span>
      </div>

      {/* 3. Main Centerpiece: Real City Chapters Community Meetup Photo */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          left: '14%',
          width: '390px',
          height: '255px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 48px rgba(106, 27, 154, 0.26), 0 8px 18px rgba(0,0,0,0.08)',
          border: '4px solid #FFFFFF',
          zIndex: 5,
        }}
      >
        <img
          src="/images/chapters/city-chapters-meetup.png"
          alt="Fempreneur City Chapters Meetup"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Floating badge on meetup image */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            background: 'rgba(30, 8, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '0.4rem 0.9rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Sparkles size={13} color="#E91E63" />
          <span>Community of Fempreneurs</span>
        </div>
      </div>

      {/* 4. Roundtables Floating Pill (Mid-Left) */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '4%',
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
        <span>Roundtables</span>
      </div>

      {/* 5. Connect Floating Pill (Mid-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          right: '1%',
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
        <Sparkles size={15} color="var(--color-burgundy)" />
        <span>Connect</span>
      </div>

      {/* 6. Delhi NCR Hub Floating Card (Bottom-Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '2%',
          left: '52%',
          width: '142px',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '7px 7px 9px 7px',
          boxShadow: '0 14px 32px rgba(106, 27, 154, 0.16), 0 4px 10px rgba(0,0,0,0.06)',
          border: '1.5px solid rgba(106, 27, 154, 0.14)',
          zIndex: 7,
        }}
      >
        <img
          src="/images/hubs/delhi-hub-banner.png"
          alt="Delhi NCR Hub Leaders"
          style={{ width: '100%', height: '82px', borderRadius: '11px', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
        />
        <div style={{ padding: '6px 2px 1px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-plum-deep)', textAlign: 'left', lineHeight: 1.2 }}>
          Delhi NCR<br />Hub
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        badge="Community Hubs"
        badgeIcon={MapPin}
        title="Fempreneur City"
        highlight="Chapters Movement"
        description="Local regional nodes connecting women founders between annual conventions through monthly roundtables, mentorship circles, and business collaborations."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'City Chapters' }]}
        ctaText="Apply to Lead Chapter"
        ctaTo="#lead-chapter"
        customVisual={chaptersHeroCollage}
      />

      {/* Section 1: What is a City Chapter? */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Local Leadership"
            badgeVariant="plum"
            title="Building 365-Day"
            highlight="Regional Ecosystems"
            subtitle="City Chapters ensure that female entrepreneurs receive continuous local peer support, business visibility, and growth mentorship."
          />

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '4rem' }}>
            {chapters.map((ch, idx) => (
              <div key={idx} className="fem-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-burgundy)', fontWeight: 800 }}>
                    <MapPin size={18} />
                    <span>{ch.city}</span>
                  </div>
                  <span className={`badge ${ch.status.includes('Active') ? 'badge-gold' : 'badge-gray'}`} style={{ fontSize: '0.68rem' }}>
                    {ch.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  State: <strong>{ch.state}</strong>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <div><strong>Leadership:</strong> {ch.lead}</div>
                  <div style={{ marginTop: '0.25rem' }}><strong>Format:</strong> {ch.meetups}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Chapter Leader Application */}
          <div id="lead-chapter" className="container-narrow">
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
                Chapter Leadership
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                Apply to Lead a City Chapter
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Do you have the passion to convene and empower women entrepreneurs in your city? Submit your leadership plan to establish an official Fempreneur chapter.
              </p>

              {error && (
                <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              {submitted ? (
                <div style={{ padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>Chapter Application Received</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Our national expansion team will review your application and schedule an interview.
                  </p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setLoading(true);
                  try {
                    await submitGeneralInquiry({
                      type: 'chapter',
                      fullName: leadData.name,
                      email: leadData.email,
                      phone: leadData.phone,
                      city: leadData.city,
                      subjectOrTier: `Chapter Leadership: ${leadData.city}`,
                      messageOrTopic: leadData.motivation,
                    });
                    setSubmitted(true);
                  } catch (err) {
                    setError(err.message || 'Failed to submit chapter application. Please check your network.');
                  } finally {
                    setLoading(false);
                  }
                }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="leadName">Your Full Name *</label>
                      <input
                        id="leadName"
                        type="text"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Meenal Joshi"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="leadEmail">Email Address *</label>
                      <input
                        id="leadEmail"
                        type="email"
                        required
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        className="form-input"
                        placeholder="meenal@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="leadCity">Target City for Chapter *</label>
                      <input
                        id="leadCity"
                        type="text"
                        required
                        value={leadData.city}
                        onChange={(e) => setLeadData({ ...leadData, city: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Mumbai, Pune, Jaipur"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="leadPhone">Phone / WhatsApp Number *</label>
                      <input
                        id="leadPhone"
                        type="tel"
                        required
                        value={leadData.phone}
                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                        className="form-input"
                        placeholder="+91-XXXXX-XXXXX"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="leadMotivation">Why do you want to lead this chapter? *</label>
                    <textarea
                      id="leadMotivation"
                      required
                      rows={3}
                      value={leadData.motivation}
                      onChange={(e) => setLeadData({ ...leadData, motivation: e.target.value })}
                      className="form-textarea"
                      placeholder="Describe your background and event plan for women founders in your region..."
                    />
                  </div>

                  <CTAButton type="submit" variant="primary" size="lg" block icon={Send} disabled={loading}>
                    {loading ? 'Submitting Application...' : 'Submit Chapter Leader Application'}
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
