import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="fem-footer">
      <div className="container">
        {/* Top Newsletter Strip (Official Fempreneur Logo Purple #6A1B9A Gradient Card) */}
        {false && (
        <div
          style={{
            background: 'linear-gradient(135deg, #4A126D 0%, #6A1B9A 55%, #7B1FA2 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderRadius: 'var(--radius-2xl)',
            padding: '2.75rem 2.5rem',
            marginBottom: '4rem',
            boxShadow: '0 20px 48px rgba(106, 27, 154, 0.32)',
          }}
        >
          <div className="grid grid-cols-2 gap-8 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div>
              <span
                className="badge badge-gold"
                style={{
                  marginBottom: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                }}
              >
                Join the Movement
              </span>
              <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.65rem' }}>
                Stay Informed on Fempreneur 2027
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.92)', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>
                Receive award announcements, jury reveals, voting window dates, and Coffee Table Book launch notifications.
              </p>
            </div>
            <div>
              <NewsletterForm inverted={false} subtextColor="rgba(255, 255, 255, 0.88)" />
            </div>
          </div>
        </div>
        )}

        {/* 3-Column Main Footer Grid */}
        <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {/* Column 2: Programs & Awards */}
          <div>
            <h4>Awards &amp; Programs</h4>
            <ul className="fem-footer-links">
              <li><Link to="/awards">Fempreneur Awards 2027</Link></li>
              <li><Link to="/categories">35+ Award Categories</Link></li>
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

          {/* Column 4: Contact & Hubs */}
          <div>
            <h4>Contact &amp; Hubs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.86)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} color="#F48FB1" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>Head Office:</strong><br />
                  805 shapath 1 opp rajpath club gordhan thal, Sarkhej - Gandhinagar Hwy, Ahmedabad, Gujarat 380015
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#F48FB1" style={{ flexShrink: 0 }} />
                <a href="mailto:info@fempreneur.in" style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}>info@fempreneur.in</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#F48FB1" style={{ flexShrink: 0 }} />
                <a href="tel:7041151714" style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}>7041151714</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#F48FB1" style={{ flexShrink: 0 }} />
                <a href="tel:7016231097" style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}>7016231097</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="fem-footer-bottom">
          <div>
            © {new Date().getFullYear()} Fempreneur. Organized by 1MEIF (NGO) &amp; VyapaarJagat.com. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/about">Mission</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/partners">Sponsors</Link>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
