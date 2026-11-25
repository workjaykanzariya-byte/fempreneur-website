import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Trophy } from 'lucide-react';
import WinnerCard from './WinnerCard';
import CTAButton from './CTAButton';
import { allWinners } from '../data/winnersData';
import { getWinnerPhoto } from '../data/winnerPhotos';
import { fetchPublicWinners, mergeWinnersWithStatic } from '../services/api';

const ALLOWED_YEARS = ['2022'];

/**
 * HallOfFameSection Component
 * Continuous auto-scrolling center-focus 3D depth carousel displaying all 2022 winners
 * and dynamically added/synced winners from the Admin Panel
 * with touch/mouse swipe, wheel scroll, arrow navigation, and clickable pagination dots.
 */
export default function HallOfFameSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dbWinners, setDbWinners] = useState([]);
  const dragStartX = useRef(null);
  const wheelLock = useRef(false);

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

  const allAllowedWinners = useMemo(() => {
    const merged = mergeWinnersWithStatic(dbWinners, allWinners);
    return merged
      .filter((winner) => winner.isDynamic || ALLOWED_YEARS.includes(winner.year))
      .map((winner) => ({
        ...winner,
        image: winner.image || getWinnerPhoto(winner.name),
      }))
      .filter((winner) => winner.isDynamic || Boolean(winner.image));
  }, [dbWinners]);

  const total = allAllowedWinners.length;

  // Reliable automatic carousel advance across all 2022 winners
  useEffect(() => {
    if (isDragging || total <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
  }, 1800);
  return () => clearInterval(timer);
  }, [isDragging, total]);

const goPrev = () => {
  if (total === 0) return;
  setActiveIndex((prev) => (prev - 1 + total) % total);
};

const goNext = () => {
  if (total === 0) return;
  setActiveIndex((prev) => (prev + 1) % total);
};

const handlePointerDown = (e) => {
  dragStartX.current = e.clientX;
  setIsDragging(true);
};

const handlePointerUp = (e) => {
  if (dragStartX.current !== null) {
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 35) {
      if (diff < 0) goNext();
      else goPrev();
    }
  }
  dragStartX.current = null;
  setIsDragging(false);
};

const handleWheel = (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
    e.preventDefault();
    if (wheelLock.current) return;
    wheelLock.current = true;
    if (e.deltaX > 0) goNext();
    else goPrev();
    setTimeout(() => {
      wheelLock.current = false;
    }, 320);
  }
};

const visibleSlots = useMemo(() => {
  if (total === 0) return [];
  const offsets = total >= 5 ? [-2, -1, 0, 1, 2] : total >= 3 ? [-1, 0, 1] : [0];
  return offsets.map((offset) => {
    const idx = (activeIndex + offset + total) % total;
    return {
      offset,
      idx,
      winner: allAllowedWinners[idx],
    };
  });
}, [activeIndex, total, allAllowedWinners]);

const dotCount = Math.min(total, 9);
const activeDot = total <= 1 ? 0 : Math.round((activeIndex / (total - 1)) * (dotCount - 1));

