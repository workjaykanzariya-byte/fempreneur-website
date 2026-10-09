import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        const apiUrl = isProduction ? '/api/admin/verify' : `http://${window.location.hostname}:5000/api/admin/verify`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setIsAuthenticated(false);
        }
      } catch (err) {
        // If offline or dev fallback, if token exists allow entry
        const fallbackUser = localStorage.getItem('adminUser');
        if (fallbackUser) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18032B 0%, #2A0845 50%, #10021D 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        color: '#FFFFFF'
      }}>
        <Loader2 className="animate-spin" size={42} style={{ color: '#D4AF37' }} />
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', letterSpacing: '0.05em', opacity: 0.8 }}>
          Verifying Fempreneur Admin Session...
        </p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
