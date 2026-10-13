import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, Globe } from 'lucide-react';

export default function AppWebSwitcher({ collapsed = false, currentMode = 'web' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isWebActive = currentMode ? currentMode === 'web' : location.pathname.startsWith('/admin/web');

  return (
    <div style={{
      padding: collapsed ? '8px 4px' : '10px 14px',
      margin: collapsed ? '4px 6px' : '6px 14px 12px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '10px',
      border: '1px solid rgba(212, 175, 55, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <button
        type="button"
        onClick={() => navigate('/admin/web')}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '6px 8px',
          borderRadius: '7px',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          border: 'none',
          transition: 'all 0.2s ease',
          background: isWebActive ? 'linear-gradient(135deg, #d4a347 0%, #c99738 100%)' : 'transparent',
          color: isWebActive ? '#18181b' : 'rgba(255, 255, 255, 0.7)'
        }}
        title="Website Management"
      >
        <Globe size={14} />
        {!collapsed && <span>Web</span>}
      </button>

      <button
        type="button"
        onClick={() => alert('Mobile App admin module is hosted at unity.fempreneur.club')}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '6px 8px',
          borderRadius: '7px',
          fontSize: '0.78rem',
          fontWeight: 600,
          cursor: 'pointer',
          border: 'none',
          transition: 'all 0.2s ease',
          background: !isWebActive ? 'linear-gradient(135deg, #d4a347 0%, #c99738 100%)' : 'transparent',
          color: !isWebActive ? '#18181b' : 'rgba(255, 255, 255, 0.7)'
        }}
        title="Mobile App Admin"
      >
        <Smartphone size={14} />
        {!collapsed && <span>App</span>}
      </button>
    </div>
  );
}
