import React, { useState } from 'react';
import { HelpCircle, Search, Mail, ArrowRight } from 'lucide-react';
import { PageHeader, SectionTitle, FAQAccordion, CTAButton } from '../components';

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Awards & Nominations', '50/50 Public Voting', 'Community & Chapters', 'Coffee Table Book', 'Sponsorship & Partners'];

  const allFaqs = [
    {
      category: 'Awards & Nominations',
      question: 'What is Fempreneur?',
      answer: 'Fempreneur is India’s comprehensive women-entrepreneurship platform organized by 1 Million Entrepreneurs International Forum (1MEIF) and VyapaarJagat.com. It connects recognition, community, opportunity, and growth through its three pillars: Award, Connect, and Amplify.',
    },
    {
      category: 'Awards & Nominations',
      question: 'Is there an application fee to nominate?',
      answer: 'No. Nomination is 100% FREE as explicitly confirmed in the Fempreneur 2027 proposal. There are no submission fees, entry charges, or hidden processing costs.',
    },
    {
      category: 'Awards & Nominations',
      question: 'Who can apply for Fempreneur Awards?',
      answer: 'Women entrepreneurs, startup founders, women-led MSMEs, corporate leaders, innovators, and changemakers across India can apply. Ventures must have a clear operating presence demonstrating leadership, innovation, growth, scalability, or social impact across our 40 verified award categories.',
    },
    {
      category: 'Awards & Nominations',
      question: 'Can I apply multiple times or for multiple categories?',
      answer: 'You may submit one primary application per project or business per year. If your business operates across multiple distinct segments, our editorial panel will consider your secondary domain during jury evaluation.',
    },
    {
      category: 'Awards & Nominations',
      question: 'What if my business operates in multiple cities?',
      answer: 'You can apply with your primary headquarters or operating location. Participation is open to nominees and delegates from across India.',
    },
    {
      category: 'Awards & Nominations',
      question: 'Will I get feedback if I do not win an award?',
      answer: 'Yes. Selected finalists and nominees receive detailed jury evaluation insights and recommendations. Non-winning applicants can request scoring breakdowns to strengthen their business profile for future editions.',
    },
    {
      category: '50/50 Public Voting',
      question: 'How are winners selected?',
      answer: 'Winners are determined through our transparent 50/50 dual engine: 50% independent jury evaluation scored across 7 weighted criteria (Leadership, Innovation, Productivity, Scalability, Social Impact, Customer Trust, Resilience) plus 50% verified public voting.',
    },
    {
      category: '50/50 Public Voting',
      question: 'How does the public voting system work and how is fraud prevented?',
      answer: 'Every verified nominee receives a dedicated, shareable voting link. To preserve democratic integrity, our system enforces one vote per verified email session, bot suppression, IP rate limiting, and anomaly detection.',
    },
    {
      category: 'Awards & Nominations',
      question: 'What do winners get?',
      answer: 'Winners receive: (1) Prestigious Fempreneur Award trophy and certificate felicitated on stage, (2) Evaluation for inclusion in the hardbound Coffee Table Book, (3) A dedicated published feature on VyapaarJagat.com, (4) National media coverage reaching 5,00,000+ digital readers, and (5) Inductions into the national community directory.',
    },
    {
      category: 'Coffee Table Book',
      question: 'What is the Fempreneur Coffee Table Book?',
      answer: 'The Fempreneur Coffee Table Book is a premium hardbound publication celebrating the "Top 50 Women Entrepreneurs Redefining Success". It features in-depth founder profiles, journeys, impact metrics, and sponsor presence, with 5,000+ print copies distributed to corporate leaders and 5,00,000+ digital reach.',
    },
    {
      category: 'Community & Chapters',
      question: 'Is Fempreneur only for Ahmedabad?',
      answer: 'No! While Ahmedabad is our historic anchor hub (2022–2025), the 2027 edition expands nationally with two primary event hubs: Ahmedabad and Delhi NCR. Participation, nominations, and community membership are open nationwide across India.',
    },
    {
      category: 'Community & Chapters',
      question: 'How do I join or launch a Fempreneur City Chapter / Circle?',
      answer: 'You can apply through our City Chapters portal. Chapter leaders must be based in the host city, committed for a minimum of 12 months, and passionate about hosting monthly business networking, masterclasses, and local founder spotlights.',
    },
    {
      category: 'Sponsorship & Partners',
      question: 'Can companies and corporate brands sponsor Fempreneur 2027?',
      answer: 'Yes! We offer six transparent corporate partnership tiers: Title Sponsor (₹5,00,000), Powered By Sponsor (₹3,00,000), Platinum Sponsor (₹1,50,000), Gold Sponsor (₹1,00,000), Silver Sponsor (₹50,000), and Category Sponsor (₹10,000). Contact partners@fempreneur.in.',
    },
  ];

  const filteredFaqs = selectedCategory === 'All'
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

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container-narrow">
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`btn btn-sm ${selectedCategory === c ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-pill)', padding: '0.4rem 1rem' }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Accordion Component */}
          <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />

          {/* Support Prompt */}
          <div
            className="fem-card fem-card-gold"
            style={{
              marginTop: '4rem',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <HelpCircle size={36} color="var(--color-gold-rich)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
              Still Have Unanswered Questions?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
              Our organizing committee responds within 24–48 hours across awards, passes, and corporate partnership desks.
            </p>
            <CTAButton to="/contact" variant="primary" size="md">
              Contact Secretariat Desk
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
