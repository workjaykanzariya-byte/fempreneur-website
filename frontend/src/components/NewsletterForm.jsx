import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import CTAButton from './CTAButton';
import { subscribeNewsletter } from '../services/api';

/**
 * NewsletterForm Component
 * Inline or standalone email capture with inverted dark/light mode support.
 */
export default function NewsletterForm({ 
  inverted = false, 
  placeholder = "Enter your email address...", 
  className = '',
  subtextColor = null
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      await subscribeNewsletter(email.trim());
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setLoading(false);
      // Even if already subscribed or network error, inform user gracefully
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.85rem 1.25rem',
          background: inverted ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-gold-soft)',
          borderRadius: 'var(--radius-pill)',
          color: inverted ? '#FFFFFF' : 'var(--color-gold-rich)',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        <CheckCircle2 size={18} color={inverted ? 'var(--color-gold-light)' : 'var(--color-gold)'} />
        <span>Thank you for subscribing to Fempreneur updates!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} style={{ width: '100%', maxWidth: '480px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: inverted ? 'rgba(255, 255, 255, 0.12)' : '#FFFFFF',
          border: inverted ? '1.5px solid rgba(255, 255, 255, 0.2)' : '1.5px solid rgba(106, 27, 154, 0.2)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.35rem 0.35rem 0.35rem 1rem',
          transition: 'all var(--transition-fast)',
          boxShadow: inverted ? 'none' : '0 2px 10px rgba(106, 27, 154, 0.06)',
        }}
      >
        <Mail size={18} color={inverted ? 'rgba(255, 255, 255, 0.6)' : 'var(--text-light)'} style={{ flexShrink: 0, marginRight: '0.5rem' }} />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: inverted ? '#FFFFFF' : 'var(--text-primary)',
            fontSize: '0.92rem',
            width: '100%',
          }}
        />
        <CTAButton
          type="submit"
          variant={inverted ? 'gold' : 'primary'}
          size="sm"
          disabled={loading}
          icon={ArrowRight}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </CTAButton>
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          color: subtextColor || (inverted ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-muted)'),
          marginTop: '0.5rem',
          paddingLeft: '0.5rem',
        }}
      >
        No spam. Unsubscribe anytime.
      </div>
    </form>
  );
}
