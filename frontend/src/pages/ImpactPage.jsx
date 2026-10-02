import React from 'react';
import { Award, Users, BookOpen, Sparkles, Building2, Globe, FileText, CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionTitle, StatCard, CTAButton } from '../components';

export default function ImpactPage() {
  const stats = [
    { value: '6+', label: 'Editions Delivered', description: 'Continuous annual recognition since 2022.', icon: Award },
    { value: '500+', label: 'Women Entrepreneurs', description: 'Directly celebrated across national editions.', icon: Users },
    { value: '35–40+', label: 'Award Categories', description: 'Encompassing small, medium, and tech ventures.', icon: Sparkles },
    { value: '10,000+', label: 'Stories Published', description: 'Archived permanently on VyapaarJagat.com.', icon: BookOpen },
    { value: '60+', label: 'Expert Speakers', description: 'Conducted masterclasses and panel forums.', icon: Award },
    { value: '5L+', label: 'Digital Reach', description: 'Per edition across print & online networks.', icon: Globe },
  ];

  const cityComparison = [
    { dimension: 'Ecosystem Heritage', amd: "Gujarat's entrepreneurial heartland; traditional MSME strength; thriving manufacturing base.", del: 'National capital region; political, policy, and institutional epicenter; venture capital hub.' },
    { dimension: 'Participant Profile', amd: 'Industrialists, textile leaders, chemical/pharma founders, regional trailblazers.', del: 'Tech founders, D2C innovators, corporate leaders, national brand builders.' },
    { dimension: 'Capital & Investment', amd: 'High-Net-Worth Individuals (HNIs), family offices, cooperative trade networks.', del: 'Institutional Venture Capital, Private Equity, angel networks, seed funds.' },
    { dimension: 'Media Reach', amd: 'Strong vernacular and regional business media coverage.', del: 'National television networks, national print, central press bureau.' },
    { dimension: 'Policy Alignment', amd: 'Gujarat Industrial Development Corporation (GIDC) & state initiatives.', del: 'Central Ministries (MSME, DPIIT, Women & Child Development, NITI Aayog).' },
    { dimension: 'Synergy Potential', amd: 'Manufacturing, supply chain, and physical operational excellence.', del: 'Strategy, digital scale, global expansion, and capital raising.' },
    { dimension: 'Strategic 2027 Role', amd: 'Anchor Hub for industrial enterprise, manufacturing excellence, and regional champions.', del: 'National Power Center for policy integration, VC capital access, and national brand scaling.' },
  ];

  return (
    <div>
      <PageHeader
        badge="Audited Platform Reach"
        title="Fempreneur Platform"
        highlight="Impact &amp; Metrics"
        description="Transparent data documenting four years of female enterprise recognition, our two-city economic synergy, and global UN SDG contributions."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Impact & Metrics' }]}
        ctaText="Nominate for 2027"
        ctaTo="/nominate"
        image="/images/impact/impact-network-transparent.png"
        imageAlt="Fempreneur Platform Impact & Metrics Network"
        imageFramed={false}
      />

      {/* Section 1: Verified Impact Metrics Bar */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Verified Data"
            badgeVariant="gold"
            title="Track Record Across"
            highlight="6+ Editions"
            subtitle="Real metrics achieved by the 1MEIF and VyapaarJagat.com platform since inception."
          />

          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '4rem' }}>
            {stats.map((s, idx) => (
              <StatCard key={idx} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Two-City Comparative Matrix */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <SectionTitle
            badge="Strategic Expansion"
            badgeVariant="plum"
            title="The Ahmedabad &amp; Delhi NCR"
            highlight="Economic Matrix"
            subtitle="Comparing the complementary economic pillars that make our two-city 2027 showcase uniquely powerful."
          />

          <div className="fem-card" style={{ padding: '2rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                  <th style={{ padding: '1rem', color: 'var(--color-plum-deep)', fontWeight: 800 }}>Dimension</th>
                  <th style={{ padding: '1rem', color: 'var(--color-burgundy)', fontWeight: 800 }}>Ahmedabad Anchor Hub</th>
                  <th style={{ padding: '1rem', color: 'var(--color-gold-rich)', fontWeight: 800 }}>Delhi NCR National Hub</th>
                </tr>
              </thead>
              <tbody>
                {cityComparison.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-plum-deep)' }}>{row.dimension}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{row.amd}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{row.del}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Planned Feature: Annual Impact Report */}
          <div
            className="fem-card fem-card-gold"
            style={{
              marginTop: '4rem',
              padding: '2rem 2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
                Planned Feature
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                Annual Impact Report 2027
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                A yearly publication reviewing winner reach, verified SDG contributions, and economic impact metrics.
              </p>
            </div>
            <span className="badge badge-gold">Coming Soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
