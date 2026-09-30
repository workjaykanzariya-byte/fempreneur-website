import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Award } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="fem-footer">
      <div className="container">
        {/* Top Newsletter Strip (Light Card with Purple Accents) */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(106, 27, 154, 0.16)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            marginBottom: '4rem',
            boxShadow: '0 12px 32px rgba(106, 27, 154, 0.06)',
          }}
        >
          <div className="grid grid-cols-2 gap-8 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(106, 27, 154, 0.08)',
                  color: '#6A1B9A',
                  border: '1px solid rgba(106, 27, 154, 0.2)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem',
                }}
              >
                Join the Movement
              </span>
              <h3 style={{ color: '#4A126D', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.65rem' }}>
                Stay Informed on Fempreneur 2027
              </h3>
              <p style={{ color: '#5C287A', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>
                Receive award announcements, jury reveals, voting window dates, and Coffee Table Book launch notifications.
              </p>
            </div>
            <div>
              <NewsletterForm inverted={false} />
            </div>
          </div>
        </div>

        {/* 4-Column Main Footer Grid */}
        <div className="grid grid-cols-4 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {/* Column 1: Brand & Organizers */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <img
                src="/fempreneur-logo.png"
                alt="Fempreneur"
                style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p style={{ color: '#5C287A', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: 500 }}>
              India's premier women-entrepreneurship platform. Built on the belief that empowered women entrepreneurs shape the future of business, communities, and India.
            </p>
            <div style={{ padding: '0.9rem 1.1rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(106, 27, 154, 0.15)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6A1B9A', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Organizers &amp; Partners
              </div>
              <div style={{ fontSize: '0.88rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.2rem' }}>
                AMA Ahmedabad | 1M Entrepreneurs Forum
              </div>
              <div style={{ fontSize: '0.78rem', color: '#5C287A', fontWeight: 500 }}>
                Ahmedabad Management Association &amp; VyapaarJagat.com
              </div>
            </div>
          </div>

          {/* Column 2: Programs & Awards */}
          <div>
            <h4>Awards &amp; Programs</h4>
            <ul className="fem-footer-links">
              <li><Link to="/awards">Fempreneur Awards 2027</Link></li>
              <li><Link to="/categories">35–40+ Award Categories</Link></li>
              <li><Link to="/nominate">Free Nomination Portal</Link></li>
              <li><Link to="/winners">Past Winners Archive</Link></li>
              <li><Link to="/coffee-table-book">Coffee Table Book</Link></li>
              <li><Link to="/story-drive">1,000 Story Drive</Link></li>
              <li><Link to="/blog">Blog &amp; Newsroom</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform & Community */}
          <div>
            <h4>Community &amp; Hubs</h4>
            <ul className="fem-footer-links">
              <li><Link to="/about">About Fempreneur</Link></li>
              <li><Link to="/directory">Women Business Directory</Link></li>
              <li><Link to="/membership">Membership Tiers</Link></li>
              <li><Link to="/city-chapters">City Chapters (Ahmedabad &amp; Delhi)</Link></li>
              <li><Link to="/events">Events &amp; Passes 2027</Link></li>
              <li><Link to="/partners">Sponsorship Tiers</Link></li>
              <li><Link to="/impact">Impact &amp; SDG Alignment</Link></li>
              <li><Link to="/faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Hub Locations */}
          <div>
            <h4>Contact &amp; Hubs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: '#5C287A' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong style={{ color: '#4A126D', fontWeight: 700 }}>Ahmedabad Hub:</strong> Ahmedabad Management Association (AMA), ATIRA Campus, Ahmedabad, Gujarat [Suite to be confirmed]
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong style={{ color: '#4A126D', fontWeight: 700 }}>Delhi NCR Hub:</strong> [Delhi NCR Regional Office Address to be confirmed]
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#6A1B9A" style={{ flexShrink: 0 }} />
                <a href="mailto:info@fempreneur.in" style={{ color: '#6A1B9A', fontWeight: 600, textDecoration: 'none' }}>info@fempreneur.in</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Award size={16} color="#6A1B9A" style={{ flexShrink: 0 }} />
                <a href="mailto:awards@fempreneur.in" style={{ color: '#6A1B9A', fontWeight: 600, textDecoration: 'none' }}>awards@fempreneur.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Planned Features Notice Bar */}
        <div
          style={{
            marginTop: '3rem',
            padding: '1rem 1.25rem',
            background: 'rgba(106, 27, 154, 0.04)',
            border: '1.5px solid rgba(106, 27, 154, 0.14)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            color: '#5C287A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span>
            <strong style={{ color: '#4A126D' }}>Planned &amp; Upcoming Platform Modules:</strong> Investor Connect Platform • Fempreneur Certified Badge • Workshop Series • Mobile App • Podcast Series • Annual Impact Report.
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              background: '#6A1B9A',
              color: '#FFFFFF',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Coming Soon
          </span>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="fem-footer-bottom">
          <div>
            © {new Date().getFullYear()} Fempreneur. Organized by 1MEIF (NGO) &amp; VyapaarJagat.com. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/about">Mission</Link>
            <Link to="/awards">50/50 Process</Link>
            <Link to="/partners">Sponsors</Link>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
