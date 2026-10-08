import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Sparkles,
  Shield,
  Leaf,
  Globe,
  Building2,
  TrendingUp,
  Cpu,
  HeartPulse,
  Factory,
  ShoppingBag,
  Palette,
  Briefcase,
  HeartHandshake,
  Crown
} from 'lucide-react';

// Domain icon helper to match categories
const getCategoryIcon = (cat) => {
  if (cat.isHonorary) return Crown;
  const name = (cat.name || '').toLowerCase();
  const domain = (cat.domain || '').toLowerCase();

  if (name.includes('service') || name.includes('consulting') || name.includes('legal')) return Shield;
  if (name.includes('health') || name.includes('wellness') || name.includes('pharma')) return Leaf;
  if (name.includes('hospitality') || name.includes('tourism') || name.includes('global')) return Globe;
  if (name.includes('corporate') || name.includes('csr') || name.includes('education')) return Building2;
  if (name.includes('tech') || name.includes('innovation') || name.includes('digital')) return Cpu;
  if (name.includes('manufacturing') || name.includes('logistics') || name.includes('engineering')) return Factory;
  if (name.includes('retail') || name.includes('e-commerce') || name.includes('food') || name.includes('fashion') || name.includes('beauty')) return ShoppingBag;
  if (name.includes('design') || name.includes('architecture') || name.includes('art')) return Palette;
  if (name.includes('social') || name.includes('rural') || name.includes('impact')) return HeartHandshake;
  if (name.includes('trend') || name.includes('influencer') || name.includes('young') || name.includes('startup')) return Sparkles;
  if (domain === 'leadership') return Award;
  return Shield;
};

/**
 * AwardCategoryCard Component (Harmonized Fempreneur Brand Purple Theme)
 * Consistent soft purple icon box -> Serif title -> Muted description -> Outlined Purple NOMINATE NOW button
 */
export default function AwardCategoryCard({
  code,
  name,
  domain,
  description,
  isHonorary = false,
  className = '',
}) {
  const IconComponent = getCategoryIcon({ name, domain, isHonorary });

  const primaryColor = '#6A1B9A';
  const iconBg = '#F6EEFA';

  return (
    <div
      className={`fem-category-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #EFE4F4',
        boxShadow: '0 4px 18px rgba(46, 8, 72, 0.03)',
        padding: '2rem 1.6rem 1.6rem 1.6rem',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(106, 27, 154, 0.08)';
        e.currentTarget.style.borderColor = primaryColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(46, 8, 72, 0.03)';
        e.currentTarget.style.borderColor = '#EFE4F4';
      }}
    >
      {/* Top Icon in Rounded Square (Uniform Purple Brand Tone) */}
      <div>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: iconBg,
            color: primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <IconComponent size={22} strokeWidth={1.8} />
        </div>
      </div>

      {/* Category Title in Elegant Serif Font */}
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#1C1224',
          lineHeight: 1.35,
          marginTop: '1.4rem',
          marginBottom: '0.65rem',
          minHeight: '3.1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {name}
      </h3>

      {/* Category Description */}
      <p
        style={{
          fontSize: '0.86rem',
          color: '#6B7280',
          lineHeight: 1.5,
          marginBottom: '1.75rem',
          flexGrow: 1,
          minHeight: '2.6rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>

      {/* Outlined NOMINATE NOW Button (Strictly Purple Brand Style) */}
      <div style={{ marginTop: 'auto' }}>
        <Link
          to={`/awards/apply?category=${encodeURIComponent(name)}`}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            border: `1.5px solid ${primaryColor}`,
            color: primaryColor,
            fontSize: '0.84rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            background: 'transparent',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = primaryColor;
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = primaryColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = primaryColor;
            e.currentTarget.style.borderColor = primaryColor;
          }}
        >
          NOMINATE NOW
        </Link>
      </div>
    </div>
  );
}
