import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ExternalLink,
  Award,
  Video,
  Radio,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import CTAButton from './CTAButton';

export default function VideoPlayerModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('reel'); // 'reel' | 'youtube' | 'highlights'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [youtubeVideoId, setYoutubeVideoId] = useState('pV54jh2Q0Vg');
  const timerRef = useRef(null);

  // Cinematic scenes using authentic Fempreneur event photography
  const scenes = [
    {
      title: "Fempreneur Annual Summit & Awards Ceremony",
      location: "Mumbai Stage Showcase",
      image: "/images/categories/award-categories-real.png",
      caption: "Celebrating 40+ category winners with signature 'F' trophies on the Mumbai stage.",
      duration: 6,
    },
    {
      title: "Women Entrepreneurs Felicitation & Trophies",
      location: "National Stage Felicitation",
      image: "/images/awards/awards-stage-winners-clean.png",
      caption: "Empowering female founders across manufacturing, tech, retail, and grassroots sectors.",
      duration: 6,
    },
    {
      title: "Fempreneur Community Growth & Masterclasses",
      location: "Ahmedabad & Delhi NCR Chapters",
      image: "/images/blog/blog-hero-showcase.png",
      caption: "Interactive masterclasses, leadership dialogues, and peer collaboration network.",
      duration: 6,
    },
    {
      title: "Prestigious Winner Honors & Recognitions",
      location: "Grand Gala Awards",
      image: "/images/real-events/fempreneur-award-ceremony.png",
      caption: "50% independent jury evaluation combined with verified public community voting.",
      duration: 6,
    },
  ];

  // Auto-advance scenes when playing built-in reel
  useEffect(() => {
    if (!isOpen || activeTab !== 'reel' || !isPlaying) return;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSceneIdx((sc) => (sc + 1) % scenes.length);
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(timerRef.current);
  }, [isOpen, activeTab, isPlaying, scenes.length]);

  if (!isOpen) return null;

  const currentScene = scenes[currentSceneIdx];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(12, 4, 20, 0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #180326 0%, #2A0840 50%, #3D0C5A 100%)',
          borderRadius: '24px',
          border: '1.5px solid rgba(170, 75, 245, 0.35)',
          padding: '1.75rem',
          maxWidth: '860px',
          width: '100%',
          color: '#FFFFFF',
          position: 'relative',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(106, 27, 154, 0.3)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 20,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #FF4081 0%, #E040FB 100%)',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} />
            <span>Official Event Coverage</span>
          </span>
          <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>
            VyapaarJagat.com &amp; 1MEIF
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '1rem',
            lineHeight: 1.25,
            paddingRight: '3rem',
          }}
        >
          Fempreneur Awards &amp; Leadership Conference Broadcast
        </h3>

        {/* Video Mode Selector Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.15rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('reel')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'reel' ? '1.5px solid #FFD54F' : '1px solid rgba(255, 255, 255, 0.15)',
              background: activeTab === 'reel' ? 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)' : 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              transition: 'all 0.2s ease',
            }}
          >
            <Video size={15} color={activeTab === 'reel' ? '#FFD54F' : '#FFFFFF'} />
            <span>Event Video Reel (Direct)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('youtube')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'youtube' ? '1.5px solid #FFD54F' : '1px solid rgba(255, 255, 255, 0.15)',
              background: activeTab === 'youtube' ? 'linear-gradient(135deg, #FF1744 0%, #C2185B 100%)' : 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              transition: 'all 0.2s ease',
            }}
          >
            <Radio size={15} color={activeTab === 'youtube' ? '#FFD54F' : '#FFFFFF'} />
            <span>YouTube Stream</span>
          </button>

          <a
            href="https://www.youtube.com/watch?v=pV54jh2Q0Vg"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.9)',
              textDecoration: 'none',
              marginLeft: 'auto',
            }}
          >
            <span>Open on YouTube</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Video Player Box */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid rgba(170, 75, 245, 0.4)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
            background: '#0B0212',
            marginBottom: '1.25rem',
          }}
        >
          {activeTab === 'reel' ? (
            /* Direct Cinematic Event Reel Player */
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={currentScene.image}
                alt={currentScene.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 25%',
                  transition: 'opacity 0.6s ease-in-out',
                  filter: 'brightness(0.92)',
                }}
              />

              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(12, 4, 20, 0.3) 0%, rgba(12, 4, 20, 0.1) 40%, rgba(12, 4, 20, 0.85) 100%)',
                }}
              />

              {/* Top Live Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#00E676',
                    boxShadow: '0 0 10px #00E676',
                    animation: 'pulse 1.5s infinite',
                  }}
                />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                  {currentScene.location}
                </span>
              </div>

              {/* Center Big Play Button Overlay if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E040FB 0%, #7C4DFF 100%)',
                    border: '3px solid #FFFFFF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    zIndex: 10,
                  }}
                >
                  <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />
                </button>
              )}

              {/* Bottom Info & Custom Controls Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem 1.5rem',
                  background: 'linear-gradient(0deg, rgba(8, 2, 14, 0.95) 0%, rgba(8, 2, 14, 0.7) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  zIndex: 10,
                }}
              >
                {/* Scene Caption */}
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                    {currentScene.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.88)', margin: '0.2rem 0 0 0' }}>
                    {currentScene.caption}
                  </p>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #FF4081 0%, #FFD54F 100%)',
                      borderRadius: '999px',
                      transition: 'width 0.1s linear',
                    }}
                  />
                </div>

                {/* Playback Controls Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: 'none',
                        color: '#FFFFFF',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.8)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    {/* Scene Navigation Dots */}
                    <div style={{ display: 'flex', gap: '0.35rem', marginLeft: '0.5rem' }}>
                      {scenes.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setCurrentSceneIdx(i);
                            setProgress(0);
                          }}
                          style={{
                            width: currentSceneIdx === i ? '22px' : '8px',
                            height: '8px',
                            borderRadius: '999px',
                            background: currentSceneIdx === i ? '#FFD54F' : 'rgba(255, 255, 255, 0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600 }}>
                    Scene {currentSceneIdx + 1} of {scenes.length}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* YouTube Stream Embed */
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Fempreneur Official Conference & Awards Broadcast"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Modal Footer with CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Award size={18} color="#FFD54F" />
            <span style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
              Fempreneur 2027 • Ahmedabad &amp; Delhi NCR Dual-City Program
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CTAButton to="/nominate" variant="primary" size="sm" onClick={onClose}>
              Nominate for 2027
            </CTAButton>
            <CTAButton to="/events" variant="secondary" size="sm" onClick={onClose}>
              Explore Events &amp; Passes
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