return (
  <section
    className="section-spacing"
    style={{
      position: 'relative',
      background: 'radial-gradient(ellipse 90% 80% at 75% 45%, #3B0447 0%, #20022B 45%, #100118 100%)',
      borderTop: '1px solid rgba(233, 30, 99, 0.25)',
      borderBottom: '1px solid rgba(233, 30, 99, 0.25)',
      color: '#FFFFFF',
      overflow: 'hidden',
    }}
  >
    <style>{`
        .fem-hof-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .fem-hof-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 9999px;
          background: rgba(35, 5, 50, 0.85);
          border: 1.5px solid rgba(233, 30, 99, 0.5);
          color: #F8BBD0;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .fem-hof-heading {
          font-size: clamp(1.85rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin-bottom: 0.45rem;
        }
        .fem-hof-heading-accent {
          background: linear-gradient(135deg, #FF4081 0%, #E91E63 50%, #F48FB1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .fem-hof-subtitle {
          font-size: 0.98rem;
          color: rgba(255, 255, 255, 0.82);
          max-width: 560px;
          line-height: 1.55;
        }
        .fem-hof-stage {
          position: relative;
          max-width: 1320px;
          margin: 0 auto;
          padding: 1.25rem 0 1.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
        }
        .fem-hof-track-3d {
          position: relative;
          width: 100%;
          height: 510px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fem-hof-card-slot {
          position: absolute;
          width: 310px;
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.42s ease, filter 0.42s ease;
          cursor: grab;
          user-select: none;
        }
        .fem-hof-card-slot:active {
          cursor: grabbing;
        }
        .fem-hof-card-slot.slot-0 {
          z-index: 5;
          transform: translateX(0) scale(1.04);
          opacity: 1;
          filter: none;
        }
        .fem-hof-card-slot.slot-0 > .fem-ref-winner-card {
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.55), 0 0 0 2px rgba(255, 64, 129, 0.45);
        }
        .fem-hof-card-slot.slot--1 {
          z-index: 4;
          transform: translateX(-290px) scale(0.86);
          opacity: 0.78;
          filter: saturate(0.85);
        }
        .fem-hof-card-slot.slot-1 {
          z-index: 4;
          transform: translateX(290px) scale(0.86);
          opacity: 0.78;
          filter: saturate(0.85);
        }
        .fem-hof-card-slot.slot--2 {
          z-index: 3;
          transform: translateX(-540px) scale(0.74);
          opacity: 0.45;
          filter: saturate(0.7);
        }
        .fem-hof-card-slot.slot-2 {
          z-index: 3;
          transform: translateX(540px) scale(0.74);
          opacity: 0.45;
          filter: saturate(0.7);
        }
        .fem-hof-card-slot:not(.slot-0):hover {
          opacity: 0.95;
        }
        .fem-hof-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 12;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          background: rgba(32, 2, 43, 0.85);
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4);
          transition: all 0.2s ease;
        }
        .fem-hof-arrow-btn:hover {
          background: linear-gradient(135deg, #6A1B9A 0%, #E91E63 100%);
          border-color: transparent;
        }
        .fem-hof-arrow-prev { left: 1rem; }
        .fem-hof-arrow-next { right: 1rem; }
        .fem-hof-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          margin-top: 0.5rem;
        }
        .fem-hof-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.28);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .fem-hof-dot.active {
          width: 24px;
          background: linear-gradient(90deg, #FF4081 0%, #E91E63 100%);
        }
        @media (max-width: 1120px) {
          .fem-hof-card-slot.slot--2,
          .fem-hof-card-slot.slot-2 {
            opacity: 0;
            pointer-events: none;
          }
          .fem-hof-card-slot.slot--1 { transform: translateX(-240px) scale(0.84); }
          .fem-hof-card-slot.slot-1 { transform: translateX(240px) scale(0.84); }
        }
        @media (max-width: 680px) {
          .fem-hof-track-3d { height: 470px; }
          .fem-hof-card-slot { width: 280px; }
          .fem-hof-card-slot.slot--1 { transform: translateX(-160px) scale(0.8); opacity: 0.35; }
          .fem-hof-card-slot.slot-1 { transform: translateX(160px) scale(0.8); opacity: 0.35; }
          .fem-hof-arrow-prev { left: 0.35rem; }
          .fem-hof-arrow-next { right: 0.35rem; }
        }
      `}</style>

    <div className="container">
      {/* Header Row with View All Winners Button Near Heading */}
      <div className="fem-hof-header-row">
        <div>
          <div className="fem-hof-pill">
            <Trophy size={13} color="#FF80AB" />
            <span>Hall of Fame</span>
          </div>
          <h2 className="fem-hof-heading">
            Celebrating Previous <span className="fem-hof-heading-accent">Honorees</span>
          </h2>
          <p className="fem-hof-subtitle">
            Spotlighting women founders recognized in our 2022 edition.
          </p>
        </div>

        <CTAButton to="/winners" variant="primary" size="lg" icon={ArrowRight}>
          View All Winners
        </CTAButton>
      </div>

      {/* Center-Focus Continuous Auto-Scrolling & Swipeable 3D Carousel */}
      <div
        className="fem-hof-stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
          setIsDragging(false);
        }}
        onWheel={handleWheel}
      >
        <button
          type="button"
          className="fem-hof-arrow-btn fem-hof-arrow-prev"
          onClick={goPrev}
          aria-label="Previous winner"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="fem-hof-track-3d">
          {visibleSlots.map(({ offset, idx, winner }) => (
            <div
              key={`winner-${idx}`}
              className={`fem-hof-card-slot slot-${offset}`}
              onClick={() => setActiveIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIndex(idx);
              }}
            >
              <WinnerCard
                name={winner.name}
                company={winner.company}
                category={winner.category}
                awardTitle={winner.awardTitle}
                awardPosition={winner.awardPosition}
                image={winner.image}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="fem-hof-arrow-btn fem-hof-arrow-next"
          onClick={goNext}
          aria-label="Next winner"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Carousel Pagination Dots */}
      {dotCount > 1 && (
        <div className="fem-hof-dots" aria-label="Carousel pagination">
          {Array.from({ length: dotCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`fem-hof-dot ${activeDot === idx ? 'active' : ''}`}
              onClick={() => {
                if (total > 1) {
                  setActiveIndex(Math.round((idx / (dotCount - 1)) * (total - 1)));
                }
              }}
              aria-label={`Go to winner slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  </section>
);
}
