import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  CheckCircle2,
  Quote,
  Award,
} from 'lucide-react';
import { WinnerCard, CTAButton } from '../components';
import { getWinnerPhoto } from '../data/winnerPhotos';
import { allWinners } from '../data/winnersData';
import { fetchPublicWinners, mergeWinnersWithStatic } from '../services/api';

export default function WinnersPage() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dbWinners, setDbWinners] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchPublicWinners().then((rows) => {
      if (mounted && Array.isArray(rows)) {
        setDbWinners(rows);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const combinedWinners = useMemo(
    () => mergeWinnersWithStatic(dbWinners, allWinners),
    [dbWinners]
  );

  const pastEditions = useMemo(() => {
    const base = [
      { year: '2026', label: 'Awards Winners 2026' },
      { year: '2025', label: 'Awards Winners 2025' },
      { year: '2024', label: 'Awards Winners 2024' },
      { year: '2023', label: 'Awards Winners 2023' },
      { year: '2022', label: 'Awards Winners 2022' },
    ];
    const has2027 = combinedWinners.some((w) => w.year === '2027');
    return has2027
      ? [{ year: '2027', label: 'Awards Winners 2027' }, ...base]
      : base;
  }, [combinedWinners]);

  const yearWinners = useMemo(() => {
    return combinedWinners
      .filter((winner) => winner.year === selectedYear)
      .map((winner) => ({
        ...winner,
        image: winner.image || getWinnerPhoto(winner.name),
      }))
      .filter((winner) => winner.isDynamic || winner.year === '2025' || Boolean(winner.image));
  }, [combinedWinners, selectedYear]);


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
                    display: ed.year === '2026' ? 'none' : 'flex',
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
          {selectedYear === '2026' && yearWinners.length === 0 ? (
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
          ) : yearWinners.length > 0 ? (
            /* Reference Portrait Winner Cards Grid (Clean, Modern, Evenly Spaced 4-Column Grid) */
            <div className="fem-ref-winner-grid" style={{ marginTop: '2.5rem' }}>
              {yearWinners.map((winner, idx) => (
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
            className="fem-card fem-winners-testimonial-card"
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
            className="fem-winners-callout"
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

