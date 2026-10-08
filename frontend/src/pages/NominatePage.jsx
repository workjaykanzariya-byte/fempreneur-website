import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Upload,
  FileText,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Building2,
  AlertCircle,
  Vote,
  Trophy,
  ChevronDown,
  Check,
  HelpCircle,
  Users
} from 'lucide-react';
import { PageHeader, CTAButton } from '../components';
import { submitNomination } from '../services/api';

export default function NominatePage() {
  const [searchParams] = useSearchParams();
  const preselectedCategory = searchParams.get('category') || 'Woman Entrepreneur of the Year';

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const allCategoriesList = [
    'Woman Entrepreneur of the Year',
    'Emerging Woman Entrepreneur',
    'Young Woman Entrepreneur',
    'Startup Founder',
    'Women-Led Business',
    'Innovation & Technology',
    'Healthcare & Wellness',
    'Education & Training',
    'Finance & Financial Services',
    'Manufacturing & Engineering',
    'Real Estate & Construction',
    'Architecture',
    'Interior & Exterior Design',
    'Retail Business',
    'E-Commerce Business',
    'Fashion & Lifestyle',
    'Beauty & Personal Care',
    'Food & Beverage',
    'Hospitality & Tourism',
    'Media & Entertainment',
    'Marketing & Advertising',
    'Digital & New-Age Business',
    'Consulting & Coaching',
    'Legal Services',
    'Human Resources',
    'Agriculture & Agri-Business',
    'Pharma & Life Sciences',
    'Art & Creative Business',
    'Events & Experiences',
    'Logistics & Supply Chain',
    'Social Impact Business',
    'Homegrown Brand',
    'Women-Led MSME',
    'Business Innovation',
    'Rural Woman Entrepreneur',
    'Young Achiever',
    'Best Influencer',
    'Lifetime Achievement',
    'Pride of India',
    'Sustainable & Eco-Conscious Brand',
  ];

  const criteria = [
    { title: 'Leadership & Vision', weight: '15%', desc: 'Strategic clarity, ethical organizational governance, resilience, and capacity to inspire and mobilize teams toward long-term business goals.' },
    { title: 'Innovation & Differentiation', weight: '15%', desc: 'Uniqueness of product, service, technology adoption, or innovative business model that disrupts market standards.' },
    { title: 'Productivity & Growth', weight: '15%', desc: 'Demonstrated revenue traction, operational profitability, employment generation, and sustainable fiscal health.' },
    { title: 'Scalability & Market Potential', weight: '15%', desc: 'Capability of the business model to expand geographically, address wider demographic segments, and replicate efficiently.' },
    { title: 'Social & Economic Impact', weight: '15%', desc: 'Measurable upliftment created for local communities, inclusive employment, female workforce empowerment, and fair trade practices.' },
    { title: 'Customer Reach & Trust', weight: '15%', desc: 'Market reception, customer retention metrics, service satisfaction, and authentic brand goodwill.' },
    { title: 'Resilience & Overcoming Barriers', weight: '10%', desc: 'Agility in navigating macroeconomic headwinds, supply disruptions, or sector-specific systemic challenges.' },
  ];

  const steps = [
    { num: '01', title: 'Submit Free Nomination', desc: 'Fill out the online application form with founder details, venture overview, pitch deck, and award category selection.' },
    { num: '02', title: 'Screening & Shortlisting', desc: 'The 1MEIF editorial committee verifies eligibility, operational track record, and compliance before approving nominees.' },
    { num: '03', title: 'Public Voting Period', desc: 'Each approved nominee receives a unique verified voting link to mobilize customers, peers, and social networks.' },
    { num: '04', title: 'Jury Review & Scoring', desc: 'Our eminent independent jury evaluates nominees across the 7 weighted criteria to assign the normalized jury score.' },
    { num: '05', title: 'Felicitation Ceremony', desc: 'Final composite scores determine winners, felicitated live on stage at Fempreneur 2027 in Ahmedabad & Delhi NCR.' },
  ];

  const benefits = [
    'National credibility and prestigious trophy presented on the grand stage',
    'Evaluation for inclusion in the Top 50 Women Entrepreneurs hardbound Coffee Table Book',
    'Dedicated founder feature published on VyapaarJagat.com with national SEO distribution',
    'Access to investors, venture debt funds, and corporate procurement executives',
    'VIP delegate access to keynote sessions and exhibition networking in both cities',
    'Permanent induction into the nationwide Fempreneur alumni directory',
  ];

  const faqs = [
    {
      q: 'Is there any entry fee or hidden charge to apply?',
      a: 'No. Nominating for Fempreneur Awards 2027 is 100% free of charge. We believe recognition for women entrepreneurs must be merit-based, transparent, and accessible.'
    },
    {
      q: 'Can I apply for more than one category?',
      a: 'Yes. You can select one Primary Category on the application form and indicate a Secondary Category. The screening committee will verify eligibility across both.'
    },
    {
      q: 'How does the 50% Jury + 50% Public Voting scoring work?',
      a: 'After initial shortlisting, your application is audited by our independent jury across 7 weighted parameters (50% weight). Concurrently, your verified voting link gathers public endorsements (50% weight). The composite score decides final winners.'
    },
    {
      q: 'What supporting documents are required?',
      a: 'Recommended documents include your business profile / pitch deck, GST or incorporation certificate, website link, founder bio, and any customer impact or media proof points.'
    },
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.founderName.trim()) newErrors.founderName = 'This field is required';
      if (!formData.email.trim()) {
        newErrors.email = 'This field is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) newErrors.phone = 'This field is required';
      if (!formData.city.trim()) newErrors.city = 'This field is required';
      if (!formData.state.trim()) newErrors.state = 'This field is required';
    } else if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'This field is required';
    } else if (step === 3) {
      if (!formData.primaryCategory) newErrors.primaryCategory = 'This field is required';
    } else if (step === 4) {
      if (!formData.executiveSummary.trim()) newErrors.executiveSummary = 'This field is required';
    } else if (step === 5) {
      if (!formData.agreement) newErrors.agreement = 'Please confirm the declaration to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;
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
      <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
        <PageHeader
          badge="Nomination Submitted"
          title="Application Received"
          highlight="Successfully"
          description="Your nomination for Fempreneur Awards 2027 has been registered. Our screening committee is reviewing your submission."
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Apply', path: '/nominate' }, { label: 'Success' }]}
        />

        <section style={{ padding: '4rem 1.5rem', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 12px 36px rgba(46, 8, 72, 0.06)',
              textAlign: 'center',
              padding: '3.5rem 2rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F6EEFA',
                color: '#6A1B9A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.75rem' }}>
              Application ID: FP27-NOM-8841
            </h2>

            <p style={{ fontSize: '1rem', color: '#5C4E65', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 2rem' }}>
              Thank you, <strong>{formData.founderName || 'Nominee'}</strong>. Your application for <strong>{formData.primaryCategory}</strong> has been logged. You will receive an official email confirmation with instructions for the public voting period.
            </p>

            <div
              style={{
                background: '#FAF6FC',
                border: '1px solid #EFE4F4',
                borderRadius: '16px',
                padding: '1.75rem',
                maxWidth: '540px',
                margin: '0 auto 2.5rem',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6A1B9A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                Next Milestone Steps:
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#5C4E65', listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#6A1B9A" />
                  <span>Eligibility verification by 1MEIF Screening Committee (2–3 business days)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#6A1B9A" />
                  <span>Generation of your verified personal shareable voting link</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#6A1B9A" />
                  <span>Jury evaluation scoring across the 7 weighted parameters</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/categories"
                style={{
                  padding: '0.85rem 1.8rem',
                  borderRadius: '10px',
                  background: '#6A1B9A',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                View 40 Categories
              </Link>
              <Link
                to="/"
                style={{
                  padding: '0.85rem 1.8rem',
                  borderRadius: '10px',
                  background: '#FAF6FC',
                  border: '1px solid #E6D5EC',
                  color: '#1C1224',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
      {/* SECTION 1: HERO HEADER */}
      <PageHeader
        badge="Nominate for 2027"
        title="Apply for Fempreneur"
        highlight="Awards 2027"
        description="Submit your enterprise for India's premier women-entrepreneurship honors. Nomination is 100% free with zero entry fees. Evaluated 50% by Jury and 50% by Public Voting."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Awards', path: '/awards' }, { label: 'How to Nominate' }]}
        ctaText="Start Application Below"
        ctaTo="#nomination-form"
        secondaryCtaText="Jury Evaluation Rubric"
        secondaryCtaTo="#jury"
        image="/images/nominate/nominate-awards-application.jpg"
        imageAlt="Apply for Fempreneur Awards 2027"
        imageBadge="100% Free Nomination"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* SECTION 2: STATS PROOF BAR (Greenpreneur 4-Col Bar) */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: '#6A1B9A' }}>
                40
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Award Categories
              </span>
            </div>

            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: '#4A126D' }}>
                100% Free
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Zero Application Fee
              </span>
            </div>

            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: '#6A1B9A' }}>
                50 / 50
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Jury &amp; Public Vote
              </span>
            </div>

            <div>
              <span style={{ display: 'block', fontFamily: 'serif, Georgia', fontSize: '2.5rem', fontWeight: 800, color: '#4A126D' }}>
                2 Cities
              </span>
              <span style={{ fontSize: '0.75rem', color: '#72627C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', display: 'block' }}>
                Ahmedabad &amp; Delhi NCR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 50/50 DUAL ENGINE METHODOLOGY */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
            Impartial Recognition Engine
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.35rem', fontWeight: 700, color: '#1C1224' }}>
            The 50/50 Dual Engine Methodology
          </h2>
          <p style={{ color: '#5C4E65', maxWidth: '640px', margin: '0.75rem auto 0', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Balancing rigorous qualitative judging by senior industry leaders with democratic, transparent public community appreciation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Card 1: 50% Jury Evaluation */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#F6EEFA',
                  color: '#6A1B9A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#1C1224' }}>
                  50% Jury Evaluation
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#6A1B9A', fontWeight: 700 }}>Independent Industry Panel</span>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#5C4E65', lineHeight: 1.6, marginBottom: '1.75rem', flexGrow: 1 }}>
              Conducted by a distinguished panel of corporate veterans, angel investors, entrepreneurs, and sector specialists. Each application is scored against 7 weighted parameters.
            </p>

            <div style={{ background: '#FAF6FC', padding: '1rem', borderRadius: '10px', border: '1px solid #EFE4F4', fontSize: '0.85rem', color: '#6A1B9A', fontWeight: 700 }}>
              Score: 0 to 100 based on verified business pitch &amp; audited performance.
            </div>
          </div>

          {/* Card 2: 50% Public Voting */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#F6EEFA',
                  color: '#6A1B9A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Vote size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#1C1224' }}>
                  50% Public Voting
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#6A1B9A', fontWeight: 700 }}>Democratic Community Endorsement</span>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#5C4E65', lineHeight: 1.6, marginBottom: '1.75rem', flexGrow: 1 }}>
              Empowers nominees to mobilize their customers, partners, and networks. Each approved nominee receives an official verified voting page with strict anti-bot and rate-limiting controls.
            </p>

            <div style={{ background: '#FAF6FC', padding: '1rem', borderRadius: '10px', border: '1px solid #EFE4F4', fontSize: '0.85rem', color: '#4C3C56', fontWeight: 700 }}>
              Integrity: 1 verified vote per voter session with OTP &amp; anti-fraud controls.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 5-STEP AWARD ROADMAP */}
      <section id="process" style={{ background: '#FFFFFF', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
              Nomination Journey
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.35rem', fontWeight: 700, color: '#1C1224' }}>
              5-Step Award &amp; Selection Process
            </h2>
            <p style={{ color: '#5C4E65', maxWidth: '640px', margin: '0.75rem auto 0', fontSize: '0.96rem', lineHeight: 1.6 }}>
              From initial free submission to national recognition on stage in Ahmedabad and Delhi NCR.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {steps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAF6FC',
                  padding: '2rem 1.5rem',
                  borderRadius: '16px',
                  border: '1px solid #EFE4F4',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontFamily: 'serif, Georgia', fontSize: '2rem', fontWeight: 800, color: '#6A1B9A', display: 'block', marginBottom: '0.75rem' }}>
                  {s.num}
                </span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.5rem' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#5C4E65', lineHeight: 1.55, margin: 0, flexGrow: 1 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: 7-FACTOR JURY EVALUATION RUBRIC (Matching #jury in Greenpreneur) */}
      <section id="jury" style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
            Scoring Criteria
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.35rem', fontWeight: 700, color: '#1C1224' }}>
            7 Weighted Factors of Jury Evaluation
          </h2>
          <p style={{ color: '#5C4E65', maxWidth: '640px', margin: '0.75rem auto 0', fontSize: '0.96rem', lineHeight: 1.6 }}>
            A transparent rubric ensuring equal consideration for startups, micro-enterprises, and established corporations alike.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {criteria.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EFE4F4',
                boxShadow: '0 4px 18px rgba(46, 8, 72, 0.03)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6A1B9A', letterSpacing: '0.06em' }}>
                  FACTOR 0{idx + 1}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    background: '#FAF5FC',
                    color: '#6A1B9A',
                    fontWeight: 800,
                  }}
                >
                  Weight: {item.weight}
                </span>
              </div>
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.65rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#5C4E65', lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Nominee Benefits Strip */}
        <div
          id="benefits"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EFE4F4',
            padding: '3rem 2.5rem',
            boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
              Why Nominate
            </span>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#1C1224' }}>
              What Every Finalist &amp; Winner Receives
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {benefits.map((b, bIdx) => (
              <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <CheckCircle2 size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE NOMINATION APPLICATION FORM WIZARD */}
      <section id="nomination-form" style={{ background: '#FFFFFF', borderTop: '1px solid #EFE4F4', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Zero Fee Guarantee Banner */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              background: '#FAF6FC',
              border: '1px solid #EFE4F4',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={26} color="#6A1B9A" />
              <div>
                <div style={{ fontWeight: 800, color: '#1C1224', fontSize: '0.95rem' }}>
                  100% Free Nomination Policy
                </div>
                <div style={{ fontSize: '0.82rem', color: '#5C4E65' }}>
                  There is zero entry fee to apply, receive evaluation, or get felicitated.
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                background: '#6A1B9A',
                color: '#FFFFFF',
                fontWeight: 800,
              }}
            >
              Verified Merit
            </span>
          </div>

          {/* Wizard Step Indicator */}
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
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: currentStep >= s.step ? '#6A1B9A' : '#FFFFFF',
                    border: '2px solid',
                    borderColor: currentStep >= s.step ? '#6A1B9A' : '#E6D5EC',
                    color: currentStep >= s.step ? '#FFFFFF' : '#72627C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.step}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: currentStep >= s.step ? '#1C1224' : '#72627C' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Box */}
          <div
            style={{
              background: '#FAF6FC',
              borderRadius: '24px',
              border: '1px solid #EFE4F4',
              padding: '2.5rem',
              boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
            }}
          >
            {submitError && (
              <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Founder Information */}
              {currentStep === 1 && (
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Step 1: Founder Profile &amp; Contact Details
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', marginBottom: '1.75rem' }}>
                    Please enter the primary woman entrepreneur or founder contact details.
                  </p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Full Name of Nominee *
                    </label>
                    <input
                      name="founderName"
                      type="text"
                      required
                      value={formData.founderName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="e.g. Priyanshi Shah"
                    />
                    {errors.founderName && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.founderName}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                        placeholder="priyanshi@company.com"
                      />
                      {errors.email && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                        placeholder="+91-XXXXX-XXXXX"
                      />
                      {errors.phone && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.phone}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                        City *
                      </label>
                      <input
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                        placeholder="e.g. Ahmedabad"
                      />
                      {errors.city && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.city}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                        State *
                      </label>
                      <input
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                        placeholder="e.g. Gujarat"
                      />
                      {errors.state && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.state}</span>}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '10px',
                      background: '#6A1B9A',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>Proceed to Venture Profile</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* STEP 2: Venture Profile */}
              {currentStep === 2 && (
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Step 2: Business &amp; Venture Details
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', marginBottom: '1.75rem' }}>
                    Tell us about the commercial enterprise you own or lead.
                  </p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Registered Company / Venture Name *
                    </label>
                    <input
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="e.g. Femina Healthtech Pvt Ltd"
                    />
                    {errors.companyName && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.companyName}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                        Year Established
                      </label>
                      <input
                        name="yearFounded"
                        type="text"
                        value={formData.yearFounded}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                        placeholder="e.g. 2021"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                        Website or Social Profile URL
                      </label>
                      <input
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                        placeholder="https://yourbrand.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      style={{ padding: '0.9rem 1.5rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E6D5EC', color: '#1C1224', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      style={{ flexGrow: 1, padding: '0.9rem', borderRadius: '10px', background: '#6A1B9A', color: '#FFFFFF', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                    >
                      Proceed to Category Selection
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Category Selection */}
              {currentStep === 3 && (
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Step 3: Choose Your Award Category
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', marginBottom: '1.75rem' }}>
                    Select the award category that best represents your milestone achievements.
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Primary Award Category *
                    </label>
                    <select
                      name="primaryCategory"
                      value={formData.primaryCategory}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                    >
                      {allCategoriesList.map((cat, cIdx) => (
                        <option key={cIdx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Preferred Felicitation Hub
                    </label>
                    <select
                      name="hubPreference"
                      value={formData.hubPreference}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                    >
                      <option value="Ahmedabad Hub">Ahmedabad Hub (AMA Complex)</option>
                      <option value="Delhi NCR Hub">Delhi NCR Hub</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      style={{ padding: '0.9rem 1.5rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E6D5EC', color: '#1C1224', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      style={{ flexGrow: 1, padding: '0.9rem', borderRadius: '10px', background: '#6A1B9A', color: '#FFFFFF', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                    >
                      Proceed to Pitch &amp; Impact
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Pitch & Impact */}
              {currentStep === 4 && (
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Step 4: Executive Pitch &amp; Impact Story
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', marginBottom: '1.75rem' }}>
                    Provide key highlights to help the jury evaluate your submission.
                  </p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Executive Summary / Venture Overview *
                    </label>
                    <textarea
                      name="executiveSummary"
                      required
                      rows="3"
                      value={formData.executiveSummary}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="Briefly describe your venture, core products or services, and market solution."
                    />
                    {errors.executiveSummary && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.2rem', display: 'block' }}>{errors.executiveSummary}</span>}
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Innovation &amp; Key Differentiator
                    </label>
                    <textarea
                      name="innovationDifferentiator"
                      rows="2"
                      value={formData.innovationDifferentiator}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1.5px solid #E6D5EC', background: '#FFFFFF', fontSize: '0.92rem', outline: 'none' }}
                      placeholder="What makes your product, technology, or approach unique in the market?"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      style={{ padding: '0.9rem 1.5rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E6D5EC', color: '#1C1224', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      style={{ flexGrow: 1, padding: '0.9rem', borderRadius: '10px', background: '#6A1B9A', color: '#FFFFFF', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                    >
                      Review &amp; Finalize Submission
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Submit */}
              {currentStep === 5 && (
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Step 5: Review Application Summary
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', marginBottom: '1.75rem' }}>
                    Please verify your submission details before submitting to the jury.
                  </p>

                  <div style={{ background: '#FFFFFF', border: '1px solid #EFE4F4', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.75rem', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div><strong>Nominee Name:</strong> {formData.founderName}</div>
                    <div><strong>Email &amp; Phone:</strong> {formData.email} • {formData.phone}</div>
                    <div><strong>Venture:</strong> {formData.companyName} ({formData.city}, {formData.state})</div>
                    <div><strong>Selected Category:</strong> <span style={{ color: '#6A1B9A', fontWeight: 800 }}>{formData.primaryCategory}</span></div>
                    <div><strong>Felicitation Hub:</strong> {formData.hubPreference}</div>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem', color: '#1C1224' }}>
                      <input
                        name="agreement"
                        type="checkbox"
                        required
                        checked={formData.agreement}
                        onChange={handleChange}
                        style={{ marginTop: '3px', accentColor: '#6A1B9A' }}
                      />
                      <span>I hereby declare that all submitted information is accurate and authentic to the best of my knowledge. I understand that nomination is 100% free with zero fees.</span>
                    </label>
                    {errors.agreement && <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>{errors.agreement}</span>}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      style={{ padding: '0.9rem 1.5rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E6D5EC', color: '#1C1224', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        flexGrow: 1,
                        padding: '0.9rem',
                        borderRadius: '10px',
                        background: '#6A1B9A',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Trophy size={18} />
                      <span>{isSubmitting ? 'Submitting Application...' : 'Submit Official Free Nomination'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 7: NOMINATION FAQ ACCORDION */}
      <section style={{ background: '#FAF6FC', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
              Frequently Asked Questions
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.2rem', fontWeight: 700, color: '#1C1224' }}>
              Awards &amp; Nomination Queries
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #EFE4F4',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#1C1224',
                      fontSize: '1rem',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="#6A1B9A"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem', color: '#5C4E65', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
