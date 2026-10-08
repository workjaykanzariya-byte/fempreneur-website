import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Mic,
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Award,
  BookOpen,
  Search,
  Radio,
  Globe,
  FileEdit,
  Scale,
  PartyPopper,
  X,
  Check,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../components';
import { submitGeneralInquiry } from '../services/api';

export default function SpeakersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [speakerData, setSpeakerData] = useState({
    name: '',
    email: '',
    topic: '',
  });

  // Master List of Speakers & Jury Panelists for Fempreneur 2027
  const juryMembers = [
    {
      name: 'Samir Sinha',
      role: 'Founder & MD',
      company: 'Savvy Group',
      image: '/images/speakers/speakers-hero-showcase.jpg',
      category: 'Real Estate & Infrastructure',
    },
    {
      name: 'Dr. Meera Nambiar',
      role: 'Venture Partner & Director',
      company: 'Ankur Capital',
      image: '/images/speakers/speakers-keynote-real.png',
      category: 'Venture Capital & Growth',
    },
    {
      name: 'Pravin Parmar',
      role: 'Founder & CEO',
      company: 'VyapaarJagat.com | 1MEIF',
      image: '/images/about/pravin-parmar-founder.jpg',
      category: 'MSME Ecosystem & Media',
    },
    {
      name: 'Dr. Sunita Sharma',
      role: 'Senior Advisor & Dean',
      company: 'AMA Ahmedabad',
      image: '/images/nominate/nominate-awards-application.jpg',
      category: 'Governance & Education',
    },
    {
      name: 'Nilesh Priyadarshi',
      role: 'Founder & CEO',
      company: 'Kaarigar Clinic',
      image: '/images/partners/corporate-partner-signing.jpg',
      category: 'Rural Enterprise & Crafts',
    },
    {
      name: 'Radhika Merchant',
      role: 'Managing Director',
      company: 'Encore Healthcare & Bio',
      image: '/images/categories/award-categories-real.png',
      category: 'Healthcare & Biotech',
    },
    {
      name: 'Ananya Birla',
      role: 'Founder & Chairperson',
      company: 'Svatantra Microfin',
      image: '/images/speakers/speakers-hero-showcase.png',
      category: 'Financial Inclusion',
    },
    {
      name: 'Dr. Sachin Shigwan',
      role: 'The Solar Man of India',
      company: 'Green Innovation Labs',
      image: '/images/events/awards-stage-ceremony.jpg',
      category: 'CleanTech & ESG',
    },
    {
      name: 'Vinod Malviya',
      role: 'Co-Founder & Director',
      company: 'Shubham Aquavitro Pvt Ltd',
      image: '/images/about/who-we-are-real-event.jpg',
      category: 'Manufacturing & Exports',
    },
    {
      name: 'Dr. Akshay Kumar',
      role: 'Founder & Director',
      company: 'BroGhar Realty Pvt. Ltd.',
      image: '/images/awards/awards-stage-winners-clean.png',
      category: 'Commercial Scaling',
    },
  ];

  // Filter jury members based on search
  const filteredJury = useMemo(() => {
    return juryMembers.filter((m) => {
      const q = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    });
  }, [searchTerm, juryMembers]);

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
      {/* HERO SECTION */}
      <PageHeader
        badge="60+ Expert Speakers Track Record"
        badgeIcon={Mic}
        title="Speakers, Keynotes &amp;"
        highlight="Jury Panel 2027"
        description="Meet the distinguished founders, venture leaders, and corporate policymakers evaluation panel of Fempreneur Awards 2027."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Speakers & Jury 2027' }]}
        ctaText="Apply to Speak"
        ctaTo="#apply-speak"
        secondaryCtaText="Road to the Stage"
        secondaryCtaTo="#process-workflow"
        image="/images/speakers/speakers-keynote-real.png"
        imageAlt="Keynote Speaker on Stage"
        imageBadge="Distinguished Evaluation Board"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* SECTION 1: PROCESS WORKFLOW — "Your Road to the Stage" */}
      <section id="process-workflow" style={{ background: '#FFFFFF', borderTop: '1px solid #EFE4F4', borderBottom: '1px solid #EFE4F4', padding: '5.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.6rem' }}>
              PROCESS WORKFLOW
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
              Your Road to the Stage
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#5C4E65', maxWidth: '640px', margin: '0.75rem auto 0', lineHeight: 1.6 }}>
              A transparent, supportive, 4-step selection journey designed for women founders and MSME business owners.
            </p>
          </div>

          {/* 4 Connected Process Step Circles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {/* Step 01 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#FCFBFD',
                  border: '1.5px solid #EFE4F4',
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  color: '#6A1B9A',
                }}
              >
                <Search size={28} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#6A1B9A',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  01
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.6rem' }}>
                Choose Category
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.55, maxWidth: '260px', margin: '0 auto' }}>
                Select from 40 award categories and MSME excellence tracks. Our scope spans over 150+ industry sectors.
              </p>
            </div>

            {/* Step 02 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#FCFBFD',
                  border: '1.5px solid #EFE4F4',
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  color: '#6A1B9A',
                }}
              >
                <FileEdit size={28} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#6A1B9A',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  02
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.6rem' }}>
                Submit Story
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.55, maxWidth: '260px', margin: '0 auto' }}>
                Fill out our short nomination form. Standard nomination is completely FREE with zero hidden costs.
              </p>
            </div>

            {/* Step 03 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#FCFBFD',
                  border: '1.5px solid #EFE4F4',
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  color: '#6A1B9A',
                }}
              >
                <Scale size={28} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#6A1B9A',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  03
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.6rem' }}>
                Speakers &amp; Jury Review
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.55, maxWidth: '260px', margin: '0 auto' }}>
                Our panel of judges evaluates entries. Shortlisted track nominees start public voting drives.
              </p>
            </div>

            {/* Step 04 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#FCFBFD',
                  border: '1.5px solid #EFE4F4',
                  boxShadow: '0 8px 24px rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  color: '#6A1B9A',
                }}
              >
                <PartyPopper size={28} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#6A1B9A',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  04
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.6rem' }}>
                The Celebration
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.55, maxWidth: '260px', margin: '0 auto' }}>
                Join us at Ahmedabad (AMA Complex) &amp; Delhi NCR to celebrate and receive your prestigious trophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRACK COMPARISON (Honorary Track vs Rated Challenge — Matching Greenpreneur Exact Layout) */}
      <section style={{ padding: '5.5rem 1.5rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Card 1: Honorary Track */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 10px 36px rgba(46, 8, 72, 0.05)',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Top Row: Icon + FREE Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#F6EEFA',
                  color: '#6A1B9A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Award size={24} />
              </div>
              <span
                style={{
                  background: '#6A1B9A',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '0.35rem 1rem',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                }}
              >
                FREE
              </span>
            </div>

            {/* Title & Description */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.9rem',
                fontWeight: 700,
                color: '#1C1224',
                marginTop: '1.5rem',
                marginBottom: '0.75rem',
              }}
            >
              Honorary Track
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#5C4E65', lineHeight: 1.6, marginBottom: '2rem' }}>
              Honoring exceptional contribution and long-term legacy. Free to nominate. Best for lifetime contributors, corporate ESG leaders, and community organizers.
            </p>

            {/* Checklist */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>100% Expert Speakers &amp; Jury Evaluation</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Zero Registration/Nomination Fees</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Free Business Profile Verification</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Grand Felicitation at AMA Ahmedabad &amp; Delhi NCR</span>
              </li>
            </ul>

            {/* Bottom Button */}
            <Link
              to="/awards/apply?track=honorary"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '0.95rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(106, 27, 154, 0.28)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              NOMINATE FOR FREE
            </Link>
          </div>

          {/* Card 2: Rated Challenge */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #EFE4F4',
              boxShadow: '0 10px 36px rgba(46, 8, 72, 0.05)',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Top Row: Icon + CHALLENGE Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#F6EEFA',
                  color: '#6A1B9A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={24} />
              </div>
              <span
                style={{
                  background: '#4A126D',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '0.35rem 1rem',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                }}
              >
                CHALLENGE
              </span>
            </div>

            {/* Title & Description */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.9rem',
                fontWeight: 700,
                color: '#1C1224',
                marginTop: '1.5rem',
                marginBottom: '0.75rem',
              }}
            >
              Rated Challenge
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#5C4E65', lineHeight: 1.6, marginBottom: '2rem' }}>
              Empower your network to validate your market leadership. Best for MSMEs, women startups, and scaling brands.
            </p>

            {/* Checklist */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>50% Speakers &amp; Jury Weight + 50% Public Voting</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Nominee Listed on Voting Platform</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Personalized Creative Assets &amp; Badge</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#1C1224' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F6EEFA', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>VyapaarJagat Directory Lifetime Listing</span>
              </li>
            </ul>

            {/* Bottom Button */}
            <Link
              to="/awards/apply?track=challenge"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '0.95rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4A126D 0%, #6A1B9A 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(74, 18, 109, 0.28)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              JOIN RATED CHALLENGE (FROM ₹2,000)
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE VALUE OF VICTORY (Deep Royal Plum Section) */}
      <section style={{ background: '#1E0630', color: '#FFFFFF', padding: '5.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.1rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              The Value of Victory
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '640px', margin: '0.75rem auto 0', lineHeight: 1.6 }}>
              Winning a Fempreneur award is an ongoing asset for your enterprise, providing marketing authority and community.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Card 1: Media Authority */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFD700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Radio size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Media Authority
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.6, margin: 0 }}>
                Get featured on VyapaarJagat.com with a dedicated pictorial story, local SEO backlinks, and media promotions.
              </p>
            </div>

            {/* Card 2: Legacy Print Feature */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFD700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <BookOpen size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Legacy Print Feature
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.6, margin: 0 }}>
                Secure a permanent page in the premium collector edition "Top 50 Women Entrepreneurs" Coffee Table Book.
              </p>
            </div>

            {/* Card 3: Elite Business Network */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFD700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Globe size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Elite Business Network
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.6, margin: 0 }}>
                Gain permanent access to the 1M Entrepreneurs Forum and the nationwide Fempreneur alumni community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EVALUATION BOARD / Speakers & Jury Panel 2027 */}
      <section id="jury-panel" style={{ padding: '5.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#6A1B9A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '0.6rem' }}>
            EVALUATION BOARD
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.1rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#1C1224', margin: 0 }}>
            Speakers &amp; Jury Panel 2027
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#5C4E65', maxWidth: '640px', margin: '0.75rem auto 0', lineHeight: 1.6 }}>
            Meet the distinguished experts, sustainability leaders, and policy makers evaluation panel of Fempreneur Awards 2027.
          </p>
        </div>

        {/* Search Panel Box */}
        <div style={{ maxWidth: '580px', margin: '0 auto 3.5rem', position: 'relative' }}>
          <Search
            size={18}
            color="#72627C"
            style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search panel by name, role, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem 0.85rem 3.2rem',
              borderRadius: '9999px',
              border: '1.5px solid #E6D5EC',
              background: '#FFFFFF',
              fontSize: '0.95rem',
              color: '#1C1224',
              outline: 'none',
              boxShadow: '0 4px 16px rgba(46, 8, 72, 0.04)',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#6A1B9A')}
            onBlur={(e) => (e.target.style.borderColor = '#E6D5EC')}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#72627C',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* 5-Column Photo Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4.5rem',
          }}
        >
          {filteredJury.map((member, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #4A126D 0%, #2E0848 100%)',
                boxShadow: '0 8px 24px rgba(46, 8, 72, 0.12)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '340px',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(106, 27, 154, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(46, 8, 72, 0.12)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(30, 6, 48, 0.8) 70%, rgba(20, 4, 32, 0.98) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem 1.1rem',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '0.2rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {member.name}
                  </h4>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 600,
                      marginBottom: '0.15rem',
                    }}
                  >
                    {member.role}
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                    }}
                  >
                    {member.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 5: "Will You Be Our Next Fempreneur?" CTA Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #EFE4F4',
            boxShadow: '0 12px 40px rgba(46, 8, 72, 0.06)',
            padding: '4rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '4.5rem',
          }}
        >
          {/* Ambient circles */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: '-40px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: '#FAF6FC',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: '#FAF6FC',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.1rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#1C1224',
                lineHeight: 1.25,
                marginBottom: '1rem',
              }}
            >
              Will You Be Our Next <br />
              <span style={{ fontStyle: 'italic', color: '#6A1B9A' }}>Fempreneur?</span>
            </h3>

            <p
              style={{
                fontSize: '1rem',
                color: '#5C4E65',
                maxWidth: '600px',
                margin: '0 auto 2.25rem',
                lineHeight: 1.6,
              }}
            >
              Your enterprise achievements deserve to be recognized on a national stage. Submitting your entry is simple, mobile-friendly, and 100% free for the 2027 edition.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link
                to="/awards/apply"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(106, 27, 154, 0.28)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span>APPLY NOW 🏆</span>
              </Link>

              <Link
                to="/events"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  color: '#6A1B9A',
                  border: '1.5px solid #6A1B9A',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
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
                <span>GET YOUR PASS</span>
              </Link>
            </div>

            <div
              style={{
                fontSize: '0.78rem',
                color: '#72627C',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              6TH ANNUAL EVENT • 40 AWARD CATEGORIES • 1,000 STORIES
            </div>
          </div>
        </div>

        {/* SECTION 6: SPEAKER & MASTERCLASS PROPOSAL FORM */}
        <div id="apply-speak" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              padding: '3rem 2.5rem',
              background: '#FFFFFF',
              border: '1px solid #EFE4F4',
              boxShadow: '0 12px 36px rgba(46, 8, 72, 0.05)',
              borderRadius: '20px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: '#FAF5FC',
                color: '#6A1B9A',
                fontWeight: 800,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Share Your Expertise
            </span>

            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.75rem' }}>
              Apply to Speak or Host a Masterclass
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#5C4E65', marginBottom: '2rem', lineHeight: 1.6 }}>
              Are you an established woman entrepreneur, venture investor, or subject matter specialist? Submit your proposed masterclass topic or panel interest.
            </p>

            {error && (
              <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            {submitted ? (
              <div style={{ padding: '2.5rem', background: '#FAF6FC', borderRadius: '14px', textAlign: 'center', border: '1px solid #EFE4F4' }}>
                <CheckCircle2 size={42} color="#6A1B9A" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.35rem' }}>Speaker Proposal Received</h4>
                <p style={{ fontSize: '0.92rem', color: '#5C4E65' }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={speakerData.name}
                      onChange={(e) => setSpeakerData({ ...speakerData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #E6D5EC',
                        background: '#FCFBFD',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                      placeholder="e.g. Dr. Meera Nambiar"
                      onFocus={(e) => (e.target.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.target.style.borderColor = '#E6D5EC')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={speakerData.email}
                      onChange={(e) => setSpeakerData({ ...speakerData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #E6D5EC',
                        background: '#FCFBFD',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                      placeholder="meera@example.com"
                      onFocus={(e) => (e.target.style.borderColor = '#6A1B9A')}
                      onBlur={(e) => (e.target.style.borderColor = '#E6D5EC')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.4rem' }}>
                    Proposed Topic or Masterclass Theme *
                  </label>
                  <input
                    type="text"
                    required
                    value={speakerData.topic}
                    onChange={(e) => setSpeakerData({ ...speakerData, topic: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #E6D5EC',
                      background: '#FCFBFD',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                    placeholder="e.g. How to Prepare a Female-Led Startup for Institutional Venture Capital"
                    onFocus={(e) => (e.target.style.borderColor = '#6A1B9A')}
                    onBlur={(e) => (e.target.style.borderColor = '#E6D5EC')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: '10px',
                    background: '#6A1B9A',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(106, 27, 154, 0.25)',
                  }}
                >
                  <Send size={16} />
                  <span>{loading ? 'Submitting Application...' : 'Submit Speaker Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
