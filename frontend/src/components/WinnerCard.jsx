import React from 'react';
import { Store, Trophy } from 'lucide-react';
import { getWinnerPhotoConfig } from '../data/winnerPhotos';

/**
 * WinnerCard Component
 * Displays award winner with reference design matching the exact uploaded spec:
 * - Large Portrait photo with clean rounded top corners
 * - Prominent Winner Name
 * - Store/Shop Business Name with purple Store icon and vertical divider
 * - Award Category in soft pill container with Trophy icon and vertical divider
 */
export default function WinnerCard({
  name,
  company,
  category,
  awardTitle,
  awardPosition,
  image,
  objectPosition,
  className = '',
}) {
  const displayCategory = category || awardTitle;
  const photoConfig = getWinnerPhotoConfig(name);
  const resolvedImage = image || photoConfig.src;
  const resolvedPosition = objectPosition || photoConfig.objectPosition || 'center center';

  // Check if business name exists and is distinct from the winner's own name
  const hasBusinessName =
    company &&
    company.trim().length > 0 &&
    company.trim().toLowerCase() !== (name || '').trim().toLowerCase();

  return (
    <div className={`fem-ref-winner-card ${className}`}>
      {/* 1. Large Portrait Photo Area */}
      <div className="fem-ref-winner-photo-wrapper" style={{ position: 'relative' }}>
        {resolvedImage ? (
          <img
            src={resolvedImage}
            alt={name}
            className="fem-ref-winner-photo"
            style={{ objectPosition: resolvedPosition }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextSibling) {
                e.currentTarget.nextSibling.style.display = 'flex';
              }
            }}
          />
        ) : null}

        {/* Fallback avatar placeholder if no image exists or if image fails to load */}
        <div
          className="fem-ref-winner-photo-placeholder"
          style={{
            display: resolvedImage ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            background: 'linear-gradient(145deg, #FAF5FC 0%, #EFE4F4 100%)',
            color: '#6A1B9A',
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '1px',
            fontFamily: 'var(--font-display, "Inter", sans-serif)',
          }}
        >
          {name
            ? name
                .split(' ')
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase()
            : 'F'}
        </div>

        {/* Badge if 1st Runner-up or 2nd Runner-up */}
        {awardPosition ? (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background:
                awardPosition === '1st Runner-up'
                  ? 'linear-gradient(135deg, #B388FF 0%, #6A1B9A 100%)'
                  : 'linear-gradient(135deg, #CE93D8 0%, #4A148C 100%)',
              color: '#FFFFFF',
              fontSize: '0.74rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              letterSpacing: '0.02em',
              zIndex: 2,
            }}
          >
            {awardPosition}
          </span>
        ) : null}
      </div>

      {/* 2. Winner Information Body */}
      <div className="fem-ref-winner-body">
        {/* Prominent Winner Name */}
        <h3 className="fem-ref-winner-name">{name}</h3>

        {/* Business Name with Store Icon and Divider (matching reference image) */}
        {hasBusinessName ? (
          <div className="fem-ref-winner-business-row">
            <Store className="fem-ref-business-icon" size={20} strokeWidth={2.2} />
            <span className="fem-ref-divider">|</span>
            <span className="fem-ref-business-text">{company}</span>
          </div>
        ) : null}

        {/* Award Category Pill with Trophy Icon and Divider (matching reference image) */}
        {displayCategory ? (
          <div className="fem-ref-winner-category-pill">
            <Trophy className="fem-ref-trophy-icon" size={22} strokeWidth={2} />
            <span className="fem-ref-divider">|</span>
            <div className="fem-ref-category-text">{displayCategory}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
