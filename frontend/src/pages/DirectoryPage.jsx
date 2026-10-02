import React, { useState, useMemo } from 'react';
import { Search, Building2, User, Globe, CheckCircle, Sparkles, PlusCircle, X } from 'lucide-react';
import { PageHeader, DirectoryCard, SectionTitle, CTAButton } from '../components';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listSubmitted, setListSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    founderName: '',
    city: '',
    category: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setListSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setListSubmitted(false);
    setFormData({ businessName: '', founderName: '', city: '', category: '' });
  };

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
        badgeIcon={Building2}
        title="Women Entrepreneur"
        highlight="Business Directory"
        description="Searchable B2B and B2C discovery database showcasing verified women-led enterprises, manufacturers, tech innovators, and service providers across India."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Directory' }]}
        ctaText="List Your Business"
        onCtaClick={() => setIsModalOpen(true)}
        image="/images/directory/directory-hero-showcase.png"
        imageAlt="Women Entrepreneur Business Directory Showcase"
        imageFramed={false}
        imageFilter="none"
        imageMaxWidth="640px"
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

          {/* List Your Business Section */}
          <div id="list-business" className="container-narrow">
            <div
              className="fem-card"
              style={{
                padding: '3.25rem 2.5rem',
                background: 'linear-gradient(135deg, #FBF8FD 0%, #F5ECFA 50%, #FAF2FC 100%)',
                border: '1.5px solid rgba(106, 27, 154, 0.2)',
                boxShadow: '0 16px 40px rgba(106, 27, 154, 0.08), 0 4px 16px rgba(106, 27, 154, 0.04)',
                borderRadius: 'var(--radius-2xl)',
                textAlign: 'center',
              }}
            >
              <span className="badge badge-plum" style={{ marginBottom: '0.85rem' }}>
                Join the Directory
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.6rem', lineHeight: 1.25 }}>
                List Your Women-Led Business
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Increase your brand's digital visibility across 150+ business categories and connect with corporate clients and verified peers nationwide.
              </p>
              <CTAButton onClick={() => setIsModalOpen(true)} variant="primary" size="lg">
                Open Registration
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* List Your Business Popup Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.52)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.25rem',
          }}
          onClick={closeModal}
        >
          <div
            className="fem-card"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: 0,
              position: 'relative',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              boxShadow: '0 25px 65px -10px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(106, 27, 154, 0.25)',
              background: '#FFFFFF',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '2rem 2.25rem 1.5rem',
                position: 'relative',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(46, 8, 72, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-plum-deep)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <X size={18} />
              </button>

              <span
                className="badge badge-gold"
                style={{
                  marginBottom: '0.6rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                }}
              >
                Join the Directory
              </span>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0, lineHeight: 1.25 }}>
                List Your Women-Led Business
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.45rem 0 0', lineHeight: 1.45 }}>
                Increase your brand's digital visibility across 150+ business categories and connect with corporate clients.
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2.25rem' }}>
              {listSubmitted ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(106, 27, 154, 0.1)',
                      color: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                    }}
                  >
                    <CheckCircle size={36} color="var(--color-burgundy)" />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                    Business Profile Submitted!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.5 }}>
                    Our directory moderation desk will verify your details and activate your verified listing within 24 hours.
                  </p>
                  <CTAButton onClick={closeModal} variant="primary" size="md">
                    Done
                  </CTAButton>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1.1rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" htmlFor="dirBiz">Business / Venture Name *</label>
                      <input
                        id="dirBiz"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                        className="form-input"
                        placeholder="e.g. Aarya Creations"
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" htmlFor="dirFounder">Founder Name *</label>
                      <input
                        id="dirFounder"
                        type="text"
                        required
                        value={formData.founderName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, founderName: e.target.value }))}
                        className="form-input"
                        placeholder="e.g. Pooja Mehta"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1.75rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" htmlFor="dirCity">City &amp; State *</label>
                      <input
                        id="dirCity"
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                        className="form-input"
                        placeholder="e.g. Ahmedabad, Gujarat"
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" htmlFor="dirCategory">Industry Category (150+ Sectors) *</label>
                      <input
                        id="dirCategory"
                        type="text"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className="form-input"
                        placeholder="e.g. Healthcare, Architecture"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.85rem' }}>
                    <CTAButton type="button" onClick={closeModal} variant="ghost" size="sm">
                      Cancel
                    </CTAButton>
                    <CTAButton type="submit" variant="primary" size="md" icon={PlusCircle}>
                      Submit Business Profile
                    </CTAButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
