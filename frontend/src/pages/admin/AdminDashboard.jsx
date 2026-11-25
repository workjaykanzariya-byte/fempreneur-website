import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Handshake, Calendar, LogOut, Loader2, Menu, X, 
  FileText, PlusCircle, Award, Users, Video, Search,
  Download, Eye, Edit, Trash2, CheckCircle, Star, RefreshCw
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import AppWebSwitcher from '../../components/AppWebSwitcher';
import './AdminDashboard.css';

const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_PREFIX = isProduction ? '' : `http://${window.location.hostname}:5000`;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('nominations');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('adminUser') || '{"name":"Trushali","email":"worktrushalijambukiya@gmail.com","role":"superadmin"}');

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Filters & Sorting (matching Greenpreneur)
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewedKeys, setViewedKeys] = useState([]);

  // Form States for other tabs
  const [newWinnerForm, setNewWinnerForm] = useState({
    nominee_name: '', business_name: '', category: 'Woman Entrepreneur of the Year', award_year: '2026', website_link: '', city: 'Ahmedabad', description: '', profilePicture: null
  });
  const [winnerSubmitting, setWinnerSubmitting] = useState(false);
  const [winnerPreview, setWinnerPreview] = useState(null);
  const [newEntityForm, setNewEntityForm] = useState({
    name: '', role: '', org: '', tags: '', bio: ''
  });
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Leadership');
  const [blogContent, setBlogContent] = useState('');

  // Load viewed keys from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fem_admin_viewed_keys');
      if (stored) setViewedKeys(JSON.parse(stored));
    } catch (err) {
      console.error('Error loading viewed keys:', err);
    }
  }, []);

  const markAsRead = (key) => {
    if (!viewedKeys.includes(key)) {
      const updated = [...viewedKeys, key];
      setViewedKeys(updated);
      localStorage.setItem('fem_admin_viewed_keys', JSON.stringify(updated));
    }
  };

  const handleMarkAllRead = () => {
    const keysToAdd = data.map(row => `${activeTab}-${row.id}`);
    const updated = Array.from(new Set([...viewedKeys, ...keysToAdd]));
    setViewedKeys(updated);
    localStorage.setItem('fem_admin_viewed_keys', JSON.stringify(updated));
  };

  useEffect(() => {
    setSelectedIds([]);
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('newest');
    setSelectedRecord(null);
    setIsEditing(false);
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  // Fetch Data for Active Tab with resilient fallback
  const fetchData = async (tabId) => {
    if (['add-winner', 'add-blog', 'add-voice-video', 'add-gallery-sponsor', 'add-partner', 'add-jury'].includes(tabId)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');

      let endpoint = '';
      if (tabId === 'nominations') endpoint = 'nominations';
      else if (tabId === 'winners') endpoint = 'winners';
      else if (tabId === 'events') endpoint = 'event-registrations';
      else if (tabId === 'sponsorships') endpoint = 'sponsorships';
      else if (tabId === 'membership' || tabId === 'community-members') endpoint = 'community-applications';
      else if (tabId === 'gallery-sponsors') endpoint = 'gallery-sponsors';
      else if (tabId === 'partners') endpoint = 'partners';
      else if (tabId === 'jury') endpoint = 'jury';
      else if (tabId === 'blogs') endpoint = 'blogs';
      else if (tabId === 'voice-videos') endpoint = 'voice-videos';
      else endpoint = `inquiries?type=${tabId}`;

      let fetchedData = null;
      try {
        const response = await fetch(`${API_PREFIX}/api/admin/${endpoint}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          fetchedData = result.data;
        }
      } catch (err) {
        console.warn('Admin API query error:', err.message);
      }

      // Resilient fallback for nominations if admin endpoint fails or is unauthorized
      if (!fetchedData && tabId === 'nominations') {
        try {
          const pubRes = await fetch(`${API_PREFIX}/api/nominations`);
          const pubResult = await pubRes.json();
          if (pubResult.success && Array.isArray(pubResult.data)) {
            fetchedData = pubResult.data;
          }
        } catch (pubErr) {
          console.warn('Public nominations fetch fallback error:', pubErr.message);
        }
      }

      setData(fetchedData || []);
    } catch (err) {
      console.warn('Data fetch error:', err.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  // Main Navigation Sections matching Greenpreneur Sidebar Structure
  const mainNavItems = [
    { id: 'nominations', label: 'Award Nominations', icon: <Trophy size={18} /> },
    { id: 'winners', label: 'Winners List', icon: <Award size={18} /> },
    { id: 'add-winner', label: '+ Add New Winner', icon: <PlusCircle size={18} /> },
    { id: 'gallery-sponsors', label: 'Manage Sponsors', icon: <Handshake size={18} /> },
    { id: 'add-gallery-sponsor', label: '+ Add Sponsor', icon: <PlusCircle size={18} /> },
    { id: 'jury', label: 'Manage Speakers & Jury', icon: <Users size={18} /> },
    { id: 'add-jury', label: '+ Add Speakers & Jury', icon: <PlusCircle size={18} /> },
    { id: 'partners', label: 'Manage Partners', icon: <Handshake size={18} /> },
    { id: 'add-partner', label: '+ Add Partner', icon: <PlusCircle size={18} /> },
    { id: 'blogs', label: 'Manage Blogs', icon: <FileText size={18} /> },
    { id: 'events', label: 'Event Passes', icon: <Calendar size={18} /> },
    { id: 'sponsorships', label: 'Sponsorships', icon: <Handshake size={18} /> },
    { id: 'community-members', label: 'Community Members', icon: <Users size={18} /> },
  ];

  // Processed Data (Search, Filter, Sort)
  const processedData = data.filter((row) => {
    // Status Filter
    if (statusFilter !== 'all') {
      const rowStatus = (row.status || '').toLowerCase();
      if (rowStatus !== statusFilter.toLowerCase()) return false;
    }

    // Text Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const name = (row.nominee_name || row.founder_name || row.name || '').toLowerCase();
      const company = (row.business_name || row.venture_name || row.company || '').toLowerCase();
      const email = (row.email || '').toLowerCase();
      const city = (row.city || '').toLowerCase();
      const cat = (row.category_name || row.category || '').toLowerCase();
      return name.includes(q) || company.includes(q) || email.includes(q) || city.includes(q) || cat.includes(q);
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    }
    if (sortBy === 'oldest') {
      return new Date(a.created_at || 0) - new Date(b.created_at || 0);
    }
    if (sortBy === 'name') {
      const nameA = (a.nominee_name || a.founder_name || a.name || '').toLowerCase();
      const nameB = (b.nominee_name || b.founder_name || b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    }
    if (sortBy === 'votes') {
      return (Number(b.public_votes) || 0) - (Number(a.public_votes) || 0);
    }
    return 0;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(processedData.map((r) => String(r.id)));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id) => {
    const sId = String(id);
    if (selectedIds.includes(sId)) {
      setSelectedIds(selectedIds.filter((item) => item !== sId));
    } else {
      setSelectedIds([...selectedIds, sId]);
    }
  };

  const exportToCSV = () => {
    if (processedData.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = ['ID', 'Nominee Name', 'Company', 'Designation', 'Email', 'Phone', 'City', 'Category', 'Track', 'Package', 'Payment Status', 'Status', 'Votes', 'Created At'];
    const rows = processedData.map(r => [
      r.id,
      `"${(r.nominee_name || r.founder_name || '').replace(/"/g, '""')}"`,
      `"${(r.business_name || r.venture_name || '').replace(/"/g, '""')}"`,
      `"${(r.designation || '').replace(/"/g, '""')}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.city || ''}"`,
      `"${(r.category_name || r.category || '').replace(/"/g, '""')}"`,
      `"${r.track || ''}"`,
      `"${r.package || ''}"`,
      `"${r.payment_status || ''}"`,
      `"${r.status || ''}"`,
      r.public_votes || 0,
      `"${r.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Fempreneur_${activeTab}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_PREFIX}/api/admin/nominations/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const result = await res.json();
      if (result.success) {
        alert('Record deleted successfully.');
        fetchData(activeTab);
      } else {
        alert('Notice: ' + (result.message || 'Unable to delete.'));
      }
    } catch (err) {
      alert('Delete operation failed.');
    }
  };

  const handleDeleteWinner = async (id, source = 'legacy') => {
    if (!window.confirm('Are you sure you want to remove this winner?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_PREFIX}/api/admin/winners/${id}?source=${encodeURIComponent(source)}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const result = await res.json();
      if (result.success) {
        alert('Winner removed successfully.');
        fetchData('winners');
      } else {
        alert('Notice: ' + (result.message || 'Unable to remove winner.'));
      }
    } catch (err) {
      alert('Delete winner operation failed.');
    }
  };

  const handleAddWinner = async (e) => {
    e.preventDefault();
    if (!newWinnerForm.nominee_name.trim()) {
      alert('Winner Name is required.');
      return;
    }
    setWinnerSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('nominee_name', newWinnerForm.nominee_name.trim());
      formData.append('business_name', newWinnerForm.business_name.trim());
      formData.append('category', newWinnerForm.category.trim());
      formData.append('award_year', newWinnerForm.award_year || '2026');
      formData.append('city', newWinnerForm.city.trim());
      formData.append('website_link', newWinnerForm.website_link.trim());
      formData.append('description', newWinnerForm.description.trim());
      if (newWinnerForm.profilePicture) {
        formData.append('profilePicture', newWinnerForm.profilePicture);
      }

      const res = await fetch(`${API_PREFIX}/api/admin/winners`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert('Winner added and synced to the website!');
        setNewWinnerForm({
          nominee_name: '', business_name: '', category: 'Woman Entrepreneur of the Year', award_year: '2026', website_link: '', city: 'Ahmedabad', description: '', profilePicture: null
        });
        setWinnerPreview(null);
        setActiveTab('winners');
      } else {
        alert(result.message || 'Failed to add winner.');
      }
    } catch (err) {
      console.error('Add winner error:', err);
      alert('Error adding winner. Please verify backend connection.');
    } finally {
      setWinnerSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_PREFIX}/api/admin/nominations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await res.json();
      if (result.success) {
        setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        alert(result.message || 'Status update failed.');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editForm.id) return;
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('nominee_name', editForm.nominee_name || '');
      formData.append('business_name', editForm.business_name || '');
      formData.append('email', editForm.email || '');
      formData.append('phone', editForm.phone || '');
      formData.append('city', editForm.city || '');
      formData.append('description', editForm.description || '');
      if (editForm.profilePictureFile) {
        formData.append('profilePicture', editForm.profilePictureFile);
      }

      const res = await fetch(`${API_PREFIX}/api/admin/nominations/${editForm.id}`, {
        method: 'PATCH',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert('Record updated successfully.');
        setIsEditing(false);
        fetchData(activeTab);
      } else {
        alert(result.message || 'Update failed.');
      }
    } catch (err) {
      console.error('Error updating record:', err);
      alert('Save operation encountered an error.');
    }
  };

  return (
    <div className="fem-admin-wrapper">
      {/* Sidebar with Fempreneur Branding & Greenpreneur Layout */}
      <aside className={`fem-admin-sidebar ${!isSidebarOpen ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="fem-admin-sidebar-header">
          <div className="fem-admin-brand">
            <span className="fem-admin-brand-text">FEMPRENEUR</span>
          </div>
          <button 
            type="button" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'transparent', border: 'none', color: '#D4AF37', cursor: 'pointer' }}
          >
            <Menu size={18} />
          </button>
        </div>

        {/* User Info matching Greenpreneur */}
        {isSidebarOpen && (
          <div className="fem-admin-user-welcome">
            <div className="welcome-lbl">Welcome back,</div>
            <div className="welcome-name">{user.name || 'Trushali'}</div>
          </div>
        )}

        {/* App / Web Platform Switcher */}
        <AppWebSwitcher collapsed={!isSidebarOpen} currentMode="web" />

        {/* Navigation Menu */}
        <div className="fem-admin-sidebar-scroll">
          <div className="fem-admin-nav-group">MAIN RECORDS</div>
          <ul className="fem-admin-nav-list">
            {mainNavItems.map(item => (
              <li
                key={item.id}
                className={`fem-admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                title={!isSidebarOpen ? item.label : undefined}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="fem-admin-logout-btn"
        >
          <LogOut size={16} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="fem-admin-main">
        {/* White Page Header with Breadcrumb: Dashboard > Award Nominations */}
        <header className="fem-admin-topbar">
          <div className="fem-admin-breadcrumb">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Menu size={20} />
            </button>
            <span className="bc-parent">Dashboard</span>
            <span className="bc-sep">›</span>
            <span className="bc-active">
              {activeTab === 'nominations' ? 'Award Nominations' : mainNavItems.find(i => i.id === activeTab)?.label || 'Admin Panel'}
            </span>
          </div>

          <div className="fem-admin-topbar-actions">
            {processedData.length > 0 && activeTab === 'nominations' && (
              <button
                type="button"
                onClick={exportToCSV}
                className="fem-btn fem-btn-gold"
                style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              >
                <Download size={15} />
                <span>Export CSV</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => fetchData(activeTab)}
              className="fem-btn fem-btn-outline"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              title="Refresh Data"
            >
              <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </header>

        {/* Compact Filter Toolbar matching Greenpreneur reference */}
        {activeTab === 'nominations' && (
          <div className="fem-filter-toolbar">
            <div className="fem-filter-group">
              <span className="fem-filter-label">STATUS:</span>
              <select
                className="fem-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="winner">Winner</option>
                <option value="rejected">Rejected</option>
              </select>

              <span className="fem-filter-label" style={{ marginLeft: '12px' }}>SORT BY:</span>
              <select
                className="fem-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="votes">Highest Votes</option>
              </select>

              <button
                type="button"
                onClick={handleMarkAllRead}
                className="fem-read-btn"
                style={{ marginLeft: '8px' }}
              >
                <CheckCircle size={14} style={{ color: '#10B981' }} />
                <span>Mark Current as Read</span>
              </button>
            </div>

            <div className="fem-entry-count">
              Showing {processedData.length} entries
            </div>
          </div>
        )}

        {/* Wide Clean Table matching Greenpreneur screenshot */}
        <div style={{ padding: '24px 32px' }}>
          {activeTab === 'nominations' && (
            <div className="fem-table-container">
              {isLoading ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
                  <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 12px', color: '#9C27B0' }} />
                  <p style={{ fontWeight: 600 }}>Loading Nominations...</p>
                </div>
              ) : processedData.length === 0 ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
                  <Trophy size={36} style={{ margin: '0 auto 12px', color: '#D4AF37' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: 0 }}>No Records Found</h3>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>No entries match the current filter or search criteria.</p>
                </div>
              ) : (
                <table className="fem-clean-table">
                  <thead>
                    <tr>
                      <th style={{ width: '44px' }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.length > 0 && selectedIds.length === processedData.length}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>NOMINEE DETAILS</th>
                      <th>COMPANY & CITY</th>
                      <th>CATEGORY</th>
                      <th>VOTES & SCORE</th>
                      <th>PAYMENT</th>
                      <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedData.map((row) => {
                      const isSelected = selectedIds.includes(String(row.id));
                      const isRead = viewedKeys.includes(`${activeTab}-${row.id}`);
                      const isRated = (row.track || '').toLowerCase() === 'rated';
                      const isPaid = (row.payment_status || '').toLowerCase() === 'paid';
                      const isPending = (row.payment_status || '').toLowerCase() === 'pending';

                      return (
                        <tr key={row.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRow(row.id)}
                            />
                          </td>
                          <td>
                            <div className="nominee-title">
                              <span
                                className="nominee-name-link"
                                onClick={() => {
                                  markAsRead(`${activeTab}-${row.id}`);
                                  setSelectedRecord(row);
                                  setIsEditing(false);
                                }}
                                title="Click to view full record details"
                              >
                                {row.nominee_name || row.founder_name || 'Nominee'}
                              </span>
                              {!isRead && <span className="badge-new">NEW</span>}
                            </div>
                            <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                              <span className={isRated ? 'badge-track-rated' : 'badge-track-honorary'}>
                                {isRated ? 'RATED' : 'HONORARY'}
                              </span>
                              <span className="nominee-email">{row.email || '—'}</span>
                            </div>
                          </td>
                          <td>
                            <div className="company-title">{row.business_name || row.venture_name || 'Venture'}</div>
                            <div className="company-city">{row.city || 'India'}</div>
                          </td>
                          <td>
                            <div className="category-text">
                              {row.category_name || row.category || 'Woman Entrepreneur of the Year'}
                            </div>
                          </td>
                          <td>
                            <div className="votes-display">
                              <Star size={14} fill="#F59E0B" color="#F59E0B" />
                              <span>{row.public_votes || 0} votes</span>
                            </div>
                            <div className="votes-subtitle">
                              Speakers & Jury: {row.jury_score ? `${row.jury_score}/10` : 'Not graded'}
                            </div>
                          </td>
                          <td>
                            <div>
                              {isPaid ? (
                                <span className="badge-payment-paid">PAID</span>
                              ) : isPending ? (
                                <span className="badge-payment-pending">PENDING</span>
                              ) : (
                                <span className="badge-payment-na">N/A</span>
                              )}
                            </div>
                            {isRated && (
                              <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '3px', fontWeight: 500 }}>
                                {row.package || 'Identity'} (₹{Number(row.package_amount || 2000).toLocaleString()})
                              </div>
                            )}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  markAsRead(`${activeTab}-${row.id}`);
                                  setSelectedRecord(row);
                                }}
                                className="fem-btn fem-btn-outline"
                                style={{ padding: '6px 8px' }}
                                title="View Details"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedRecord(row);
                                  setIsEditing(true);
                                  setEditForm(row);
                                }}
                                className="fem-btn fem-btn-outline"
                                style={{ padding: '6px 8px' }}
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(row.id)}
                                className="fem-btn fem-btn-danger"
                                style={{ padding: '6px 8px', background: '#EF4444' }}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Winners List Tab */}
          {activeTab === 'winners' && (
            <div className="fem-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>
                    Published Winners ({data.length})
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#6B7280' }}>
                    Automatically synced with Winners Page &amp; Homepage Hall of Fame
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('add-winner')}
                  className="fem-btn fem-btn-gold"
                >
                  + Add New Winner
                </button>
              </div>
              {isLoading ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
                  <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 12px', color: '#9C27B0' }} />
                  <p style={{ fontWeight: 600 }}>Loading Winners...</p>
                </div>
              ) : data.length === 0 ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: '#6B7280' }}>
                  <Award size={36} style={{ margin: '0 auto 12px', color: '#9C27B0' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: 0 }}>No Dynamic Winners Yet</h3>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Add a winner or mark a nomination as winner to publish it automatically.</p>
                </div>
              ) : (
                <table className="fem-clean-table">
                  <thead>
                    <tr>
                      <th>PHOTO</th>
                      <th>WINNER NAME</th>
                      <th>COMPANY &amp; CITY</th>
                      <th>CATEGORY</th>
                      <th>YEAR</th>
                      <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={`${row.source || 'legacy'}-${row.id}`}>
                        <td>
                          {row.photo_url ? (
                            <img
                              src={row.photo_url.startsWith('http') ? row.photo_url : `${API_PREFIX}${row.photo_url}`}
                              alt={row.name}
                              style={{ width: '48px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                            />
                          ) : (
                            <div style={{ width: '48px', height: '56px', borderRadius: '8px', background: '#F3E8FF', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                              {(row.name || 'W').charAt(0).toUpperCase()}
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="nominee-title">{row.name}</div>
                          <div className="nominee-email">{row.source === 'nomination' ? 'Promoted Nomination' : 'Direct Winner'}</div>
                        </td>
                        <td>
                          <div className="company-title">{row.company || '—'}</div>
                          <div className="company-city">{row.city || 'India'}</div>
                        </td>
                        <td>
                          <div className="category-text">{row.category_name || row.track || 'Fempreneur Award'}</div>
                        </td>
                        <td>
                          <span className="badge-track-honorary">{row.award_year || '2026'}</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteWinner(row.id, row.source || 'legacy')}
                            className="fem-btn fem-btn-danger"
                            style={{ padding: '6px 10px', background: '#EF4444' }}
                            title="Delete Winner"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Add New Winner Form */}
          {activeTab === 'add-winner' && (
            <div style={{ background: '#FFFFFF', padding: '28px 32px', borderRadius: '12px', border: '1px solid #E5E7EB', maxWidth: '760px' }}>
              <h3 style={{ margin: '0 0 6px', color: '#111827', fontWeight: 700 }}>Add New Award Winner</h3>
              <p style={{ margin: '0 0 22px', color: '#6B7280', fontSize: '0.88rem' }}>
                Uploaded photos automatically have their background removed and styled into the Fempreneur template, then appear on the Winners Page and Hall of Fame.
              </p>
              <form onSubmit={handleAddWinner} style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Winner Name *</label>
                    <input
                      type="text"
                      required
                      value={newWinnerForm.nominee_name}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, nominee_name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Company / Venture Name</label>
                    <input
                      type="text"
                      value={newWinnerForm.business_name}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, business_name: e.target.value })}
                      placeholder="e.g. Aarya Innovations"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Award Category / Title</label>
                    <input
                      type="text"
                      value={newWinnerForm.category}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, category: e.target.value })}
                      placeholder="e.g. Woman Entrepreneur of the Year"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Award Year</label>
                    <select
                      value={newWinnerForm.award_year}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, award_year: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFFFFF' }}
                    >
                      <option value="2027">2027</option>
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>City</label>
                    <input
                      type="text"
                      value={newWinnerForm.city}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, city: e.target.value })}
                      placeholder="e.g. Ahmedabad"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Website / Story URL</label>
                  <input
                    type="url"
                    value={newWinnerForm.website_link}
                    onChange={(e) => setNewWinnerForm({ ...newWinnerForm, website_link: e.target.value })}
                    placeholder="https://vyapaarjagat.com"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Impact / Award Highlight</label>
                  <textarea
                    rows={3}
                    value={newWinnerForm.description}
                    onChange={(e) => setNewWinnerForm({ ...newWinnerForm, description: e.target.value })}
                    placeholder="Brief achievement or impact summary..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Winner Photo (Auto Background Removal)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewWinnerForm({ ...newWinnerForm, profilePicture: file });
                      setWinnerPreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                  {winnerPreview && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={winnerPreview} alt="Winner preview" style={{ width: '96px', height: '112px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #D1D5DB' }} />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button
                    type="submit"
                    disabled={winnerSubmitting}
                    className="fem-btn fem-btn-gold"
                    style={{ minWidth: '160px' }}
                  >
                    {winnerSubmitting ? 'Processing & Saving...' : 'Publish Winner'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('winners')}
                    className="fem-btn fem-btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Simple Tab Switcher notification if other tabs clicked */}
          {!['nominations', 'winners', 'add-winner'].includes(activeTab) && (
            <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#111827', fontWeight: 700 }}>
                {mainNavItems.find(i => i.id === activeTab)?.label || 'Module Active'}
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '8px' }}>
                Total records loaded: {data.length}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('nominations')}
                className="fem-btn fem-btn-gold"
                style={{ marginTop: '16px' }}
              >
                Return to Award Nominations
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Greenpreneur 1:1 Record Details Modal */}
      {selectedRecord && !isEditing && (
        <div className="fem-modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div className="fem-modal-box record-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="record-details-header">
              <h3 className="record-details-title">Record Details</h3>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="record-details-close-btn"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="record-details-body">
              {/* Row 1: ID & Nominee Name */}
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">ID</label>
                  <div className="record-field-box">{selectedRecord.id}</div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">NOMINEE NAME</label>
                  <div className="record-field-box">
                    {selectedRecord.nominee_name || selectedRecord.founder_name || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 2: Business Name & Email */}
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">BUSINESS NAME</label>
                  <div className="record-field-box">
                    {selectedRecord.business_name || selectedRecord.venture_name || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">EMAIL</label>
                  <div className="record-field-box">
                    {selectedRecord.email || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 3: Phone & City */}
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">PHONE</label>
                  <div className="record-field-box">
                    {selectedRecord.phone || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">CITY</label>
                  <div className="record-field-box">
                    {selectedRecord.city || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 4: Category & Category Group */}
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">CATEGORY</label>
                  <div className="record-field-box">
                    {selectedRecord.category_name || selectedRecord.category || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">CATEGORY GROUP</label>
                  <div className="record-field-box">
                    {selectedRecord.domain || selectedRecord.category_group || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 5: Track & Package */}
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">TRACK</label>
                  <div className="record-field-box">
                    {selectedRecord.track || 'honorary'}
                  </div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">PACKAGE</label>
                  <div className="record-field-box">
                    {selectedRecord.package || <span className="not-provided">Not provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 6: Package Amount & Status */}
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">PACKAGE AMOUNT</label>
                  <div className="record-field-box">
                    {selectedRecord.package_amount ? `₹${Number(selectedRecord.package_amount).toLocaleString()}` : <span className="not-provided">Not provided</span>}
                  </div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">STATUS</label>
                  <div className="record-field-box">
                    {selectedRecord.status || 'pending'}
                  </div>
                </div>
              </div>

              {/* Nominee Photo Section */}
              <div className="record-media-section">
                <div className="record-media-header">
                  <label className="record-field-label">NOMINEE PHOTO</label>
                  {selectedRecord.profile_picture && (
                    <a 
                      href={selectedRecord.profile_picture} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="view-download-link"
                    >
                      View / Download File
                    </a>
                  )}
                </div>
                <div className="record-media-box">
                  {selectedRecord.profile_picture ? (
                    <img 
                      src={selectedRecord.profile_picture} 
                      alt="Nominee" 
                      className="record-photo-preview"
                    />
                  ) : (
                    <div className="not-provided-media">
                      <Users size={28} color="#94a3b8" />
                      <span>Not provided</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Logo Section */}
              <div className="record-media-section">
                <div className="record-media-header">
                  <label className="record-field-label">BUSINESS LOGO</label>
                  {selectedRecord.business_logo && (
                    <a 
                      href={selectedRecord.business_logo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="view-download-link"
                    >
                      View / Download File
                    </a>
                  )}
                </div>
                <div className="record-media-box">
                  {selectedRecord.business_logo ? (
                    <img 
                      src={selectedRecord.business_logo} 
                      alt="Business Logo" 
                      className="record-logo-preview"
                    />
                  ) : (
                    <div className="not-provided-media">
                      <FileText size={28} color="#94a3b8" />
                      <span>Not provided</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description / Pitch (if provided) */}
              {selectedRecord.description && (
                <div style={{ marginTop: '16px' }}>
                  <label className="record-field-label">WORK & IMPACT / PITCH</label>
                  <div className="record-field-box" style={{ minHeight: '80px', alignItems: 'flex-start', lineHeight: 1.6, padding: '12px 14px' }}>
                    {selectedRecord.description}
                  </div>
                </div>
              )}

              {/* Created At & Updated At Row */}
              <div className="record-field-row" style={{ marginTop: '16px' }}>
                <div className="record-field-col">
                  <label className="record-field-label">CREATED AT</label>
                  <div className="record-field-box">
                    {selectedRecord.created_at ? new Date(selectedRecord.created_at).toISOString() : <span className="not-provided">Not provided</span>}
                  </div>
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">UPDATED AT</label>
                  <div className="record-field-box">
                    {selectedRecord.updated_at ? new Date(selectedRecord.updated_at).toISOString() : (selectedRecord.created_at ? new Date(selectedRecord.created_at).toISOString() : <span className="not-provided">Not provided</span>)}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Manage Nomination Status & Edit Button */}
              <div className="record-details-footer">
                <div className="manage-status-group">
                  <div className="record-field-label" style={{ marginBottom: '8px' }}>MANAGE NOMINATION STATUS</div>
                  <div className="status-buttons-row">
                    {['pending', 'vetting', 'approved', 'rejected'].map((st) => {
                      const isActive = (selectedRecord.status || 'pending').toLowerCase() === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleUpdateStatus(selectedRecord.id, st)}
                          className={`status-action-pill ${st} ${isActive ? 'active' : ''}`}
                        >
                          {st.charAt(0).toUpperCase() + st.slice(1)}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(selectedRecord.id, 'winner')}
                      className={`status-action-pill winner ${(selectedRecord.status || '').toLowerCase() === 'winner' ? 'active' : ''}`}
                    >
                      🏆 Make Winner
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditForm({
                      id: selectedRecord.id,
                      nominee_name: selectedRecord.nominee_name || selectedRecord.founder_name || '',
                      business_name: selectedRecord.business_name || selectedRecord.venture_name || '',
                      email: selectedRecord.email || '',
                      phone: selectedRecord.phone || '',
                      city: selectedRecord.city || '',
                      description: selectedRecord.description || '',
                    });
                    setIsEditing(true);
                  }}
                  className="edit-details-btn"
                >
                  EDIT DETAILS / PHOTO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Details & Photo Modal */}
      {isEditing && editForm && (
        <div className="fem-modal-backdrop" onClick={() => setIsEditing(false)}>
          <div className="fem-modal-box record-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="record-details-header">
              <h3 className="record-details-title">Edit Record Details</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="record-details-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="record-details-body">
              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">NOMINEE NAME</label>
                  <input
                    type="text"
                    value={editForm.nominee_name || ''}
                    onChange={(e) => setEditForm({ ...editForm, nominee_name: e.target.value })}
                    className="record-edit-input"
                    required
                  />
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">BUSINESS NAME</label>
                  <input
                    type="text"
                    value={editForm.business_name || ''}
                    onChange={(e) => setEditForm({ ...editForm, business_name: e.target.value })}
                    className="record-edit-input"
                    required
                  />
                </div>
              </div>

              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">EMAIL</label>
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="record-edit-input"
                    required
                  />
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">PHONE</label>
                  <input
                    type="text"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="record-edit-input"
                  />
                </div>
              </div>

              <div className="record-field-row">
                <div className="record-field-col">
                  <label className="record-field-label">CITY & STATE</label>
                  <input
                    type="text"
                    value={editForm.city || ''}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="record-edit-input"
                  />
                </div>
                <div className="record-field-col">
                  <label className="record-field-label">UPDATE NOMINEE PHOTO</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditForm({ ...editForm, profilePictureFile: e.target.files[0] })}
                    className="record-edit-input"
                    style={{ padding: '7px 10px' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <label className="record-field-label">WORK & IMPACT SUMMARY / PITCH</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="record-edit-input"
                  rows={4}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div className="record-details-footer" style={{ justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="fem-btn fem-btn-outline"
                  style={{ padding: '10px 18px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edit-details-btn"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
