import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mic } from 'lucide-react';
import CTAButton from './CTAButton';
import { fetchPublicSpeakers, resolveAdminAssetUrl } from '../services/api';

const SPEAKER_CARD_BG = 'linear-gradient(135deg, #4A126D 0%, #6A1B9A 100%)';

const OFFICIAL_SPEAKERS = [
  { name: 'Pabiben Rabari', designation: 'Founder & Entrepreneur – Pabiben.com', bg: SPEAKER_CARD_BG, src: '/images/speakers/pabiben-rabari.png' },
  { name: 'Beena Handa', designation: 'Founder & Director, Poiesis Achievement Foundation', bg: SPEAKER_CARD_BG, src: '/images/speakers/beena-handa.png' },
  { name: 'Kalpana Rao', designation: 'Actress, Motivational Speaker & TEDx Speaker', bg: SPEAKER_CARD_BG, src: '/images/speakers/kalpana-rao.png' },
  { name: 'Dr. Manisha Gaur', designation: 'Speaker | Life Coach | NLP Master Trainer | Content Creator | Peace Activist', bg: SPEAKER_CARD_BG, src: '/images/speakers/dr-manisha-gaur.png' },
  { name: 'Shraddha Musale', designation: 'Founder - FutureTayari | Actress, Model & Entrepreneur', bg: SPEAKER_CARD_BG, src: '/images/speakers/shraddha-musale.png' },
  { name: 'Suhani Shah', designation: 'Mentalist, Magician & YouTuber', bg: SPEAKER_CARD_BG, src: '/images/speakers/suhani-shah.png' },
  { name: 'Sapna Vyas Patel', designation: 'Health & Life Coach, Fitness Influencer, Actress & Motivational Speaker', bg: SPEAKER_CARD_BG, src: '/images/speakers/sapna-vyas-patel.png' },
  { name: 'Aarya Chavda', designation: 'Author, Illustrator, Speaker & Heritage and Environment Crusader', bg: SPEAKER_CARD_BG, src: '/images/speakers/aarya-chavda.png' },
  { name: 'Ananya Maloo', designation: 'Co-Founder, Nuutjob', bg: SPEAKER_CARD_BG, src: '/images/speakers/ananya-maloo.png' },
  { name: 'Dr. Hina Shah', designation: 'Founder-Director, ICECD – International Centre for Entrepreneurship and Career Development', bg: SPEAKER_CARD_BG, src: '/images/speakers/dr-hina-shah.png' },
  { name: 'Tanvvi Rathod', designation: 'Image Consultant | Personal Branding Expert', bg: SPEAKER_CARD_BG, src: '/images/speakers/tanvvi-rathod.png' },
  { name: 'Dr. Ruby Bakshi Khurdi', designation: 'Founder & Educator, RBK Academy Swiss', bg: SPEAKER_CARD_BG, src: '/images/speakers/dr-ruby-bakshi-khurdi.png' },
  { name: 'Namrata Thakker', designation: 'Founder & Business Coach, Entrepreneur Excel', bg: SPEAKER_CARD_BG, src: '/images/speakers/namrata-thakker.png' },
  { name: 'Neha Lal', designation: 'Associate Vice President, Adani Group', bg: SPEAKER_CARD_BG, src: '/images/speakers/neha-lal.png' },
  { name: 'Tanya Singh', designation: 'Founder/Partner @30minuteUniversity', bg: SPEAKER_CARD_BG, src: '/images/speakers/tanya-singh.png' },
];

/**
 * Peers Global-style continuous auto-scrolling marquee slider
 * featuring speaker portraits, names, and designations.
 */
export default function SponsorShowcase() {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState(OFFICIAL_SPEAKERS);

  useEffect(() => {
    let mounted = true;
    fetchPublicSpeakers().then((rows) => {
      if (!mounted || !Array.isArray(rows) || rows.length === 0) return;
      setSpeakers(
        rows.map((row) => ({
          name: row.name,
          designation: row.designation ? `${row.designation}${row.company ? ` • ${row.company}` : ''}` : row.company || '',
          bg: SPEAKER_CARD_BG,
          src: row.photo_url ? resolveAdminAssetUrl(row.photo_url) : '',
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
                {speaker.src ? (
                  <img
                    src={speaker.src}
                    alt={speaker.name}
                    className="fem-speaker-large-photo"
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(180deg, #F3E8FA 0%, #E7D4F5 100%)',
                    }}
                  />
                )}
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
