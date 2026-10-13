import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  Phone,
  Mail,
  MapPin,
  Upload,
  X,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { submitNomination } from '../services/api';
import { initiateRazorpayPayment } from '../services/razorpay';

export const ALL_CATEGORIES = [
  'Woman Entrepreneur of the Year',
  'Emerging Woman Entrepreneur',
  'Young Woman Entrepreneur',
  'Startup Founder of the Year',
  'Women-Led Business Excellence',
  'Innovation & Technology Pioneer',
  'Healthcare & Wellness Leader',
  'Education & EdTech Innovator',
  'Finance & FinTech Excellence',
  'Manufacturing & Engineering',
  'Real Estate & Construction',
  'Architecture & Spatial Design',
  'Interior & Exterior Design',
  'Retail & D2C Brand of the Year',
  'E-Commerce Excellence',
  'Fashion & Lifestyle Innovator',
  'Beauty, Cosmetics & Personal Care',
  'Food & Beverage Brand',
  'Hospitality & Tourism Leader',
  'Media, PR & Entertainment',
  'Marketing & Digital Advertising',
  'Digital & New-Age Business',
  'Consulting & Executive Coaching',
  'Legal & Professional Services',
  'Human Resources & Talent Management',
  'Agriculture & Agri-Business',
  'Pharma, Biotech & Life Sciences',
  'Art, Handicrafts & Creative Business',
  'Events, Experiential & MICE',
  'Logistics & Supply Chain',
  'Social Impact & Grassroots Empowerment',
  'Homegrown Brand of India',
  'Women-Led MSME Champion',
  'Business Innovation & Disruption',
  'Rural Woman Entrepreneur',
  'Young Achiever (Under 30)',
  'Digital Creator & Influencer of the Year',
  'Lifetime Achievement Award',
  'Pride of India: Global Icon',
  'Sustainable & Eco-Conscious Brand'
];

const PACKAGES = [
  {
    id: 'identity',
    name: 'Identity Package',
    price: 2000,
    tagline: 'Your first step to shine in the Fempreneur journey.',
    features: [
      'Free entry pass to Fempreneur Gala 2027 (Worth ₹2,000)',
      'Vyapaar Jagat Story Publication (worth ₹25,000+) & Business Listing (worth ₹10,000+)',
      'Positioning: For those who want recognition and visibility.'
    ]
  },
  {
    id: 'change_maker',
    name: 'Change Maker',
    price: 3000,
    tagline: 'Join the tribe of changemakers.',
    features: [
      'Free entry pass to Fempreneur Gala 2027 (Worth ₹2,000)',
      'Verified Badge & Featured Public Voting Profile',
      'Vyapaar Jagat Story Publication & Business Listing',
      'Positioning: For ambitious disruptors looking to rally public votes.'
    ]
  },
  {
    id: 'fame_india',
    name: 'Fame of India',
    price: 5000,
    tagline: 'National spotlight for your enterprise.',
    features: [
      '2 VIP Passes to Fempreneur Gala 2027',
      'Exclusive Video Feature & Digital Social Blitz',
      'Priority Jury Dossier Review & Official Certificate',
      'Positioning: For scaling brands seeking national credibility.'
    ]
  },
  {
    id: 'impact_creator',
    name: 'Impact Creator',
    price: 10000,
    tagline: 'Ultimate authority and leadership package.',
    features: [
      '3 VIP Passes with Stage Felicitation & Red Carpet',
      'Dedicated Press Release across 50+ News Outlets',
      'Permanent Hall of Fame Directory Placement & Memento',
      'Positioning: For established women leaders and enterprise founders.'
    ]
  }
];

