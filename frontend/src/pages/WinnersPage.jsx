import React, { useState } from 'react';
import {
  Award,
  Calendar,
  MapPin,
  Sparkles,
  Filter,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Search,
  CheckCircle2,
  Quote,
  Star,
  Building2,
  Users,
  Trophy,
} from 'lucide-react';
import { PageHeader, WinnerCard, EmptyState, SectionTitle, CTAButton } from '../components';

export default function WinnersPage() {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const years = ['All', '2025', '2024', '2023', '2022'];
  const categories = [
    'All',
    'Leadership',
    'Technology & Startups',
    'Manufacturing & MSME',
    'Healthcare & Wellness',
    'Design & Architecture',
    'Social Enterprise',
    'Consumer & D2C',
  ];

  const pastEditions = [
    {
      year: '2025',
      city: 'DevX Ahmedabad',
      honorees: '40+',
      focus: 'Tech Innovation, Spatial Architecture & Sustainable Scaling',
      badge: '5th Edition',
    },
    {
      year: '2024',
      city: 'BSE Mumbai',
      honorees: '38+',
      focus: 'Capital Access, Diagnostics & Corporate Leadership',
      badge: '4th Edition',
    },
    {
      year: '2023',
      city: 'AMA Ahmedabad',
      honorees: '35+',
      focus: 'Grassroots Founders, Artisan Clusters & Regional MSMEs',
      badge: '3rd Edition',
    },
    {
      year: '2022',
      city: 'BSE Mumbai',
      honorees: '32+',
      focus: 'Foundational Women Leadership & D2C Innovation',
      badge: 'Inaugural Gala',
    },
  ];

  const allWinners = [
    {
      name: 'Priyanshi Shah',
      company: 'Aarya Spatial Design Studio',
      category: 'Design & Architecture',
      year: '2025',
      city: 'Ahmedabad (DevX Edition)',
      highlight: 'Recognized for pioneering sustainable commercial spatial architecture and generating local employment for craftspeople across Western India.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/priyanshi-shah.jpg',
    },
    {
      name: 'Dr. Sunita Rao',
      company: 'Nova BioCare Diagnostics',
      category: 'Healthcare & Wellness',
      year: '2024',
      city: 'Mumbai (BSE Edition)',
      highlight: 'Honored for building high-impact pathology software & diagnostic devices serving over 1,00,000 patients across India.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/dr-sunita-rao.jpg',
    },
    {
      name: 'Radhika Menon',
      company: 'Artisan & Handloom Collective',
      category: 'Social Enterprise',
      year: '2023',
      city: 'Ahmedabad (AMA Edition)',
      highlight: 'Empowered over 800 rural female handloom weavers through direct nationwide e-commerce logistics and fair compensation.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/radhika-menon.jpg',
    },
    {
      name: 'Sneha Patel',
      company: 'Precision Tooling & Components',
      category: 'Manufacturing & MSME',
      year: '2024',
      city: 'Mumbai (BSE Edition)',
      highlight: 'Pioneered zero-defect precision tooling and championed female industrial machinists in heavy auto-component manufacturing.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/sneha-patel.jpg',
    },
    {
      name: 'Meera Sen',
      company: 'GreenTech BioPackaging',
      category: 'Technology & Startups',
      year: '2022',
      city: 'Mumbai (BSE Edition)',
      highlight: 'Developed compostable agricultural waste packaging solutions replacing single-use plastics across top FMCG retail brands.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/meera-sen.jpg',
    },
    {
      name: 'Ananya Sharma',
      company: 'EduSpark NextGen AI',
      category: 'Technology & Startups',
      year: '2025',
      city: 'Ahmedabad (DevX Edition)',
      highlight: 'Brought personalized vernacular AI learning tools to 50,000+ government school students in regional Indian languages.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/ananya-sharma.jpg',
    },
    {
      name: 'Pooja Mehta',
      company: 'Vedic Naturals Wellness',
      category: 'Consumer & D2C',
      year: '2023',
      city: 'Ahmedabad (AMA Edition)',
      highlight: 'Built a 100% clean-beauty certified direct-to-consumer skincare brand sourcing organic botanicals from female farmer cooperatives.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/pooja-mehta.jpg',
    },
    {
      name: 'Dr. Ananya Sen',
      company: 'Apex HealthTech Research',
      category: 'Healthcare & Wellness',
      year: '2025',
      city: 'Ahmedabad (DevX Edition)',
      highlight: 'Awarded for breakthrough clinical biotechnology formulations making oncology supportive care accessible across Tier 2 hospitals.',
      storyUrl: 'https://vyapaarjagat.com',
      image: '/images/entrepreneurs/dr-ananya-sen.jpg',
    },
  ];

  const filteredWinners = allWinners.filter((winner) => {
    const matchesYear = selectedYear === 'All' || winner.year === selectedYear;
    const matchesCategory = selectedCategory === 'All' || winner.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      winner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.highlight.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        badge="Hall of Fame • 2022–2025"
        title="Fempreneur Past"
        highlight="Winners Archive"
        description="Celebrating outstanding women founders, innovators, and changemakers honored across our historical editions in Mumbai & Ahmedabad. Evaluated 50% by jury and 50% by public vote."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Winners Archive' }]}
        ctaText="Nominate for 2027"
        ctaTo="/nominate"
        secondaryCtaText="Explore 40 Categories"
        secondaryCtaTo="/categories"
        image="/images/awards/awards-stage-winners-clean.png"
        imageAlt="Fempreneur Historical Winners Felicitation Hall of Fame"
        imageBadge="500+ Honorees Since 2022"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* Historical Editions Bar */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2E0848 0%, #4A126D 50%, #6A1B9A 100%)',
          borderTop: '1px solid rgba(106, 27, 154, 0.35)',
          borderBottom: '1px solid rgba(106, 27, 154, 0.35)',
          padding: '2.5rem 0',
          color: '#FFFFFF',
        }}
      >
        <div className="container">
          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {pastEditions.map((ed, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
                onClick={() => setSelectedYear(ed.year)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FFD54F')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {ed.year} Edition
                  </span>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                    {ed.honorees} Honored
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F3E8FF', marginBottom: '0.35rem' }}>
                  {ed.city}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.45 }}>
                  {ed.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {/* Controls: Search & Filters */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              marginBottom: '3rem',
              border: '1px solid var(--border-light)',
            }}
          >
            <div className="grid grid-cols-2 gap-4 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '1.25rem' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search past honorees by founder name, business, sector, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', background: '#FFFFFF' }}
                />
                <Search
                  size={18}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {/* Year Filter Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
                  Filter Year:
                </span>
                {years.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    className={`btn btn-sm ${selectedYear === yr ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ borderRadius: 'var(--radius-pill)', padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.3rem' }}>
                Industry Sector:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--color-burgundy)' : 'var(--border-light)',
                    background: selectedCategory === cat ? 'var(--color-burgundy)' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary & Reset */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Showing {filteredWinners.length} verified past honoree profiles {selectedYear !== 'All' ? `(${selectedYear} Edition)` : ''} {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''}
            </span>
            {(selectedYear !== 'All' || selectedCategory !== 'All' || searchTerm !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedYear('All');
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}
                style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Winners Preview Grid */}
          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '4rem' }}>
            {filteredWinners.map((winner, idx) => (
              <WinnerCard key={idx} {...winner} />
            ))}
          </div>

          {/* Honoree Testimonial Strip */}
          <div
            className="fem-card"
            style={{
              padding: '3rem 2.5rem',
              marginBottom: '4rem',
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

          {/* Official Digitization Notice (EmptyState Guarantee) */}
          <EmptyState
            badge="Official Archive Synchronization"
            title="Complete Historical Records Currently Being Digitized"
            description="Verified honoree records for past editions (2022 BSE Mumbai, 2023 AMA Ahmedabad, 2024 BSE Mumbai, 2025 DevX Ahmedabad) are continuously being digitized from the 1MEIF secretariat archives. If you are an honored past winner requesting profile adjustments or story links, please connect with our team."
            actionText="Submit Past Winner Verification"
            actionTo="/contact"
          />

          {/* Next Edition Callout */}
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

