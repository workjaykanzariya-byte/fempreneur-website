import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Mic, ArrowRight, Sparkles } from 'lucide-react';
import { PageHeader, BlogCard, SectionTitle, CTAButton, NewsletterForm } from '../components';

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Founder Stories', 'Ecosystem News', 'Award Insights', 'Growth Guides'];

  const articles = [
    {
      title: 'Fempreneur 2027 Expands into Ahmedabad & Delhi NCR Dual-City Program',
      excerpt: 'The 6th edition of India’s premier women-entrepreneurship platform scales to unite Western India’s manufacturing heartland with the national capital’s policy and capital hub.',
      category: 'Ecosystem News',
      date: 'September 2026',
      readTime: '4 min read',
      author: 'Editorial Desk',
    },
    {
      title: 'How 50% Public Voting Empowers Nominees to Build Engaged Communities',
      excerpt: 'A deep-dive into Fempreneur’s distinctive 50/50 evaluation model: how personal verified voting links transform nominees into celebrated ambassadors.',
      category: 'Award Insights',
      date: 'September 2026',
      readTime: '5 min read',
      author: 'Awards Committee',
    },
    {
      title: 'From Grassroots Handlooms to Global E-Commerce: An Artisan Scaling Playbook',
      excerpt: 'How female founders in Tier 2 and Tier 3 regions are bridging traditional Indian craftsmanship with direct-to-consumer digital logistics.',
      category: 'Founder Stories',
      date: 'August 2026',
      readTime: '6 min read',
      author: 'VyapaarJagat Team',
    },
    {
      title: 'Preparing for Institutional Capital: 5 Steps for Women-Led MSMEs',
      excerpt: 'A practical financial governance checklist to prepare your small business for equity funding, venture debt, and government MSME credit schemes.',
      category: 'Growth Guides',
      date: 'August 2026',
      readTime: '7 min read',
      author: 'Advisory Panel',
    },
  ];

  const filteredArticles = selectedTag === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedTag);

  return (
    <div>
      <PageHeader
        badge="Editorial & Media"
        title="Fempreneur News,"
        highlight="Stories & Insights"
        description="Inspiring founder narratives, business growth playbooks, and official updates from the 1MEIF and VyapaarJagat.com newsroom."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Blog & News' }]}
        ctaText="Submit Your Story"
        ctaTo="/story-drive"
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {/* Tag Filter Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.5rem' }}>
              Filter Topics:
            </span>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTag(t)}
                className={`btn btn-sm ${selectedTag === t ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-pill)', padding: '0.35rem 0.95rem' }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '4rem' }}>
            {filteredArticles.map((art, idx) => (
              <BlogCard key={idx} {...art} />
            ))}
          </div>

          {/* Planned Feature: Podcast Series */}
          <div
            className="fem-card"
            style={{
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #2E0848 0%, #4A126D 100%)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Planned Feature
              </span>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                "Fempreneur Stories" Audio &amp; Video Podcast Series
              </h3>
              <p style={{ fontSize: '0.94rem', opacity: 0.9, lineHeight: 1.6 }}>
                Monthly in-depth conversations with past winners and pioneering women entrepreneurs, distributed on YouTube, Spotify, and Apple Podcasts.
              </p>
            </div>
            <span className="badge badge-gold" style={{ padding: '0.5rem 1rem' }}>
              Coming Soon
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