export default function ApplyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTrack = searchParams.get('track') === 'rated' ? 'rated' : 'honorary';
  const initialCategory = searchParams.get('category') || '';

  // Step 1 to 4 state
  const [currentStep, setCurrentStep] = useState(1);
  const [stepErrors, setStepErrors] = useState({});

  // Form Data State - Exactly matching Greenpreneur structure
  const [formData, setFormData] = useState({
    // Step 1: Track
    track: initialTrack, // 'honorary' or 'rated'

    // Step 2: Nominee Information (Matching Screenshot 1)
    name: '',
    business: '',
    phone: '',
    email: '',
    city: '',
    profilePicture: null,
    profilePicturePreview: '',
    businessLogo: null,
    businessLogoPreview: '',

    // Step 3: Define Your Impact Sector
    category: initialCategory,
    description: '',
    link: '',

    // Step 4: Challenge Entry Package (for rated) & Terms
    package: 'identity',
    agreed: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const profileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && ALL_CATEGORIES.includes(cat)) {
      setFormData((prev) => ({ ...prev, category: cat }));
    }
    const trk = searchParams.get('track');
    if (trk === 'rated' || trk === 'honorary') {
      setFormData((prev) => ({ ...prev, track: trk }));
    }
  }, [searchParams]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepErrors[field]) {
      setStepErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (field, file) => {
    if (!file) return;

    // Check size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setStepErrors((prev) => ({ ...prev, [field]: 'File size must be under 5MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (field === 'profilePicture') {
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
          profilePicturePreview: dataUrl,
        }));
      } else if (field === 'businessLogo') {
        setFormData((prev) => ({
          ...prev,
          businessLogo: file,
          businessLogoPreview: dataUrl,
        }));
      }
    };
    reader.readAsDataURL(file);

    if (stepErrors[field]) {
      setStepErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const removeFile = (field) => {
    if (field === 'profilePicture') {
      setFormData((prev) => ({
        ...prev,
        profilePicture: null,
        profilePicturePreview: '',
      }));
      if (profileInputRef.current) profileInputRef.current.value = '';
    } else if (field === 'businessLogo') {
      setFormData((prev) => ({
        ...prev,
        businessLogo: null,
        businessLogoPreview: '',
      }));
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  // Validation function matching Greenpreneur logic
  const validateStep = (step) => {
    const errors = {};

    if (step === 2) {
      if (!formData.name.trim()) errors.name = 'Full Name is required';
      if (!formData.business.trim()) errors.business = 'Organisation name is required';
      if (!formData.phone.trim()) {
        errors.phone = 'Mobile number is required';
      } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
        errors.phone = 'Please enter a valid phone number';
      }
      if (!formData.email.trim()) {
        errors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.city.trim()) errors.city = 'City & State is required';
      if (!formData.profilePicture) errors.profilePicture = 'Profile Picture is required';
    }

    if (step === 3) {
      if (!formData.category) errors.category = 'Please select a category';
      if (!formData.description.trim()) {
        errors.description = 'Please describe your work / impact';
      } else {
        const words = formData.description.trim().split(/\s+/).filter(Boolean);
        if (words.length > 200) {
          errors.description = `Description must be 200 words or less (currently ${words.length} words)`;
        }
      }
    }

    if (step === 4) {
      if (!formData.agreed) {
        errors.agreed = 'You must agree to the terms and evaluation declaration.';
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (currentStep < 4) {
      nextStep();
      return;
    }

    if (!validateStep(4)) return;

    setSubmitting(true);
    setSubmissionError(null);

    try {
      const selectedPkg = PACKAGES.find((p) => p.id === formData.package) || PACKAGES[0];
      const packageAmount = formData.track === 'rated' ? selectedPkg.price : 0;

      let paymentRef = null;

      // Handle Razorpay payment for rated challenge: Must successfully pay first!
      if (formData.track === 'rated' && packageAmount > 0) {
        const payRes = await initiateRazorpayPayment({
          amount: packageAmount,
          module: 'nomination',
          title: 'Fempreneur Rated Challenge',
          description: `${selectedPkg.name} - Fempreneur Awards 2027`,
          notes: {
            package: formData.package,
            packageName: selectedPkg.name,
            nomineeName: formData.name,
            businessName: formData.business,
            category: formData.category,
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
        });

        if (!payRes || !payRes.paymentId) {
          throw new Error('Payment was not completed. Please complete payment to submit your nomination.');
        }

        paymentRef = payRes.paymentId;
      }

      // Submit nomination payload to backend
      const payload = {
        track: formData.track,
        name: formData.name,
        nomineeName: formData.name,
        founderName: formData.name,
        business: formData.business,
        businessName: formData.business,
        companyName: formData.business,
        ventureName: formData.business,
        designation: 'Founder & Leader',
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        category: formData.category,
        categoryName: formData.category,
        description: formData.description,
        pitch: formData.description,
        link: formData.link || null,
        websiteUrl: formData.link || null,
        profilePicture: formData.profilePicturePreview || null,
        businessLogo: formData.businessLogoPreview || null,
        package: formData.package,
        packageAmount,
        paymentRef: paymentRef || (formData.track === 'rated' ? 'PAID_VERIFIED' : null),
      };

      const res = await submitNomination(payload);

      const generatedId = res?.data?.id
        ? `FEM-2027-${String(res.data.id).padStart(4, '0')}`
        : `FEM-2027-${Math.floor(1000 + Math.random() * 9000)}`;

      const cleanSlug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const votingUrl = res?.data?.voting_url || `${window.location.origin}/voting?nominee=${cleanSlug}-${generatedId.slice(-4)}`;

      setSubmissionResult({
        id: generatedId,
        votingUrl,
        nomineeName: formData.name,
        businessName: formData.business,
        category: formData.category,
        track: formData.track,
        packageName: selectedPkg.name,
        packageAmount,
      });

      setSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission or Payment error:', err);
      // DO NOT SHOW SUCCESS SCREEN IF PAYMENT WAS CANCELLED OR INCOMPLETE!
      setSubmissionError(err.message || 'Payment was not completed. Please complete payment to submit your rated nomination.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyVotingLink = () => {
    if (submissionResult?.votingUrl) {
      navigator.clipboard.writeText(submissionResult.votingUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  // Next button label helper matching Greenpreneur
  const getNextButtonText = () => {
    if (currentStep === 1) return 'Continue to Details';
    if (currentStep === 2) return 'Continue to Impact';
    if (currentStep === 3) return 'Final Step: Review';
    return formData.track === 'honorary' ? 'Submit Nomination' : 'Pay & Submit';
  };

  const stepTitles = [
    { num: '01', label: 'Award Track' },
    { num: '02', label: 'Nominee Information' },
    { num: '03', label: 'Define Impact' },
    { num: '04', label: 'Review & Pay' },
  ];

  const wordCount = formData.description
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224', paddingBottom: '6rem' }}>
      
      {/* TOP SUB-NAV BAR: Back to Awards Link */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #EFE4F4', padding: '0.85rem 1.5rem' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/awards"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6A1B9A',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
          >
            <ArrowLeft size={16} />
            <span>Back to Awards Overview</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#72627C', fontWeight: 600 }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span>Fempreneur 2027 Applications Open</span>
          </div>
        </div>
      </div>

      {/* HERO HEADER SECTION */}
      <section style={{ padding: '3.2rem 1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          
          {/* Centered Green Dot Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              background: '#FFFFFF',
              border: '1px solid #E8D9EE',
              boxShadow: '0 2px 8px rgba(46, 8, 72, 0.04)',
              marginBottom: '1.25rem',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6A1B9A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Nominations Open for 2027
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#2E0848',
              lineHeight: 1.15,
              margin: '0 0 0.85rem 0',
            }}
          >
            Apply for Fempreneur Awards 2027
          </h1>

          <p style={{ fontSize: '0.98rem', color: '#5C4E65', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Submit your women-led enterprise nomination for the Fempreneur Awards 2027. Choose between the Free Honorary path or the competitive Rated challenge.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 1.25rem' }}>
        
        {/* ========================================================================= */}
        {/* SUCCESS CONFIRMATION STATE                                               */}
        {/* ========================================================================= */}
        {submitted && submissionResult ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid #EFE4F4',
              padding: '3rem 2rem',
              boxShadow: '0 16px 40px rgba(46, 8, 72, 0.08)',
              textAlign: 'center',
            }}
          >
            {/* Animated Celebration Icon */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: '#ECFDF5',
                border: '2px solid #A7F3D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#059669',
              }}
            >
              <CheckCircle2 size={42} />
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#1C1224',
                margin: '0 0 0.75rem 0',
              }}
            >
              Nomination Received!
            </h2>

            <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 2rem' }}>
              Thank you, <strong style={{ color: '#1C1224' }}>{submissionResult.nomineeName}</strong>. Your nomination for{' '}
              <strong style={{ color: '#1C1224' }}>{submissionResult.businessName}</strong> under the{' '}
              <strong style={{ color: '#6A1B9A' }}>{submissionResult.category}</strong> category has been successfully received.
            </p>

            {/* Voting Link Box */}
            {submissionResult.votingUrl && (
              <div
                style={{
                  background: '#FAF5FC',
                  border: '1.5px solid #E9D5FF',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  maxWidth: '580px',
                  margin: '0 auto 2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#6A1B9A', marginBottom: '0.35rem' }}>
                  🎉 Your Unique Voting Link is Ready!
                </div>
                <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 1rem 0' }}>
                  Share this link with your network to start collecting votes:
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    readOnly
                    value={submissionResult.votingUrl}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #D8B4FE',
                      background: '#FFFFFF',
                      fontSize: '0.82rem',
                      color: '#374151',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={copyVotingLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      background: '#6A1B9A',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {linkCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{linkCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Application Summary Card */}
            <div
              style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                maxWidth: '580px',
                margin: '0 auto 2rem',
                textAlign: 'left',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.85rem',
                fontSize: '0.84rem',
              }}
            >
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Application ID
                </span>
                <strong style={{ color: '#1C1224' }}>{submissionResult.id}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Selected Track
                </span>
                <strong style={{ color: '#1C1224', textTransform: 'capitalize' }}>
                  {submissionResult.track === 'rated' ? `Rated Challenge (${submissionResult.packageName})` : 'Honorary Free Track'}
                </strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Phone
                </span>
                <strong style={{ color: '#1C1224' }}>{formData.phone}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Email
                </span>
                <strong style={{ color: '#1C1224' }}>{formData.email}</strong>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 2rem' }}>
              Our nominations steering team will verify your impact metrics and reach out to you on WhatsApp (<strong style={{ color: '#1C1224' }}>+91 70411 51714</strong>) within 48 hours with creatives or verification credentials.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.32)',
                }}
              >
                Return to Homepage
              </Link>
              <Link
                to="/categories"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '1.5px solid #E5E7EB',
                  color: '#374151',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                }}
              >
                Explore All Categories
              </Link>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 4-STEP WIZARD CONTAINER                                                   */
          /* ========================================================================= */
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid #EFE4F4',
              padding: '2.5rem',
              boxShadow: '0 12px 36px rgba(46, 8, 72, 0.05)',
            }}
          >
            {/* STEP HEADER & PROGRESS BAR (Matching Screenshot 2) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '6px',
                    background: '#2E0848',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  STEP {currentStep} OF 4
                </span>
              </div>

              {/* Progress Tracker Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#72627C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  START
                </span>
                <div style={{ width: '100px', height: '6px', background: '#F0E6F4', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(currentStep / 4) * 100}%`,
                      background: 'linear-gradient(90deg, #6A1B9A, #E91E63)',
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: currentStep === 4 ? '#6A1B9A' : '#72627C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  REVIEW
                </span>
              </div>
            </div>

            {/* Breadcrumb Steps Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', paddingBottom: '1.25rem', marginBottom: '1.75rem', borderBottom: '1px solid #F0E6F4' }}>
              {stepTitles.map((st, idx) => {
                const stepNum = idx + 1;
                const isCurrent = currentStep === stepNum;
                const isPassed = currentStep > stepNum;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      fontWeight: isCurrent ? 800 : 600,
                      color: isCurrent ? '#6A1B9A' : isPassed ? '#10B981' : '#9B8C9F',
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.68rem',
                        background: isCurrent ? '#FAF0FB' : isPassed ? '#ECFDF5' : '#F4EEF7',
                        color: isCurrent ? '#6A1B9A' : isPassed ? '#059669' : '#72627C',
                        border: isCurrent ? '1.5px solid #6A1B9A' : '1px solid transparent',
                      }}
                    >
                      {isPassed ? <Check size={11} /> : st.num}
                    </span>
                    <span>{st.label}</span>
                    {idx < 3 && <span style={{ color: '#D5C4DC', margin: '0 0.2rem' }}>•</span>}
                  </div>
                );
              })}
            </div>

            {/* Step Name Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#1C1224',
                margin: '0 0 1.25rem 0',
              }}
            >
              {currentStep === 1 && 'Award Track'}
              {currentStep === 2 && 'Enter Nominee Information'}
              {currentStep === 3 && 'Define Your Impact Sector'}
              {currentStep === 4 && (formData.track === 'rated' ? 'Select Challenge Entry Package' : 'Review & Submit')}
            </h2>

            {/* ========================================================================= */}
            {/* STEP 1: AWARD TRACK SELECTION                                             */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <div>
                <p style={{ fontSize: '0.92rem', color: '#5C4E65', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                  Please select the track that matches your business model. Read the features of each track before proceeding.
                </p>

                {/* 2 Selectable Track Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  
                  {/* Card 1: Honorary Award (Free Track) */}
                  <div
                    onClick={() => handleInputChange('track', 'honorary')}
                    style={{
                      padding: '1.85rem 1.6rem',
                      borderRadius: '18px',
                      border: formData.track === 'honorary' ? '2.5px solid #6A1B9A' : '1.5px solid #EBE6F0',
                      background: formData.track === 'honorary' ? '#FAF5FC' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: formData.track === 'honorary' ? '0 10px 24px rgba(106, 27, 154, 0.08)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          background: '#ECFDF5',
                          color: '#059669',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        100% Free
                      </span>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: formData.track === 'honorary' ? '6px solid #6A1B9A' : '2px solid #D5C4DC',
                          background: '#FFFFFF',
                          transition: 'all 0.15s ease',
                        }}
                      />
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1224', margin: '0 0 0.45rem 0' }}>
                      Honorary Awards
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
                      Recognizing women leaders making exceptional community or grassroots impact.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem', color: '#374151' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>100% merit-based jury decision</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>Invitation or Self-Nomination pathway</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>Free verification dashboard & official badge</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Rated Challenge (Competitive Track) */}
                  <div
                    onClick={() => handleInputChange('track', 'rated')}
                    style={{
                      padding: '1.85rem 1.6rem',
                      borderRadius: '18px',
                      border: formData.track === 'rated' ? '2.5px solid #6A1B9A' : '1.5px solid #EBE6F0',
                      background: formData.track === 'rated' ? '#FAF5FC' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: formData.track === 'rated' ? '0 10px 24px rgba(106, 27, 154, 0.08)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          background: '#FEF3C7',
                          color: '#B45309',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        Rated Challenge
                      </span>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: formData.track === 'rated' ? '6px solid #6A1B9A' : '2px solid #D5C4DC',
                          background: '#FFFFFF',
                          transition: 'all 0.15s ease',
                        }}
                      />
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1224', margin: '0 0 0.45rem 0' }}>
                      Rated Awards
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
                      A competitive campaign designed for startups & MSMEs to build validation and public reach.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem', color: '#374151' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>Fee starts at ₹2,000</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>75% Jury Weight + 25% Public Vote</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>Voting link & creative templates included</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4' }}>
                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.95rem 2.4rem',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(106, 27, 154, 0.32)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(233, 30, 99, 0.42)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.32)';
                    }}
                  >
                    <span>CONTINUE TO DETAILS</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: ENTER NOMINEE INFORMATION (EXACT MATCH TO SCREENSHOT 1)           */}
            {/* ========================================================================= */}
            {currentStep === 2 && (
              <div>
                {/* 2-Column Fields Grid Matching Screenshot 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  
                  {/* Field 1: Nominee Full Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      NOMINEE FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.name ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = stepErrors.name ? '#EF4444' : '#E5E7EB')}
                    />
                    {stepErrors.name && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Field 2: Business / Organisation Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      BUSINESS / ORGANISATION NAME *
                    </label>
                    <input
                      type="text"
                      name="business"
                      placeholder="Enter company name"
                      value={formData.business}
                      onChange={(e) => handleInputChange('business', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.business ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = stepErrors.business ? '#EF4444' : '#E5E7EB')}
                    />
                    {stepErrors.business && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.business}
                      </span>
                    )}
                  </div>

                  {/* Field 3: WhatsApp Mobile Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      WHATSAPP MOBILE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.phone ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = stepErrors.phone ? '#EF4444' : '#E5E7EB')}
                    />
                    {stepErrors.phone && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.phone}
                      </span>
                    )}
                  </div>

                  {/* Field 4: Email Address */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="hello@fempreneur.in"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.email ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = stepErrors.email ? '#EF4444' : '#E5E7EB')}
                    />
                    {stepErrors.email && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Field 5: City & State (Spanning full width) */}
                  <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      CITY &amp; STATE *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Ahmedabad, Gujarat"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.city ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = stepErrors.city ? '#EF4444' : '#E5E7EB')}
                    />
                    {stepErrors.city && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider Before File Uploads */}
                <div style={{ borderTop: '1px solid #F0E6F4', margin: '1.75rem 0 1.5rem 0' }} />

                {/* Row 4: File Uploads Matching Screenshot 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  
                  {/* Profile Picture Upload */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      PROFILE PICTURE *
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.profilePicture ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                      }}
                    >
                      <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/*"
                        id="profile-picture-input"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange('profilePicture', e.target.files[0]);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => profileInputRef.current && profileInputRef.current.click()}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: '9999px',
                          background: '#F3E8F6',
                          color: '#6A1B9A',
                          border: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#EAD5EE')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#F3E8F6')}
                      >
                        Choose File
                      </button>

                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            color: formData.profilePicture ? '#1C1224' : '#6B7280',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formData.profilePicture ? formData.profilePicture.name : 'No file chosen'}
                        </span>
                        {formData.profilePicture && (
                          <button
                            type="button"
                            onClick={() => removeFile('profilePicture')}
                            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '2px' }}
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    {stepErrors.profilePicture && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.profilePicture}
                      </span>
                    )}
                  </div>

                  {/* Business Logo Upload */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      BUSINESS LOGO (OPTIONAL)
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                      }}
                    >
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        id="business-logo-input"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange('businessLogo', e.target.files[0]);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => logoInputRef.current && logoInputRef.current.click()}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: '9999px',
                          background: '#F3E8F6',
                          color: '#6A1B9A',
                          border: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#EAD5EE')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#F3E8F6')}
                      >
                        Choose File
                      </button>

                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            color: formData.businessLogo ? '#1C1224' : '#6B7280',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formData.businessLogo ? formData.businessLogo.name : 'No file chosen'}
                        </span>
                        {formData.businessLogo && (
                          <button
                            type="button"
                            onClick={() => removeFile('businessLogo')}
                            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '2px' }}
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 Bottom Navigation Buttons Matching Screenshot 1 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.8rem',
                      borderRadius: '10px',
                      background: '#FFFFFF',
                      border: '1.5px solid #E6D5EC',
                      color: '#6A1B9A',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF5FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                  >
                    <ArrowLeft size={15} />
                    <span>PREVIOUS</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.95rem 2.4rem',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(106, 27, 154, 0.32)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(233, 30, 99, 0.42)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.32)';
                    }}
                  >
                    <span>CONTINUE TO IMPACT</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: DEFINE YOUR IMPACT SECTOR                                         */}
            {/* ========================================================================= */}
            {currentStep === 3 && (
              <div>
                <p style={{ fontSize: '0.92rem', color: '#5C4E65', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                  Select your primary category and highlight your venture achievements for jury evaluation.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  
                  {/* Category Dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      AWARD CATEGORY *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.category ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: formData.category ? '#1C1224' : '#9CA3AF',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {ALL_CATEGORIES.map((cat, idx) => (
                        <option key={idx} value={cat} style={{ color: '#1C1224' }}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {stepErrors.category && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.category}
                      </span>
                    )}
                  </div>

                  {/* Impact Description Textarea with Word Count */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        BRIEFLY DESCRIBE YOUR WORK / IMPACT *
                      </label>
                      <span style={{ fontSize: '0.74rem', color: wordCount > 200 ? '#EF4444' : '#6B7280', fontWeight: 600 }}>
                        {wordCount}/200 words
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      name="description"
                      placeholder="Provide details about your venture achievements, business traction, women empowerment metrics, or community milestones..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: stepErrors.description ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.5,
                      }}
                    />
                    {stepErrors.description && (
                      <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                        <AlertCircle size={12} /> {stepErrors.description}
                      </span>
                    )}
                  </div>

                  {/* Website or Social Profile Link */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      WEBSITE OR SOCIAL PROFILE LINK (OPTIONAL)
                    </label>
                    <input
                      type="url"
                      name="link"
                      placeholder="https://company.com or LinkedIn / Instagram profile"
                      value={formData.link}
                      onChange={(e) => handleInputChange('link', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #E5E7EB',
                        background: '#FAF7FC',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Step 3 Bottom Navigation Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.8rem',
                      borderRadius: '10px',
                      background: '#FFFFFF',
                      border: '1.5px solid #E6D5EC',
                      color: '#6A1B9A',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF5FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                  >
                    <ArrowLeft size={15} />
                    <span>PREVIOUS</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.95rem 2.4rem',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(106, 27, 154, 0.32)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(233, 30, 99, 0.42)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.32)';
                    }}
                  >
                    <span>FINAL STEP: REVIEW</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: REVIEW & PAY / SUBMIT                                             */}
            {/* ========================================================================= */}
            {currentStep === 4 && (
              <div>
                {/* When Rated: Select Package */}
                {formData.track === 'rated' ? (
                  <div>
                    <p style={{ fontSize: '0.92rem', color: '#5C4E65', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                      Our Rated Challenge helps you garner public votes & jury prestige. Choose your validation tier:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                      {PACKAGES.map((pkg) => {
                        const isSelected = formData.package === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => handleInputChange('package', pkg.id)}
                            style={{
                              padding: '1.5rem',
                              borderRadius: '16px',
                              border: isSelected ? '2.5px solid #6A1B9A' : '1.5px solid #EBE6F0',
                              background: isSelected ? '#FAF5FC' : '#FFFFFF',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              boxShadow: isSelected ? '0 8px 24px rgba(106, 27, 154, 0.08)' : 'none',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1C1224' }}>
                                  {pkg.name}
                                </span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6A1B9A' }}>
                                  ₹{pkg.price.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.78rem', color: '#6B7280', fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                                "{pkg.tagline}"
                              </p>

                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', color: '#4B5563' }}>
                                {pkg.features.map((feat, fIdx) => (
                                  <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                                    <Check size={13} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* When Honorary: Summary Review Card */
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.92rem', color: '#5C4E65', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                      Please review your application summary below before final submission. Free 100% merit-based track:
                    </p>

                    <div
                      style={{
                        background: '#FAF7FC',
                        border: '1.5px solid #EBE4EF',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.25rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                          Nominee Full Name
                        </span>
                        <strong style={{ color: '#1C1224', fontSize: '0.95rem' }}>{formData.name}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                          Business / Organisation
                        </span>
                        <strong style={{ color: '#1C1224', fontSize: '0.95rem' }}>{formData.business}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                          Award Category
                        </span>
                        <strong style={{ color: '#6A1B9A', fontSize: '0.95rem' }}>{formData.category}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                          City &amp; State
                        </span>
                        <strong style={{ color: '#1C1224', fontSize: '0.95rem' }}>{formData.city}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                          Contact Details
                        </span>
                        <span style={{ color: '#374151' }}>{formData.phone} • {formData.email}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                          Uploaded Assets
                        </span>
                        <span style={{ color: '#059669', fontWeight: 600 }}>
                          {formData.profilePicture ? '✓ Profile Picture' : 'None'}
                          {formData.businessLogo ? ' • ✓ Logo' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms Agreement Checkbox */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.84rem', color: '#4B5563', lineHeight: 1.5 }}>
                    <input
                      type="checkbox"
                      checked={formData.agreed}
                      onChange={(e) => handleInputChange('agreed', e.target.checked)}
                      style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: '#6A1B9A', cursor: 'pointer' }}
                    />
                    <span>
                      I declare that all the information provided is accurate and authentic. I understand and agree to the Fempreneur evaluation criteria and code of conduct.
                    </span>
                  </label>
                  {stepErrors.agreed && (
                    <span style={{ fontSize: '0.74rem', color: '#EF4444', display: 'block', marginTop: '4px' }}>
                      {stepErrors.agreed}
                    </span>
                  )}
                </div>

                {/* Payment / Submission Error Banner */}
                {submissionError && (
                  <div
                    style={{
                      padding: '0.85rem 1.25rem',
                      borderRadius: '10px',
                      background: '#FEF2F2',
                      border: '1.5px solid #FCA5A5',
                      color: '#B91C1C',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{submissionError}</span>
                  </div>
                )}

                {/* Step 4 Bottom Navigation Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #F0E6F4' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={submitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.8rem',
                      borderRadius: '10px',
                      background: '#FFFFFF',
                      border: '1.5px solid #E6D5EC',
                      color: '#6A1B9A',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF5FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                  >
                    <ArrowLeft size={15} />
                    <span>PREVIOUS</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.95rem 2.4rem',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      border: 'none',
                      cursor: submitting ? 'wait' : 'pointer',
                      boxShadow: '0 8px 24px rgba(106, 27, 154, 0.32)',
                      transition: 'all 0.15s ease',
                      opacity: submitting ? 0.75 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(233, 30, 99, 0.42)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.32)';
                      }
                    }}
                  >
                    {submitting ? (
                      <span>SUBMITTING...</span>
                    ) : (
                      <>
                        <span>
                          {formData.track === 'rated'
                            ? `PAY & SUBMIT (₹${(PACKAGES.find((p) => p.id === formData.package)?.price || 2000).toLocaleString('en-IN')})`
                            : 'SUBMIT NOMINATION'}
                        </span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
