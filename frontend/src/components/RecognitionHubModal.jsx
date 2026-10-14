import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Trophy, 
  Sparkles, 
  Search, 
  CalendarClock, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import WinnerCard from './WinnerCard';
import { allWinners } from '../data/winnersData';
import { allCategories, domains } from '../data/categoriesData';
import { getWinnerPhoto } from '../data/winnerPhotos';

/**
 * RecognitionHubModal Component
 * Ultra-professional on-page modal that displays both:
 * 1. Honoree Winners (2022–2026) with uniform portrait cards
 * 2. 35–40+ Award Categories with domain filters and instant search
 * 
 * Allows users to browse without redirecting to a second page.
 */
export default function RecognitionHubModal({
  isOpen,
  initialTab = 'winners',
  onClose,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedYear, setSelectedYear] = useState('2022');
  const [winnerSearch, setWinnerSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const modalContentRef = useRef(null);

  // Sync activeTab when initialTab changes on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialTab]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Past Editions list matching the reference design
  const pastEditions = [
    { year: '2026', label: 'Awards Winners 2026' },
    { year: '2025', label: 'Awards Winners 2025' },
    { year: '2024', label: 'Awards Winners 2024' },
    { year: '2023', label: 'Awards Winners 2023' },
    { year: '2022', label: 'Awards Winners 2022' },
  ];

  // Filtered Winners
  const filteredWinners = useMemo(() => {
    const yearList = allWinners
      .filter((w) => w.year === selectedYear)
      .map((w) => ({
        ...w,
        image: w.image || getWinnerPhoto(w.name),
      }));

    if (!winnerSearch.trim()) return yearList;

    const query = winnerSearch.toLowerCase().trim();
    return yearList.filter(
      (w) =>
        (w.name && w.name.toLowerCase().includes(query)) ||
        (w.category && w.category.toLowerCase().includes(query)) ||
        (w.awardTitle && w.awardTitle.toLowerCase().includes(query)) ||
        (w.company && w.company.toLowerCase().includes(query))
    );
  }, [selectedYear, winnerSearch]);

  // Filtered Categories
  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      const matchesDomain =
        selectedDomain === 'ALL' || cat.domain === selectedDomain;
      const matchesSearch =
        !categorySearch.trim() ||
        cat.name.toLowerCase().includes(categorySearch.toLowerCase().trim()) ||
        cat.code.toLowerCase().includes(categorySearch.toLowerCase().trim()) ||
        (cat.description &&
          cat.description.toLowerCase().includes(categorySearch.toLowerCase().trim()));
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, categorySearch]);

  if (!isOpen) return null;

  return (
    <div
      className="fem-hub-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <style>{`
        .fem-hub-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(14, 2, 23, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: femHubFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes femHubFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes femHubScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .fem-hub-modal-dialog {
          background: #FFFFFF;
          width: 100%;
          max-width: 1360px;
          height: 92vh;
          border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(233, 30, 99, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: femHubScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Sticky Top Header */
        .fem-hub-header {
          background: linear-gradient(135deg, #1C032B 0%, #2A063E 50%, #170224 100%);
          color: #FFFFFF;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          border-bottom: 2px solid rgba(233, 30, 99, 0.35);
          flex-shrink: 0;
          position: relative;
        }

        .fem-hub-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .fem-hub-brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #8E24AA, #E91E63);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(233, 30, 99, 0.45);
          flex-shrink: 0;
        }

        .fem-hub-brand-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
          font-family: var(--font-display, 'Outfit', sans-serif);
        }

        .fem-hub-brand-sub {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 2px;
        }

        /* Seamless Tab Switcher */
        .fem-hub-tabs {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .fem-hub-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.6rem 1.45rem;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.8);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .fem-hub-tab-btn:hover {
          color: #FFFFFF;
        }

        .fem-hub-tab-btn.active {
          background: linear-gradient(135deg, #8E24AA 0%, #D81B60 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 18px rgba(216, 27, 96, 0.5);
        }

        .fem-hub-tab-count {
          background: rgba(255, 255, 255, 0.22);
          font-size: 0.72rem;
          padding: 2px 7px;
          border-radius: 9999px;
          font-weight: 800;
        }

        .fem-hub-close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .fem-hub-close-btn:hover {
          background: #E91E63;
          border-color: #E91E63;
          transform: rotate(90deg);
        }

        /* Modal Scrollable Body */
        .fem-hub-body {
          flex: 1;
          overflow-y: auto;
          background: #FDFBFE;
          padding: 2rem 2.5rem 3rem;
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        .fem-hub-body::-webkit-scrollbar {
          width: 8px;
        }
        .fem-hub-body::-webkit-scrollbar-track {
          background: #F3ECF7;
        }
        .fem-hub-body::-webkit-scrollbar-thumb {
          background: #C49CCF;
          border-radius: 4px;
        }
        .fem-hub-body::-webkit-scrollbar-thumb:hover {
          background: #8E24AA;
        }

        /* Top Action Bar (Year selector / Domain filters + Search) */
        .fem-hub-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        /* Search Input */
        .fem-hub-search-box {
          position: relative;
          min-width: 280px;
          max-width: 360px;
          flex: 1;
        }

        .fem-hub-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: 9999px;
          border: 1.5px solid #D7C4DF;
          background: #FFFFFF;
          font-size: 0.92rem;
          color: #1C1224;
          outline: none;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(106, 27, 154, 0.04);
        }

        .fem-hub-search-input:focus {
          border-color: #8E24AA;
          box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.15);
        }

        .fem-hub-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #8E24AA;
          pointer-events: none;
        }

        /* Domain Filter Pills */
        .fem-hub-domains {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          max-width: 100%;
        }

        .fem-hub-domain-pill {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1.5px solid #D7C4DF;
          background: #FFFFFF;
          color: #4C3C56;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .fem-hub-domain-pill:hover {
          border-color: #8E24AA;
          color: #8E24AA;
          background: #FAF6FC;
        }

        .fem-hub-domain-pill.active {
          background: #6A1B9A;
          border-color: #6A1B9A;
          color: #FFFFFF;
          box-shadow: 0 3px 12px rgba(106, 27, 154, 0.25);
        }

        /* Category Card Grid */
        .fem-hub-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .fem-hub-cat-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid rgba(106, 27, 154, 0.12);
          padding: 1.65rem 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(40, 10, 50, 0.04);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
        }

        .fem-hub-cat-card:hover {
          transform: translateY(-5px);
          border-color: #8E24AA;
          box-shadow: 0 16px 36px rgba(106, 27, 154, 0.16);
        }

        .fem-hub-cat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .fem-hub-cat-code {
          font-size: 0.72rem;
          font-weight: 800;
          color: #8E24AA;
          background: #F3E5F5;
          padding: 3px 9px;
          border-radius: 9999px;
          letter-spacing: 0.06em;
        }

        .fem-hub-cat-domain {
          font-size: 0.72rem;
          font-weight: 700;
          color: #E91E63;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .fem-hub-cat-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1C1224;
          margin: 0 0 0.65rem;
          line-height: 1.35;
          font-family: var(--font-display, 'Outfit', sans-serif);
        }

        .fem-hub-cat-desc {
          font-size: 0.88rem;
          color: #555555;
          line-height: 1.55;
          margin-bottom: 1.35rem;
          flex: 1;
        }

        .fem-hub-cat-footer {
          border-top: 1px solid #F3ECF7;
          padding-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .fem-hub-cat-badge {
          font-size: 0.75rem;
          color: #6A1B9A;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .fem-hub-cat-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #E91E63;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .fem-hub-cat-btn:hover {
          color: #8E24AA;
          transform: translateX(3px);
        }

        /* Mobile Breakpoints */
        @media (max-width: 1024px) {
          .fem-hub-cat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .fem-hub-modal-overlay {
            padding: 0.75rem;
          }
          .fem-hub-modal-dialog {
            height: 96vh;
            border-radius: 16px;
          }
          .fem-hub-header {
            padding: 1rem 1.25rem;
            flex-wrap: wrap;
          }
          .fem-hub-tabs {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 0.5rem;
          }
          .fem-hub-tab-btn {
            flex: 1;
            justify-content: center;
            padding: 0.5rem 0.85rem;
            font-size: 0.82rem;
          }
          .fem-hub-body {
            padding: 1.25rem 1rem 2.5rem;
          }
          .fem-hub-cat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="fem-hub-modal-dialog" ref={modalContentRef}>
        {/* 1. STICKY TOP BRAND HEADER & TAB SWITCHER */}
        <div className="fem-hub-header">
          <div className="fem-hub-brand">
            <div className="fem-hub-brand-icon">
              <Trophy size={22} />
            </div>
            <div>
              <h2 className="fem-hub-brand-title">Fempreneur Recognition Hub</h2>
              <div className="fem-hub-brand-sub">
                Celebrating India’s Leading Women Entrepreneurs • Dual City Edition
              </div>
            </div>
          </div>

          {/* Primary View Switcher: Winners vs Categories */}
          <div className="fem-hub-tabs">
            <button
              type="button"
              className={`fem-hub-tab-btn ${activeTab === 'winners' ? 'active' : ''}`}
              onClick={() => setActiveTab('winners')}
            >
              <Trophy size={16} />
              <span>Honoree Winners</span>
              <span className="fem-hub-tab-count">2022–2026</span>
            </button>
            <button
              type="button"
              className={`fem-hub-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <Sparkles size={16} />
              <span>Award Categories</span>
              <span className="fem-hub-tab-count">40</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            className="fem-hub-close-btn"
            onClick={onClose}
            title="Close (Esc)"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. SCROLLABLE BODY */}
        <div className="fem-hub-body">
          {/* ========================================================
              TAB 1: HONOREE WINNERS VIEW
              ======================================================== */}
          {activeTab === 'winners' && (
            <div>
              {/* Year Selection Row (Matching the reference design with 5 cards) */}
              <div className="fem-ref-year-row" style={{ marginBottom: '1.75rem' }}>
                {pastEditions.map((ed) => {
                  const isSelected = selectedYear === ed.year;
                  return (
                    <button
                      key={ed.year}
                      type="button"
                      onClick={() => setSelectedYear(ed.year)}
                      className="fem-ref-year-btn"
                      style={{
                        position: 'relative',
                        background: isSelected ? '#6A1B9A' : '#FFFFFF',
                        border: '1.5px solid #6A1B9A',
                        borderRadius: '8px',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected
                          ? '0 6px 18px rgba(106, 27, 154, 0.28)'
                          : '0 2px 6px rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      <CalendarClock size={24} color={isSelected ? '#FFFFFF' : '#6A1B9A'} />
                      <span
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          color: isSelected ? '#FFFFFF' : '#1C1224',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Awards Winners {ed.year}
                      </span>

                      {/* Speech-bubble Downward Pointer on Active Card */}
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-10px',
                            left: '20px',
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '10px solid #6A1B9A',
                            filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Toolbar: Search input + Results summary */}
              <div className="fem-hub-toolbar">
                <div className="fem-hub-search-box">
                  <Search size={18} className="fem-hub-search-icon" />
                  <input
                    type="text"
                    placeholder={`Search ${selectedYear} winners by name, category, or business...`}
                    value={winnerSearch}
                    onChange={(e) => setWinnerSearch(e.target.value)}
                    className="fem-hub-search-input"
                  />
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6A1B9A', fontWeight: 700 }}>
                  Showing {filteredWinners.length} Honorees for {selectedYear}
                </div>
              </div>

              {/* 2026 Archive Notice State */}
              {selectedYear === '2026' ? (
                <div
                  style={{
                    padding: '3.5rem 2rem',
                    textAlign: 'center',
                    background: '#FAF6FC',
                    borderRadius: '16px',
                    border: '1.5px dashed #D1B3E0',
                    margin: '1.5rem 0 3rem',
                  }}
                >
                  <CalendarClock size={40} color="#6A1B9A" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.5rem' }}>
                    Fempreneur Awards 2026
                  </h3>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#6A1B9A', marginBottom: '0.75rem' }}>
                    2026 Honoree Records Currently Being Digitized
                  </h4>
                  <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', color: '#555555', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Verified honoree records, citations, and photo galleries for the 2026 edition are continuously being digitized and verified from the 1MEIF secretariat archives.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="fem-stage-btn-gradient"
                      style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem' }}
                    >
                      Submit Winner Verification
                    </Link>
                    <Link
                      to="/nominate"
                      onClick={onClose}
                      className="fem-stage-btn-outline"
                      style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem', color: '#6A1B9A', borderColor: '#6A1B9A' }}
                    >
                      Nominate for Upcoming Awards
                    </Link>
                  </div>
                </div>
              ) : filteredWinners.length > 0 ? (
                /* Uniform Winner Cards Grid */
                <div className="fem-ref-winner-grid">
                  {filteredWinners.map((winner, idx) => (
                    <WinnerCard key={`${winner.name}-${idx}`} {...winner} />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    background: '#FAF6FC',
                    borderRadius: '12px',
                    border: '1px dashed #D1B3E0',
                    margin: '1rem 0',
                  }}
                >
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.35rem' }}>
                    No Winners Found Matching "{winnerSearch}"
                  </h4>
                  <p style={{ color: '#666666', fontSize: '0.88rem' }}>
                    Try searching for another name or keyword, or clear the search input.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 2: 35+ AWARD CATEGORIES VIEW
              ======================================================== */}
          {activeTab === 'categories' && (
            <div>
              {/* Domain Pills Filter & Search Toolbar */}
              <div className="fem-hub-toolbar">
                <div className="fem-hub-domains">
                  {domains.map((dom) => (
                    <button
                      key={dom}
                      type="button"
                      onClick={() => setSelectedDomain(dom)}
                      className={`fem-hub-domain-pill ${selectedDomain === dom ? 'active' : ''}`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>

                <div className="fem-hub-search-box">
                  <Search size={18} className="fem-hub-search-icon" />
                  <input
                    type="text"
                    placeholder="Search 40 categories by keyword..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="fem-hub-search-input"
                  />
                </div>
              </div>

              {/* Categories Cards Grid */}
              {filteredCategories.length > 0 ? (
                <div className="fem-hub-cat-grid">
                  {filteredCategories.map((cat) => (
                    <div key={cat.code} className="fem-hub-cat-card">
                      <div className="fem-hub-cat-header">
                        <span className="fem-hub-cat-code">{cat.code}</span>
                        <span className="fem-hub-cat-domain">{cat.domain}</span>
                      </div>
                      <h3 className="fem-hub-cat-title">{cat.name}</h3>
                      <p className="fem-hub-cat-desc">{cat.description}</p>
                      <div className="fem-hub-cat-footer">
                        <span className="fem-hub-cat-badge">
                          <CheckCircle2 size={14} color="#6A1B9A" />
                          <span>50/50 Dual Engine</span>
                        </span>
                        <Link
                          to={`/nominate?category=${encodeURIComponent(cat.name)}`}
                          onClick={onClose}
                          className="fem-hub-cat-btn"
                        >
                          <span>Nominate</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    background: '#FAF6FC',
                    borderRadius: '12px',
                    border: '1px dashed #D1B3E0',
                    margin: '1rem 0',
                  }}
                >
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1224', marginBottom: '0.35rem' }}>
                    No Categories Found Matching "{categorySearch}"
                  </h4>
                  <p style={{ color: '#666666', fontSize: '0.88rem' }}>
                    Try choosing another domain pill or clearing the search query.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
