import React, { useState } from 'react';
import {
  HelpCircle,
  Info,
  Award,
  Calendar,
  Handshake,
  BookOpen,
  Users,
  Search,
  ArrowRight
} from 'lucide-react';
import { PageHeader, FAQAccordion, CTAButton } from '../components';

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categoryList = [
    { id: 'All Categories', label: 'All Categories', icon: Info },
    { id: 'General', label: 'General', icon: Info },
    { id: 'Awards & Nominations', label: 'Awards & Nominations', icon: Award },
    { id: 'Event Details', label: 'Event Details', icon: Calendar },
    { id: 'Sponsorship', label: 'Sponsorship', icon: Handshake },
    { id: 'Coffee Table Book', label: 'Coffee Table Book', icon: BookOpen },
    { id: 'Community & Membership', label: 'Community & Membership', icon: Users },
  ];

  const allFaqs = [
    // General
    {
      category: 'General',
      question: 'What is Fempreneur?',
      answer: 'Fempreneur is India’s comprehensive women-entrepreneurship platform organized by 1 Million Entrepreneurs International Forum (1MEIF) and VyapaarJagat.com. It connects recognition, community, opportunity, and growth through its three pillars: Award, Connect, and Amplify.',
    },
    {
      category: 'General',
      question: 'Who can apply for Fempreneur Awards & Programs?',
      answer: 'Women entrepreneurs, startup founders, women-led MSMEs, corporate leaders, innovators, and changemakers across India can apply. Ventures must have a clear operating presence demonstrating leadership, innovation, growth, scalability, or social impact across our verified award categories.',
    },
    {
      category: 'General',
      question: 'What if my business operates in multiple cities?',
      answer: 'You can apply with your primary headquarters or operating location. Participation is open to nominees and delegates from across India.',
    },

    // Awards & Nominations
    {
      category: 'Awards & Nominations',
      question: 'Is there an application fee to nominate?',
      answer: 'No. Nomination is 100% FREE as explicitly confirmed in the Fempreneur 2027 framework. There are no submission fees, entry charges, or hidden processing costs.',
    },
    {
      category: 'Awards & Nominations',
      question: 'Can I apply multiple times or for multiple categories?',
      answer: 'You may submit one primary application per project or business per year. If your business operates across multiple distinct segments, our editorial panel will consider your secondary domain during jury evaluation.',
    },
    {
      category: 'Awards & Nominations',
      question: 'Will I get feedback if I do not win an award?',
      answer: 'Yes. Selected finalists and nominees receive detailed jury evaluation insights and recommendations. Non-winning applicants can request scoring breakdowns to strengthen their business profile for future editions.',
    },
    {
      category: 'Awards & Nominations',
      question: 'How are winners selected in the 50/50 system?',
      answer: 'Winners are determined through our transparent 50/50 dual engine: 50% independent jury evaluation scored across 7 weighted criteria (Leadership, Innovation, Productivity, Scalability, Social Impact, Customer Trust, Resilience) plus 50% verified public voting.',
    },
    {
      category: 'Awards & Nominations',
      question: 'How does the public voting system work and how is fraud prevented?',
      answer: 'Every verified nominee receives a dedicated, shareable voting link. To preserve democratic integrity, our system enforces one vote per verified email session, bot suppression, IP rate limiting, and anomaly detection.',
    },
    {
      category: 'Awards & Nominations',
      question: 'What do winners get?',
      answer: 'Winners receive: (1) Prestigious Fempreneur Award trophy and certificate felicitated on stage, (2) Evaluation for inclusion in the hardbound Coffee Table Book, (3) A dedicated published feature on VyapaarJagat.com, (4) National media coverage reaching 5,00,000+ digital readers, and (5) Induction into the national community directory.',
    },

    // Event Details
    {
      category: 'Event Details',
      question: 'Is Fempreneur only for Ahmedabad?',
      answer: 'No! While Ahmedabad is our historic anchor hub (2022–2025), the 2027 edition expands nationally with two primary event hubs: Ahmedabad and Delhi NCR. Participation, nominations, and community membership are open nationwide across India.',
    },
    {
      category: 'Event Details',
      question: 'When and where are the 2027 Fempreneur Gala events held?',
      answer: 'Fempreneur 2027 features regional mega summits in Ahmedabad and Delhi NCR, hosting 1,000+ business leaders, founders, keynote speakers, masterclasses, and national award felicitation ceremonies.',
    },
    {
      category: 'Event Details',
      question: 'How do I register for Delegate and VIP passes?',
      answer: 'You can reserve delegate passes through our Events page. Options include General Delegate Access and VIP Pass with networking dinner, reserved VIP seating, and speaker lounge access.',
    },

    // Sponsorship
    {
      category: 'Sponsorship',
      question: 'Can companies and corporate brands sponsor Fempreneur 2027?',
      answer: 'Yes! We offer six transparent corporate partnership tiers: Title Sponsor (₹5,00,000), Powered By Sponsor (₹3,00,000), Platinum Sponsor (₹1,50,000), Gold Sponsor (₹1,00,000), Silver Sponsor (₹50,000), and Category Sponsor (₹10,000). Contact partners@fempreneur.in.',
    },
    {
      category: 'Sponsorship',
      question: 'What benefits do sponsors receive?',
      answer: 'Sponsors receive nationwide brand exposure across digital campaigns (5,00,000+ reach), logo prominence on stage backdrops, Coffee Table Book color ads, exhibition stall space, and direct networking with 1,000+ women founders and business leaders.',
    },

    // Coffee Table Book
    {
      category: 'Coffee Table Book',
      question: 'What is the Fempreneur Coffee Table Book?',
      answer: 'The Fempreneur Coffee Table Book is a premium hardbound publication celebrating the "Top 50 Women Entrepreneurs Redefining Success". It features in-depth founder profiles, journeys, impact metrics, and sponsor presence, with 5,000+ print copies distributed to corporate leaders and 5,00,000+ digital reach.',
    },
    {
      category: 'Coffee Table Book',
      question: 'How are founders evaluated for the Coffee Table Book?',
      answer: 'Nominees and award applicants undergo an editorial review based on business resilience, innovation, revenue milestones, and societal impact. Elite members and award winners receive priority editorial consideration.',
    },

    // Community & Membership
    {
      category: 'Community & Membership',
      question: 'How do I join or launch a Fempreneur City Chapter / Circle?',
      answer: 'You can apply through our City Chapters portal. Chapter leaders must be based in the host city, committed for a minimum of 12 months, and passionate about hosting monthly business networking, masterclasses, and local founder spotlights.',
    },
    {
      category: 'Community & Membership',
      question: 'What are the membership tiers and benefits?',
      answer: 'Fempreneur offers Community (Free), Pro Member (₹5,000/yr or ₹1 test mode), and Elite Founder (₹25,000/yr) memberships. Benefits include searchable verified directory profiles, masterclass libraries, event discounts, and mastermind circles.',
    },
  ];

  const filteredFaqs = selectedCategory === 'All Categories'
    ? allFaqs
    : allFaqs.filter((f) => f.category === selectedCategory);

  return (
    <div>
      <PageHeader
        badge="Help & Knowledge Base"
        title="Frequently Asked"
        highlight="Questions (FAQ)"
        description="Find verified answers to common questions about nomination guidelines, the 50/50 voting system, delegate passes, and corporate partnerships."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'FAQ' }]}
        ctaText="Ask a Question"
        ctaTo="/contact"
        ctaIcon={null}
        image="/images/faq/faq-hero-transparent.png"
        imageAlt="Frequently Asked Questions - Fempreneur Support"
        imageFramed={false}
      />

      <section className="section-spacing" style={{ background: '#FDFBFD', minHeight: '600px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 320px) 1fr',
              gap: '2.5rem',
              alignItems: 'start',
            }}
            className="faq-layout-grid"
          >
            {/* Left Sidebar: HELP CATEGORIES */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                border: '1px solid rgba(106, 27, 154, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(58, 12, 39, 0.06)',
                position: 'sticky',
                top: '100px',
              }}
            >
              {/* Card Header */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-plum-deep)',
                    margin: 0,
                    paddingBottom: '0.85rem',
                    borderBottom: '1px solid rgba(106, 27, 154, 0.1)',
                  }}
                >
                  Help Categories
                </h3>
              </div>

              {/* Category Buttons List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {categoryList.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.85rem 1.15rem',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        background: isActive
                          ? 'linear-gradient(135deg, #6A1B9A 0%, #4A0E4E 100%)'
                          : 'transparent',
                        color: isActive ? '#FFFFFF' : '#374151',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.94rem',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 4px 14px rgba(106, 27, 154, 0.35)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(106, 27, 154, 0.05)';
                          e.currentTarget.style.color = 'var(--color-burgundy)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#374151';
                        }
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: isActive ? '#FFFFFF' : 'var(--color-burgundy)',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ flexGrow: 1 }}>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content Area: FAQ Accordion */}
            <div>
              {/* Category Subtitle Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--color-plum-deep)',
                      margin: 0,
                    }}
                  >
                    {selectedCategory}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                    Showing {filteredFaqs.length} verified question{filteredFaqs.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Accordion Component */}
              <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />

              {/* Support Prompt Banner */}
              <div
                className="fem-card fem-card-gold"
                style={{
                  marginTop: '3.5rem',
                  padding: '2.25rem',
                  textAlign: 'center',
                  borderRadius: '18px',
                }}
              >
                <HelpCircle size={34} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.75rem' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Still Have Unanswered Questions?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', maxWidth: '520px', margin: '0 auto 1.25rem' }}>
                  Our organizing committee responds within 24–48 hours across awards, passes, and corporate partnership desks.
                </p>
                <CTAButton to="/contact" variant="primary" size="md">
                  Contact Secretariat Desk
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Style for Mobile/Tablet layout */}
      <style>{`
        @media (max-width: 860px) {
          .faq-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .faq-layout-grid > div:first-child {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
