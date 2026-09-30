import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, User, Lock, Mail, ArrowRight, Award, CheckCircle2, Sparkles, Building2, AlertCircle, LogOut } from 'lucide-react';
import { PageHeader, CTAButton } from '../components';
import { loginApi, registerApi } from '../services/api';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('member'); // 'member' | 'nominee' | 'jury'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', rememberMe: false });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Restore authentication state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fem_user');
    const savedToken = localStorage.getItem('fem_token');
    if (savedUser && savedToken) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.warn('Error restoring user session:', e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      if (authMode === 'register') {
        const res = await registerApi({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });

        if (res.data?.token) {
          localStorage.setItem('fem_token', res.data.token);
          localStorage.setItem('fem_user', JSON.stringify(res.data.user));
          setCurrentUser(res.data.user);
          setIsError(false);
          setMessage(`Welcome, ${res.data.user.name}! Your account has been registered successfully.`);
        }
      } else {
        const res = await loginApi({
          email: formData.email.trim(),
          password: formData.password,
        });

        if (res.data?.token) {
          localStorage.setItem('fem_token', res.data.token);
          localStorage.setItem('fem_user', JSON.stringify(res.data.user));
          setCurrentUser(res.data.user);
          setIsError(false);
          setMessage(`Welcome back, ${res.data.user.name} (${res.data.user.role.toUpperCase()})! Authentication verified.`);
        }
      }
      setLoading(false);
    } catch (err) {
      setIsError(true);
      setMessage(err.message || 'Authentication error. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fem_token');
    localStorage.removeItem('fem_user');
    setCurrentUser(null);
    setMessage('Logged out successfully.');
    setIsError(false);
  };

  return (
    <div>
      <PageHeader
        badge="Access Portal"
        title="Welcome to the"
        highlight="Fempreneur Portal"
        description="Secure single access point for verified community members, award nominees managing their voting links, and invited jury members."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Member Login' }]}
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container-narrow">
          {/* If user is logged in: show active profile and dashboard panel */}
          {currentUser ? (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--gradient-burgundy-gold)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                    }}
                  >
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0 }}>
                      {currentUser.name}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-gold" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {currentUser.role || 'Member'}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </div>

              {message && (
                <div
                  style={{
                    background: 'var(--color-gold-soft)',
                    border: '1px solid var(--color-gold-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.88rem',
                    color: 'var(--color-gold-rich)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>{message}</span>
                </div>
              )}

              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-plum-deep)', marginBottom: '1rem' }}>
                Your Ecosystem Quick Actions
              </h4>
              <div className="grid grid-cols-3 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <Link
                  to="/nominate"
                  className="fem-card"
                  style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--border-light)' }}
                >
                  <Award size={20} color="var(--color-burgundy)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: 700, color: 'var(--color-plum-deep)', fontSize: '0.95rem' }}>Awards Application</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Submit or view nomination entry</div>
                </Link>

                <Link
                  to="/voting"
                  className="fem-card"
                  style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--border-light)' }}
                >
                  <Sparkles size={20} color="var(--color-gold-rich)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: 700, color: 'var(--color-plum-deep)', fontSize: '0.95rem' }}>Voting Hub</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Share voting link &amp; verify votes</div>
                </Link>

                <Link
                  to="/membership"
                  className="fem-card"
                  style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--border-light)' }}
                >
                  <User size={20} color="var(--color-plum-deep)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: 700, color: 'var(--color-plum-deep)', fontSize: '0.95rem' }}>365-Day Membership</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Directory listing &amp; masterclasses</div>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selection: Audience Role */}
              <div
                style={{
                  display: 'flex',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.4rem',
                  marginBottom: '2rem',
                  border: '1px solid var(--border-light)',
                }}
              >
                {[
                  { id: 'member', label: 'Community Member', icon: User },
                  { id: 'nominee', label: 'Nominee Dashboard', icon: Award },
                  { id: 'jury', label: 'Jury Evaluation', icon: ShieldCheck },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMessage('');
                      }}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        background: isActive ? '#FFFFFF' : 'transparent',
                        color: isActive ? 'var(--color-plum-deep)' : 'var(--text-muted)',
                        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-plum">
                      {activeTab === 'member' && 'Community & Directory Access'}
                      {activeTab === 'nominee' && 'Track Voting & Application Status'}
                      {activeTab === 'jury' && 'Confidential Juror Portal'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('login'); setMessage(''); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: authMode === 'login' ? 'var(--color-burgundy)' : 'var(--text-muted)',
                          borderBottom: authMode === 'login' ? '2px solid var(--color-burgundy)' : 'none',
                          paddingBottom: '2px',
                        }}
                      >
                        Sign In
                      </button>
                      <span style={{ color: 'var(--text-light)' }}>|</span>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('register'); setMessage(''); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: authMode === 'register' ? 'var(--color-burgundy)' : 'var(--text-muted)',
                          borderBottom: authMode === 'register' ? '2px solid var(--color-burgundy)' : 'none',
                          paddingBottom: '2px',
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-plum-deep)' }}>
                    {authMode === 'register' ? 'Create Your Fempreneur Account' : 'Sign In to Your Account'}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {authMode === 'register'
                      ? 'Register for verified community membership, founder directory access, and voting participation.'
                      : 'Enter your credentials to access your dashboard, saved nominations, and membership benefits.'}
                  </p>
                </div>

                {message && (
                  <div
                    style={{
                      background: isError ? 'var(--color-coral-soft)' : 'var(--color-gold-soft)',
                      border: isError ? '1px solid rgba(224, 93, 93, 0.3)' : '1px solid var(--color-gold-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1.25rem',
                      fontSize: '0.88rem',
                      color: isError ? '#DC2626' : 'var(--color-gold-rich)',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                    }}
                  >
                    {isError ? (
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    ) : (
                      <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                    )}
                    <span>{message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {authMode === 'register' && (
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" htmlFor="portal-name">
                        Full Name *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          id="portal-name"
                          type="text"
                          required
                          className="form-input"
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <User
                          size={18}
                          color="var(--text-muted)"
                          style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" htmlFor="portal-email">
                      Email Address *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="portal-email"
                        type="email"
                        required
                        className="form-input"
                        placeholder="founder@yourcompany.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <Mail
                        size={18}
                        color="var(--text-muted)"
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <label className="form-label" htmlFor="portal-password" style={{ marginBottom: 0 }}>
                        Password * {authMode === 'register' && '(min. 6 characters)'}
                      </label>
                      {authMode === 'login' && (
                        <a
                          href="#forgot"
                          onClick={(e) => { e.preventDefault(); alert('Please contact secretariat@fempreneur.in for verified password recovery.'); }}
                          style={{ fontSize: '0.82rem', color: 'var(--color-burgundy)', fontWeight: 600 }}
                        >
                          Forgot Password?
                        </a>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="portal-password"
                        type="password"
                        required
                        className="form-input"
                        placeholder="••••••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <Lock
                        size={18}
                        color="var(--text-muted)"
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : (authMode === 'register' ? 'Register Account' : 'Sign In to Dashboard')}
                    <ArrowRight size={18} />
                  </button>
                </form>

                <div
                  style={{
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span>
                    {authMode === 'login' ? "Don't have an active account yet?" : 'Already have an account?'}
                  </span>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {authMode === 'login' ? (
                      <button
                        type="button"
                        onClick={() => { setAuthMode('register'); setMessage(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Create an Account
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setAuthMode('login'); setMessage(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Sign In Instead
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
