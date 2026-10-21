import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, CheckCircle2, AlertCircle, ArrowLeft, Mail, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <ShieldCheck size={18} color="#FFD54F" /> Legal Documentation
          </div>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#FFFFFF', lineHeight: 1.2 }}>
            Fempreneur Privacy &amp; Cookie Policy
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '680px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Transparency, member trust, and data privacy principles governing your use of{' '}
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
            <span style={{ color: '#6A1B9A', fontWeight: 700 }}>Privacy Policy</span>
            <span style={{ color: '#CCC' }}>|</span>
            <Link to="/terms" style={{ color: '#555', textDecoration: 'none', fontWeight: 500 }}>
              Terms of Use
            </Link>
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
          {/* Note Banner */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: '#F3E5F5',
              borderRadius: '12px',
              borderLeft: '4px solid #6A1B9A',
              marginBottom: '2.5rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start',
            }}
          >
            <Lock size={22} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.95rem', color: '#4A126D', lineHeight: 1.6 }}>
              <strong>Fempreneur</strong> values your privacy. This policy describes how we collect, use, store, and process your personal details when you interact with our website{' '}
              <a href="https://fempreneur.club/" target="_blank" rel="noopener noreferrer" style={{ color: '#6A1B9A', fontWeight: 700 }}>
                https://fempreneur.club/
              </a>.
            </div>
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
              Information We Collect
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontSize: '1rem' }}>
              We collect information that you actively provide to us during various interactions across our platform:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.12)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Membership &amp; Forms
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
                  Name, Email, Phone, Company, Designation, Sector, City, Website Link, and custom questionnaire answers.
                </p>
              </div>
              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.12)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Images &amp; Media
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
                  Uploaded profile pictures, promoter images, brand identity graphics, or organization logos.
                </p>
              </div>
              <div style={{ background: '#FAF7FD', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.12)' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#6A1B9A', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Transaction Details
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
                  Payment references (e.g. payment gateway transaction ID), subscription levels, and billing indicators. We do not store card numbers or banking passwords directly on our servers.
                </p>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 2 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
              How We Use Your Information
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '1rem' }}>
              The information we collect is utilized to deliver high-quality, professional services:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'To evaluate and process award nominations and community membership applications.',
                'To trigger confirmation and notification emails regarding your submissions.',
                'To set up public voting and winner showcase pages. Only promotional details such as nominee names, company, and category are shared publicly, subject to the relevant programme rules and permissions.',
                'To communicate agenda updates, event passes, or coordinate event logistics.',
                'To list businesses in relevant directories and help build authority and exposure, where applicable.',
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.96rem', color: '#444', lineHeight: 1.6 }}>
                  <CheckCircle2 size={18} color="#6A1B9A" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 3 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>3</span>
              Protection of Data
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: '1rem' }}>
              We employ reasonable administrative, technical, and organisational security measures to protect your personal information. Database access is restricted to authorised administrators, and data transmitted through the website is protected using secure TLS/SSL protocols. While we strive to maintain robust protection, no online transmission or electronic storage method can be guaranteed completely secure.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 4 */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#4A126D', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>4</span>
              Sharing with Third Parties
            </h2>
            <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontSize: '1rem' }}>
              <strong>We do not sell or lease your personal data.</strong> We may share information with trusted third-party providers strictly necessary to complete business operations, such as:
            </p>
            <div style={{ background: '#FAF7FD', padding: '1.25rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(106, 27, 154, 0.1)' }}>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#444', lineHeight: 1.7, fontSize: '0.96rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Payment gateway providers</strong> (e.g. Razorpay, Stripe) for secure online payment processing.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Email service providers</strong> for automated confirmation and notification emails.
                </li>
                <li>
                  <strong>Media, directory, event, or programme partners</strong>, including <em>VyapaarJagat.com</em> where relevant to the service or award submission.
                </li>
              </ul>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(106, 27, 154, 0.1)', margin: '2.5rem 0' }} />

          {/* Section 5 & 6 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>5</span>
                Cookies &amp; Tracking
              </h2>
              <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.96rem' }}>
                We may use cookie technologies to store your preferences, maintain login sessions, support administrative functions, and analyse website traffic. You can adjust your browser settings to refuse cookies, though some website features may not function correctly as a result.
              </p>
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', color: '#4A126D', fontWeight: 700, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6A1B9A', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>6</span>
                Parental Consent
              </h2>
              <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.96rem' }}>
                If you are under the age of 18, or where applicable law requires special consent for minors, verifiable parental or guardian consent must be obtained before you create a membership account or submit applications.
              </p>
            </div>
          </div>

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
              Data Inquiries &amp; Privacy Contact
            </h3>
            <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem' }}>
              For data protection inquiries, access requests, or to request deletion of your information from our database, please contact our privacy desk:
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
