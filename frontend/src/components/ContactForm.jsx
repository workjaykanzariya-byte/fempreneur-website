import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import CTAButton from './CTAButton';
import { submitGeneralInquiry } from '../services/api';

/**
 * ContactForm Component
 * Official inbound inquiry form routing across awards, sponsorship, and pass desks.
 */
export default function ContactForm({ className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Awards & Nominations',
    message: '',
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    try {
      await submitGeneralInquiry({
        type: 'contact',
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        subjectOrTier: formData.subject,
        messageOrTopic: formData.message,
      });

      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Awards & Nominations',
        message: '',
      });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message || 'Failed to submit inquiry. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`fem-card ${className}`} style={{ padding: '2.5rem' }}>
      <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
        Send an Official Inquiry
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
        Our organizing desk responds within 24–48 hours. For urgent nominations or pass support, please specify below.
      </p>

      {status.success && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'var(--color-gold-soft)',
            border: '1px solid var(--color-gold-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-gold-rich)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem',
          }}
        >
          <CheckCircle2 size={18} />
          <span>Thank you! Your message has been routed to the respective Fempreneur desk.</span>
        </div>
      )}

      {status.error && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'var(--color-coral-soft)',
            border: '1px solid rgba(224, 93, 93, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#DC2626',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem',
          }}
        >
          <AlertCircle size={18} />
          <span>{status.error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">
            Full Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Aarti Sharma"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. aarti@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">
            Phone / WhatsApp Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+91-XXXXX-XXXXX"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-subject">
            Inquiry Topic *
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Awards & Nominations">Awards &amp; Free Nominations</option>
            <option value="Events & Passes">Event Passes (Ahmedabad / Delhi NCR)</option>
            <option value="Sponsorship & Partnership">Corporate Sponsorship (6 Tiers)</option>
            <option value="Coffee Table Book">Coffee Table Book Feature / Order</option>
            <option value="VyapaarJagat Story Drive">1,000 Story Drive Submission</option>
            <option value="City Chapters">City Chapter Leadership</option>
            <option value="General Support">General Ecosystem Support</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">
          Message Details *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Please share your query, venture details, or requirements..."
        />
      </div>

      <CTAButton
        type="submit"
        variant="primary"
        size="lg"
        block
        disabled={status.submitting}
        icon={Send}
      >
        {status.submitting ? 'Sending Inquiry...' : 'Submit Official Inquiry'}
      </CTAButton>
    </form>
  );
}
