import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ShieldCheck, Vote, Sparkles, ArrowRight, FileCheck, Users, Trophy } from 'lucide-react';
import { PageHeader, SectionTitle, CTAButton } from '../components';

export default function AwardsPage() {
  const criteria = [
    { title: 'Leadership & Vision', weight: '15%', desc: 'Strategic clarity, ethical organizational governance, resilience, and capacity to inspire and mobilize teams toward long-term business goals.' },
    { title: 'Innovation & Differentiation', weight: '15%', desc: 'Uniqueness of product, service, technology adoption, or innovative business model that disrupts market standards.' },
    { title: 'Productivity & Growth', weight: '15%', desc: 'Demonstrated revenue traction, operational profitability, employment generation, and sustainable fiscal health.' },
    { title: 'Scalability & Market Potential', weight: '15%', desc: 'Capability of the business model to expand geographically, address wider demographic segments, and replicate efficiently.' },
    { title: 'Social & Economic Impact', weight: '15%', desc: 'Measurable upliftment created for local communities, inclusive employment, female workforce empowerment, and fair trade practices.' },
    { title: 'Customer Reach & Trust', weight: '15%', desc: 'Market reception, customer retention metrics, service satisfaction, and authentic brand goodwill.' },
    { title: 'Resilience & Overcoming Barriers', weight: '10%', desc: 'Agility in navigating macroeconomic headwinds, supply disruptions, or sector-specific systemic challenges.' },
  ];

  const steps = [
    { num: '01', title: 'Submit Free Nomination', desc: 'Fill out the online application form with founder details, venture overview, pitch deck, and award category selection.' },
    { num: '02', title: 'Screening & Shortlisting', desc: 'The 1MEIF editorial committee verifies eligibility, operational track record, and compliance before approving nominees.' },
    { num: '03', title: 'Public Voting Period', desc: 'Each approved nominee receives a unique verified voting link to mobilize customers, peers, and social networks.' },
    { num: '04', title: 'Jury Review & Scoring', desc: 'Our eminent independent jury evaluates nominees across the 7 weighted criteria to assign the normalized jury score.' },
    { num: '05', title: 'Felicitation Ceremony', desc: 'Final composite scores determine winners, felicitated live on stage at Fempreneur 2027 in Ahmedabad & Delhi NCR.' },
  ];

  const benefits = [
    'National credibility and prestigious trophy presented on the national stage',
    'Evaluation for inclusion in the Top 50 Women Entrepreneurs hardbound Coffee Table Book',
    'Dedicated founder feature published on VyapaarJagat.com with national SEO distribution',
    'Access to investors, venture debt funds, and corporate procurement executives',
    'VIP delegate access to keynote sessions and exhibition networking in both cities',
    'Permanent induction into the nationwide Fempreneur alumni directory',
  ];

  return (
    <div>
      <PageHeader
        badge="Awards 2027"
        badgeIcon={Trophy}
        title="Fempreneur Awards 2027 —"
        highlight="Fair, Transparent & Prestigious"
        description="The 6th edition honors women founders across 35–40+ categories through our dual evaluation engine: 50% Independent Jury Review + 50% Verified Public Voting."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Awards Overview' }]}
        ctaText="Start Free Nomination"
        ctaTo="/awards/apply"
        ctaIcon={null}
        secondaryCtaText="Explore Categories"
        secondaryCtaTo="/categories"
        image="/images/awards/awards-stage-winners-clean.png"
        imageAlt="Fempreneur Award Winners Stage Felicitation"
        imageBadge="Honoring Women Excellence"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* Section 1: The 50/50 Dual Engine */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Impartial Recognition"
            badgeVariant="gold"
            title="The 50/50 Dual Engine"
            highlight="Methodology"
            subtitle="Engineered to balance rigorous qualitative judging by senior industry leaders with democratic, transparent public appreciation."
          />

          <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* 50% Jury Evaluation */}
            <div className="fem-card fem-card-gold" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'rgba(106, 27, 154, 0.08)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    50% Jury Evaluation
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-rich)', fontWeight: 700 }}>Independent Industry Panel</span>
                </div>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Conducted by a distinguished panel of corporate veterans, angel investors, entrepreneurs, and sector specialists. Each application is scored against 7 weighted parameters.
              </p>

              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.86rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                Score: 0 to 100 based on verified business pitch &amp; audited performance.
              </div>
            </div>

            {/* 50% Public Voting */}
            <div className="fem-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'rgba(106, 27, 154, 0.08)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Vote size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    50% Public Voting
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>Democratic Community Endorsement</span>
                </div>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Empowers nominees to mobilize their customers, partners, and networks. Each approved nominee receives an official verified voting page with strict anti-bot and rate-limiting controls.
              </p>

              <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                Integrity: 1 verified vote per voter session with IP &amp; fraud controls.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 7-Factor Jury Evaluation Rubric */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <SectionTitle
            badge="Scoring Criteria"
            badgeVariant="plum"
            title="7 Weighted Factors of"
            highlight="Jury Evaluation"
            subtitle="A transparent rubric ensuring equal consideration for startups, micro-enterprises, and established corporations alike."
          />

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {criteria.map((item, idx) => (
              <div key={idx} className="fem-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-burgundy)', letterSpacing: '0.06em' }}>
                    FACTOR 0{idx + 1}
                  </span>
                  <span className="badge badge-plum" style={{ fontSize: '0.72rem' }}>
                    Weight: {item.weight}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.65rem' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2.5: Eight Participation Pathways (Document 1 Section 8) */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Pathways to Engage"
            badgeVariant="gold"
            title="Eight Participation Pathways in"
            highlight="Fempreneur 2027"
            subtitle="Diverse touchpoints tailored for founders, corporate partners, mentors, exhibitors, and delegates."
          />

          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[
              { num: '01', title: 'Nominate', desc: 'Submit your venture across 35–40+ categories for 50% jury and 50% public voting recognition.', link: '/nominate', cta: 'Nominate Now' },
              { num: '02', title: 'Attend', desc: 'Secure delegate passes for keynote sessions, fireside chats, and masterclasses in Ahmedabad & Delhi NCR.', link: '/events', cta: 'Get Pass' },
              { num: '03', title: 'Sponsor', desc: 'Partner across six structured tiers (Title to Category) to align your brand with India’s female innovators.', link: '/partners', cta: 'View Tiers' },
              { num: '04', title: 'Feature in the Book', desc: 'Apply for editorial evaluation to be profiled in the Top 50 Women Entrepreneurs hardbound collector’s volume.', link: '/coffee-table-book', cta: 'Book Showcase' },
              { num: '05', title: 'Get a Story on VyapaarJagat', desc: 'Document your journey in the 1,000 Stories Drive for permanent digital discovery and high SEO ranking.', link: '/story-drive', cta: 'Submit Story' },
              { num: '06', title: 'Join the Community', desc: 'Connect with a permanent national sisterhood spanning 150+ business categories and city chapters.', link: '/membership', cta: 'Join Community' },
              { num: '07', title: 'Exhibit', desc: 'Showcase your products or services among 50 curated women-led enterprises in the Exhibition Showcase.', link: '/events', cta: 'Exhibition Info' },
              { num: '08', title: 'Speak', desc: 'Share specialized business wisdom, industry trends, and scaling advice as an expert panellist or masterclass host.', link: '/contact', cta: 'Speaker Inquiry' },
            ].map((p, idx) => (
              <div key={idx} className="fem-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-burgundy)' }}>
                    {p.num}
                  </span>
                  <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>Pathway</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {p.desc}
                </p>
                <Link to={p.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                  {p.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Nomination Journey Steps */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Step-by-Step"
            badgeVariant="gold"
            title="The Nomination &amp;"
            highlight="Felicitation Journey"
            subtitle="From free digital submission to stage felicitation in Ahmedabad & Delhi NCR."
          />

          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="fem-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.5rem 2rem',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--color-burgundy)',
                    minWidth: '60px',
                  }}
                >
                  {st.num}
                </div>
                <div style={{ flexGrow: 1, minWidth: '220px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '0.25rem' }}>
                    {st.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why Nominate Benefits & CTA */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-narrow">
          <div className="fem-card fem-card-gold" style={{ padding: '3.5rem 2.5rem', textAlign: 'center' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              Why Participate?
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '1.5rem' }}>
              6 Compelling Reasons to <span className="text-gradient">Nominate in 2027</span>
            </h2>

            <div style={{ textAlign: 'left', maxWidth: '650px', margin: '0 auto 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {benefits.map((b, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <CTAButton to="/awards/apply" variant="primary" size="lg">
                Start Free Nomination Form
              </CTAButton>
              <CTAButton to="/categories" variant="secondary" size="lg">
                View 35+ Award Categories
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
