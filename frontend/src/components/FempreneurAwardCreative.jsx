import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';

/**
 * FempreneurAwardCreative Component
 *
 * Professional award creative generator for both Honorary Awards (Free)
 * and Rated Awards (Paid) nominees.
 *
 * Displays ONLY:
 * 1. Nominee profile photo uploaded in the form
 * 2. Business logo uploaded in the form (gracefully omitted if not uploaded)
 * 3. Nominee's full name
 * 4. Business/organization name
 * 5. Selected award category
 * Plus official Fempreneur branding.
 *
 * Features:
 * - 1:1 High-Resolution 1080x1080 PNG Download
 * - Instant Canvas image generation using the actual submitted assets
 * - Unique Voting Link with 1-click copy and WhatsApp/LinkedIn sharing
 * - Clean, modular design ready for final template swap
 */
export default function FempreneurAwardCreative({
  nomineeName = '',
  businessName = '',
  category = '',
  profilePicture = null,
  businessLogo = null,
  votingUrl = '',
  showActions = true,
  compact = false,
}) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const resolvedVotingUrl = votingUrl || `${window.location.origin}/voting?nominee=${encodeURIComponent(
    (nomineeName || 'nominee').toLowerCase().replace(/[^a-z0-9]/g, '-')
  )}`;

  /**
   * Generates and downloads a crystal-clear 1080x1080 PNG creative.
   * Draws ONLY:
   * - Fempreneur branding ("FEMPRENEUR AWARDS 2027")
   * - Submitted Profile Photo
   * - Submitted Business Logo (if uploaded)
   * - Nominee Full Name
   * - Business / Organization Name
   * - Selected Award Category
   */
  const handleDownloadCreative = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const size = 1080;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Could not initialize canvas context');

      // 1. Deep Royal Purple Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, size, size);
      bgGrad.addColorStop(0, '#150221');
      bgGrad.addColorStop(0.35, '#240338');
      bgGrad.addColorStop(0.7, '#380650');
      bgGrad.addColorStop(1, '#160223');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, size, size);

      // 2. Ambient Radial Glow Orbs
      const glowTop = ctx.createRadialGradient(size * 0.25, size * 0.25, 20, size * 0.25, size * 0.25, size * 0.45);
      glowTop.addColorStop(0, 'rgba(233, 30, 99, 0.32)');
      glowTop.addColorStop(0.6, 'rgba(156, 39, 176, 0.12)');
      glowTop.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowTop;
      ctx.fillRect(0, 0, size, size);

      const glowBottom = ctx.createRadialGradient(size * 0.75, size * 0.75, 20, size * 0.75, size * 0.75, size * 0.5);
      glowBottom.addColorStop(0, 'rgba(212, 175, 55, 0.26)');
      glowBottom.addColorStop(0.6, 'rgba(106, 27, 154, 0.14)');
      glowBottom.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowBottom;
      ctx.fillRect(0, 0, size, size);

      // 3. Decorative Elegant Gold Metallic Border Frame
      const borderMargin = 44;
      const goldGrad = ctx.createLinearGradient(0, 0, size, size);
      goldGrad.addColorStop(0, '#F5D77F');
      goldGrad.addColorStop(0.25, '#D4AF37');
      goldGrad.addColorStop(0.5, '#FFF6CC');
      goldGrad.addColorStop(0.75, '#D4AF37');
      goldGrad.addColorStop(1, '#AA771C');

      // Outer gold border
      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 4;
      ctx.strokeRect(borderMargin, borderMargin, size - borderMargin * 2, size - borderMargin * 2);

      // Inner subtle hairline
      ctx.strokeStyle = 'rgba(245, 215, 127, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(borderMargin + 12, borderMargin + 12, size - (borderMargin + 12) * 2, size - (borderMargin + 12) * 2);

      // Corner gold accents
      const corners = [
        [borderMargin, borderMargin],
        [size - borderMargin, borderMargin],
        [borderMargin, size - borderMargin],
        [size - borderMargin, size - borderMargin],
      ];
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#F5D77F';
        ctx.fill();
      });

      // 4. Fempreneur Branding Header
      ctx.textAlign = 'center';

      // Brand Title
      ctx.font = '900 48px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(233, 30, 99, 0.55)';
      ctx.shadowBlur = 18;
      ctx.fillText('FEMPRENEUR AWARDS 2027', size / 2, 130);
      ctx.shadowBlur = 0;

      // Decorative divider
      const lineW = 340;
      const lineGrad = ctx.createLinearGradient((size - lineW) / 2, 0, (size + lineW) / 2, 0);
      lineGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
      lineGrad.addColorStop(0.5, '#F5D77F');
      lineGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo((size - lineW) / 2, 155);
      ctx.lineTo((size + lineW) / 2, 155);
      ctx.stroke();

      // 5. ITEM 1: Nominee Profile Photo (Uploaded in the form)
      const hasLogo = Boolean(businessLogo);
      const avatarX = size / 2;
      // Adjust vertical placement slightly if business logo is present
      const avatarY = hasLogo ? 360 : 380;
      const avatarR = hasLogo ? 135 : 155;

      // Photo background glow
      ctx.save();
      const picGlow = ctx.createRadialGradient(avatarX, avatarY, avatarR * 0.7, avatarX, avatarY, avatarR * 1.35);
      picGlow.addColorStop(0, 'rgba(233, 30, 99, 0.45)');
      picGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = picGlow;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR * 1.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render actual uploaded profile photo
      let photoRendered = false;
      if (profilePicture) {
        try {
          const pImg = new Image();
          pImg.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            pImg.onload = resolve;
            pImg.onerror = reject;
            pImg.src = profilePicture;
          });

          ctx.save();
          ctx.beginPath();
          ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          // Centered cover crop
          const minDim = Math.min(pImg.width, pImg.height);
          const sx = (pImg.width - minDim) / 2;
          const sy = (pImg.height - minDim) / 2;
          ctx.drawImage(pImg, sx, sy, minDim, minDim, avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
          ctx.restore();
          photoRendered = true;
        } catch (err) {
          console.warn('Could not load profile photo on canvas:', err);
        }
      }

      if (!photoRendered) {
        // Graceful fallback: clean silhouette frame (NO random stock or AI photos)
        ctx.save();
        ctx.fillStyle = '#2A0642';
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Outer gold metallic rings around profile photo
      ctx.save();
      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR + 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 6. ITEM 2: Business Logo (Uploaded in form, gracefully skipped if not uploaded)
      let currentY = avatarY + avatarR + 30;

      if (hasLogo) {
        try {
          const lImg = new Image();
          lImg.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            lImg.onload = resolve;
            lImg.onerror = reject;
            lImg.src = businessLogo;
          });

          const logoBoxW = 200;
          const logoBoxH = 68;
          const logoBoxX = (size - logoBoxW) / 2;
          const logoBoxY = currentY;

          // Clean white pill frame for logo
          ctx.save();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.roundRect(logoBoxX, logoBoxY, logoBoxW, logoBoxH, 16);
          ctx.fill();

          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw logo with aspect fit inside pill
          const pad = 10;
          const maxW = logoBoxW - pad * 2;
          const maxH = logoBoxH - pad * 2;
          const imgAspect = lImg.width / lImg.height;
          const boxAspect = maxW / maxH;

          let renderW, renderH;
          if (imgAspect > boxAspect) {
            renderW = maxW;
            renderH = maxW / imgAspect;
          } else {
            renderH = maxH;
            renderW = maxH * imgAspect;
          }

          const renderX = logoBoxX + (logoBoxW - renderW) / 2;
          const renderY = logoBoxY + (logoBoxH - renderH) / 2;
          ctx.drawImage(lImg, renderX, renderY, renderW, renderH);
          ctx.restore();

          currentY += logoBoxH + 35;
        } catch (logoErr) {
          console.warn('Could not render business logo on canvas:', logoErr);
          currentY += 25;
        }
      } else {
        currentY += 20;
      }

      // 7. ITEM 3: Nominee's Full Name
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '900 46px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 14;

      let displayName = nomineeName || 'Nominee Name';
      if (displayName.length > 28) {
        ctx.font = '900 38px "Playfair Display", Georgia, serif';
      }
      ctx.fillText(displayName, size / 2, currentY + 40);
      ctx.shadowBlur = 0;
      ctx.restore();

      // 8. ITEM 4: Business / Organization Name
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#F5D77F';

      let displayBiz = (businessName || 'Business Name').toUpperCase();
      if (displayBiz.length > 36) {
        ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      }
      ctx.fillText(displayBiz, size / 2, currentY + 84);
      ctx.restore();

      // 9. ITEM 5: Selected Award Category
      const catY = currentY + 125;
      const displayCat = category || 'Woman Entrepreneur of the Year';
      const catPillW = Math.min(880, Math.max(520, displayCat.length * 19 + 120));
      const catPillH = 64;
      const catPillX = (size - catPillW) / 2;

      ctx.save();
      const catGrad = ctx.createLinearGradient(catPillX, 0, catPillX + catPillW, 0);
      catGrad.addColorStop(0, 'rgba(106, 27, 154, 0.9)');
      catGrad.addColorStop(0.5, 'rgba(233, 30, 99, 0.95)');
      catGrad.addColorStop(1, 'rgba(106, 27, 154, 0.9)');
      ctx.fillStyle = catGrad;
      ctx.beginPath();
      ctx.roundRect(catPillX, catY, catPillW, catPillH, 32);
      ctx.fill();

      ctx.strokeStyle = '#F5D77F';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fillText(displayCat, size / 2, catY + 41);
      ctx.shadowBlur = 0;
      ctx.restore();

      // Export to high-resolution PNG
      const dataUrl = canvas.toDataURL('image/png');
      const cleanFileName = `Fempreneur-2027-${(nomineeName || 'Nominee').replace(/[^a-zA-Z0-9]/g, '-')}-Creative.png`;

      const link = document.createElement('a');
      link.download = cleanFileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating creative download:', err);
      alert('Could not download creative image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const copyVotingLink = () => {
    navigator.clipboard?.writeText(resolvedVotingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareToWhatsApp = () => {
    const text = `🌟 Vote for ${nomineeName} (${businessName}) in the Fempreneur Awards 2027 under "${category}"! Please cast your verified vote here: ${resolvedVotingUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resolvedVotingUrl)}`, '_blank');
  };

  return (
    <div style={{ width: '100%', maxWidth: compact ? '480px' : '540px', margin: '0 auto' }}>
      
      {/* ========================================================================= */}
      {/* VISUAL AWARD CREATIVE CARD                                                */}
      {/* Displays ONLY:                                                            */}
      {/* - Fempreneur Branding                                                    */}
      {/* - 1. Nominee profile photo uploaded in form                              */}
      {/* - 2. Business logo uploaded in form (gracefully omitted if absent)       */}
      {/* - 3. Nominee's full name                                                 */}
      {/* - 4. Business/organization name                                          */}
      {/* - 5. Selected award category                                             */}
      {/* ========================================================================= */}
      <div
        className="fempreneur-award-creative-card"
        style={{
          position: 'relative',
          borderRadius: '24px',
          background: 'linear-gradient(150deg, #150221 0%, #250338 40%, #380650 70%, #160223 100%)',
          color: '#FFFFFF',
          padding: compact ? '2rem 1.5rem' : '2.75rem 2rem',
          boxShadow: '0 20px 60px rgba(21, 2, 33, 0.5), 0 0 0 1.5px rgba(212, 175, 55, 0.4)',
          overflow: 'hidden',
          textAlign: 'center',
          border: '2px solid #D4AF37',
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-15%',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.28) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-15%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.24) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative Inner Golden Frame */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            bottom: '12px',
            border: '1px solid rgba(212, 175, 55, 0.28)',
            borderRadius: '16px',
            pointerEvents: 'none',
          }}
        />

        {/* FEMPRENEUR BRANDING HEADER */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.75rem' }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: compact ? '1.5rem' : '1.9rem',
              fontWeight: 900,
              letterSpacing: '0.04em',
              margin: '0 0 0.5rem 0',
              color: '#FFFFFF',
              textShadow: '0 2px 14px rgba(233, 30, 99, 0.5)',
            }}
          >
            FEMPRENEUR AWARDS 2027
          </h3>
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #F5D77F, transparent)',
              margin: '0 auto',
            }}
          />
        </div>

        {/* 1. NOMINEE PROFILE PHOTO (Uploaded in the form) */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.25rem' }}>
          <div
            style={{
              width: compact ? '130px' : '160px',
              height: compact ? '130px' : '160px',
              borderRadius: '50%',
              margin: '0 auto',
              padding: '5px',
              background: 'linear-gradient(135deg, #F5D77F 0%, #D4AF37 50%, #AA771C 100%)',
              boxShadow: '0 8px 30px rgba(233, 30, 99, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.2)',
              position: 'relative',
            }}
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={nomineeName}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6A1B9A 0%, #2E0848 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </div>
        </div>

        {/* 2. BUSINESS LOGO (Uploaded in the form — gracefully omitted if not uploaded) */}
        {businessLogo && (
          <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.25rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.45rem 1.25rem',
                borderRadius: '14px',
                background: '#FFFFFF',
                border: '1.5px solid #D4AF37',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                maxWidth: '200px',
                maxHeight: '60px',
              }}
            >
              <img
                src={businessLogo}
                alt={`${businessName} logo`}
                style={{
                  maxWidth: '160px',
                  maxHeight: '44px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        )}

        {/* 3. NOMINEE'S FULL NAME */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '0.35rem' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: compact ? '1.55rem' : '1.95rem',
              fontWeight: 900,
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.2,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
            }}
          >
            {nomineeName || 'Nominee Name'}
          </h2>
        </div>

        {/* 4. BUSINESS / ORGANIZATION NAME */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: compact ? '0.92rem' : '1.05rem',
              fontWeight: 700,
              color: '#F5D77F',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {businessName || 'Business Name'}
          </div>
        </div>

        {/* 5. SELECTED AWARD CATEGORY */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, rgba(106, 27, 154, 0.9), rgba(233, 30, 99, 0.95), rgba(106, 27, 154, 0.9))',
              border: '1.5px solid #F5D77F',
              borderRadius: '9999px',
              padding: '0.65rem 1.6rem',
              maxWidth: '92%',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ fontSize: compact ? '0.88rem' : '1rem', fontWeight: 800, color: '#FFFFFF' }}>
              {category || 'Award Category'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTION TOOLBAR: DOWNLOAD CREATIVE BUTTON & UNIQUE VOTING LINK              */}
      {/* ========================================================================= */}
      {showActions && (
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          {/* Download Creative Button */}
          <button
            type="button"
            onClick={handleDownloadCreative}
            disabled={downloading}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.95rem 1.5rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 45%, #E91E63 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              border: 'none',
              cursor: downloading ? 'wait' : 'pointer',
              boxShadow: '0 8px 24px rgba(106, 27, 154, 0.32)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(233, 30, 99, 0.42)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(106, 27, 154, 0.32)';
            }}
          >
            <Download size={18} />
            <span>{downloading ? 'GENERATING HIGH-RES IMAGE...' : 'DOWNLOAD CREATIVE (PNG)'}</span>
          </button>

          {/* Unique Voting Link Box */}
          {resolvedVotingUrl && (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1.5px solid #E9D5FF',
                padding: '1rem',
                boxShadow: '0 4px 16px rgba(106, 27, 154, 0.06)',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: '#6A1B9A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.45rem',
                }}
              >
                🎉 Your Unique Nominee &amp; Voting Link
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  readOnly
                  value={resolvedVotingUrl}
                  style={{
                    flex: 1,
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D8B4FE',
                    background: '#FAF7FC',
                    fontSize: '0.82rem',
                    color: '#374151',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={copyVotingLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '8px',
                    background: '#6A1B9A',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Social Share Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={shareToWhatsApp}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    background: '#25D366',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={shareToLinkedIn}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    background: '#0A66C2',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Share2 size={15} />
                  <span>Share on LinkedIn</span>
                </button>

                <a
                  href={resolvedVotingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    background: '#FAF5FC',
                    border: '1px solid #D8B4FE',
                    color: '#6A1B9A',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Open Page</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
