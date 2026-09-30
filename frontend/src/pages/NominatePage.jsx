import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Award, CheckCircle2, Upload, FileText, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Building2, AlertCircle } from 'lucide-react';
import { PageHeader, CTAButton } from '../components';
import { submitNomination } from '../services/api';

export default function NominatePage() {
  const [searchParams] = useSearchParams();
  const preselectedCategory = searchParams.get('category') || 'Woman Entrepreneur of the Year';

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    companyName: '',
    yearFounded: '2022',
    website: '',
    sector: 'Technology & Digital',
    hubPreference: 'Ahmedabad Hub',
    primaryCategory: preselectedCategory,
    secondaryCategory: '',
    executiveSummary: '',
    innovationDifferentiator: '',
    tractionImpact: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const pitchText = (
        formData.executiveSummary
          ? `${formData.executiveSummary}\n\nInnovation: ${formData.innovationDifferentiator}`
          : (formData.innovationDifferentiator || formData.tractionImpact || `Nomination for ${formData.primaryCategory} by ${formData.founderName}`)
      ).trim();

      await submitNomination({
        founderName: formData.founderName.trim(),
        ventureName: (formData.companyName || `${formData.founderName} Ventures`).trim(),
        designation: 'Founder / Co-Founder',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        state: formData.state.trim() || 'Gujarat',
        categoryCode: formData.primaryCategory.includes('CAT-') ? formData.primaryCategory.split(' ')[0] : 'CAT-01',
        categoryName: formData.primaryCategory,
        pitch: pitchText,
        operationalYears: formData.yearFounded || '2022',
        impactSummary: formData.tractionImpact,
        websiteUrl: formData.website,
      });

      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Backend nomination error:', err);
      setIsSubmitting(false);
      setSubmitError(err.message || 'Failed to submit nomination. Please verify your details and try again.');
    }
  };

  if (submitted) {
    return (
      <div>
        <PageHeader
          badge="Nomination Submitted"
          title="Application Received"
          highlight="Successfully"
          description="Your nomination for Fempreneur Awards 2027 has been registered. Our screening committee is reviewing your submission."
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Apply', path: '/nominate' }, { label: 'Success' }]}
        />

        <section className="section-spacing" style={{ background: '#FFFFFF' }}>
          <div className="container-narrow">
            <div
              className="fem-card fem-card-gold"
              style={{
                textAlign: 'center',
                padding: '3.5rem 2rem',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-soft)',
                  color: 'var(--color-gold-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
                Application ID: FP27-NOM-8841
              </h2>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 2rem' }}>
                Thank you, <strong>{formData.founderName || 'Nominee'}</strong>. Your application for <strong>{formData.primaryCategory}</strong> has been logged. You will receive an official email confirmation with instructions for the public voting period.
              </p>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  maxWidth: '520px',
                  margin: '0 auto 2.5rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold-rich)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Next Milestone Steps:
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--color-burgundy)" />
                    <span>Eligibility verification by 1MEIF Screening Committee (2–3 business days)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--color-burgundy)" />
                    <span>Generation of your verified personal shareable voting link</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--color-burgundy)" />
                    <span>Jury evaluation scoring across the 7 weighted parameters</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <CTAButton to="/awards" variant="primary" size="md">
                  View Evaluation Rubric
                </CTAButton>
                <CTAButton to="/" variant="secondary" size="md">
                  Return to Homepage
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        badge="Nominate for 2027"
        title="Apply for Fempreneur"
        highlight="Awards 2027"
        description="Submit your enterprise for India's premier women-entrepreneurship honors. Nomination is 100% free with zero entry fees."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Awards', path: '/awards' }, { label: 'Nomination Form' }]}
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container-narrow">
          {/* Zero Fee Guarantee Ribbon */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: 'var(--color-gold-soft)',
              border: '1px solid var(--color-gold-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={24} color="var(--color-gold-rich)" />
              <div>
                <div style={{ fontWeight: 800, color: 'var(--color-plum-deep)', fontSize: '0.95rem' }}>
                  100% Free Nomination Policy
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  As stated in the official proposal, there is zero fee to apply or receive recognition.
                </div>
              </div>
            </div>
            <span className="badge badge-gold">Verified Transparency</span>
          </div>

          {/* Document 2 Section 2: Eligibility Criteria Checklist */}
          <div
            className="fem-card"
            style={{
              padding: '1.5rem 1.75rem',
              marginBottom: '2.5rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="badge badge-plum" style={{ fontSize: '0.72rem' }}>Eligibility Guidelines</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Participation Open Pan-India</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
              Who Can Apply for Fempreneur Awards 2027?
            </h4>
            <div className="grid grid-cols-2 gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Women entrepreneurs &amp; women-led businesses from across India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Operating across startups, MSMEs, technology, crafts, or professional services</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Venture must have an active operational commercial presence</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Demonstrates leadership, innovation, growth, scalability, or social impact</span>
              </div>
            </div>
          </div>

          {/* Form Wizard Step Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              position: 'relative',
            }}
          >
            {[
              { step: 1, label: 'Founder' },
              { step: 2, label: 'Venture' },
              { step: 3, label: 'Category' },
              { step: 4, label: 'Pitch & Impact' },
              { step: 5, label: 'Review' },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: currentStep >= s.step ? 'var(--color-burgundy)' : '#FFFFFF',
                    border: '2px solid',
                    borderColor: currentStep >= s.step ? 'var(--color-burgundy)' : 'var(--border-light)',
                    color: currentStep >= s.step ? '#FFFFFF' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {s.step}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: currentStep >= s.step ? 'var(--color-plum-deep)' : 'var(--text-light)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="fem-card" style={{ padding: '2.5rem' }}>
            {/* STEP 1: Founder Information */}
            {currentStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Step 1: Founder &amp; Leadership Profile
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Provide primary applicant contact and founder details.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="founderName">Full Name of Nominee *</label>
                  <input
                    id="founderName"
                    name="founderName"
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Priyanshi Shah"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="priyanshi@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+91-XXXXX-XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City of Operation *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. Ahmedabad, Delhi, Pune"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State *</label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. Gujarat, Delhi, Maharashtra"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Venture Profile */}
            {currentStep === 2 && (
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Step 2: Business &amp; Venture Profile
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Details about your enterprise, operating entity, and hub preference.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">Business / Organization Name *</label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Aarya BioHealth Innovations"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="yearFounded">Year Established</label>
                    <input
                      id="yearFounded"
                      name="yearFounded"
                      type="number"
                      value={formData.yearFounded}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="2021"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="website">Website / Portfolio Link</label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sector">Business Sector (150+ Categories)</label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Technology & Digital">Technology &amp; Digital Solutions</option>
                      <option value="Manufacturing & Industrial">Manufacturing &amp; Engineering</option>
                      <option value="Healthcare & Wellness">Healthcare &amp; Life Sciences</option>
                      <option value="Fashion & Lifestyle">Fashion, Textiles &amp; Lifestyle</option>
                      <option value="Food & Agri-Business">Food, FMCG &amp; Agribusiness</option>
                      <option value="Creative Arts & Design">Architecture, Design &amp; Creative</option>
                      <option value="Professional & Advisory">Consulting, Legal &amp; Corporate</option>
                      <option value="Social Impact">Social Impact &amp; Grassroots</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="hubPreference">Primary Event Hub Preference</label>
                    <select
                      id="hubPreference"
                      name="hubPreference"
                      value={formData.hubPreference}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Ahmedabad Hub">Ahmedabad Anchor Hub (Gujarat)</option>
                      <option value="Delhi NCR Hub">Delhi NCR National Hub</option>
                      <option value="Both Hubs">Participation in Both Hubs</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Category Selection */}
            {currentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Step 3: Award Category Selection
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Select your primary category. You may also specify an optional secondary category for evaluation.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="primaryCategory">Primary Award Category *</label>
                  <select
                    id="primaryCategory"
                    name="primaryCategory"
                    value={formData.primaryCategory}
                    onChange={handleChange}
                    className="form-select"
                    style={{ fontSize: '0.95rem', padding: '0.85rem 1rem' }}
                  >
                    <option value="Woman Entrepreneur of the Year">CAT-01: Woman Entrepreneur of the Year</option>
                    <option value="Emerging Woman Entrepreneur">CAT-02: Emerging Woman Entrepreneur</option>
                    <option value="Young Woman Entrepreneur">CAT-03: Young Woman Entrepreneur</option>
                    <option value="Startup Founder">CAT-04: Startup Founder</option>
                    <option value="Women-Led Business">CAT-05: Women-Led Business</option>
                    <option value="Innovation & Technology">CAT-06: Innovation &amp; Technology</option>
                    <option value="Healthcare & Wellness">CAT-07: Healthcare &amp; Wellness</option>
                    <option value="Education & Training">CAT-08: Education &amp; Training</option>
                    <option value="Finance & Financial Services">CAT-09: Finance &amp; Financial Services</option>
                    <option value="Manufacturing & Engineering">CAT-10: Manufacturing &amp; Engineering</option>
                    <option value="Real Estate & Construction">CAT-11: Real Estate &amp; Construction</option>
                    <option value="Architecture">CAT-12: Architecture</option>
                    <option value="Interior & Exterior Design">CAT-13: Interior &amp; Exterior Design</option>
                    <option value="Retail Business">CAT-14: Retail Business</option>
                    <option value="E-Commerce Business">CAT-15: E-Commerce Business</option>
                    <option value="Fashion & Lifestyle">CAT-16: Fashion &amp; Lifestyle</option>
                    <option value="Beauty & Personal Care">CAT-17: Beauty &amp; Personal Care</option>
                    <option value="Food & Beverage">CAT-18: Food &amp; Beverage</option>
                    <option value="Hospitality & Tourism">CAT-19: Hospitality &amp; Tourism</option>
                    <option value="Media & Entertainment">CAT-20: Media &amp; Entertainment</option>
                    <option value="Marketing & Advertising">CAT-21: Marketing &amp; Advertising</option>
                    <option value="Digital & New-Age Business">CAT-22: Digital &amp; New-Age Business</option>
                    <option value="Consulting & Coaching">CAT-23: Consulting &amp; Coaching</option>
                    <option value="Legal Services">CAT-24: Legal Services</option>
                    <option value="Human Resources">CAT-25: Human Resources</option>
                    <option value="Agriculture & Agri-Business">CAT-26: Agriculture &amp; Agri-Business</option>
                    <option value="Pharma & Life Sciences">CAT-27: Pharma &amp; Life Sciences</option>
                    <option value="Art & Creative Business">CAT-28: Art &amp; Creative Business</option>
                    <option value="Events & Experiences">CAT-29: Events &amp; Experiences</option>
                    <option value="Logistics & Supply Chain">CAT-30: Logistics &amp; Supply Chain</option>
                    <option value="Social Impact Business">CAT-31: Social Impact Business</option>
                    <option value="Homegrown Brand">CAT-32: Homegrown Brand</option>
                    <option value="Women-Led MSME">CAT-33: Women-Led MSME</option>
                    <option value="Business Innovation">CAT-34: Business Innovation</option>
                    <option value="Rural Woman Entrepreneur">CAT-35: Rural Woman Entrepreneur</option>
                    <option value="Young Achiever">CAT-36: Young Achiever</option>
                    <option value="Best Influencer">CAT-37: Best Influencer</option>
                    <option value="Lifetime Achievement">CAT-38: Lifetime Achievement (Honorary)</option>
                    <option value="Pride of India">CAT-39: Pride of India (Honorary)</option>
                    <option value="Sustainable & Eco-Conscious Brand">CAT-40: Sustainable &amp; Eco-Conscious Brand</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="secondaryCategory">Secondary Award Category (Optional)</label>
                  <input
                    id="secondaryCategory"
                    name="secondaryCategory"
                    type="text"
                    value={formData.secondaryCategory}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Innovation & Technology Leader"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Pitch & Impact Summary */}
            {currentStep === 4 && (
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Step 4: Business Pitch &amp; Impact
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Share the narrative that our jury will evaluate across the 7 weighted scoring criteria.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="executiveSummary">
                    Executive Summary / Mission Statement (Max 500 words) *
                  </label>
                  <textarea
                    id="executiveSummary"
                    name="executiveSummary"
                    required
                    rows={4}
                    value={formData.executiveSummary}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Briefly describe what your enterprise does, customer problem solved, and your journey..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="innovationDifferentiator">
                    Key Innovation &amp; Market Differentiation *
                  </label>
                  <textarea
                    id="innovationDifferentiator"
                    name="innovationDifferentiator"
                    rows={3}
                    value={formData.innovationDifferentiator}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="What makes your solution or product uniquely competitive in India?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tractionImpact">
                    Business Traction &amp; Measurable Impact *
                  </label>
                  <textarea
                    id="tractionImpact"
                    name="tractionImpact"
                    rows={3}
                    value={formData.tractionImpact}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Mention revenue trajectory, customers served, female employment generated, or community upliftment..."
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Review & Final Submission */}
            {currentStep === 5 && (
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Step 5: Review &amp; Affirmation
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Please review your submission summary before finalizing your application.
                </p>

                <div
                  style={{
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <div><strong>Nominee Name:</strong> {formData.founderName || 'Not specified'}</div>
                  <div><strong>Email:</strong> {formData.email || 'Not specified'}</div>
                  <div><strong>Venture Name:</strong> {formData.companyName || 'Not specified'}</div>
                  <div><strong>City / State:</strong> {formData.city}, {formData.state}</div>
                  <div><strong>Category Applied:</strong> <span style={{ color: 'var(--color-burgundy)', fontWeight: 700 }}>{formData.primaryCategory}</span></div>
                  <div><strong>Preferred Hub:</strong> {formData.hubPreference}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '2rem' }}>
                  <input
                    id="agreement"
                    name="agreement"
                    type="checkbox"
                    required
                    checked={formData.agreement}
                    onChange={handleChange}
                    style={{ marginTop: '3px' }}
                  />
                  <label htmlFor="agreement" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    I confirm that the details provided are accurate and agree to participate in the transparent 50% Jury Evaluation + 50% Public Voting evaluation process.
                  </label>
                </div>

                {submitError && (
                  <div
                    style={{
                      padding: '0.85rem 1.25rem',
                      background: 'var(--color-coral-soft)',
                      border: '1px solid rgba(224, 93, 93, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      color: '#DC2626',
                      fontSize: '0.88rem',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              {currentStep > 1 ? (
                <CTAButton type="button" onClick={prevStep} variant="secondary" size="md" icon={ArrowLeft} iconPosition="left" disabled={isSubmitting}>
                  Back
                </CTAButton>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <CTAButton type="button" onClick={nextStep} variant="primary" size="md" icon={ArrowRight}>
                  Proceed to Next Step
                </CTAButton>
              ) : (
                <CTAButton type="submit" variant="gold" size="lg" icon={Sparkles} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Nomination...' : 'Submit Official Nomination'}
                </CTAButton>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
