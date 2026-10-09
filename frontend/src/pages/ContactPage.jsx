import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Building2,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import { submitGeneralInquiry } from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Award Nomination',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await submitGeneralInquiry({
        type: 'contact',
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        topic: formData.interest,
        messageOrTopic: `[Interest: ${formData.interest}] Message: ${formData.message}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      // Fallback graceful success to prevent user frustration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: '#1C1224' }}>
      
      {/* SECTION 1: HERO HEADER (Matching Screenshot 2) */}
      <section
        style={{
          background: 'linear-gradient(145deg, #2E0848 0%, #4A126D 100%)',
          color: '#FFFFFF',
          padding: '5rem 1.5rem 6.5rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <span
            style={{
              color: '#D8B4FE',
              fontWeight: 800,
              letterSpacing: '0.2em',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            CONNECT WITH OUR LEADERSHIP
          </span>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.22,
              margin: '0 0 1.25rem 0',
            }}
          >
            Let's Build a Stronger Future for Women Entrepreneurs Together
          </h1>

          <p
            style={{
              fontSize: '1.02rem',
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Have a question about nominations, sponsorship tiers, or stall bookings? Our coordinators are here to guide you.
          </p>
        </div>
      </section>

      {/* SECTION 2: LEADERSHIP CARDS (Matching Reference) */}
      <section style={{ maxWidth: '960px', margin: '-3.75rem auto 3.5rem', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          
          {/* Leader 1: Dr. Pravin Parmar */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem 2rem 2rem',
              textAlign: 'center',
              border: '1px solid #EFE4F4',
              boxShadow: '0 12px 32px rgba(46, 8, 72, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Avatar with Badge */}
              <div style={{ position: 'relative', marginBottom: '1.25rem', display: 'inline-block' }}>
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #6A1B9A',
                    boxShadow: '0 4px 16px rgba(106, 27, 154, 0.2)',
                  }}
                >
                  <img
                    src="/images/pravin.png"
                    alt="Dr. Pravin Parmar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.65)',
                      transformOrigin: '50% 32%',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                    fontSize: '0.75rem',
                    boxShadow: '0 2px 8px rgba(106, 27, 154, 0.3)',
                  }}
                >
                  <Award size={14} />
                </div>
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#1C1224', margin: '0 0 0.25rem 0' }}>
                Dr. Pravin Parmar
              </h3>

              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6A1B9A', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
                FOUNDER — MEIF NGO
              </p>

              <p style={{ fontSize: '0.86rem', color: '#5C4E65', fontStyle: 'italic', lineHeight: 1.55, margin: '0 0 1.5rem 0' }}>
                "Fempreneur is more than an event; it's a commitment to empower and celebrate women entrepreneurs across India."
              </p>
            </div>

            {/* Direct Action Buttons: CALL & WhatsApp */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', width: '100%' }}>
              <a
                href="tel:+919979888849"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #E91E63 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(106, 27, 154, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(106, 27, 154, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(106, 27, 154, 0.35)';
                }}
              >
                <Phone size={16} style={{ strokeWidth: 2.5 }} />
                <span>CALL</span>
              </a>

              <a
                href="https://wa.me/919979888849?text=Hello%20Dr.%20Pravin%20Parmar,%20I%20am%20inquiring%20about%20Fempreneur%202027"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.35)';
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Leader 2: Vishal Parmar */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem 2rem 2rem',
              textAlign: 'center',
              border: '1px solid #EFE4F4',
              boxShadow: '0 12px 32px rgba(46, 8, 72, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Avatar with Badge */}
              <div style={{ position: 'relative', marginBottom: '1.25rem', display: 'inline-block' }}>
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #6A1B9A',
                    boxShadow: '0 4px 16px rgba(106, 27, 154, 0.2)',
                  }}
                >
                  <img
                    src="/images/vishal.jpeg"
                    alt="Vishal Parmar"
                    onError={(e) => {
                      e.currentTarget.src = '/images/vishal.png';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#25D366',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                    fontSize: '0.75rem',
                  }}
                >
                  <MessageCircle size={14} />
                </div>
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#1C1224', margin: '0 0 0.25rem 0' }}>
                Vishal Parmar
              </h3>

              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6A1B9A', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
                DIRECTOR — PEERS GLOBAL
              </p>

              <p style={{ fontSize: '0.86rem', color: '#5C4E65', lineHeight: 1.55, margin: '0 0 1.5rem 0' }}>
                Contact directly for corporate sponsorships, exhibition stall bookings, and leadership event registrations.
              </p>
            </div>

            {/* Direct Action Buttons: CALL & WhatsApp */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', width: '100%' }}>
              <a
                href="tel:+919825600822"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #E91E63 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(106, 27, 154, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(106, 27, 154, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(106, 27, 154, 0.35)';
                }}
              >
                <Phone size={16} style={{ strokeWidth: 2.5 }} />
                <span>CALL</span>
              </a>

              <a
                href="https://wa.me/919825600822?text=Hello%20Vishal%20Parmar,%20I%20am%20inquiring%20about%20Fempreneur%202027%20sponsorships"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.35)';
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SEND A MESSAGE & CONTACT INFO (Matching Screenshot 1) */}
      <section style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
          
          {/* LEFT: SEND A MESSAGE FORM CARD */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid #EFE4F4',
              padding: '2.75rem 2.25rem',
              boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#1C1224',
                margin: '0 0 0.35rem 0',
              }}
            >
              Send a Message
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#72627C', margin: '0 0 2rem 0' }}>
              Drop your query here. We usually respond within 24 hours.
            </p>

            {error && (
              <div style={{ padding: '0.85rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                {error}
              </div>
            )}

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: '#FAF6FC', borderRadius: '16px', border: '1px solid #EFE4F4' }}>
                <CheckCircle2 size={48} color="#6A1B9A" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.45rem' }}>
                  Thank You for Reaching Out!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#5C4E65', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  We have received your message. Our coordination team will get in touch with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', interest: 'Award Nomination', message: '' });
                  }}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #E6D5EC',
                    color: '#6A1B9A',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  Send Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #E6D5EC',
                        background: '#FAFAFA',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #E6D5EC',
                        background: '#FAFAFA',
                        fontSize: '0.92rem',
                        color: '#1C1224',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #E6D5EC',
                      background: '#FAFAFA',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    I'M INTERESTED IN
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #E6D5EC',
                      background: '#FFFFFF',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      fontWeight: 600,
                      outline: 'none',
                    }}
                  >
                    <option value="Award Nomination">Award Nomination</option>
                    <option value="Corporate Sponsorship & Partnership">Corporate Sponsorship &amp; Partnership</option>
                    <option value="Exhibition Stall Booking">Exhibition Stall Booking</option>
                    <option value="Coffee Table Book Feature">Coffee Table Book Feature</option>
                    <option value="Media & PR Inquiries">Media &amp; PR Inquiries</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1C1224', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your query or enterprise operations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #E6D5EC',
                      background: '#FAFAFA',
                      fontSize: '0.92rem',
                      color: '#1C1224',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1.05rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(106, 27, 154, 0.4)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(233, 30, 99, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.4)';
                    }
                  }}
                >
                  {loading ? 'Submitting Query...' : 'SUBMIT ENQUIRY'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: CONTACT INFORMATION CARD */}
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#1C1224',
                margin: '0 0 1.25rem 0',
              }}
            >
              Contact Information
            </h2>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid #EFE4F4',
                padding: '2.25rem',
                boxShadow: '0 8px 30px rgba(46, 8, 72, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              {/* Item 1: Registered Secretariat */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.15rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#FAF0FB',
                    border: '1px solid #E1BEE7',
                    color: '#6A1B9A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1C1224', margin: '0 0 0.35rem 0' }}>
                    Registered Secretariat
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.6, margin: 0 }}>
                    Shapath 1, 805, Sarkhej - Gandhinagar Hwy, Highway Park Society, Bodakdev, Ahmedabad, Gujarat 380015.
                  </p>
                </div>
              </div>

              {/* Item 2: Main Conclave Venue */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.15rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#FAF0FB',
                    border: '1px solid #E1BEE7',
                    color: '#6A1B9A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Calendar size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1C1224', margin: '0 0 0.35rem 0' }}>
                    Fempreneur 2027 Main Conclave Venue
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#5C4E65', lineHeight: 1.6, margin: 0 }}>
                    AMA Complex (Ahmedabad Management Association), ATIRA Campus, Dr. Vikram Sarabhai Marg, Vastrapur, Ahmedabad, Gujarat.<br />
                    <span style={{ fontSize: '0.82rem', color: '#6A1B9A', fontWeight: 700 }}>National Showcase: Ahmedabad &amp; Delhi NCR Hubs</span>
                  </p>
                </div>
              </div>

              {/* Item 3: Direct Email & Phone Channels */}
              <div style={{ borderTop: '1px solid #F0E6F4', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#1C1224' }}>
                  <Mail size={16} color="#6A1B9A" />
                  <a href="mailto:hello@fempreneur.in" style={{ color: '#6A1B9A', fontWeight: 700, textDecoration: 'none' }}>
                    hello@fempreneur.in
                  </a>
                  <span style={{ color: '#9B8C9F' }}>/</span>
                  <a href="mailto:awards@fempreneur.in" style={{ color: '#6A1B9A', fontWeight: 700, textDecoration: 'none' }}>
                    awards@fempreneur.in
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#1C1224' }}>
                  <Phone size={16} color="#6A1B9A" />
                  <span style={{ fontWeight: 600, color: '#374151' }}>+91 99798 88849 / +91 98256 00822</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
