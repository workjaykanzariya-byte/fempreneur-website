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
        { label: 'Event Agenda', path: '/events' },
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
        { label: 'Women Business Directory', path: '/directory' },
        { label: 'Membership Tiers', path: '/membership' },
        { label: 'City Chapters (Ahmedabad & Delhi)', path: '/city-chapters' },
        { label: '1,000 Story Drive', path: '/story-drive' },
      ],
    },
    {
      label: 'More',
      id: 'more',
      children: [
        { label: 'Award Overview & 50/50 Process', path: '/awards' },
        { label: 'Public Voting System', path: '/voting' },
        { label: 'Blog & Newsroom', path: '/blog' },
        { label: 'Impact & SDG Alignment', path: '/impact' },
      ],
    },
    { label: 'FAQs', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
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
                <CTAButton to="/nominate" variant="primary" size="sm" icon={Award}>
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
              <CTAButton to="/nominate" variant="primary" block size="lg" icon={Award}>
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
