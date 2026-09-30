import React, { useState, useMemo } from 'react';
import { Search, Building2, User, Globe, CheckCircle, Sparkles, PlusCircle } from 'lucide-react';
import { PageHeader, DirectoryCard, SectionTitle, CTAButton } from '../components';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [listSubmitted, setListSubmitted] = useState(false);

  const sampleBusinesses = [
    {
      businessName: 'Aarya Design Studios',
      founderName: 'Pooja Mehta',
      founderRole: 'Founder & Principal Architect',
      founderPhoto: '/images/entrepreneurs/pooja-mehta.jpg',
      category: 'Architecture & Spatial Design',
      city: 'Ahmedabad, Gujarat',
      description: 'Award-winning interior architecture firm specializing in commercial spaces and modern sustainable design.',
      isCertified: true,
      websiteUrl: 'https://aaryadesigns.in',
    },
    {
      businessName: 'Nova BioCare Solutions',
      founderName: 'Dr. Sunita Rao',
      founderRole: 'Co-Founder & Chief Research Officer',
      founderPhoto: '/images/entrepreneurs/dr-sunita-rao.jpg',
      category: 'Healthcare & Wellness',
      city: 'Delhi NCR',
      description: 'Biotech venture providing accessible diagnostics and women health screening kits across northern India.',
      isNominee: true,
      websiteUrl: 'https://novabiocare.in',
    },
    {
      businessName: 'EcoVerve Packaging',
      founderName: 'Sneha Patel',
      founderRole: 'Managing Director & Founder',
      founderPhoto: '/images/entrepreneurs/sneha-patel.jpg',
      category: 'Manufacturing & MSME',
      city: 'Ahmedabad Hub',
      description: 'Biodegradable packaging manufacturer supplying sustainable FMCG containers across western India.',
      isCertified: true,
      websiteUrl: 'https://ecovervepackaging.com',
    },
    {
      businessName: 'Virasat Handlooms',
      founderName: 'Radhika Menon',
      founderRole: 'Founder & Creative Director',
      founderPhoto: '/images/entrepreneurs/radhika-menon.jpg',
      category: 'Fashion & Artisanal Craft',
      city: 'National Network',
      description: 'Direct-to-consumer sustainable apparel brand connecting rural handloom weavers with modern global markets.',
      isNominee: true,
      websiteUrl: 'https://virasathandlooms.com',
    },
    {
      businessName: 'Nexora AI Labs',
      founderName: 'Ananya Sharma',
      founderRole: 'Founder & AI Architect',
      founderPhoto: '/images/entrepreneurs/ananya-sharma.jpg',
      category: 'Technology & DeepTech',
      city: 'Delhi NCR',
      description: 'Enterprise AI analytics platform automating workflow intelligence for MSMEs and consumer brands.',
      isCertified: true,
      websiteUrl: 'https://nexoraai.tech',
    },
    {
      businessName: 'SunShakti Energy',
      founderName: 'Meera Sen',
      founderRole: 'Co-Founder & CleanTech Director',
      founderPhoto: '/images/entrepreneurs/meera-sen.jpg',
      category: 'CleanTech & Renewable Energy',
      city: 'Ahmedabad, Gujarat',
      description: 'Rooftop solar and decentralized clean energy solutions empowering rural and semi-urban small businesses.',
      isNominee: true,
      websiteUrl: 'https://sunshaktienergy.in',
    },
  ];

  const filteredBusinesses = useMemo(() => {
    return sampleBusinesses.filter((b) => {
      const matchesSearch =
        b.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = selectedCity === 'All' || b.city.includes(selectedCity);

      return matchesSearch && matchesCity;
    });
  }, [searchTerm, selectedCity]);

  return (
    <div>
      <PageHeader
        badge="150+ Business Categories"
        title="Women Entrepreneur"
        highlight="Business Directory"
        description="Searchable B2B and B2C discovery database showcasing verified women-led enterprises, manufacturers, tech innovators, and service providers across India."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Directory' }]}
        ctaText="List Your Business"
        ctaTo="#list-business"
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {/* Search Bar & City Filters */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              marginBottom: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by business name, founder, or industry category..."
                className="form-input"
                style={{ paddingLeft: '2.75rem', background: '#FFFFFF' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Filter by City:
              </span>
              {['All', 'Ahmedabad', 'Delhi NCR', 'National Network'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCity(c)}
                  className={`btn btn-sm ${selectedCity === c ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-pill)', padding: '0.35rem 0.85rem' }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '4rem' }}>
            {filteredBusinesses.map((b, idx) => (
              <DirectoryCard key={idx} {...b} />
            ))}
          </div>

          {/* List Your Business Form */}
          <div id="list-business" className="container-narrow">
            <div className="fem-card fem-card-gold" style={{ padding: '3rem 2.5rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Join the Directory
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                List Your Women-Led Business
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Increase your brand's digital visibility across 150+ business categories and connect with potential corporate clients.
              </p>

              {listSubmitted ? (
                <div style={{ padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle size={40} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.5rem' }} />
                  <h4>Business Profile Submitted!</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Our directory moderation desk will verify your details and activate your listing.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setListSubmitted(true); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="dirBiz">Business / Venture Name *</label>
                      <input id="dirBiz" type="text" required className="form-input" placeholder="e.g. Aarya Creations" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="dirFounder">Founder Name *</label>
                      <input id="dirFounder" type="text" required className="form-input" placeholder="e.g. Pooja Mehta" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="dirCity">City &amp; State *</label>
                      <input id="dirCity" type="text" required className="form-input" placeholder="e.g. Ahmedabad, Gujarat" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="dirCategory">Industry Category (150+ Sectors) *</label>
                      <input id="dirCategory" type="text" required className="form-input" placeholder="e.g. Healthcare, Architecture, Retail" />
                    </div>
                  </div>

                  <CTAButton type="submit" variant="primary" size="lg" block icon={PlusCircle}>
                    Submit Business Profile for Verification
                  </CTAButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
