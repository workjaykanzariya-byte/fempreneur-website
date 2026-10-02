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
        image="/images/chapters/city-chapters-network.png"
        imageAlt="Fempreneur City Chapters Network Map"
        imageFramed={false}
        imageFilter="none"
        imageMaxWidth="680px"
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
