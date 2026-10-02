import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CTAButton Component
 * Supports variants: 'primary' (burgundy gradient), 'gold' (muted champagne gold),
 * 'secondary' (white card with border), 'outline' (burgundy outline), 'outline-white', 'ghost'.
 * Supports sizes: 'sm', 'md' (default), 'lg'.
 */
export default function CTAButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  block = false,
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;
  const blockClass = block ? 'btn-block' : '';
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${blockClass} ${className}`.trim();

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
    </>
  );

  if (to) {
    if (to.startsWith('#')) {
      const handleAnchorClick = (e) => {
        e.preventDefault();
        const id = to.slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        if (onClick) onClick(e);
      };
      return (
        <a href={to} onClick={handleAnchorClick} className={combinedClasses} {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
