import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Award,
  ChevronDown,
  ChevronRight,
  Ticket,
} from 'lucide-react';
import CTAButton from './CTAButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation Structure matching Greenpreneur dropdown hierarchy customized for Fempreneur
  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    {
      label: 'Event & Awards',
      id: 'event-awards',
      children: [
        { label: 'Event Overview', path: '/events' },
        { label: 'Award Categories', path: '/categories' },
        { label: 'How to Nominate', path: '/nominate' },
        { label: 'Speakers & Jury Panel 2027', path: '/speakers' },
        { label: 'Why Attend', path: '/events' },
        { label: 'Sponsors', path: '/partners' },
        { label: 'The Book', path: '/coffee-table-book' },
      ],
    },
    { label: 'Winners', path: '/winners' },
    {
      label: 'Community',
      id: 'community',
      children: [
        { label: 'Community Hub', path: '/community-hub' },
        { label: 'Voice of Fempreneur', path: '/voice-of-fempreneur' },
      ],
    },
    {
      label: 'More',
      id: 'more',
      children: [
        { label: 'Speakers & Jury', path: '/speakers' },
        { label: 'Partners', path: '/partners' },
        { label: 'Blogs', path: '/blog' },
      ],
    },
    { label: 'FAQs', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const [showTopBar, setShowTopBar] = useState(true);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
      {/* Top Announcement Banner Strip (Matching Reference) */}
      {showTopBar && (
        <div
          style={{
            background: 'linear-gradient(90deg, #2E0848 0%, #4A126D 45%, #6A1B9A 80%, #2E0848 100%)',
            color: '#FFFFFF',
            fontSize: '0.82rem',
            padding: '0.45rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 101,
            boxShadow: '0 2px 10px rgba(46, 8, 72, 0.25)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', margin: '0 auto', textAlign: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 800, color: '#FFF' }}>
              🇮🇳 In Supporting Viksit Bharat @2047
            </span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ fontWeight: 600 }}>
              Fempreneur 2027 — Ahmedabad &amp; Delhi NCR
            </span>
            <span style={{ opacity: 0.5 }}>|</span>
            <Link
              to="/awards/apply"
              style={{
                color: '#FFD54F',
                fontWeight: 800,
                textDecoration: 'underline',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              Nominations Open — Apply FREE →
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link
              to="/awards/apply"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(0, 0, 0, 0.35)',
                padding: '0.22rem 0.65rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
              <span>TOTAL NOMINATIONS: 100</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowTopBar(false)}
              aria-label="Dismiss banner"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.75)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header className={`fem-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="fem-header-inner" ref={dropdownRef}>
            {/* Brand Logo */}
            <Link to="/" className="fem-brand" aria-label="Fempreneur Home">
              <img
                src="/fempreneur-logo.png"
                alt="Fempreneur"
                className="fem-brand-img"
              />
            </Link>

            {/* Desktop Navigation Links with Dropdowns */}
            <nav className="fem-nav-links fem-nav-desktop">
              {navigationItems.map((item) => {
                if (item.children) {
                  const isOpen = openDropdown === item.id;
                  const isAnyChildActive = item.children.some((child) => location.pathname === child.path);

                  return (
                    <div key={item.id} className="fem-nav-item-dropdown">
                      <button
                        type="button"
                        className={`fem-dropdown-toggle ${isAnyChildActive ? 'active' : ''}`}
                        onClick={() => handleDropdownToggle(item.id)}
                        onMouseEnter={() => setOpenDropdown(item.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="fem-nav-text">{item.label}</span>
                        <ChevronDown size={13} className="fem-dropdown-chevron" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }} />
                      </button>

                      {isOpen && (
                        <div
                          className="fem-dropdown-menu"
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {item.children.map((child) => {
                            const isChildActive = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`fem-dropdown-item ${isChildActive ? 'active' : ''}`}
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`fem-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="fem-nav-text">{item.label}</span>
                  </Link>
                );
              })}

              {/* Action Buttons */}
              <div className="fem-header-actions">
                <CTAButton to="/awards/apply" variant="primary" size="sm" icon={Award}>
                  Nominate
                </CTAButton>
                <CTAButton to="/events" variant="primary" size="sm" icon={Ticket}>
                  Get Pass
                </CTAButton>
              </div>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="fem-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              bottom: 0,
              background: '#FFFFFF',
              zIndex: 99,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {navigationItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--color-plum-deep)',
                          padding: '0.6rem 0 0.3rem',
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            style={{
                              fontSize: '0.92rem',
                              fontWeight: 600,
                              color: location.pathname === child.path ? 'var(--color-burgundy)' : 'var(--text-secondary)',
                              padding: '0.4rem 0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>{child.label}</span>
                            <ChevronRight size={14} color="var(--text-light)" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: location.pathname === item.path ? 'var(--color-burgundy)' : 'var(--text-primary)',
                      padding: '0.65rem 0',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} color="var(--text-light)" />
                  </Link>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem' }}>
              <CTAButton to="/awards/apply" variant="primary" block size="lg" icon={Award}>
                Nominate for Award (Free)
              </CTAButton>
              <CTAButton to="/events" variant="primary" block size="lg" icon={Ticket}>
                Get Event Pass
              </CTAButton>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
