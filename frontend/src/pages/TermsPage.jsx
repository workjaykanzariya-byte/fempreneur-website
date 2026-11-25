import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldAlert, Award, CreditCard, Scale, HelpCircle, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div style={{ background: '#FAF7FD', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Page Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #38006b 0%, #6a1b9a 50%, #9c27b0 100%)',
          color: '#FFFFFF',
          padding: '4.5rem 1.5rem 4rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <FileText size={18} color="#FFD54F" /> Terms &amp; Conditions
          </div>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#FFFFFF', lineHeight: 1.2 }}>
            Fempreneur Terms of Use
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '680px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Terms and conditions governing access, memberships, awards, events, and services on{' '}
            <strong style={{ color: '#FFD54F' }}>fempreneur.club</strong>.
          </p>
          <div style={{ display: 'inline-block', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.9rem', borderRadius: '6px' }}>
            Last Updated: June 2026
          </div>
        </div>
      </section>

      {/* Breadcrumb / Navigation Bar */}
      <div style={{ borderBottom: '1px solid rgba(106, 27, 154, 0.12)', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#6A1B9A',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
            <Link to="/privacy-policy" style={{ color: '#555', textDecoration: 'none', fontWeight: 500 }}>
              Privacy Policy
            </Link>
            <span style={{ color: '#CCC' }}>|</span>
            <span style={{ color: '#6A1B9A', fontWeight: 700 }}>Terms of Use</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid rgba(106, 27, 154, 0.1)',
            boxShadow: '0 10px 30px rgba(106, 27, 154, 0.05)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Section 1 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
              Introduction
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontSize: '1rem' }}>
              <strong>Fempreneur.club</strong> (“Fempreneur”, “we”, “us” or “our”) provides content, community opportunities, networking, recognition and related services for women entrepreneurs, professionals and leaders, as described in these Terms of Use.
            </p>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontSize: '1rem' }}>
              By accessing <a href="https://fempreneur.club/" target="_blank" rel="noopener noreferrer" style={{ color: '#6A1B9A', fontWeight: 700 }}>https://fempreneur.club/</a> (“Website”) or any content or services on the Website, you (“you”, “your” or “user”) agree to these Terms of Use, whether or not you have registered with the Website. Please read these Terms before using the Website or downloading content, as they describe important rights and obligations.
            </p>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontSize: '1rem' }}>
              Where required by applicable law, verifiable parental or guardian consent is required before a person under 18 creates a membership account or submits an application.
            </p>
            <div style={{ background: '#FAF7FD', padding: '1rem 1.25rem', borderRadius: '8px', borderLeft: '3px solid #6A1B9A', fontSize: '0.95rem', color: '#555', lineHeight: 1.6 }}>
              We may revise these Terms from time to time. Continued use after revised Terms are posted indicates acceptance where legally valid. Please also review our <Link to="/privacy-policy" style={{ color: '#6A1B9A', fontWeight: 600 }}>Privacy Policy</Link> to understand how information is used. If you do not agree, do not register for or use the Website.
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 2 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
              Use of Website &amp; Services
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '1rem' }}>
              The Website facilitates access to services, communities, and content for women entrepreneurs, professionals, and young leaders:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>Meetings &amp; Network Building</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Virtual meetings with local/national members and industry leaders.</li>
                  <li>In-person business workshops and networking sessions.</li>
                  <li>Local conferences, awards, and member meetups.</li>
                </ul>
              </div>

              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>Media Exposure</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Opportunities to feature an entrepreneur's journey or interview on Fempreneur or partner media.</li>
                  <li>Business directory listings and product/service showcases.</li>
                  <li>Authority and credibility building.</li>
                </ul>
              </div>

              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>Forums &amp; Advisory Community</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Sharing entrepreneurial experiences and discussing challenges.</li>
                  <li>Connections with entrepreneurs, mentors, and decision-makers.</li>
                  <li>Collaborative learning and peer perspectives.</li>
                </ul>
              </div>

              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>Business Power Teams</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Groups of complementary, non-competing professionals sharing referrals.</li>
                  <li>Regular collaborative activities supporting member business growth.</li>
                </ul>
              </div>

              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>Events &amp; Conferences</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Conferences, workshops, business tours, networking events, and awards.</li>
                  <li>Speaker, partner, sponsor, or participant opportunities.</li>
                </ul>
              </div>

              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>Recognition &amp; Awards</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Award nominations, jury assessment, and public voting programs.</li>
                  <li>Nominee creatives, voting links, award badges, and showcase media.</li>
                </ul>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 3 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>3</span>
              Membership Account &amp; Security
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontSize: '1rem' }}>
              To access certain features, you may need to register an account. You represent and warrant that all information provided:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#444', fontSize: '0.96rem' }}>
                <CheckCircle2 size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Is owned by you or you have all necessary rights and permissions to provide it.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#444', fontSize: '0.96rem' }}>
                <CheckCircle2 size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Is true, accurate, current, complete, and not misleading.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#444', fontSize: '0.96rem' }}>
                <CheckCircle2 size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Does not violate these Terms or another party's legal rights.</span>
              </li>
            </ul>
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.96rem' }}>
              You are responsible for keeping your account credentials confidential. If you suspect unauthorized access, contact us promptly. Fempreneur is not liable for losses caused by compromised credentials.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 4 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>4</span>
              Restrictions on Use
            </h2>
            <div style={{ background: '#FFF5F5', padding: '1.25rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#7F1D1D', lineHeight: 1.8, fontSize: '0.96rem' }}>
                <li>Do not distribute Website content without prior written consent from the relevant rights holder.</li>
                <li>Do not use Website content for unauthorized commercial purposes without prior approval.</li>
                <li>Do not use bots, scrapers, crawlers, or automated scripts that impose unreasonable load on platform infrastructure.</li>
                <li>Comply strictly with all applicable laws and regulations when using the platform.</li>
              </ul>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 5, 6, 7 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ background: '#FAF7FD', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>5</span>
                Payment Terms
              </h3>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Payments for passes, sponsorships, and memberships are handled via compliant third-party payment gateways. You must provide valid details and authorization.
              </p>
            </div>

            <div style={{ background: '#FAF7FD', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>6</span>
                Subscription &amp; Fees
              </h3>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Prices are shown in Indian Rupees (INR) unless indicated otherwise. Applicable taxes and gateway fees are clearly disclosed during checkout.
              </p>
            </div>

            <div style={{ background: '#FAF7FD', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>7</span>
                Refunds &amp; Cancellations
              </h3>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Refund rules for subscriptions, tickets, books, or sponsorships are communicated during the respective checkout. Cancellations are handled in accordance with the transaction terms.
              </p>
            </div>
          </div>

          {/* Section 8 & 9 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>8</span>
              Intellectual Property
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Unless otherwise stated, all content displayed on or used in connection with the Website—including text, photographs, illustrations, audio, video, source code, logos, trademarks, and directories (“IP Content”)—is owned by or licensed to Fempreneur or relevant partners. You may not republish, scrape, copy, modify, distribute, or exploit IP Content without prior written permission.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>9</span>
              Governing Law &amp; Jurisdiction
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.96rem' }}>
              These Terms of Use shall be governed by and construed in accordance with the laws of India. Disputes shall be subject to the jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Contact Box */}
          <div
            style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(106, 27, 154, 0.06) 0%, rgba(156, 39, 176, 0.08) 100%)',
              borderRadius: '12px',
              border: '1.5px solid rgba(106, 27, 154, 0.15)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.5rem' }}>
              Questions or Formal Inquiries?
            </h3>
            <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem' }}>
              For legal inquiries, dispute resolution, or clarification on terms of use:
            </p>
            <a
              href="mailto:info@fempreneur.in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#6A1B9A',
                color: '#FFFFFF',
                padding: '0.75rem 1.6rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(106, 27, 154, 0.25)',
              }}
            >
              <Mail size={18} /> Contact: info@fempreneur.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
