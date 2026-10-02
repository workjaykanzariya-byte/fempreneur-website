import React, { useState, useMemo } from 'react';
import { Search, Award, Filter, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader, AwardCategoryCard, SectionTitle, CTAButton } from '../components';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Master verified list of 40 Award Categories from proposal & Document 2
  const allCategories = [
    { code: 'CAT-01', name: 'Woman Entrepreneur of the Year', domain: 'Leadership', description: 'Premier honor recognizing sustained visionary leadership, enterprise growth, and commercial excellence.' },
    { code: 'CAT-02', name: 'Emerging Woman Entrepreneur', domain: 'Leadership', description: 'Celebrating rapid-trajectory founders creating significant traction in their first 3–5 years.' },
    { code: 'CAT-03', name: 'Young Woman Entrepreneur', domain: 'Leadership', description: 'Spotlighting youth excellence, bold risk-taking, and innovative thinking under age 30.' },
    { code: 'CAT-04', name: 'Startup Founder', domain: 'Technology', description: 'Celebrating female founders building scalable, high-growth, venture-backed or bootstrapped startups.' },
    { code: 'CAT-05', name: 'Women-Led Business', domain: 'Enterprise', description: 'Recognizing sustainable commercial enterprises built, owned, and scaled by women leaders.' },
    { code: 'CAT-06', name: 'Innovation & Technology', domain: 'Technology', description: 'Celebrating pioneering tech solutions, software innovation, and deep-tech transformation in India.' },
    { code: 'CAT-07', name: 'Healthcare & Wellness', domain: 'Healthcare', description: 'Innovations in healthcare delivery, medical diagnostics, wellness centers, and biotech.' },
    { code: 'CAT-08', name: 'Education & Training', domain: 'Corporate', description: 'Institutions, skill development programs, early childhood centers, and educational technology.' },
    { code: 'CAT-09', name: 'Finance & Financial Services', domain: 'Corporate', description: 'Pioneering financial inclusion, wealth-tech, micro-credit access, and fintech solutions.' },
    { code: 'CAT-10', name: 'Manufacturing & Engineering', domain: 'Manufacturing', description: 'Leading heavy engineering, precision tooling, automotive supply chains, and industrial factories.' },
    { code: 'CAT-11', name: 'Real Estate & Construction', domain: 'Design', description: 'Excellence in property development, commercial housing projects, and infrastructure contracting.' },
    { code: 'CAT-12', name: 'Architecture', domain: 'Design', description: 'Excellence in master planning, sustainable architecture, and structural design.' },
    { code: 'CAT-13', name: 'Interior & Exterior Design', domain: 'Design', description: 'Commercial, retail, and residential spatial architecture with distinctive aesthetics.' },
    { code: 'CAT-14', name: 'Retail Business', domain: 'Consumer', description: 'Brick-and-mortar storefronts, multi-brand retail outlets, and supermarket chains.' },
    { code: 'CAT-15', name: 'E-Commerce Business', domain: 'Consumer', description: 'Recognizing direct-to-consumer (D2C) brands, omnichannel retail, and online market scaling.' },
    { code: 'CAT-16', name: 'Fashion & Lifestyle', domain: 'Consumer', description: 'Celebrating apparel, textiles, luxury crafts, and sustainable fashion innovators.' },
    { code: 'CAT-17', name: 'Beauty & Personal Care', domain: 'Consumer', description: 'Celebrating conscious cosmetics, personal care, clean beauty, and skincare brands.' },
    { code: 'CAT-18', name: 'Food & Beverage', domain: 'Consumer', description: 'Artisanal foods, gourmet FMCG, packaged foods, and culinary ventures.' },
    { code: 'CAT-19', name: 'Hospitality & Tourism', domain: 'Consumer', description: 'Hotels, boutique homestays, travel experiences, and destination management.' },
    { code: 'CAT-20', name: 'Media & Entertainment', domain: 'Corporate', description: 'Publishing, digital content production, broadcasting, and creative media ventures.' },
    { code: 'CAT-21', name: 'Marketing & Advertising', domain: 'Corporate', description: 'Creative branding, digital performance marketing, and public relations agencies.' },
    { code: 'CAT-22', name: 'Digital & New-Age Business', domain: 'Technology', description: 'Honoring digital-first businesses, creator economy founders, and online community platforms.' },
    { code: 'CAT-23', name: 'Consulting & Coaching', domain: 'Corporate', description: 'Business advisory, corporate governance consulting, and executive leadership development.' },
    { code: 'CAT-24', name: 'Legal Services', domain: 'Corporate', description: 'Excellence in corporate law, intellectual property, litigation, and regulatory compliance.' },
    { code: 'CAT-25', name: 'Human Resources', domain: 'Corporate', description: 'Innovative recruitment, corporate culture, HR tech, and workforce staffing excellence.' },
    { code: 'CAT-26', name: 'Agriculture & Agri-Business', domain: 'Social', description: 'Modern agricultural processing, rural farmer collectives, and value-added farming.' },
    { code: 'CAT-27', name: 'Pharma & Life Sciences', domain: 'Healthcare', description: 'Pharmaceutical formulation, diagnostic laboratories, and life science research.' },
    { code: 'CAT-28', name: 'Art & Creative Business', domain: 'Design', description: 'Visual arts, animation, graphic design studios, and commercial photography.' },
    { code: 'CAT-29', name: 'Events & Experiences', domain: 'Corporate', description: 'Live conferences, corporate exhibitions, and experiential cultural productions.' },
    { code: 'CAT-30', name: 'Logistics & Supply Chain', domain: 'Manufacturing', description: 'Warehousing, freight management, cold chain logistics, and last-mile delivery.' },
    { code: 'CAT-31', name: 'Social Impact Business', domain: 'Social', description: 'Grassroots upliftment, female economic self-help groups, and community benefit ventures.' },
    { code: 'CAT-32', name: 'Homegrown Brand', domain: 'Consumer', description: 'Authentic indigenous brands built in regional towns and scaled into household names.' },
    { code: 'CAT-33', name: 'Women-Led MSME', domain: 'Manufacturing', description: 'Operational excellence, local job creation, and manufacturing or service leadership.' },
    { code: 'CAT-34', name: 'Business Innovation', domain: 'Technology', description: 'Breakthrough operational processes, product utility innovations, and market disruption.' },
    { code: 'CAT-35', name: 'Rural Woman Entrepreneur', domain: 'Social', description: 'Pioneering enterprise leaders creating livelihood opportunities in village economies.' },
    { code: 'CAT-36', name: 'Young Achiever', domain: 'Leadership', description: 'Exceptional young female talent making remarkable strides in commercial business.' },
    { code: 'CAT-37', name: 'Best Influencer', domain: 'Corporate', description: 'Content creators using digital voice to champion entrepreneurship, women, and ethical business.' },
    { code: 'CAT-38', name: 'Lifetime Achievement', domain: 'Honorary', description: 'Special jury honor acknowledging multi-decade pioneering contributions to Indian enterprise.', isHonorary: true },
    { code: 'CAT-39', name: 'Pride of India', domain: 'Honorary', description: 'Apex national recognition for landmark enterprise impact elevating India globally.', isHonorary: true },
    { code: 'CAT-40', name: 'Sustainable & Eco-Conscious Brand', domain: 'Consumer', description: 'Zero-waste lifestyle products, circular economy models, and eco-friendly consumer goods.' },
  ];

  const domains = ['All', 'Leadership', 'Technology', 'Healthcare', 'Manufacturing', 'Consumer', 'Design', 'Corporate', 'Social', 'Honorary'];

  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDomain = selectedDomain === 'All' || cat.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });
  }, [searchTerm, selectedDomain, allCategories]);

  return (
    <div>
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
        image="/images/categories/award-categories-leaders.jpg"
        imageAlt="40 Verified Award Categories Leaders"
        imageBadge="150+ Industry Sectors"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {/* Search Bar & Filter Controls */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              marginBottom: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                color="var(--text-light)"
                style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search across 40 categories by keyword, industry, or sector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '3rem', background: '#FFFFFF' }}
              />
            </div>

            {/* Domain Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                Filter Sector:
              </span>
              {domains.map((dom) => (
                <button
                  key={dom}
                  type="button"
                  onClick={() => setSelectedDomain(dom)}
                  className={`btn btn-sm ${selectedDomain === dom ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-pill)', padding: '0.35rem 0.85rem' }}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Grid Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Showing {filteredCategories.length} Categories {selectedDomain !== 'All' ? `in ${selectedDomain}` : ''}
            </span>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
              100% Free Nomination • Zero Hidden Processing Fees
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {filteredCategories.map((cat, idx) => (
              <AwardCategoryCard key={idx} {...cat} />
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="fem-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h4>No Categories Found</h4>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Try adjusting your search query or switching domain filter tabs.
              </p>
            </div>
          )}

          {/* Bottom Nomination Reminder */}
          <div
            className="fem-card fem-card-gold"
            style={{
              marginTop: '4rem',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Official 2027 Guidelines
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.75rem' }}>
              Ready to Submit Your Application?
            </h3>
            <p style={{ maxWidth: '640px', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Nomination is 100% free of charge. You can apply in one primary category and specify a secondary category during submission. Each nominee receives a personal, shareable public voting link upon shortlisting.
            </p>
            <CTAButton to="/nominate" variant="primary" size="lg" icon={ArrowRight}>
              Start Free Nomination Form
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
