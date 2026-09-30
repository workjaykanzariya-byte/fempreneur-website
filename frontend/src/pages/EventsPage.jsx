import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, CheckCircle2, Building2, Sparkles, ArrowRight, X } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';
import { registerEventPass } from '../services/api';

export default function EventsPage() {
  const [selectedHub, setSelectedHub] = useState('Ahmedabad');
  const [bookingPass, setBookingPass] = useState(null);
  const [attendeeData, setAttendeeData] = useState({ name: '', email: '', phone: '', company: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const agendaItems = [
    { time: '09:00 AM – 10:00 AM', title: 'Delegate Registration & Open Networking', desc: 'Badge collection, attendee networking over tea, and exhibition showcase preview walkthrough.' },
    { time: '10:00 AM – 11:15 AM', title: 'Inaugural Ceremony & Presidential Keynote', desc: 'Opening address by 1MEIF leadership, government dignitaries, and opening keynote on Nari Shakti.' },
    { time: '11:15 AM – 12:30 PM', title: 'Women in Leadership & Scaling Panel', desc: 'High-impact discussion featuring leading women industrialists, startup founders, and venture investors.' },
    { time: '12:30 PM – 01:30 PM', title: 'Practical Masterclasses (Funding & Brand Scale)', desc: 'Parallel practical masterclasses on venture debt, public grants, digital marketing, and governance.' },
    { time: '01:30 PM – 02:30 PM', title: 'Networking Lunch & 50-Stall Exhibition Showcase', desc: 'Curated exhibition featuring 50 innovative women-led enterprises showcasing products and services.' },
    { time: '02:30 PM – 03:45 PM', title: 'Fireside Chats: Overcoming Market Disruption', desc: 'Candid conversations with celebrated women founders on resilience and scaling across Indian markets.' },
    { time: '03:45 PM – 04:30 PM', title: 'Formal Launch of Fempreneur Coffee Table Book', desc: 'Unveiling of the Top 50 Women Entrepreneurs hardbound volume with dignitaries and media.' },
    { time: '04:30 PM – 06:00 PM', title: 'Fempreneur Awards 2027 Felicitation Ceremony', desc: 'Stage recognition of winners across 35–40+ categories decided 50% by jury and 50% by public votes.' },
    { time: '06:00 PM – 06:45 PM', title: 'Story Drive Live Interviews & Valedictory Reception', desc: 'On-site interviews with VyapaarJagat journalists, partner acknowledgments, and closing reception.' },
  ];

  const passTiers = [
    {
      name: 'General Delegate Pass',
      price: '₹999',
      features: ['Access to all keynote addresses & panels', 'Entry to 50-stall Exhibition Showcase', 'Networking lunch & tea/coffee reception', 'Digital copy of Coffee Table Book summary'],
      cta: 'Book Delegate Pass',
      popular: false,
    },
    {
      name: 'VIP Executive Pass',
      price: '₹2,499',
      features: ['Priority seating at inaugural & awards ceremony', 'Access to closed-door VIP networking lounge', 'Hardbound copy of Coffee Table Book', 'Fast-track registration and delegate welcome kit'],
      cta: 'Book VIP Pass',
      popular: true,
    },
    {
      name: 'Student / Aspiring Founder',
      price: '₹499',
      features: ['Full session attendance access', 'Exhibition showcase walkthrough', 'Masterclass access on funding & scaling', 'Digital participation certificate'],
      cta: 'Book Student Pass',
      popular: false,
    },
  ];

  const handleOpenBooking = (pass) => {
    setBookingPass(pass);
    setBookingSuccess(false);
    setBookingError(null);
  };

  const handleCompleteBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);

    try {
      const priceNum = parseInt(bookingPass?.price?.replace(/[^0-9]/g, '') || '0', 10);
      await registerEventPass({
        attendeeName: attendeeData.name.trim(),
        email: attendeeData.email.trim(),
        phone: attendeeData.phone.trim(),
        organization: attendeeData.company ? attendeeData.company.trim() : null,
        cityHub: selectedHub,
        passTier: bookingPass?.name || 'General Delegate Pass',
        price: priceNum,
      });

      setBookingLoading(false);
      setBookingSuccess(true);
    } catch (err) {
      setBookingLoading(false);
      setBookingError(err.message || 'Failed to complete pass reservation. Please try again.');
    }
  };

  return (
    <div>
      <PageHeader
        badge="Dual-City Showcase 2027"
        title="Fempreneur 2027"
        highlight="Event Hub & Passes"
        description="Experience 9 high-impact event-day program elements, 50 curated women-led exhibition stalls, masterclasses, and prestigious award felicitations."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Events Hub' }]}
        ctaText="Book Passes"
        ctaTo="#passes"
        secondaryCtaText="Nominate for Award"
        secondaryCtaTo="/nominate"
      />

      {/* Section 1: City Hub Selector */}
      <section className="section-spacing-sm" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Select Event Hub:
            </span>
            <button
              type="button"
              onClick={() => setSelectedHub('Ahmedabad')}
              className={`btn ${selectedHub === 'Ahmedabad' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-pill)', padding: '0.5rem 1.5rem' }}
            >
              <Building2 size={16} />
              Ahmedabad Anchor Hub (AMA)
            </button>
            <button
              type="button"
              onClick={() => setSelectedHub('Delhi NCR')}
              className={`btn ${selectedHub === 'Delhi NCR' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-pill)', padding: '0.5rem 1.5rem' }}
            >
              <MapPin size={16} />
              Delhi NCR National Hub
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: 9 Core Event-Day Elements */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <SectionTitle
            badge="Event Day Program"
            badgeVariant="plum"
            title="9 Core Elements of the"
            highlight="2027 Agenda"
            subtitle={`Full schedule for the ${selectedHub} edition. Designed for structured networking, learning, and celebration.`}
          />

          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {agendaItems.map((item, idx) => (
              <div
                key={idx}
                className="fem-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.35rem 1.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-burgundy)',
                    minWidth: '170px',
                  }}
                >
                  <Clock size={15} />
                  <span>{item.time}</span>
                </div>

                <div style={{ flexGrow: 1, minWidth: '220px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.2rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Pass Tiers & Registration */}
      <section id="passes" className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Delegate Registration"
            badgeVariant="gold"
            title="Secure Your"
            highlight="Event Pass"
            subtitle={`Reserve your seat for the ${selectedHub} program. Capacity is tracked to ensure curated networking.`}
          />

          <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
            {passTiers.map((p, idx) => (
              <div
                key={idx}
                className={`fem-card ${p.popular ? 'fem-card-gold' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2.25rem',
                  border: p.popular ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)',
                }}
              >
                {p.popular && (
                  <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                    Recommended
                  </span>
                )}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.35rem' }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-burgundy)', margin: '1rem 0 1.5rem' }}>
                  {p.price}
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(p)}
                  className={`btn ${p.popular ? 'btn-primary' : 'btn-secondary'} btn-block btn-md`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Planned Feature Tag: Workshops Series */}
          <div
            style={{
              marginTop: '4rem',
              padding: '1.25rem 1.75rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="badge badge-planned" style={{ marginBottom: '0.25rem' }}>
                Planned Feature
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>
                Recurring Workshop Series on Funding &amp; Brand Scaling
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Monthly online and offline masterclasses for founders between annual events. Free for members.
              </p>
            </div>
            <span className="badge badge-gold">Coming Soon</span>
          </div>
        </div>
      </section>

      {/* Pass Booking Modal UI */}
      {bookingPass && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(58, 12, 39, 0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem',
          }}
          onClick={() => setBookingPass(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '520px',
              width: '100%',
              padding: '2.25rem',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setBookingPass(null)}
              style={{
                position: 'absolute',
                right: '1.25rem',
                top: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
              }}
            >
              <X size={20} />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleCompleteBooking}>
                <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                  Pass Booking • {selectedHub} Hub
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.25rem' }}>
                  {bookingPass.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Price: <strong>{bookingPass.price}</strong> per attendee • Valid for full day program.
                </p>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Attendee Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Singhania"
                    className="form-input"
                    value={attendeeData.name}
                    onChange={(e) => setAttendeeData({ ...attendeeData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@company.com"
                      className="form-input"
                      value={attendeeData.email}
                      onChange={(e) => setAttendeeData({ ...attendeeData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={attendeeData.phone}
                      onChange={(e) => setAttendeeData({ ...attendeeData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Company / Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Singhania Ventures"
                    className="form-input"
                    value={attendeeData.company}
                    onChange={(e) => setAttendeeData({ ...attendeeData, company: e.target.value })}
                  />
                </div>

                {bookingError && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--color-coral-soft)',
                      border: '1px solid rgba(224, 93, 93, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {bookingError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Reserving Pass...' : 'Confirm Delegate Pass Reservation'}
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(37, 211, 102, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <CheckCircle2 size={30} color="#25D366" />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Pass Reserved Successfully!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{attendeeData.name}</strong>. Your reservation for <strong>{bookingPass.name} ({selectedHub} Hub)</strong> has been officially confirmed in the database. Delegate check-in instructions and receipt details will be sent to <strong>{attendeeData.email}</strong>.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setBookingPass(null)}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
