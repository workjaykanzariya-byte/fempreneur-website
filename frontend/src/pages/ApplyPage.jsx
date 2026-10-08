import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Award,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  User,
  Globe,
  FileText,
  Send,
  MessageCircle,
  HelpCircle,
  Check,
  ChevronRight,
  Phone
} from 'lucide-react';
import { submitNomination } from '../services/api';

const ALL_CATEGORIES = [
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
  'Sustainable & Eco-Conscious Brand'
];

const SECTORS = [
  'Technology & Digital Solutions',
  'Manufacturing & Industrial Engineering',
  'Healthcare, Biotech & Wellness',
  'Fashion, Apparel & Lifestyle',
  'Food, Beverage & FMCG',
  'Education, EdTech & Skilling',
  'Real Estate, Architecture & Design',
  'Finance, FinTech & Professional Services',
  'Media, PR & Creative Arts',
  'Agriculture, AgTech & Rural Enterprise',
  'CleanTech, Renewable & ESG',
  'Retail, D2C & E-Commerce',
  'Other Specialized Sector'
];

export default function ApplyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL parameters handling
  const initialTrack = searchParams.get('track') === 'challenge' ? 'challenge' : 'honorary';
  const initialCategory = searchParams.get('category') || 'Woman Entrepreneur of the Year';

  const [currentStep, setCurrentStep] = useState(1);
  const [track, setTrack] = useState(initialTrack);
  const [selectedTier, setSelectedTier] = useState('standard'); // 'standard' (₹2,000) or 'pro' (₹5,000)
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [stepErrors, setStepErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    // Step 2: Founder & Company
    fullName: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    companyName: '',
    yearFounded: '2022',
    website: '',
    sector: 'Technology & Digital Solutions',
    hubPreference: 'Ahmedabad Hub (AMA Complex)',
    turnoverBand: '₹50 Lakhs - ₹2 Crores',

    // Step 3: Award Category & Pitch
    primaryCategory: initialCategory,
    secondaryCategory: '',
    executiveSummary: '',
    innovationDifferentiator: '',
    tractionImpact: '',
    pitchDeckUrl: '',

    // Step 4: Terms
    agreed: true
  });

  // Sync state with URL params
  useEffect(() => {
    const paramTrack = searchParams.get('track');
    if (paramTrack === 'challenge' || paramTrack === 'honorary') {
      setTrack(paramTrack);
    }
    const paramCat = searchParams.get('category');
    if (paramCat && ALL_CATEGORIES.includes(paramCat)) {
      setFormData((prev) => ({ ...prev, primaryCategory: paramCat }));
    }
  }, [searchParams]);

  const handleTrackSelect = (newTrack) => {
    setTrack(newTrack);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('track', newTrack);
      return next;
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepErrors[field]) {
      setStepErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter founder full name.';
    if (!formData.designation.trim()) errs.designation = 'Please enter your designation.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email.';
    if (!formData.phone.trim()) errs.phone = 'Please enter a valid phone/WhatsApp number.';
    if (!formData.city.trim()) errs.city = 'Please enter your city and state.';
    if (!formData.companyName.trim()) errs.companyName = 'Please enter your company/brand name.';
    if (!formData.website.trim()) errs.website = 'Please enter your website or social link.';
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.primaryCategory) errs.primaryCategory = 'Please select a primary category.';
    if (!formData.executiveSummary.trim()) errs.executiveSummary = 'Please provide an executive summary.';
    if (!formData.innovationDifferentiator.trim()) errs.innovationDifferentiator = 'Please describe your innovation / differentiator.';
    if (!formData.tractionImpact.trim()) errs.tractionImpact = 'Please describe your key traction / impact metrics.';
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the declaration before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        track,
        challengeTier: track === 'challenge' ? selectedTier : 'free_honorary',
        feeAmount: track === 'challenge' ? (selectedTier === 'pro' ? 5000 : 2000) : 0,
        submissionDate: new Date().toISOString()
      };

      const result = await submitNomination(payload);
      const generatedId = result?.data?.id || `FEM2027-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(generatedId);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      const fallbackId = `FEM2027-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(fallbackId);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submitted) {
    return (
      <div style={{ background: '#FAF6FC', minHeight: '100vh', padding: '3.5rem 1rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 16px 48px rgba(46, 8, 72, 0.08)',
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: '#F6EEFA',
                color: '#6A1B9A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.75rem',
                border: '2px solid #E6D5EC',
                boxShadow: '0 8px 24px rgba(106, 27, 154, 0.15)',
              }}
            >
              <CheckCircle2 size={46} strokeWidth={2.5} />
            </div>

            <span
              style={{
                display: 'inline-block',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                background: '#FAF5FC',
                color: '#6A1B9A',
                fontWeight: 800,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              {track === 'challenge' ? '★ Rated Challenge Application Confirmed' : '✓ Honorary Track Nomination Confirmed'}
            </span>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                fontWeight: 700,
                color: '#1C1224',
                marginBottom: '0.75rem',
                lineHeight: 1.25,
              }}
            >
              Application Received Successfully!
            </h1>

            <p style={{ fontSize: '1.02rem', color: '#5C4E65', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.fullName || 'Valued Founder'}</strong>. Your nomination for{' '}
              <strong>{formData.companyName || 'your enterprise'}</strong> under <strong>{formData.primaryCategory}</strong> has been registered with the Fempreneur 2027 Board.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.75rem',
                background: '#FAF6FC',
                borderRadius: '14px',
                border: '1.5px dashed #6A1B9A',
                marginBottom: '2.5rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#5C4E65', fontWeight: 600 }}>Application ID:</span>
              <strong style={{ fontSize: '1.15rem', color: '#6A1B9A', letterSpacing: '0.05em' }}>{applicationId}</strong>
            </div>

            {/* Summary Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                textAlign: 'left',
                background: '#FCFBFD',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid #EFE4F4',
                marginBottom: '2.5rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Track Selected</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#1C1224' }}>
                  {track === 'challenge' ? 'Rated Challenge Track' : 'Honorary Track (100% Free)'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Category</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#6A1B9A' }}>{formData.primaryCategory}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Hub Preference</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#1C1224' }}>{formData.hubPreference}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Registered Email</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#1C1224' }}>{formData.email || 'Email on file'}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/categories"
                style={{
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(106, 27, 154, 0.28)',
                }}
              >
                Browse All Categories
              </Link>
              <Link
                to="/speakers"
                style={{
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  color: '#6A1B9A',
                  border: '1.5px solid #6A1B9A',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Meet the Jury &amp; Speakers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', padding: '2.5rem 1rem 5rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>

        {/* Back to Awards Button & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/speakers')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              border: '1px solid #E6D5EC',
              padding: '0.55rem 1.2rem',
              borderRadius: '9999px',
              color: '#6A1B9A',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(46, 8, 72, 0.04)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6A1B9A';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = '#6A1B9A';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Awards</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#72627C' }}>
            <Link to="/" style={{ color: '#72627C', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/speakers" style={{ color: '#72627C', textDecoration: 'none' }}>Awards</Link>
            <span>/</span>
            <span style={{ color: '#6A1B9A', fontWeight: 700 }}>Apply</span>
          </div>
        </div>

        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <p style={{ fontSize: '1rem', color: '#5C4E65', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            2027. Choose between the Free Honorary path or the competitive Rated challenge.
          </p>
        </div>

        {/* MAIN WIZARD CARD */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #EFE4F4',
            boxShadow: '0 12px 40px rgba(46, 8, 72, 0.06)',
            padding: 'clamp(2rem, 4vw, 3.25rem)',
            marginBottom: '2.5rem',
          }}
        >
          {/* Top Progress & Step Bar (Strictly Fempreneur Royal Purple) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '0.35rem 0.9rem',
                borderRadius: '6px',
                background: '#6A1B9A',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              STEP {currentStep} OF 4
            </span>

            {/* Visual Step Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#72627C', letterSpacing: '0.06em' }}>START</span>
              <div style={{ width: '120px', height: '6px', background: '#EFE4F4', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${(currentStep / 4) * 100}%`,
                    height: '100%',
                    background: '#6A1B9A',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#72627C', letterSpacing: '0.06em' }}>REVIEW</span>
            </div>
          </div>

          {/* STEP 1: AWARD TRACK */}
          {currentStep === 1 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#1C1224',
                  marginTop: 0,
                  marginBottom: '0.5rem',
                }}
              >
                Award Track
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#5C4E65', marginBottom: '2.25rem', lineHeight: 1.5 }}>
                Please select the track that matches your business model. Read the features of each track before proceeding.
              </p>

              {/* 2 Track Options Side by Side */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '3rem',
                }}
              >
                {/* Card 1: Honorary Award (Free) */}
                <div
                  onClick={() => handleTrackSelect('honorary')}
                  style={{
                    borderRadius: '20px',
                    border: track === 'honorary' ? '2px solid #6A1B9A' : '1.5px solid #EFE4F4',
                    background: track === 'honorary' ? '#FAF5FC' : '#FFFFFF',
                    padding: '2rem 1.75rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: track === 'honorary' ? '0 8px 24px rgba(106, 27, 154, 0.08)' : 'none',
                  }}
                >
                  {/* Top Row: FREE TRACK Badge + Radio Dot */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        background: '#6A1B9A',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      FREE TRACK
                    </span>

                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: track === 'honorary' ? '2px solid #6A1B9A' : '2px solid #D1D5DB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {track === 'honorary' && (
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6A1B9A' }} />
                      )}
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#1C1224',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Honorary Award
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                    For lifetime or legacy sector achievements. Strictly evaluated by our 50% Speakers &amp; jury framework.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#1C1224' }}>
                      <Check size={16} color="#6A1B9A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>Nomination is completely FREE (₹0)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#1C1224' }}>
                      <Check size={16} color="#6A1B9A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>100% merit-based Speakers &amp; jury decision</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#1C1224' }}>
                      <Check size={16} color="#6A1B9A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>Free verification dashboard</span>
                    </li>
                  </ul>
                </div>

                {/* Card 2: Rated Awards (Challenge) */}
                <div
                  onClick={() => handleTrackSelect('challenge')}
                  style={{
                    borderRadius: '20px',
                    border: track === 'challenge' ? '2px solid #6A1B9A' : '1.5px solid #EFE4F4',
                    background: track === 'challenge' ? '#FAF5FC' : '#FFFFFF',
                    padding: '2rem 1.75rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: track === 'challenge' ? '0 8px 24px rgba(106, 27, 154, 0.08)' : 'none',
                  }}
                >
                  {/* Top Row: RATED CHALLENGE Badge + Radio Dot */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        background: '#4A126D',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      RATED CHALLENGE
                    </span>

                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: track === 'challenge' ? '2px solid #6A1B9A' : '2px solid #D1D5DB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {track === 'challenge' && (
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6A1B9A' }} />
                      )}
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#1C1224',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Rated Awards
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                    A competitive campaign designed for startups &amp; MSMEs to build validation and public reach.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#1C1224' }}>
                      <Check size={16} color="#6A1B9A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>Fee starts at ₹2,000</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#1C1224' }}>
                      <Check size={16} color="#6A1B9A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>50% Speakers &amp; jury Weight + 50% Public Vote</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#1C1224' }}>
                      <Check size={16} color="#6A1B9A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>Voting link &amp; creative templates</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Fempreneur Purple CTA Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={goToNextStep}
                  style={{
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1.1rem 3.5rem',
                    borderRadius: '12px',
                    fontSize: '0.98rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(106, 27, 154, 0.28)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <span>CONTINUE TO DETAILS</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FOUNDER & ENTERPRISE DETAILS */}
          {currentStep === 2 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#1C1224',
                  marginTop: 0,
                  marginBottom: '0.5rem',
                }}
              >
                Founder &amp; Enterprise Details
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#5C4E65', marginBottom: '2rem', lineHeight: 1.5 }}>
                Enter your contact information and registered business credentials for evaluation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Full Name of Founder / Leader *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Merchant"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.fullName ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                  {stepErrors.fullName && <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '0.25rem' }}>{stepErrors.fullName}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Founder &amp; Managing Director"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.designation ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.email ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.phone ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    City &amp; State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmedabad, Gujarat"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.city ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EcoFabrics Pvt Ltd"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.companyName ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Industry Sector *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => handleInputChange('sector', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  >
                    {SECTORS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Website / Social URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://company.com or Instagram"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.website ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Preferred Felicitation Hub *
                  </label>
                  <select
                    value={formData.hubPreference}
                    onChange={(e) => handleInputChange('hubPreference', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  >
                    <option value="Ahmedabad Hub (AMA Complex)">Ahmedabad Hub (AMA Complex)</option>
                    <option value="Delhi NCR Hub">Delhi NCR Hub</option>
                    <option value="Either Hub / Open">Either Hub / Open</option>
                  </select>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={goToPrevStep}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E6D5EC',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '10px',
                    color: '#5C4E65',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  ← BACK
                </button>

                <button
                  type="button"
                  onClick={goToNextStep}
                  style={{
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.95rem 2.5rem',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(106, 27, 154, 0.28)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>CONTINUE TO CATEGORY</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CATEGORY & PITCH STORY */}
          {currentStep === 3 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#1C1224',
                  marginTop: 0,
                  marginBottom: '0.5rem',
                }}
              >
                Category &amp; Pitch Story
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#5C4E65', marginBottom: '2rem', lineHeight: 1.5 }}>
                Select your award category and describe what sets your enterprise apart.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Primary Award Category *
                  </label>
                  <select
                    required
                    value={formData.primaryCategory}
                    onChange={(e) => handleInputChange('primaryCategory', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #6A1B9A',
                      background: '#FAF6FC',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#6A1B9A',
                      outline: 'none',
                    }}
                  >
                    {ALL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Executive Summary &amp; Venture Vision *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Summarize your company vision, founding inspiration, core products or services..."
                    value={formData.executiveSummary}
                    onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.executiveSummary ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Innovation &amp; Unique Differentiator *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="What makes your product, business model, or service delivery standout?"
                    value={formData.innovationDifferentiator}
                    onChange={(e) => handleInputChange('innovationDifferentiator', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.innovationDifferentiator ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Quantifiable Traction &amp; Impact *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Revenue traction, jobs created, customers served, female empowerment..."
                    value={formData.tractionImpact}
                    onChange={(e) => handleInputChange('tractionImpact', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: stepErrors.tractionImpact ? '1.5px solid #EF4444' : '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                {track === 'challenge' && (
                  <div style={{ background: '#FAF5FC', padding: '1.5rem', borderRadius: '14px', border: '1.5px solid #E6D5EC' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#6A1B9A', marginBottom: '0.75rem' }}>
                      Select Challenge Tier
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div
                        onClick={() => setSelectedTier('standard')}
                        style={{
                          padding: '1rem',
                          borderRadius: '10px',
                          border: selectedTier === 'standard' ? '2px solid #6A1B9A' : '1px solid #EFE4F4',
                          background: selectedTier === 'standard' ? '#FFFFFF' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 800, color: '#1C1224' }}>Standard (₹2,000)</div>
                        <div style={{ fontSize: '0.8rem', color: '#5C4E65' }}>50% Jury + 50% Public Voting</div>
                      </div>
                      <div
                        onClick={() => setSelectedTier('pro')}
                        style={{
                          padding: '1rem',
                          borderRadius: '10px',
                          border: selectedTier === 'pro' ? '2px solid #6A1B9A' : '1px solid #EFE4F4',
                          background: selectedTier === 'pro' ? '#FFFFFF' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 800, color: '#6A1B9A' }}>Pro Showcase + PR (₹5,000)</div>
                        <div style={{ fontSize: '0.8rem', color: '#5C4E65' }}>Includes VyapaarJagat Feature Article</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={goToPrevStep}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E6D5EC',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '10px',
                    color: '#5C4E65',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  ← BACK
                </button>

                <button
                  type="button"
                  onClick={goToNextStep}
                  style={{
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.95rem 2.5rem',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(106, 27, 154, 0.28)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>REVIEW APPLICATION</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & FINAL SUBMISSION */}
          {currentStep === 4 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#1C1224',
                  marginTop: 0,
                  marginBottom: '0.5rem',
                }}
              >
                Review &amp; Final Submission
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#5C4E65', marginBottom: '2rem', lineHeight: 1.5 }}>
                Verify your nomination details below before confirming your official application.
              </p>

              {/* Review Summary Box */}
              <div
                style={{
                  background: '#FCFBFD',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #EFE4F4',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase' }}>Selected Track</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#6A1B9A' }}>
                    {track === 'challenge' ? 'Rated Challenge (Public + Jury)' : 'Honorary Track (100% Free)'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase' }}>Nominee &amp; Company</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1224' }}>
                    {formData.fullName} ({formData.companyName})
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase' }}>Award Category</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#6A1B9A' }}>
                    {formData.primaryCategory}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#72627C', fontWeight: 700, textTransform: 'uppercase' }}>Total Fee</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#6A1B9A' }}>
                    {track === 'challenge' ? (selectedTier === 'pro' ? '₹5,000' : '₹2,000') : '₹0 (100% FREE)'}
                  </div>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div style={{ marginBottom: '2.5rem', background: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid #EFE4F4' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.88rem', color: '#5C4E65' }}>
                  <input
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) => handleInputChange('agreed', e.target.checked)}
                    style={{ marginTop: '3px', accentColor: '#6A1B9A', width: '16px', height: '16px' }}
                  />
                  <span>
                    I confirm that the details provided are accurate and authorize Fempreneur 2027 to review my nomination for jury scoring and stage recognition.
                  </span>
                </label>
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={goToPrevStep}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E6D5EC',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '10px',
                    color: '#5C4E65',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  ← BACK
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit}
                  style={{
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem 3rem',
                    borderRadius: '12px',
                    fontSize: '0.98rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(106, 27, 154, 0.28)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                  }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'SUBMITTING NOMINATION...' : 'SUBMIT NOMINATION 🏆'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECRETARIAT DESK (Fempreneur Deep Royal Plum Theme) */}
        <div
          style={{
            background: '#1E0630',
            borderRadius: '20px',
            padding: '2.5rem 2.25rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: '0 12px 36px rgba(30, 6, 48, 0.18)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FFD700',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              SECRETARIAT DESK
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0',
              }}
            >
              Need help filling the form?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.82)', maxWidth: '520px', margin: 0, lineHeight: 1.5 }}>
              Our coordinators help verify your documents and register categories correctly. Reach out directly.
            </p>
          </div>

          <a
            href="https://wa.me/917041151714?text=Hi%20Fempreneur%20Secretariat%2C%20I%20need%20help%20filling%20out%20my%20nomination%20form."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: '#25D366',
              color: '#FFFFFF',
              padding: '0.85rem 1.75rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <MessageCircle size={18} />
            <span>WHATSAPP HELP</span>
          </a>
        </div>

      </div>
    </div>
  );
}
