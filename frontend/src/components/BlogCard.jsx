import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

/**
 * BlogCard Component
 * Displays founder stories, ecosystem news, and event highlight articles.
 */
export default function BlogCard({
  title,
  excerpt,
  category,
  date,
  readTime = '4 min read',
  author = 'Fempreneur Editorial',
  slug,
  image,
  className = '',
}) {
  return (
    <article
      className={`fem-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0',
        overflow: 'hidden',
      }}
    >
      {/* Article Image Container */}
      <div
        style={{
          width: '100%',
          height: '200px',
          background: 'var(--gradient-plum-berry)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '1.2rem',
          fontWeight: 700,
        }}
      >
        {image ? (
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
              VyapaarJagat Story
            </span>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: '0.25rem' }}>
              Fempreneur 2027
            </div>
          </div>
        )}

        {category && (
          <span
            className="badge badge-gold"
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Content Container */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} />
            <span>{date}</span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={13} />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h4
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--color-plum-deep)',
            marginBottom: '0.65rem',
            lineHeight: 1.4,
          }}
        >
          {title}
        </h4>

        {/* Excerpt */}
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {excerpt}
        </p>

        {/* Read More Link */}
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to={slug ? `/blog/${slug}` : '/blog'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--color-burgundy)',
            }}
          >
            <span>Read Story</span>
            <ArrowRight size={14} />
          </Link>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
            {author}
          </span>
        </div>
      </div>
    </article>
  );
}
