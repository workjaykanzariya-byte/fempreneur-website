import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mic } from 'lucide-react';
import CTAButton from './CTAButton';
import { fetchPublicSpeakers } from '../services/api';

const PAST_SPEAKERS = [
  {
    name: 'Dr. Kavita Mehta',
    designation: 'Keynote Speaker • AI & EdTech',
    bg: 'linear-gradient(155deg, #4A126D 0%, #6A1B9A 100%)',
    src: '/images/entrepreneurs/ananya-sharma.png',
  },
  {
    name: 'Ritu Deshmukh',
    designation: 'Industry Advisor • Design',
    bg: 'linear-gradient(155deg, #7B1FA2 0%, #9C27B0 100%)',
    src: '/images/entrepreneurs/priyanshi-shah.png',
  },
  {
    name: 'Dr. Nidhi Verma',
    designation: 'Jury Panelist • Biotech',
    bg: 'linear-gradient(155deg, #AD1457 0%, #D81B60 100%)',
    src: '/images/entrepreneurs/dr-ananya-sen.png',
  },
  {
    name: 'Meera Nair',
    designation: 'Tech Mentor • Digital Scale',
    bg: 'linear-gradient(155deg, #3B0447 0%, #5E1B7A 100%)',
    src: '/images/entrepreneurs/meera-sen.jpg',
  },
  {
    name: 'Pooja Malhotra',
    designation: 'Growth Strategist • Brand',
    bg: 'linear-gradient(155deg, #5E35B1 0%, #7E57C2 100%)',
    src: '/images/entrepreneurs/pooja-mehta.png',
  },
  {
    name: 'Radhika Iyer',
    designation: 'Policy & MSME Lead',
    bg: 'linear-gradient(155deg, #880E4F 0%, #C2185B 100%)',
    src: '/images/entrepreneurs/radhika-menon.png',
  },
  {
    name: 'Sneha Kulkarni',
    designation: 'Manufacturing Expert',
    bg: 'linear-gradient(155deg, #4A148C 0%, #6A1B9A 100%)',
    src: '/images/entrepreneurs/sneha-patel.png',
  },
  {
    name: 'Adv. Ashwini Rao',
    designation: 'Legal & Governance Advisor',
    bg: 'linear-gradient(155deg, #6A1B9A 0%, #B8257F 100%)',
    src: '/images/winners-2022/adv-ashwini-c.png',
  },
  {
    name: 'Dr. Seema Yadav',
    designation: 'Community Impact Leader',
    bg: 'linear-gradient(155deg, #311B92 0%, #512DA8 100%)',
    src: '/images/winners-2022/dr-seema-yadav.png',
  },
  {
    name: 'Pallavi Walia Raj',
    designation: 'Founder & Keynote Mentor',
    bg: 'linear-gradient(155deg, #5C287A 0%, #8E24AA 100%)',
    src: '/images/winners-2022/pallavi-walia-raj.png',
  },
];

/**
 * Peers Global-style continuous auto-scrolling marquee slider
 * featuring large human portraits, speaker names, and designations.
 */
export default function SponsorShowcase() {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState(PAST_SPEAKERS);

  useEffect(() => {
    let mounted = true;
    fetchPublicSpeakers().then((rows) => {
      if (!mounted || !Array.isArray(rows) || rows.length === 0) return;
      const bgs = [
        'linear-gradient(155deg, #4A126D 0%, #6A1B9A 100%)',
        'linear-gradient(155deg, #7B1FA2 0%, #9C27B0 100%)',
        'linear-gradient(155deg, #AD1457 0%, #D81B60 100%)',
        'linear-gradient(155deg, #3B0447 0%, #5E1B7A 100%)',
        'linear-gradient(155deg, #5E35B1 0%, #7E57C2 100%)',
        'linear-gradient(155deg, #880E4F 0%, #C2185B 100%)',
      ];
      setSpeakers(
        rows.map((row, idx) => ({
          name: row.name,
          designation: row.designation ? `${row.designation}${row.company ? ` • ${row.company}` : ''}` : row.company || '',
          bg: bgs[idx % bgs.length],
          src: row.photo_url || '/images/speakers/speakers-keynote-real.png',
        }))
      );
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      className="section-spacing-sm"
      style={{
        background: 'linear-gradient(180deg, #FAF6FC 0%, #FFFFFF 55%, #FAF6FC 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .fem-speakers-marquee-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 0.75rem 0 1.25rem;
          mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }
        .fem-speakers-marquee-track {
          display: flex;
          align-items: stretch;
          gap: 1.25rem;
          width: max-content;
          will-change: transform;
          animation: fem-speakers-scroll 42s linear infinite;
        }
        .fem-speakers-marquee-wrap:hover .fem-speakers-marquee-track {
          animation-play-state: paused;
        }
        .fem-speaker-large-card {
          width: 240px;
          border-radius: 18px;
          overflow: hidden;
          flex-shrink: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid rgba(106, 27, 154, 0.14);
          box-shadow: 0 10px 28px rgba(34, 10, 48, 0.1);
          transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease;
        }
        .fem-speaker-large-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 38px rgba(46, 8, 72, 0.2);
        }
        .fem-speaker-large-photo-box {
          width: 100%;
          height: 225px;
          overflow: hidden;
          background: #EFE4F4;
          position: relative;
        }
        .fem-speaker-large-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.35s ease;
        }
        .fem-speaker-large-card:hover .fem-speaker-large-photo {
          transform: scale(1.04);
        }
        .fem-speaker-large-footer {
          padding: 1rem 1.1rem;
          color: #FFFFFF;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .fem-speaker-large-name {
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.25;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fem-speaker-large-designation {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.88);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @keyframes fem-speakers-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .fem-speaker-large-card {
            width: 205px;
          }
          .fem-speaker-large-photo-box {
            height: 195px;
          }
        }
      `}</style>

      <div className="container" style={{ marginBottom: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span className="badge badge-plum">Trust &amp; Credibility</span>
            <h3
              style={{
                fontSize: 'clamp(1.45rem, 2.5vw, 1.85rem)',
                fontWeight: 800,
                color: 'var(--color-plum-deep)',
                marginTop: '0.4rem',
              }}
            >
              Our Speakers
            </h3>
          </div>
          <CTAButton to="/speakers" variant="primary" size="md" icon={ArrowRight}>
            All Speakers
          </CTAButton>
        </div>
      </div>

      <div className="fem-speakers-marquee-wrap">
        <div className="fem-speakers-marquee-track">
          {[...speakers, ...speakers].map((speaker, idx) => (
            <div
              key={idx}
              className="fem-speaker-large-card"
              onClick={() => navigate('/speakers')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate('/speakers');
              }}
            >
              <div className="fem-speaker-large-photo-box">
                <img
                  src={speaker.src}
                  alt={speaker.name}
                  className="fem-speaker-large-photo"
                  loading="lazy"
                />
              </div>
              <div className="fem-speaker-large-footer" style={{ background: speaker.bg }}>
                <div className="fem-speaker-large-name">{speaker.name}</div>
                <div className="fem-speaker-large-designation">
                  <Mic size={12} style={{ flexShrink: 0 }} />
                  <span>{speaker.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
