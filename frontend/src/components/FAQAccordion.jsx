import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * FAQAccordion Component
 * Clean, accessible accordion for answering verified nomination, voting, and event logistics questions.
 */
export default function FAQAccordion({ items = [], defaultOpenIndex = null, className = '' }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`faq-accordion-list ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            style={{
              background: '#FFFFFF',
              border: isOpen ? '1.5px solid var(--color-burgundy)' : '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-xs)',
              transition: 'all var(--transition-normal)',
            }}
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                textAlign: 'left',
                background: 'transparent',
                gap: '1rem',
              }}
              aria-expanded={isOpen}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(106, 27, 154, 0.08)' : 'var(--bg-card-subtle)',
                    color: isOpen ? 'var(--color-burgundy)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <HelpCircle size={16} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--color-burgundy)' : 'var(--color-plum-deep)',
                  }}
                >
                  {item.question}
                </span>
              </div>

              <div
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-normal)',
                  color: isOpen ? 'var(--color-burgundy)' : 'var(--text-light)',
                  flexShrink: 0,
                }}
              >
                <ChevronDown size={20} />
              </div>
            </button>

            {isOpen && (
              <div
                style={{
                  padding: '0 1.5rem 1.5rem 3.5rem',
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
