import React from 'react';
import { Mail, Phone, MapPin, Award, Handshake, Clock, ShieldCheck } from 'lucide-react';
import { PageHeader, ContactForm, SectionTitle } from '../components';

export default function ContactPage() {
  const desks = [
    {
      title: 'Awards & Nominations Desk',
      email: 'awards@fempreneur.in',
      desc: 'Assistance with nomination forms, category eligibility, and 50/50 public voting mechanics.',
      icon: Award,
    },
    {
      title: 'Corporate Partnerships & CSR',
      email: 'partners@fempreneur.in',
      desc: 'Corporate sponsorship packages (6 tiers), exhibition stall bookings, and brand collaborations.',
      icon: Handshake,
    },
    {
      title: 'General Inquiries & Media',
      email: 'info@fempreneur.in',
      desc: 'Press kits, VyapaarJagat story submissions, delegate pass registrations, and city chapters.',
      icon: Mail,
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Official Secretariat"
        title="Get in Touch with"
        highlight="Fempreneur Team"
        description="Connect with our specialized coordination desks in Ahmedabad and Delhi NCR. We respond within 24–48 business hours."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]}
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {/* Section 1: Department Desks */}
          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '4rem' }}>
            {desks.map((d, idx) => {
              const Icon = d.icon;
              return (
                <div key={idx} className="fem-card" style={{ padding: '2rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'rgba(109, 27, 68, 0.08)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.4rem' }}>
                    {d.title}
                  </h4>
                  <a
                    href={`mailto:${d.email}`}
                    style={{ fontSize: '0.92rem', color: 'var(--color-burgundy)', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}
                  >
                    {d.email}
                  </a>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Section 2: Form & Regional Hub Locations */}
          <div className="grid grid-cols-2 gap-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Regional Hub Office Containers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Ahmedabad Anchor Office */}
              <div className="fem-card fem-card-gold" style={{ padding: '2rem' }}>
                <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                  Anchor Secretariat
                </span>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Ahmedabad Anchor Hub Office
                </h4>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  <MapPin size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    Ahmedabad Management Association (AMA), ATIRA Campus, Dr. Vikram Sarabhai Marg, Vastrapur, Ahmedabad, Gujarat [Suite to be confirmed]
                  </div>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Convening location for Western India MSMEs and founders since 2022.
                </div>
              </div>

              {/* Delhi NCR Regional Hub */}
              <div className="fem-card" style={{ padding: '2rem' }}>
                <span className="badge badge-plum" style={{ marginBottom: '0.75rem' }}>
                  National Hub
                </span>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Delhi NCR Regional Hub Office
                </h4>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  <MapPin size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    National Capital Regional Secretariat, New Delhi [Official address to be published ahead of 2027 program]
                  </div>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Coordinating central ministry engagement, policy forums, and national media.
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div style={{ padding: '1.25rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={20} color="var(--color-gold-rich)" />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>Response Assurance:</strong> All inquiries receive a written confirmation and ticket number within 24 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
