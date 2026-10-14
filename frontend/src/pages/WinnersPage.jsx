import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  CheckCircle2,
  Quote,
  Award,
} from 'lucide-react';
import { WinnerCard, CTAButton } from '../components';
import { getWinnerPhoto } from '../data/winnerPhotos';

export default function WinnersPage() {
  const [selectedYear, setSelectedYear] = useState('2024');

  const pastEditions = [
    { year: '2026', label: 'Awards Winners 2026' },
    { year: '2025', label: 'Awards Winners 2025' },
    { year: '2024', label: 'Awards Winners 2024' },
    { year: '2023', label: 'Awards Winners 2023' },
    { year: '2022', label: 'Awards Winners 2022' },
  ];

  const allWinners = [
    {
      awardTitle: 'Tech Startup of the Year - Vernacular AI & EdTech',
      name: 'Ananya Sharma',
      company: 'EduSpark NextGen AI',
      category: 'Startup Awards',
      year: '2025',
      city: 'Ahmedabad (DevX Edition)',
      highlight: 'Brought personalized vernacular AI learning tools to 50,000+ government school students in regional Indian languages.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/ananya-sharma.jpg',
    },
    {
      awardTitle: 'Commercial Spatial Architecture & Sustainable Design',
      name: 'Priyanshi Shah',
      company: 'Aarya Spatial Design Studio',
      category: 'Design & Architecture Awards',
      year: '2025',
      city: 'Ahmedabad (DevX Edition)',
      highlight: 'Recognized for pioneering sustainable commercial spatial architecture and generating local employment for craftspeople across Western India.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/priyanshi-shah.jpg',
    },
    {
      awardTitle: 'Clinical Biotechnology & Oncology Therapeutics of the Year',
      name: 'Dr. Ananya Sen',
      company: 'Apex HealthTech Research',
      category: 'Healthcare & Wellness Awards',
      year: '2025',
      city: 'Ahmedabad (DevX Edition)',
      highlight: 'Awarded for breakthrough clinical biotechnology formulations making oncology supportive care accessible across Tier 2 hospitals.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/dr-ananya-sen.jpg',
    },
    {
      awardTitle: 'Tech Startup of the Year - Diagnostics & Pathology Software',
      name: 'Dr. Sunita Rao',
      company: 'Nova BioCare Diagnostics',
      category: 'Healthcare & Wellness Awards',
      year: '2024',
      city: 'Mumbai (BSE Edition)',
      highlight: 'Honored for building high-impact pathology software & diagnostic devices serving over 1,00,000 patients across India.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/dr-sunita-rao.jpg',
    },
    {
      awardTitle: 'Zero-Defect Industrial Tooling & Precision MSME of the Year',
      name: 'Sneha Patel',
      company: 'Precision Tooling & Components',
      category: 'Manufacturing & MSME Awards',
      year: '2024',
      city: 'Mumbai (BSE Edition)',
      highlight: 'Pioneered zero-defect precision tooling and championed female industrial machinists in heavy auto-component manufacturing.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/sneha-patel.jpg',
    },
    {
      awardTitle: 'Rural Handloom & Fair Trade Social Enterprise of the Year',
      name: 'Radhika Menon',
      company: 'Artisan & Handloom Collective',
      category: 'Social Enterprise Awards',
      year: '2023',
      city: 'Ahmedabad (AMA Edition)',
      highlight: 'Empowered over 800 rural female handloom weavers through direct nationwide e-commerce logistics and fair compensation.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/radhika-menon.jpg',
    },
    {
      awardTitle: 'Clean Beauty & Botanical Organic D2C Skincare of the Year',
      name: 'Pooja Mehta',
      company: 'Vedic Naturals Wellness',
      category: 'Consumer & D2C Awards',
      year: '2023',
      city: 'Ahmedabad (AMA Edition)',
      highlight: 'Built a 100% clean-beauty certified direct-to-consumer skincare brand sourcing organic botanicals from female farmer cooperatives.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/pooja-mehta.jpg',
    },
    // 2022 Honorees (Source of Truth: Google Sheet gid=1449145524)
    {
      awardTitle: 'Trend setter of the year (Organization)',
      name: 'Adv Ashwini C',
      company: '',
      category: 'Trend setter of the year (Organization)',
      year: '2022',
      highlight: 'Honored with 67 verified public votes and jury evaluation by Raseshvari Hindustani.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Best Community service –Individual',
      name: 'Dr. Seema Yadav',
      company: '',
      category: 'Best Community service –Individual',
      year: '2022',
      highlight: 'Honored with 245 verified public votes and jury evaluation by Raseshvari Hindustani.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Excellence in Customer Experience Award',
      name: 'House of kotawala',
      company: 'House of kotawala',
      category: 'Excellence in Customer Experience Award',
      year: '2022',
      highlight: 'Honored with 97 verified public votes and jury evaluation by Raseshvari Hindustani.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Trend setter woman of the year (Individual)',
      name: 'Pallavi Walia Raj',
      company: '',
      category: 'Trend setter woman of the year (Individual)',
      year: '2022',
      highlight: 'Honored with 564 verified public votes and jury evaluation by Dr. Shubhalaxmi Acharya.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Young business woman of the year',
      name: 'Meghana Mojjada',
      company: '',
      category: 'Young business woman of the year',
      year: '2022',
      highlight: 'Honored with 424 verified public votes and jury evaluation by Dr. Shubhalaxmi Acharya.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Best Momprenuer of the Year (Individual)',
      name: 'Rutu Sunil Sangani',
      company: '',
      category: 'Best Momprenuer of the Year (Individual)',
      year: '2022',
      highlight: 'Honored with 121 verified public votes and jury evaluation by Dr. Shubhalaxmi Acharya.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'COVID Warrior - Education Support Award',
      name: 'Nidhi Virmani',
      company: '',
      category: 'COVID Warrior - Education Support Award',
      year: '2022',
      highlight: 'Honored with 42 verified public votes and jury evaluation by Dr. Geetika Saluja.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'COVID Warrior – Rising Entrepreneur Award',
      name: 'Ami Shah',
      company: '',
      category: 'COVID Warrior – Rising Entrepreneur Award',
      year: '2022',
      highlight: 'Honored with 137 verified public votes and jury evaluation by Dr. Geetika Saluja.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'COVID Warrior - Counsellor Award',
      name: 'Hema Shantharam',
      company: '',
      category: 'COVID Warrior - Counsellor Award',
      year: '2022',
      highlight: 'Honored with 292 verified public votes and jury evaluation by Dr. Geetika Saluja.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Best influencer Award',
      name: 'Susmita Das Gupta',
      company: '',
      category: 'Best influencer Award',
      year: '2022',
      highlight: 'Honored with 207 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Creative entrepreneur of the year',
      name: 'Toral Shah',
      company: 'Cutistic Gifts',
      category: 'Creative entrepreneur of the year',
      year: '2022',
      highlight: 'Honored with 331 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Social Impact Creator Award',
      name: 'Madhusatta Chaudhury',
      company: '',
      category: 'Social Impact Creator Award',
      year: '2022',
      highlight: 'Honored with 135 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Home Grown Business of The Year',
      name: 'Vimal S Shah',
      company: '',
      category: 'Home Grown Business of The Year',
      year: '2022',
      highlight: 'Honored with 32 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Excellence in Health & Wellness business Award',
      name: 'Soham Homoeopathic Clinic and Healing Centre',
      company: 'Soham Homoeopathic Clinic and Healing Centre',
      category: 'Excellence in Health & Wellness business Award',
      year: '2022',
      highlight: 'Honored with 139 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Woman Ahead Startup of the year',
      name: 'Shikha Mehra',
      company: '',
      category: 'Woman Ahead Startup of the year',
      year: '2022',
      highlight: 'Honored with 53 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Founder of the year',
      name: 'Naisargi Shah',
      company: '',
      category: 'Founder of the year',
      year: '2022',
      highlight: 'Honored with 369 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Business Leader of the year',
      name: 'Shweta Raval',
      company: '',
      category: 'Business Leader of the year',
      year: '2022',
      highlight: 'Honored with 143 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Entrepreneur of the Year in Service Business',
      name: 'Ruchi Aggarwal',
      company: '',
      category: 'Entrepreneur of the Year in Service Business',
      year: '2022',
      highlight: 'Honored with 282 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Product or Manufacturing Business',
      name: 'Kanisha patel',
      company: '',
      category: 'Product or Manufacturing Business',
      year: '2022',
      highlight: 'Honored with 55 verified public votes and jury evaluation by Aditya Kumar.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'COVID Warrior - Medical Support Award',
      name: 'Dr. Ishani Hanspal',
      company: '',
      category: 'COVID Warrior - Medical Support Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'CEO of the Year Award',
      name: 'Belaa Mitthani',
      company: '',
      category: 'CEO of the Year Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Social Entrepreneurship Award',
      name: 'Nancy jain',
      company: '',
      category: 'Social Entrepreneurship Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'COVID Warrior - Food Provider Award',
      name: 'Angel Foundation',
      company: 'Angel Foundation',
      category: 'COVID Warrior - Food Provider Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Best Community service – Organization',
      name: 'Street Cause',
      company: 'Street Cause',
      category: 'Best Community service – Organization',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Best Mentor Award',
      name: 'Nutrition Dynamic Foods LLP',
      company: 'Nutrition Dynamic Foods LLP',
      category: 'Best Mentor Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Excellence in use of Technology Award',
      name: 'B-Square Dental Studio',
      company: 'B-Square Dental Studio',
      category: 'Excellence in use of Technology Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Lifetime Achievement Award',
      name: 'Dr. Shalini Guggnani',
      company: '',
      category: 'Lifetime Achievement Award',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Entrepreneur of the Year in Trading Business',
      name: 'Rekha Jayesh Saluja',
      company: '',
      category: 'Entrepreneur of the Year in Trading Business',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Professional Entrepreneur of the Year',
      name: 'Namrata shah',
      company: '',
      category: 'Professional Entrepreneur of the Year',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
    {
      awardTitle: 'Innovator of the year (Individual)',
      name: 'Janki Raina',
      company: '',
      category: 'Innovator of the year (Individual)',
      year: '2022',
      highlight: 'Verified award winner at the Fempreneur 2022 Annual Conference.',
      storyUrl: 'https://vyapaarjagat.com',
    },
  ];

  const filteredWinners = allWinners
    .filter((winner) => winner.year === selectedYear)
    .map((winner) => ({
      ...winner,
      image: winner.image || getWinnerPhoto(winner.name),
    }));


  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. HERO BANNER (exact match to Image 1: dark photo background with Awards Winners & Breadcrumbs) */}
      <section
        style={{
          background: `linear-gradient(rgba(18, 5, 26, 0.78), rgba(18, 5, 26, 0.78)), url('/images/awards/awards-stage-winners-hd.jpg') center/cover no-repeat`,
          padding: '4.5rem 0 3.5rem 0',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(106, 27, 154, 0.25)',
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '0.4rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display, "Inter", sans-serif)',
            }}
          >
            Awards Winners
          </h1>
          <div
            style={{
              fontSize: '0.95rem',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 500,
            }}
          >
            <Link to="/" style={{ color: '#FFFFFF', textDecoration: 'none', opacity: 0.9 }}>
              Home
            </Link>
            <span style={{ opacity: 0.6 }}>/</span>
            <span style={{ opacity: 0.95, fontWeight: 600 }}>Awards Winners</span>
          </div>
        </div>
      </section>

      {/* 2. YEAR SELECTION CARDS & MAIN SECTION (Pure White background, matching Image 1) */}
      <section style={{ background: '#FFFFFF', paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          {/* Five Year Cards in One Horizontal Row on Desktop (2026, 2025, 2024, 2023, 2022) */}
          <div className="fem-ref-year-row">
            {pastEditions.map((ed) => {
              const isSelected = selectedYear === ed.year;
              return (
                <button
                  key={ed.year}
                  type="button"
                  onClick={() => {
                    setSelectedYear(ed.year);
                  }}
                  className="fem-ref-year-btn"
                  style={{
                    position: 'relative',
                    background: isSelected ? '#6A1B9A' : '#FFFFFF',
                    border: '1.5px solid #6A1B9A',
                    borderRadius: '8px',
                    padding: '1.15rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected
                      ? '0 6px 18px rgba(106, 27, 154, 0.28)'
                      : '0 1px 3px rgba(0, 0, 0, 0.04)',
                    outline: 'none',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#FAF5FC';
                      e.currentTarget.style.borderColor = '#8E24AA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#6A1B9A';
                    }
                  }}
                >
                  <CalendarClock size={28} color={isSelected ? '#FFFFFF' : '#6A1B9A'} />
                  <span
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: isSelected ? '#FFFFFF' : '#1C1224',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Awards Winners {ed.year}
                  </span>

                  {/* Speech-bubble Downward Pointer on Active Card (matching Image 1 exactly) */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px',
                        left: '24px',
                        width: 0,
                        height: 0,
                        borderLeft: '12px solid transparent',
                        borderRight: '12px solid transparent',
                        borderTop: '12px solid #6A1B9A',
                        filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 3. AWARDS CARD LAYOUT (Only Card Layout Displayed) */}
          {selectedYear === '2026' ? (
            /* 2026 Empty State (Archive In Progress - Requirement 5) */
            <div
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                background: '#FAF6FC',
                borderRadius: '8px',
                border: '1.5px dashed #D1B3E0',
                marginBottom: '3rem',
              }}
            >
              <CalendarClock size={36} color="#6A1B9A" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.5rem' }}>
                Fempreneur Awards 2026
              </h2>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#6A1B9A', marginBottom: '0.75rem' }}>
                2026 Honoree Records Currently Being Digitized
              </h3>
              <p style={{ maxWidth: '620px', margin: '0 auto 1.75rem', color: '#555555', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Verified honoree records, citations, and photo galleries for the 2026 edition are continuously being digitized and verified from the 1MEIF secretariat archives. If you are an honored winner requesting profile verification or story updates, please connect with our verification desk.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <CTAButton to="/contact" variant="primary" size="md">
                  Submit Winner Verification
                </CTAButton>
                <CTAButton to="/nominate" variant="secondary" size="md">
                  Nominate for Upcoming Awards
                </CTAButton>
              </div>
            </div>
          ) : filteredWinners.length > 0 ? (
            /* Reference Portrait Winner Cards Grid (Clean, Modern, Evenly Spaced 4-Column Grid) */
            <div className="fem-ref-winner-grid">
              {filteredWinners.map((winner, idx) => (
                <WinnerCard key={`${winner.name}-${idx}`} {...winner} />
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '3.5rem 2rem',
                textAlign: 'center',
                background: '#FAF6FC',
                borderRadius: '8px',
                border: '1.5px dashed #D1B3E0',
                marginBottom: '3rem',
              }}
            >
              <CalendarClock size={36} color="#6A1B9A" style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.5rem' }}>
                No Records Found for {selectedYear}
              </h4>
              <p style={{ color: '#555555', fontSize: '0.9rem' }}>
                Verified honoree records for the {selectedYear} Edition are currently being digitized and updated.
              </p>
            </div>
          )}

          {/* 4. HONOREE TESTIMONIAL STRIP (Preserved) */}
          <div
            className="fem-card"
            style={{
              padding: '3rem 2.5rem',
              marginBottom: '3.5rem',
              background: 'linear-gradient(135deg, #FAF6FC 0%, #FFFFFF 100%)',
              border: '1.5px solid #EFE4F4',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
            }}
          >
            <div className="grid grid-cols-2 gap-8 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div>
                <Quote size={32} color="#6A1B9A" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', lineHeight: 1.35, marginBottom: '0.85rem' }}>
                  "Winning at Fempreneur gave our venture the credibility to secure enterprise corporate contracts."
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  — Verified Fempreneur Award Winner &amp; Founder Alumni. The 50% public voting campaign allowed us to mobilize our customer community across 12 cities.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>Permanent SEO Feature on VyapaarJagat.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>Inclusion in Top 50 Women Coffee Table Book</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>Verified Credential Certificate &amp; Signature 'F' Trophy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>Direct Access to 1MEIF Investor &amp; Mentor Networks</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. NEXT EDITION CALLOUT */}
          <div
            style={{
              marginTop: '4rem',
              background: 'linear-gradient(135deg, var(--color-plum-deep) 0%, var(--color-burgundy) 100%)',
              borderRadius: 'var(--radius-2xl)',
              padding: '3.5rem 2.5rem',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Join the 2027 Cohort
              </span>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Write Your Chapter in Fempreneur History
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Nominations for Fempreneur 2027 are 100% free across 40 categories with our verified 50% Jury Evaluation + 50% Public Voting system.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton to="/nominate" variant="gold" size="lg" icon={Award}>
                Nominate for 2027 (Free)
              </CTAButton>
              <CTAButton to="/awards" variant="ghost" size="lg" style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                How Evaluation Works
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

