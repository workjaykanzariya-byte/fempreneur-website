import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
  Check,
  Award,
  Factory,
  Cpu,
  ShoppingBag,
  Building,
  HeartPulse
} from 'lucide-react';
import { PageHeader, AwardCategoryCard } from '../components';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const filterScrollRef = useRef(null);

  // Master verified list of 40 Award Categories from proposal & Document 2
  const allCategories = [
    { code: 'CAT-01', name: 'Woman Entrepreneur of the Year', domain: 'LEADERSHIP', description: 'Premier honor recognizing sustained visionary leadership, enterprise growth, and commercial excellence.' },
    { code: 'CAT-02', name: 'Emerging Woman Entrepreneur', domain: 'LEADERSHIP', description: 'Celebrating rapid-trajectory founders creating significant traction in their first 3–5 years.' },
    { code: 'CAT-03', name: 'Young Woman Entrepreneur', domain: 'LEADERSHIP', description: 'Spotlighting youth excellence, bold risk-taking, and innovative thinking under age 30.' },
    { code: 'CAT-04', name: 'Startup Founder', domain: 'TECHNOLOGY', description: 'Celebrating female founders building scalable, high-growth, venture-backed or bootstrapped startups.' },
    { code: 'CAT-05', name: 'Women-Led Business', domain: 'ENTERPRISE', description: 'Recognizing sustainable commercial enterprises built, owned, and scaled by women leaders.' },
    { code: 'CAT-06', name: 'Innovation & Technology', domain: 'TECHNOLOGY', description: 'Celebrating pioneering tech solutions, software innovation, and deep-tech transformation in India.' },
    { code: 'CAT-07', name: 'Healthcare & Wellness', domain: 'HEALTHCARE', description: 'Innovations in healthcare delivery, medical diagnostics, wellness centers, and herbal/biotech.' },
    { code: 'CAT-08', name: 'Education & Training', domain: 'CORPORATE', description: 'Institutions, skill development programs, early childhood centers, and educational technology.' },
    { code: 'CAT-09', name: 'Finance & Financial Services', domain: 'CORPORATE', description: 'Pioneering financial inclusion, wealth-tech, micro-credit access, and fintech solutions.' },
    { code: 'CAT-10', name: 'Manufacturing & Engineering', domain: 'MANUFACTURING', description: 'Leading heavy engineering, precision tooling, automotive supply chains, and industrial factories.' },
    { code: 'CAT-11', name: 'Real Estate & Construction', domain: 'DESIGN', description: 'Excellence in property development, commercial housing projects, and infrastructure contracting.' },
    { code: 'CAT-12', name: 'Architecture', domain: 'DESIGN', description: 'Excellence in master planning, sustainable architecture, and structural design.' },
    { code: 'CAT-13', name: 'Interior & Exterior Design', domain: 'DESIGN', description: 'Commercial, retail, and residential spatial architecture with distinctive aesthetics.' },
    { code: 'CAT-14', name: 'Retail Business', domain: 'CONSUMER', description: 'Brick-and-mortar storefronts, multi-brand retail outlets, and supermarket chains.' },
    { code: 'CAT-15', name: 'E-Commerce Business', domain: 'CONSUMER', description: 'Recognizing direct-to-consumer (D2C) brands, omnichannel retail, and online market scaling.' },
    { code: 'CAT-16', name: 'Fashion & Lifestyle', domain: 'CONSUMER', description: 'Celebrating apparel, textiles, luxury crafts, and sustainable fashion innovators.' },
    { code: 'CAT-17', name: 'Beauty & Personal Care', domain: 'CONSUMER', description: 'Celebrating conscious cosmetics, personal care, clean beauty, and skincare brands.' },
    { code: 'CAT-18', name: 'Food & Beverage', domain: 'CONSUMER', description: 'Artisanal foods, gourmet FMCG, packaged foods, and culinary ventures.' },
    { code: 'CAT-19', name: 'Hospitality & Tourism', domain: 'CONSUMER', description: 'Hotels, boutique homestays, travel experiences, and destination management.' },
    { code: 'CAT-20', name: 'Media & Entertainment', domain: 'CORPORATE', description: 'Publishing, digital content production, broadcasting, and creative media ventures.' },
    { code: 'CAT-21', name: 'Marketing & Advertising', domain: 'CORPORATE', description: 'Creative branding, digital performance marketing, and public relations agencies.' },
    { code: 'CAT-22', name: 'Digital & New-Age Business', domain: 'TECHNOLOGY', description: 'Honoring digital-first businesses, creator economy founders, and online community platforms.' },
    { code: 'CAT-23', name: 'Consulting & Coaching', domain: 'CORPORATE', description: 'Business advisory, corporate governance consulting, and executive leadership development.' },
    { code: 'CAT-24', name: 'Legal Services', domain: 'CORPORATE', description: 'Excellence in corporate law, intellectual property, litigation, and regulatory compliance.' },
    { code: 'CAT-25', name: 'Human Resources', domain: 'CORPORATE', description: 'Innovative recruitment, corporate culture, HR tech, and workforce staffing excellence.' },
    { code: 'CAT-26', name: 'Agriculture & Agri-Business', domain: 'SOCIAL', description: 'Modern agricultural processing, rural farmer collectives, and value-added farming.' },
    { code: 'CAT-27', name: 'Pharma & Life Sciences', domain: 'HEALTHCARE', description: 'Pharmaceutical formulation, diagnostic laboratories, and life science research.' },
    { code: 'CAT-28', name: 'Art & Creative Business', domain: 'DESIGN', description: 'Visual arts, animation, graphic design studios, and commercial photography.' },
    { code: 'CAT-29', name: 'Events & Experiences', domain: 'CORPORATE', description: 'Live conferences, corporate exhibitions, and experiential cultural productions.' },
    { code: 'CAT-30', name: 'Logistics & Supply Chain', domain: 'MANUFACTURING', description: 'Warehousing, freight management, cold chain logistics, and last-mile delivery.' },
    { code: 'CAT-31', name: 'Social Impact Business', domain: 'SOCIAL', description: 'Grassroots upliftment, female economic self-help groups, and community benefit ventures.' },
    { code: 'CAT-32', name: 'Homegrown Brand', domain: 'CONSUMER', description: 'Authentic indigenous brands built in regional towns and scaled into household names.' },
    { code: 'CAT-33', name: 'Women-Led MSME', domain: 'MANUFACTURING', description: 'Operational excellence, local job creation, and manufacturing or service leadership.' },
    { code: 'CAT-34', name: 'Business Innovation', domain: 'TECHNOLOGY', description: 'Breakthrough operational processes, product utility innovations, and market disruption.' },
    { code: 'CAT-35', name: 'Rural Woman Entrepreneur', domain: 'SOCIAL', description: 'Pioneering enterprise leaders creating livelihood opportunities in village economies.' },
    { code: 'CAT-36', name: 'Young Achiever', domain: 'LEADERSHIP', description: 'Exceptional young female talent making remarkable strides in commercial business.' },
    { code: 'CAT-37', name: 'Best Influencer', domain: 'CORPORATE', description: 'Content creators using digital voice to champion entrepreneurship, women, and ethical business.' },
    { code: 'CAT-38', name: 'Lifetime Achievement', domain: 'HONORARY', description: 'Special jury honor acknowledging multi-decade pioneering contributions to Indian enterprise.', isHonorary: true },
    { code: 'CAT-39', name: 'Pride of India', domain: 'HONORARY', description: 'Apex national recognition for landmark enterprise impact elevating India globally.', isHonorary: true },
    { code: 'CAT-40', name: 'Sustainable & Eco-Conscious Brand', domain: 'CONSUMER', description: 'Zero-waste lifestyle products, circular economy models, and eco-friendly consumer goods.' },
  ];

  // Domain Filter list matching uppercase tabs
  const domains = [
    'ALL',
    'LEADERSHIP',
    'TECHNOLOGY',
    'HEALTHCARE',
    'MANUFACTURING',
    'CONSUMER',
    'DESIGN',
    'CORPORATE',
    'ENTERPRISE',
    'SOCIAL',
    'HONORARY',
  ];

  const scrollFilters = (direction) => {
    if (filterScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      filterScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter categories by search and domain
  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.domain.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDomain =
        selectedDomain === 'ALL' ||
        (selectedDomain === 'HONORARY' ? cat.isHonorary : cat.domain === selectedDomain);

      return matchesSearch && matchesDomain;
    });
  }, [searchTerm, selectedDomain, allCategories]);

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
      {/* SECTION 1: FIRST SECTION REMAINS UNCHANGED (PageHeader / Hero) */}
      <PageHeader
        badge="Awards 2027 Roster"
        title="40 Verified"
        highlight="Award Categories"
        description="Covering 40 distinct business categories and 150+ industry sectors. Evaluated 50% by our independent jury and 50% by verified public voting. 100% Free to apply."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Award Categories' }]}
        ctaText="Start Free Nomination"
        ctaTo="/nominate"
        ctaIcon={null}
        secondaryCtaText="Evaluation Process"
        secondaryCtaTo="/awards"
        image="/images/categories/award-categories-real.png"
        imageAlt="Fempreneur Verified Award Winners & Categories Felicitation"
        imageBadge="150+ Industry Sectors"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* MAIN CONTENT CONTAINER (Matching Fempreneur Purple/Gold Visual Theme) */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        {/* FLOATING SEARCH & HORIZONTAL FILTER BAR */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #EFE4F4',
            boxShadow: '0 4px 20px rgba(46, 8, 72, 0.04)',
            padding: '1rem 1.25rem',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'nowrap',
          }}
        >
          {/* Left: Search Input */}
          <div
            style={{
              position: 'relative',
              flex: '0 0 380px',
              maxWidth: '380px',
              minWidth: '240px',
            }}
          >
            <Search
              size={18}
              color="#72627C"
              style={{
                position: 'absolute',
                left: '1.1rem',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <input
              type="text"
              placeholder="Search categories (e.g. Startup, D2C, Tech, MSME...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: '10px',
                border: '1px solid #E6D5EC',
                fontSize: '0.9rem',
                color: '#1C1224',
                outline: 'none',
                background: '#FCFBFD',
                transition: 'border 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#6A1B9A')}
              onBlur={(e) => (e.target.style.borderColor = '#E6D5EC')}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#72627C',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Center/Right: Horizontal Filter Tabs with Arrows */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 1 auto',
              position: 'relative',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            <button
              type="button"
              onClick={() => scrollFilters('left')}
              style={{
                background: '#FFFFFF',
                border: 'none',
                color: '#72627C',
                cursor: 'pointer',
                padding: '0.4rem 0.2rem',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2,
              }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={filterScrollRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              {domains.map((dom) => {
                const isSelected = selectedDomain === dom;
                return (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => setSelectedDomain(dom)}
                    style={{
                      background: isSelected ? '#6A1B9A' : 'transparent', // Uses Fempreneur official purple
                      color: isSelected ? '#FFFFFF' : '#4C3C56',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.1rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.color = '#6A1B9A';
                        e.currentTarget.style.background = '#FAF5FC';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.color = '#4C3C56';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {dom}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollFilters('right')}
              style={{
                background: '#FFFFFF',
                border: 'none',
                color: '#72627C',
                cursor: 'pointer',
                padding: '0.4rem 0.2rem',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2,
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* PRIMARY CATEGORIES HEADING ROW */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2.35rem',
                fontWeight: 700,
                color: '#1C1224',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Primary Categories
            </h2>
            <p
              style={{
                fontSize: '0.98rem',
                color: '#5C4E65',
                marginTop: '0.4rem',
                marginBottom: 0,
              }}
            >
              Browse categories matching your business sector.
            </p>
          </div>

          {/* Right-Side Listed Count Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              border: '1px solid #EFE4F4',
              background: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#4C3C56',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#6A1B9A',
                display: 'inline-block',
              }}
            />
            <span>{filteredCategories.length} CATEGORIES LISTED</span>
          </div>
        </div>

        {/* 4-COLUMN CARDS GRID (Uniform Clean Cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredCategories.map((cat) => (
            <AwardCategoryCard
              key={cat.code}
              {...cat}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EFE4F4',
              marginTop: '2rem',
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#1C1224',
                marginBottom: '0.5rem',
              }}
            >
              No Categories Found
            </h3>
            <p style={{ color: '#5C4E65', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.92rem' }}>
              We couldn’t find any category matching "{searchTerm}". Try switching domain filters or resetting.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedDomain('ALL');
              }}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: '8px',
                background: '#6A1B9A',
                color: '#FFFFFF',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
