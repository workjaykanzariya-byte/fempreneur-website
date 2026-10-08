import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Heart,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  Check,
} from 'lucide-react';
import { registerEventPass } from '../services/api';

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    segment: 'Women Entrepreneur',
  });
  const [passOption, setPassOption] = useState('with_dinner');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const attendeeSegments = [
    { title: 'Women Entrepreneurs', icon: Sparkles },
    { title: 'MSME Owners', icon: Building2 },
    { title: 'Tech & AI Startups', icon: TrendingUp },
    { title: 'CXOs & Executives', icon: UserCheck },
    { title: 'NGO & Social Leaders', icon: Heart },
    { title: 'Government Dignitaries', icon: ShieldCheck },
    { title: 'Corporate Sponsors', icon: Award },
    { title: 'Emerging Innovators', icon: BookOpen },
  ];



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Mobile number is required.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      setErrorMessage('Please enter a valid mobile number (7 to 15 digits).');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMessage('City & State is required.');
      return;
    }

    setIsLoading(true);
    const amount = passOption === 'with_dinner' ? 1500 : 750;
    const passName = passOption === 'with_dinner' ? 'Delegate (With Dinner)' : 'Delegate (Without Dinner)';

    try {
      await registerEventPass({
        attendeeName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organization: formData.segment,
        cityHub: formData.city.trim(),
        passTier: passName,
        price: amount,
      });

      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: '#FAF6FC', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* SECTION 1: EVENT HEADER / HERO (Matching website-wide light brand theme) */}
      <header
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #FDFBFE 0%, #F9F2FB 40%, #FAF5FC 100%)',
          color: 'var(--text-primary)',
          padding: '5rem 1.5rem 6.5rem',
          textAlign: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(106, 27, 154, 0.12)',
        }}
      >
        {/* Ambient Radial Glows (matching all website headers) */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(142, 36, 170, 0.12) 0%, rgba(106, 27, 154, 0.04) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '5%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(106, 27, 154, 0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Pulsing Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 1.25rem',
              border: '1px solid rgba(106, 27, 154, 0.18)',
              borderRadius: '999px',
              marginBottom: '2rem',
              background: 'rgba(106, 27, 154, 0.07)',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: 'var(--color-burgundy)',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(106, 27, 154, 0.5)',
              }}
            />
            <span
              style={{
                color: 'var(--color-burgundy)',
                fontWeight: 800,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              6th Annual Edition — Coming Soon
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: 'serif, Georgia, "Times New Roman"',
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              color: 'var(--color-plum-deep)',
              marginBottom: '1.5rem',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontWeight: 800,
            }}
          >
            Fempreneur{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7B1FA2 0%, #A21CAF 50%, #C2185B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
              }}
            >
              2027
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 3.5rem',
              fontWeight: 400,
              lineHeight: 1.65,
            }}
          >
            India's most comprehensive gathering of women entrepreneurs, investors, and ecosystem pioneers. Returning bigger and bolder in 2027 across Ahmedabad &amp; Delhi NCR Hubs.
          </p>

          {/* 3-Column Meta Details Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              maxWidth: '860px',
              margin: '0 auto',
              borderTop: '1px solid rgba(106, 27, 154, 0.12)',
              paddingTop: '2.75rem',
            }}
          >
            {/* 1. Date */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(106, 27, 154, 0.18)',
                  background: 'rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: 'var(--color-burgundy)',
                }}
              >
                <Calendar size={22} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '0.35rem' }}>
                Date
              </p>
              <p style={{ fontFamily: 'serif, Georgia', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0 }}>
                To Be Announced
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Stay tuned for 2027 details
              </p>
            </div>

            {/* 2. Venue */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(106, 27, 154, 0.18)',
                  background: 'rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: 'var(--color-burgundy)',
                }}
              >
                <MapPin size={22} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '0.35rem' }}>
                Venue
              </p>
              <p style={{ fontFamily: 'serif, Georgia', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0 }}>
                To Be Announced
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Ahmedabad &amp; Delhi NCR Hubs
              </p>
            </div>

            {/* 3. Attendance */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(106, 27, 154, 0.18)',
                  background: 'rgba(106, 27, 154, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: 'var(--color-burgundy)',
                }}
              >
                <Users size={22} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '0.35rem' }}>
                Attendance
              </p>
              <p style={{ fontFamily: 'serif, Georgia', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0 }}>
                500+ Leaders
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Exclusive Networking Gala
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2: WHO SHOULD ATTEND (Matching Greenpreneur Layout & 8 Cards) */}
      <section
        id="attendees"
        style={{
          padding: '5rem 1.5rem',
          background: '#1C0626',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontFamily: 'serif, Georgia',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                color: '#FFFFFF',
              }}
            >
              Who Should Attend
            </h2>
            <p
              style={{
                color: 'var(--color-gold-rich)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontSize: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              Building a national women-led economy across 150+ sectors
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto', fontWeight: 300, lineHeight: 1.6 }}>
              Uniting key ecosystem stakeholders to forge partnerships, access funding, and drive enterprise growth.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {attendeeSegments.map((segment, idx) => {
              const IconComp = segment.icon;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '1.75rem 1.25rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  <IconComp
                    size={30}
                    color="var(--color-gold-rich)"
                    style={{ margin: '0 auto 1rem', display: 'block' }}
                  />
                  <h4 style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    {segment.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: REGISTER INTEREST & PASS OPTIONS (Matching Greenpreneur Booking Component) */}
      <section
        id="register"
        style={{
          padding: '5.5rem 1.5rem',
          background: '#FFFFFF',
          borderBottom: '1px solid #EFE4F4',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div
            style={{
              background: 'linear-gradient(180deg, #FAF6FD 0%, #FFFFFF 100%)',
              padding: 'clamp(2rem, 5vw, 3rem)',
              borderRadius: '24px',
              border: '1.5px solid rgba(106, 27, 154, 0.15)',
              boxShadow: '0 20px 50px rgba(46, 8, 72, 0.08)',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3
                style={{
                  fontFamily: 'serif, Georgia',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  color: 'var(--color-plum-deep)',
                  marginBottom: '0.5rem',
                }}
              >
                Register Interest for 2027
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Be the first to know — register your interest for Fempreneur 2027. Date &amp; venue will be announced soon.
              </p>
            </div>

            {/* Success View */}
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(76, 175, 80, 0.12)',
                    color: '#2E7D32',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <Check size={32} strokeWidth={3} />
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Pass Secured Successfully!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Your delegate interest for <strong>{passOption === 'with_dinner' ? 'Delegate (With Dinner)' : 'Delegate (Without Dinner)'}</strong> has been registered. Our secretariat will send confirmation details shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: '', email: '', phone: '', city: '', segment: 'Women Entrepreneur' });
                  }}
                  className="btn btn-primary"
                  style={{ borderRadius: 'var(--radius-pill)', padding: '0.6rem 1.75rem', fontSize: '0.88rem' }}
                >
                  Register Another Pass
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* 1. Full Name */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#FFFFFF',
                      border: '1px solid #E0D4E6',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 2. Phone */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Mobile Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 70411 51714"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#FFFFFF',
                      border: '1px solid #E0D4E6',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 3. Email */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hello@fempreneur.in"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#FFFFFF',
                      border: '1px solid #E0D4E6',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 4. City & State */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ahmedabad, Gujarat"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#FFFFFF',
                      border: '1px solid #E0D4E6',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 5. Attendee Profile Segment */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Attendee Profile Segment
                  </label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#FFFFFF',
                      border: '1px solid #E0D4E6',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  >
                    <option>Women Entrepreneur</option>
                    <option>MSME Owner</option>
                    <option>Startup Founder</option>
                    <option>Corporate Executive</option>
                    <option>NGO / Social Enterprise</option>
                    <option>Student / Academic</option>
                  </select>
                </div>

                {/* 6. Select Pass Option */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    Select Pass Option
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                    {/* Without Dinner */}
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                        border: passOption === 'no_dinner' ? '2px solid var(--color-burgundy)' : '1px solid #E0D4E6',
                        background: passOption === 'no_dinner' ? 'rgba(106, 27, 154, 0.05)' : '#FFFFFF',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="radio"
                        name="passOption"
                        value="no_dinner"
                        checked={passOption === 'no_dinner'}
                        onChange={() => setPassOption('no_dinner')}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-plum-deep)', marginBottom: '0.25rem' }}>
                        Without Dinner
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                        General access to event sessions &amp; awards felicitation.
                      </span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-burgundy)', marginTop: 'auto' }}>
                        ₹750
                      </span>
                    </label>

                    {/* With Dinner (Recommended) */}
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                        border: passOption === 'with_dinner' ? '2px solid var(--color-burgundy)' : '1px solid #E0D4E6',
                        background: passOption === 'with_dinner' ? 'rgba(106, 27, 154, 0.05)' : '#FFFFFF',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="radio"
                        name="passOption"
                        value="with_dinner"
                        checked={passOption === 'with_dinner'}
                        onChange={() => setPassOption('with_dinner')}
                        style={{ display: 'none' }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-plum-deep)' }}>
                          With Dinner
                        </span>
                        <span style={{ background: 'rgba(212, 175, 55, 0.2)', color: '#8A6D15', fontSize: '0.62rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          Recommended
                        </span>
                      </div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                        Access to event sessions &amp; Gala Networking Dinner.
                      </span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-burgundy)', marginTop: 'auto' }}>
                        ₹1,500
                      </span>
                    </label>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div style={{ padding: '0.75rem', background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#B91C1C', fontSize: '0.84rem', fontWeight: 600, borderRadius: '8px', textAlign: 'center' }}>
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div style={{ paddingTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #7B1FA2 0%, #E91E63 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 8px 24px rgba(123, 31, 162, 0.35)',
                      opacity: isLoading ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {isLoading ? 'PROCESSING...' : `PAY & REGISTER (₹${passOption === 'with_dinner' ? '1,500' : '750'})`}
                    <ArrowRight size={16} />
                  </button>
                </div>

                <p style={{ fontSize: '0.72rem', textAlign: 'center', color: 'var(--text-muted)', margin: 0 }}>
                  Passes are first-come first-served. Registration includes GST and networking access.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
