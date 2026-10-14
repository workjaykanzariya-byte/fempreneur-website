import React from 'react';

/**
 * WinnerCard Component
 * Displays award winner with ONLY:
 * - Portrait photo (or clean blank area if no photo exists)
 * - Winner Name
 * - Award Category
 * - Business Name (if available)
 * With interactive royal purple hover effect and zero extra badges/citations/links.
 */
export default function WinnerCard({
  name,
  company,
  category,
  awardTitle,
  image,
  className = '',
}) {
  const displayCategory = category || awardTitle;

  // Check if business name exists and is distinct from the winner's own name
  const hasBusinessName =
    company &&
    company.trim().length > 0 &&
    company.trim().toLowerCase() !== (name || '').trim().toLowerCase();

  return (
    <div className={`fem-ref-winner-card ${className}`}>
      {/* 1. Large Portrait Photo Area with rounded top corners */}
      {image ? (
        <div className="fem-ref-winner-photo-wrapper">
          <img
            src={image}
            alt={name}
            className="fem-ref-winner-photo"
            loading="lazy"
            onError={(e) => {
              // Hide image cleanly if failed; leave area blank without placeholder, initials, or broken icon
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.classList.add('fem-ref-photo-blank');
              }
            }}
          />
        </div>
      ) : (
        /* Blank photo area when no matching photo exists (no placeholder images, initials, or broken icons) */
        <div className="fem-ref-winner-photo-wrapper fem-ref-photo-blank" />
      )}

      {/* 2. Winner Information Body: ONLY Name, Category, and Business Name */}
      <div className="fem-ref-winner-body">
        {/* Prominent Winner Name */}
        <h3 className="fem-ref-winner-name">{name}</h3>

        {/* Award Category */}
        {displayCategory && (
          <div className="fem-ref-winner-category">{displayCategory}</div>
        )}

        {/* Business Name (if available) */}
        {hasBusinessName && (
          <div className="fem-ref-winner-business">
            <span className="fem-ref-business-prefix">Business: </span>
            <span>{company}</span>
          </div>
        )}
      </div>
    </div>
  );
}
