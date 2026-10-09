import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Handshake, Calendar, LogOut, Loader2, ChevronRight, Menu, X, 
  FileText, PlusCircle, Award, Users, Video, ArrowUp, ArrowDown, Search,
  Download, Eye, Edit, Trash2, CheckCircle, Clock, XCircle, CheckSquare, 
  Square, Sparkles, ExternalLink, HelpCircle, Mail, Phone, MapPin, Tag, RefreshCw
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import './AdminDashboard.css';

const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_PREFIX = isProduction ? '' : `http://${window.location.hostname}:5000`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('nominations');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('adminUser') || '{"name":"Fempreneur Admin","email":"admin@fempreneur.club","role":"superadmin"}');

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editFile, setEditFile] = useState(null);

  // Filters & Sorting
  const [nominationFilter, setNominationFilter] = useState('all');
  const [nominationSort, setNominationSort] = useState('newest');
  const [membershipPaymentFilter, setMembershipPaymentFilter] = useState('all');
  const [membershipSort, setMembershipSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewedKeys, setViewedKeys] = useState([]);

  // Voice of Fempreneur States
  const [previewUrl, setPreviewUrl] = useState('');
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const [customTitle, setCustomTitle] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [videoSpeaker, setVideoSpeaker] = useState('');
  const [videoCompany, setVideoCompany] = useState('');

  // Blog Editor State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Leadership');
  const [blogAuthor, setBlogAuthor] = useState('Fempreneur Team');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogFeaturedImage, setBlogFeaturedImage] = useState(null);

  // Add Item States (Winner, Sponsor, Partner, Jury)
  const [newWinnerForm, setNewWinnerForm] = useState({
    nominee_name: '', business_name: '', category: 'Tech Innovator of the Year', website_link: '', city: 'Ahmedabad', description: ''
  });
  const [newWinnerFile, setNewWinnerFile] = useState(null);

  const [newEntityForm, setNewEntityForm] = useState({
    name: '', role: '', org: '', tags: '', bio: ''
  });
  const [newEntityFile, setNewEntityFile] = useState(null);

  // Load viewed keys from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fem_admin_viewed_keys');
      if (stored) {
        setViewedKeys(JSON.parse(stored));
      }
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
    const keysToAdd = processedData.map(row => `${activeTab}-${row.id}`);
    const updated = Array.from(new Set([...viewedKeys, ...keysToAdd]));
    setViewedKeys(updated);
    localStorage.setItem('fem_admin_viewed_keys', JSON.stringify(updated));
  };

  useEffect(() => {
    setSelectedIds([]);
    setSearchQuery('');
    setNominationFilter('all');
    setNominationSort('newest');
    setMembershipPaymentFilter('all');
    setMembershipSort('newest');
    setBlogContent('');
    setSelectedRecord(null);
    setIsEditing(false);
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Fetch Data for Active Tab
  const fetchData = async (tabId) => {
    if (['add-winner', 'add-blog', 'add-voice-video', 'add-gallery-sponsor', 'add-partner', 'add-jury'].includes(tabId)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      if (tabId === 'blogs') {
        const response = await fetch(`${API_PREFIX}/api/admin/blogs`);
        const result = await response.json();
        if (result.success) setData(result.data || []);
        setIsLoading(false);
        return;
      }

      if (tabId === 'voice-videos') {
        const response = await fetch(`${API_PREFIX}/api/admin/voice-videos`);
        const result = await response.json();
        if (result.success) setData(result.data || []);
        setIsLoading(false);
        return;
      }

      let endpoint = '';
      if (tabId === 'nominations') endpoint = 'nominations';
      else if (tabId === 'winners') endpoint = 'winners';
      else if (tabId === 'events') endpoint = 'event-registrations';
      else if (tabId === 'sponsorships') endpoint = 'sponsorships';
      else if (tabId === 'membership' || tabId === 'community-members') endpoint = 'community-applications';
      else if (tabId === 'gallery-sponsors') endpoint = 'gallery-sponsors';
      else if (tabId === 'partners') endpoint = 'partners';
      else if (tabId === 'jury') endpoint = 'jury';
      else endpoint = `inquiries?type=${tabId}`;

      const response = await fetch(`${API_PREFIX}/api/admin/${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data || []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.warn('Data fetch fallback:', err.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  // Main Navigation Sections
  const mainNavItems = [
    { id: 'nominations', label: 'Award Nominations', icon: <Trophy size={18} /> },
    { id: 'winners', label: 'Winners List', icon: <Award size={18} /> },
    { id: 'add-winner', label: 'Add New Winner', icon: <PlusCircle size={18} /> },
    { id: 'gallery-sponsors', label: 'Manage Sponsors', icon: <Handshake size={18} /> },
    { id: 'add-gallery-sponsor', label: 'Add Sponsor', icon: <PlusCircle size={18} /> },
    { id: 'jury', label: 'Manage Jury', icon: <Users size={18} /> },
    { id: 'add-jury', label: 'Add Jury Member', icon: <PlusCircle size={18} /> },
    { id: 'partners', label: 'Manage Partners', icon: <Handshake size={18} /> },
    { id: 'add-partner', label: 'Add Partner', icon: <PlusCircle size={18} /> },
    { id: 'blogs', label: 'Manage Blogs', icon: <FileText size={18} /> },
    { id: 'add-blog', label: 'Add New Blog', icon: <PlusCircle size={18} /> },
    { id: 'voice-videos', label: 'Voice of Fempreneur', icon: <Video size={18} /> },
    { id: 'add-voice-video', label: 'Add Video Link', icon: <PlusCircle size={18} /> },
    { id: 'events', label: 'Event Passes', icon: <Calendar size={18} /> },
    { id: 'sponsorships', label: 'Sponsorships (Main)', icon: <Handshake size={18} /> },
    { id: 'community-members', label: 'Community Members', icon: <Users size={18} /> },
  ];

  const inquiryNavItems = [
    { id: 'apply-magazine', label: 'Apply for Magazine' },
    { id: 'advertise-magazine', label: 'Advertise in Magazine' },
    { id: 'sponsor', label: 'Become a Sponsor' },
    { id: 'partner', label: 'Apply as Partner' },
    { id: 'advertise-us', label: 'Advertise with Us' },
    { id: 'collaborate', label: 'Collaboration' },
    { id: 'fundraise', label: 'Join to Fundraise' },
    { id: 'invest', label: 'Join to Invest' },
    { id: 'membership', label: 'Membership Inquiry' },
    { id: 'publish-story', label: 'Publish Your Story' },
    { id: 'speaker-application', label: 'Speaker Applications' },
    { id: 'talk-show-speaker', label: 'Talk Show Speakers' },
    { id: 'start-chapter', label: 'Start A Chapter' },
    { id: 'contact', label: 'Contact Messages' },
  ];

  // Filtering & Sorting Processed Data
  let processedData = [...data];

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    processedData = processedData.filter(row => {
      return Object.entries(row).some(([key, val]) => {
        if (val === null || val === undefined) return false;
        if (['id', 'voting_url', 'profile_picture', 'photo_url', 'business_logo'].includes(key) || key.endsWith('_at')) return false;
        return String(val).toLowerCase().includes(q);
      });
    });
  }

  if (activeTab === 'nominations') {
    if (nominationFilter === 'winner') {
      processedData = processedData.filter(row => row.status === 'winner');
    } else if (nominationFilter === 'not-winner') {
      processedData = processedData.filter(row => row.status !== 'winner');
    } else if (nominationFilter === 'approved') {
      processedData = processedData.filter(row => row.status === 'approved');
    } else if (nominationFilter === 'pending') {
      processedData = processedData.filter(row => row.status === 'pending');
    } else if (nominationFilter === 'rejected') {
      processedData = processedData.filter(row => row.status === 'rejected');
    }

    processedData.sort((a, b) => {
      if (nominationSort === 'newest') {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      } else if (nominationSort === 'oldest') {
        return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
      } else if (nominationSort === 'votes-desc') {
        return (Number(b.public_votes) || 0) - (Number(a.public_votes) || 0);
      } else if (nominationSort === 'votes-asc') {
        return (Number(a.public_votes) || 0) - (Number(b.public_votes) || 0);
      }
      return 0;
    });
  }

  if (activeTab === 'membership' || activeTab === 'community-members') {
    if (membershipPaymentFilter === 'paid') {
      processedData = processedData.filter(row => row.payment_status === 'paid');
    } else if (membershipPaymentFilter === 'pending') {
      processedData = processedData.filter(row => row.payment_status === 'pending');
    }

    processedData.sort((a, b) => {
      if (membershipSort === 'newest') {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      } else if (membershipSort === 'oldest') {
        return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
      }
      return 0;
    });
  }

  // Universal CSV Export
  const exportToCSV = () => {
    if (!processedData || processedData.length === 0) {
      alert("No data available to export.");
      return;
    }

    const dataToExport = selectedIds.length > 0 
      ? processedData.filter(row => selectedIds.includes(activeTab === 'winners' ? `${row.source}-${row.id}` : String(row.id))) 
      : processedData;

    let headers = [];
    if (activeTab === 'winners') {
      headers = ['name', 'company', 'category', 'city', 'award_year', 'track', 'source'];
    } else {
      headers = Object.keys(processedData[0]).filter(k => !['id', 'inquiry_type'].includes(k));
    }

    const csvRows = [];
    csvRows.push(headers.map(h => `"${h.toUpperCase()}"`).join(','));

    for (const row of dataToExport) {
      const values = headers.map(header => {
        const val = row[header];
        let valStr = '';
        if (val !== null && val !== undefined) valStr = String(val);
        return `"${valStr.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `fempreneur_${activeTab}_export_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk Status Update
  const handleBulkStatusUpdate = async (status) => {
    if (window.confirm(`Are you sure you want to set status of ${selectedIds.length} records to ${status}?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        const numericIds = selectedIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        const res = await fetch(`${API_PREFIX}/api/admin/nominations/bulk-status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ids: numericIds, status })
        });
        const result = await res.json();
        if (result.success) {
          alert('Selected nominations updated successfully!');
          setSelectedIds([]);
          fetchData('nominations');
        } else {
          alert('Bulk update failed: ' + result.message);
        }
      } catch (err) {
        alert('Bulk update request failed.');
      }
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected records?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        const numericIds = selectedIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        const res = await fetch(`${API_PREFIX}/api/admin/bulk-delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ids: numericIds, type: activeTab })
        });
        const result = await res.json();
        if (result.success) {
          alert('Selected records deleted successfully!');
          setSelectedIds([]);
          fetchData(activeTab);
        } else {
          alert('Bulk delete failed: ' + result.message);
        }
      } catch (err) {
        alert('Bulk delete request failed.');
      }
    }
  };

  // Select / Deselect All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = processedData.map(row => activeTab === 'winners' ? `${row.source}-${row.id}` : String(row.id));
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (idStr) => {
    if (selectedIds.includes(idStr)) {
      setSelectedIds(selectedIds.filter(id => id !== idStr));
    } else {
      setSelectedIds([...selectedIds, idStr]);
    }
  };

  // Record Selection for Details Modal
  useEffect(() => {
    if (selectedRecord) {
      setEditForm({
        nominee_name: selectedRecord.nominee_name || selectedRecord.name || '',
        business_name: selectedRecord.business_name || selectedRecord.company || '',
        description: selectedRecord.description || selectedRecord.impact_text || '',
        city: selectedRecord.city || '',
        phone: selectedRecord.phone || '',
        email: selectedRecord.email || '',
        title: selectedRecord.title || '',
        content: selectedRecord.content || '',
        author: selectedRecord.author || 'Fempreneur Team'
      });
      setEditFile(null);
      setIsEditing(false);
      markAsRead(`${activeTab}-${selectedRecord.id}`);
    }
  }, [selectedRecord]);

  // Save Nomination Edits
  const handleSaveNominationChanges = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('nominee_name', editForm.nominee_name);
      formData.append('business_name', editForm.business_name);
      formData.append('description', editForm.description);
      formData.append('city', editForm.city);
      formData.append('phone', editForm.phone);
      formData.append('email', editForm.email);
      if (editFile) formData.append('profilePicture', editFile);

      const res = await fetch(`${API_PREFIX}/api/admin/nominations/${selectedRecord.id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert('Nomination updated successfully!');
        setIsEditing(false);
        setSelectedRecord(null);
        fetchData('nominations');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      alert('Failed to save nomination changes.');
    }
  };

  // Single Status Update
  const handleSingleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_PREFIX}/api/admin/nominations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const result = await res.json();
      if (result.success) {
        fetchData('nominations');
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord({ ...selectedRecord, status });
        }
      }
    } catch (err) {
      alert('Status update failed.');
    }
  };

  // Add New Winner Submit
  const handleCreateWinner = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('nominee_name', newWinnerForm.nominee_name);
      formData.append('business_name', newWinnerForm.business_name);
      formData.append('category', newWinnerForm.category);
      formData.append('website_link', newWinnerForm.website_link);
      formData.append('city', newWinnerForm.city);
      formData.append('description', newWinnerForm.description);
      if (newWinnerFile) formData.append('profilePicture', newWinnerFile);

      const res = await fetch(`${API_PREFIX}/api/admin/winners`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert('Winner created successfully!');
        setNewWinnerForm({ nominee_name: '', business_name: '', category: 'Tech Innovator of the Year', website_link: '', city: 'Ahmedabad', description: '' });
        setNewWinnerFile(null);
        setActiveTab('winners');
      } else {
        alert('Failed to add winner: ' + result.message);
      }
    } catch (err) {
      alert('Error creating winner.');
    }
  };

  // Add Sponsor / Partner / Jury Submit
  const handleCreateEntity = async (e, type) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('name', newEntityForm.name);
      formData.append('role', newEntityForm.role);
      formData.append('org', newEntityForm.org);
      formData.append('tags', newEntityForm.tags);
      formData.append('bio', newEntityForm.bio);
      if (newEntityFile) formData.append('profilePicture', newEntityFile);

      let endpoint = 'gallery-sponsors';
      if (type === 'partner') endpoint = 'partners';
      if (type === 'jury') endpoint = 'jury';

      const res = await fetch(`${API_PREFIX}/api/admin/${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert(`${type.toUpperCase()} added successfully!`);
        setNewEntityForm({ name: '', role: '', org: '', tags: '', bio: '' });
        setNewEntityFile(null);
        setActiveTab(type === 'sponsor' ? 'gallery-sponsors' : type === 'partner' ? 'partners' : 'jury');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      alert('Submission failed.');
    }
  };

  // Add Blog Submit
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) {
      alert('Title and content are required.');
      return;
    }
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('title', blogTitle);
      formData.append('category', blogCategory);
      formData.append('author', blogAuthor);
      formData.append('excerpt', blogExcerpt);
      formData.append('content', blogContent);
      if (blogFeaturedImage) formData.append('featured_image', blogFeaturedImage);

      const res = await fetch(`${API_PREFIX}/api/admin/blogs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert('Blog article published successfully!');
        setBlogTitle('');
        setBlogExcerpt('');
        setBlogContent('');
        setBlogFeaturedImage(null);
        setActiveTab('blogs');
      } else {
        alert('Error publishing blog: ' + result.message);
      }
    } catch (err) {
      alert('Failed to publish blog.');
    }
  };

  // YouTube Video Preview Auto-Extraction
  const handleFetchYoutubeDetails = (url) => {
    setPreviewUrl(url);
    if (!url) {
      setFetchedDetails(null);
      return;
    }

    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
      setFetchedDetails({
        youtube_id: videoId,
        youtube_title: `Fempreneur Interview (${videoId})`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      });
    } else {
      setFetchedDetails(null);
    }
  };

  // Add Voice of Fempreneur Video Submit
  const handleCreateVideo = async (e) => {
    e.preventDefault();
    if (!fetchedDetails) {
      alert('Please enter a valid YouTube video URL');
      return;
    }
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_PREFIX}/api/admin/voice-videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: customTitle || fetchedDetails.youtube_title,
          youtube_url: previewUrl,
          youtube_id: fetchedDetails.youtube_id,
          thumbnail_url: fetchedDetails.thumbnail,
          speaker_name: videoSpeaker,
          company_name: videoCompany
        })
      });
      const result = await res.json();
      if (result.success) {
        alert('Video interview link added successfully!');
        setPreviewUrl('');
        setCustomTitle('');
        setFetchedDetails(null);
        setVideoSpeaker('');
        setVideoCompany('');
        setActiveTab('voice-videos');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      alert('Failed to add video link.');
    }
  };

  // Delete Individual Record
  const handleDeleteItem = async (id, tabName, source) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      let url = `${API_PREFIX}/api/admin/${tabName}/${id}`;
      if (tabName === 'winners' && source) {
        url += `?source=${source}`;
      }

      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        alert('Deleted successfully!');
        fetchData(activeTab);
      } else {
        alert('Error deleting: ' + result.message);
      }
    } catch (err) {
      alert('Delete request failed.');
    }
  };

  const getTabTitle = () => {
    const main = mainNavItems.find(i => i.id === activeTab);
    if (main) return main.label;
    const inq = inquiryNavItems.find(i => i.id === activeTab);
    if (inq) return `Inquiries: ${inq.label}`;
    return 'Admin Dashboard';
  };

  return (
    <div className="fem-admin-wrapper">
      {/* Sidebar */}
      <aside className={`fem-admin-sidebar ${!isSidebarOpen ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="fem-admin-sidebar-header">
          <div className="fem-admin-brand">
            <img src="/fempreneur-logo.png" alt="Fempreneur" />
            {isSidebarOpen && (
              <div>
                <div className="fem-admin-brand-text">FEMPRENEUR</div>
                <div className="fem-admin-brand-badge">Admin Suite</div>
              </div>
            )}
          </div>
          <button 
            type="button" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'transparent', border: 'none', color: '#D4AF37', cursor: 'pointer', display: window.innerWidth > 1024 ? 'block' : 'none' }}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="fem-admin-sidebar-scroll">
          <div className="fem-admin-nav-group">Main Portals</div>
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

          <div className="fem-admin-nav-group" style={{ marginTop: '16px' }}>13 Inbound Form Inquiries</div>
          <ul className="fem-admin-nav-list">
            {inquiryNavItems.map(item => (
              <li
                key={item.id}
                className={`fem-admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <FileText size={16} />
                {isSidebarOpen && <span style={{ fontSize: '0.84rem' }}>{item.label}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* User Card & Logout */}
        <div className="fem-admin-user-card">
          {isSidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#D4AF37' }}>
                {user.role?.toUpperCase() || 'SUPERADMIN'}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#FCA5A5',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="fem-admin-main">
        {/* Top Sticky Header */}
        <header className="fem-admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: window.innerWidth <= 1024 ? 'block' : 'none',
                background: 'transparent',
                border: 'none',
                color: '#5E178C',
                cursor: 'pointer'
              }}
            >
              <Menu size={24} />
            </button>
            <div className="fem-admin-topbar-title">
              <h2>{getTabTitle()}</h2>
              <p>Fempreneur 2027 Centralized Management & Evaluation</p>
            </div>
          </div>

          <div className="fem-admin-topbar-actions">
            {processedData.length > 0 && !['add-winner', 'add-blog', 'add-voice-video', 'add-gallery-sponsor', 'add-partner', 'add-jury'].includes(activeTab) && (
              <>
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="fem-btn fem-btn-outline"
                  title="Mark all current rows as read"
                >
                  <CheckCircle size={16} />
                  <span>Mark All Read</span>
                </button>
                <button
                  type="button"
                  onClick={exportToCSV}
                  className="fem-btn fem-btn-gold"
                >
                  <Download size={16} />
                  <span>Export CSV</span>
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => fetchData(activeTab)}
              className="fem-btn fem-btn-outline"
              title="Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </header>

        {/* Dashboard Dynamic View Body */}
        <div className="fem-admin-content-area">
          {/* 1. ADD NEW WINNER VIEW */}
          {activeTab === 'add-winner' && (
            <div className="fem-modal-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="fem-modal-header">
                <h3 style={{ margin: 0, color: '#3B095E', fontWeight: 800 }}>Add New Winner to Hall of Fame</h3>
              </div>
              <form onSubmit={handleCreateWinner} className="fem-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Winner / Nominee Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="fem-form-control"
                      value={newWinnerForm.nominee_name}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, nominee_name: e.target.value })}
                      placeholder="e.g. Dr. Ananya Sen"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>Venture / Organization Name</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={newWinnerForm.business_name}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, business_name: e.target.value })}
                      placeholder="e.g. FemBiotech Labs"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Award Category</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={newWinnerForm.category}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, category: e.target.value })}
                      placeholder="e.g. Tech Innovator of the Year"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>City & State</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={newWinnerForm.city}
                      onChange={(e) => setNewWinnerForm({ ...newWinnerForm, city: e.target.value })}
                      placeholder="e.g. Ahmedabad, Gujarat"
                    />
                  </div>
                </div>

                <div className="fem-form-group">
                  <label>Website or LinkedIn Link</label>
                  <input 
                    type="url" 
                    className="fem-form-control"
                    value={newWinnerForm.website_link}
                    onChange={(e) => setNewWinnerForm({ ...newWinnerForm, website_link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="fem-form-group">
                  <label>Profile Picture / Photo</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="fem-form-control"
                    onChange={(e) => setNewWinnerFile(e.target.files[0])}
                  />
                </div>

                <div className="fem-form-group">
                  <label>Impact Description / Story</label>
                  <textarea 
                    rows={4}
                    className="fem-form-control"
                    value={newWinnerForm.description}
                    onChange={(e) => setNewWinnerForm({ ...newWinnerForm, description: e.target.value })}
                    placeholder="Describe their achievements, venture impact, and jury highlights..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="fem-btn fem-btn-primary">
                    <Award size={18} />
                    <span>Publish Winner Record</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. ADD SPONSOR / PARTNER / JURY VIEW */}
          {(activeTab === 'add-gallery-sponsor' || activeTab === 'add-partner' || activeTab === 'add-jury') && (
            <div className="fem-modal-box" style={{ maxWidth: '750px', margin: '0 auto' }}>
              <div className="fem-modal-header">
                <h3 style={{ margin: 0, color: '#3B095E', fontWeight: 800 }}>
                  Add {activeTab === 'add-gallery-sponsor' ? 'Sponsor' : activeTab === 'add-partner' ? 'Partner' : 'Jury Member'}
                </h3>
              </div>
              <form 
                onSubmit={(e) => handleCreateEntity(e, activeTab === 'add-gallery-sponsor' ? 'sponsor' : activeTab === 'add-partner' ? 'partner' : 'jury')} 
                className="fem-modal-body"
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Full Name / Title *</label>
                    <input 
                      type="text" 
                      required 
                      className="fem-form-control"
                      value={newEntityForm.name}
                      onChange={(e) => setNewEntityForm({ ...newEntityForm, name: e.target.value })}
                      placeholder="e.g. Radhika Menon"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>Role / Designation *</label>
                    <input 
                      type="text" 
                      required 
                      className="fem-form-control"
                      value={newEntityForm.role}
                      onChange={(e) => setNewEntityForm({ ...newEntityForm, role: e.target.value })}
                      placeholder={activeTab === 'add-jury' ? 'Managing Partner & Jury Member' : 'Title Partner / Sponsor'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Company / Organization *</label>
                    <input 
                      type="text" 
                      required 
                      className="fem-form-control"
                      value={newEntityForm.org}
                      onChange={(e) => setNewEntityForm({ ...newEntityForm, org: e.target.value })}
                      placeholder="e.g. VyapaarJagat / Peers Global"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>Tags / Badges (Optional)</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={newEntityForm.tags}
                      onChange={(e) => setNewEntityForm({ ...newEntityForm, tags: e.target.value })}
                      placeholder="e.g. Platinum Partner, DeepTech Jury"
                    />
                  </div>
                </div>

                <div className="fem-form-group">
                  <label>Photo / Logo Upload</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="fem-form-control"
                    onChange={(e) => setNewEntityFile(e.target.files[0])}
                  />
                </div>

                <div className="fem-form-group">
                  <label>Bio / Overview</label>
                  <textarea 
                    rows={3}
                    className="fem-form-control"
                    value={newEntityForm.bio}
                    onChange={(e) => setNewEntityForm({ ...newEntityForm, bio: e.target.value })}
                    placeholder="Short overview..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="fem-btn fem-btn-primary">
                    <PlusCircle size={18} />
                    <span>Save to Directory</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. ADD NEW BLOG VIEW */}
          {activeTab === 'add-blog' && (
            <div className="fem-modal-box" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="fem-modal-header">
                <h3 style={{ margin: 0, color: '#3B095E', fontWeight: 800 }}>Write & Publish Editorial Blog Article</h3>
              </div>
              <form onSubmit={handleCreateBlog} className="fem-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Article Title *</label>
                    <input 
                      type="text" 
                      required 
                      className="fem-form-control"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Top 10 Funding Strategies for Women Entrepreneurs in 2027"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>Category</label>
                    <select 
                      className="fem-form-control"
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                    >
                      <option value="Leadership">Leadership</option>
                      <option value="Funding">Funding & Investment</option>
                      <option value="MSME">MSME & Scale-Up</option>
                      <option value="Technology">Tech & Innovation</option>
                      <option value="Marketing">Growth & Marketing</option>
                      <option value="Stories">Success Stories</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Author</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      placeholder="Fempreneur Editorial Team"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>Featured Header Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="fem-form-control"
                      onChange={(e) => setBlogFeaturedImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="fem-form-group">
                  <label>Short Excerpt (Summary)</label>
                  <textarea 
                    rows={2}
                    className="fem-form-control"
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence preview..."
                  />
                </div>

                <div className="fem-form-group">
                  <label>Full Content (Rich Text Editor with Inline Images)</label>
                  <RichTextEditor 
                    value={blogContent}
                    onChange={setBlogContent}
                    placeholder="Type or paste your full editorial article here..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="submit" className="fem-btn fem-btn-primary">
                    <FileText size={18} />
                    <span>Publish Article</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. ADD VOICE OF FEMPRENEUR VIDEO LINK */}
          {activeTab === 'add-voice-video' && (
            <div className="fem-modal-box" style={{ maxWidth: '750px', margin: '0 auto' }}>
              <div className="fem-modal-header">
                <h3 style={{ margin: 0, color: '#3B095E', fontWeight: 800 }}>Add Voice of Fempreneur YouTube Interview</h3>
              </div>
              <form onSubmit={handleCreateVideo} className="fem-modal-body">
                <div className="fem-form-group">
                  <label>YouTube Video URL *</label>
                  <input 
                    type="url" 
                    required 
                    className="fem-form-control"
                    value={previewUrl}
                    onChange={(e) => handleFetchYoutubeDetails(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                {fetchedDetails && (
                  <div style={{
                    marginBottom: '20px',
                    padding: '16px',
                    background: '#FAF7FD',
                    border: '1px solid #EAE2F3',
                    borderRadius: '12px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    <img 
                      src={fetchedDetails.thumbnail} 
                      alt="Thumbnail" 
                      style={{ width: '120px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>✓ YouTube Video Verified</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#3B095E', marginTop: '4px' }}>
                        ID: {fetchedDetails.youtube_id}
                      </div>
                    </div>
                  </div>
                )}

                <div className="fem-form-group">
                  <label>Custom Display Title</label>
                  <input 
                    type="text" 
                    className="fem-form-control"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Exclusive Interview: Transforming D2C Beauty Brands in India"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fem-form-group">
                    <label>Featured Speaker Name</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={videoSpeaker}
                      onChange={(e) => setVideoSpeaker(e.target.value)}
                      placeholder="e.g. Sneha Patel"
                    />
                  </div>
                  <div className="fem-form-group">
                    <label>Company / Venture</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={videoCompany}
                      onChange={(e) => setVideoCompany(e.target.value)}
                      placeholder="e.g. Organic Pure India"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="fem-btn fem-btn-primary" disabled={!fetchedDetails}>
                    <Video size={18} />
                    <span>Embed in Video Showcase</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 5. TABLE & CONTROLS FOR ALL DATA TABS */}
          {!['add-winner', 'add-blog', 'add-voice-video', 'add-gallery-sponsor', 'add-partner', 'add-jury'].includes(activeTab) && (
            <>
              {/* Controls & Filter Toolbar */}
              <div className="fem-admin-toolbar">
                <div className="fem-admin-search-box">
                  <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9D8BAE' }} />
                  <input 
                    type="text" 
                    placeholder={`Search in ${processedData.length} records...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="fem-admin-filters">
                  {activeTab === 'nominations' && (
                    <>
                      <select 
                        className="fem-admin-select"
                        value={nominationFilter}
                        onChange={(e) => setNominationFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="winner">⭐ Winners Only</option>
                        <option value="not-winner">Non-Winners</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending Review</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      <select 
                        className="fem-admin-select"
                        value={nominationSort}
                        onChange={(e) => setNominationSort(e.target.value)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="votes-desc">Highest Votes</option>
                        <option value="votes-asc">Lowest Votes</option>
                      </select>
                    </>
                  )}

                  {(activeTab === 'membership' || activeTab === 'community-members') && (
                    <>
                      <select 
                        className="fem-admin-select"
                        value={membershipPaymentFilter}
                        onChange={(e) => setMembershipPaymentFilter(e.target.value)}
                      >
                        <option value="all">All Payments</option>
                        <option value="paid">Paid Only</option>
                        <option value="pending">Pending Payment</option>
                      </select>

                      <select 
                        className="fem-admin-select"
                        value={membershipSort}
                        onChange={(e) => setMembershipSort(e.target.value)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </>
                  )}
                </div>
              </div>

              {/* Bulk Actions Sliding Bar */}
              {selectedIds.length > 0 && (
                <div className="fem-admin-bulk-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckSquare size={20} style={{ color: '#D4AF37' }} />
                    <span style={{ fontWeight: 700 }}>{selectedIds.length} records selected</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {activeTab === 'nominations' && (
                      <>
                        <button 
                          type="button" 
                          onClick={() => handleBulkStatusUpdate('winner')} 
                          className="fem-btn fem-btn-gold" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          Mark as Winner
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleBulkStatusUpdate('approved')} 
                          className="fem-btn" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#10B981', color: '#fff' }}
                        >
                          Approve
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleBulkStatusUpdate('rejected')} 
                          className="fem-btn" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#EF4444', color: '#fff' }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      type="button" 
                      onClick={handleBulkDelete} 
                      className="fem-btn fem-btn-danger" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}

              {/* Main Data Table */}
              <div className="fem-admin-table-card">
                {isLoading ? (
                  <div className="fem-admin-empty">
                    <Loader2 className="animate-spin" size={36} style={{ color: '#5E178C', margin: '0 auto' }} />
                    <h3>Loading Data...</h3>
                  </div>
                ) : processedData.length === 0 ? (
                  <div className="fem-admin-empty">
                    <HelpCircle size={40} style={{ color: '#D4AF37', margin: '0 auto' }} />
                    <h3>No Records Found</h3>
                    <p>No entries match the current filter or search criteria.</p>
                  </div>
                ) : (
                  <table className="fem-admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedIds.length > 0 && selectedIds.length === processedData.length}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Applicant / Name</th>
                        <th>Venture / Organization</th>
                        <th>Category / Type</th>
                        <th>Location</th>
                        <th>Status / Payment</th>
                        {activeTab === 'nominations' && <th>Votes</th>}
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.map((row) => {
                        const rowKey = activeTab === 'winners' ? `${row.source}-${row.id}` : String(row.id);
                        const isSelected = selectedIds.includes(rowKey);
                        const isRead = viewedKeys.includes(`${activeTab}-${row.id}`);

                        return (
                          <tr key={rowKey} className={!isRead ? 'unread-row' : ''}>
                            <td>
                              <input 
                                type="checkbox" 
                                checked={isSelected}
                                onChange={() => handleToggleRow(rowKey)}
                              />
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {(row.profile_picture || row.photo_url) ? (
                                  <img 
                                    src={row.profile_picture || row.photo_url} 
                                    alt="" 
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                                  />
                                ) : (
                                  <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #5E178C 0%, #D4AF37 100%)',
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: '0.8rem'
                                  }}>
                                    {(row.nominee_name || row.name || row.founder_name || row.contact_name || 'F')[0]}
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontWeight: 700, color: '#2D143E' }}>
                                    {row.nominee_name || row.name || row.founder_name || row.contact_name || row.title || 'Applicant'}
                                  </div>
                                  <div style={{ fontSize: '0.75rem', color: '#7B6888' }}>
                                    {row.email || (row.created_at ? new Date(row.created_at).toLocaleDateString() : '')}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{row.business_name || row.company || row.company_name || row.organization || '—'}</div>
                              {row.designation && <div style={{ fontSize: '0.72rem', color: '#7B6888' }}>{row.designation}</div>}
                            </td>
                            <td>
                              <span style={{ fontSize: '0.82rem', color: '#5E178C', fontWeight: 600 }}>
                                {row.category || row.category_name || row.tier || row.inquiry_type || row.pass_type || 'General'}
                              </span>
                            </td>
                            <td>{row.city || row.city_hub || 'India'}</td>
                            <td>
                              {row.status === 'winner' && <span className="fem-badge fem-badge-winner">⭐ Winner</span>}
                              {row.status === 'approved' && <span className="fem-badge fem-badge-approved">Approved</span>}
                              {row.status === 'pending' && <span className="fem-badge fem-badge-pending">Pending</span>}
                              {row.status === 'rejected' && <span className="fem-badge fem-badge-rejected">Rejected</span>}
                              {!row.status && row.payment_status && (
                                <span className={`fem-badge fem-badge-${row.payment_status}`}>{row.payment_status}</span>
                              )}
                              {!row.status && !row.payment_status && (
                                <span className="fem-badge fem-badge-approved">Active</span>
                              )}
                            </td>
                            {activeTab === 'nominations' && (
                              <td style={{ fontWeight: 700, color: '#5E178C' }}>
                                {row.public_votes || 0}
                              </td>
                            )}
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedRecord(row)}
                                  className="fem-btn fem-btn-outline"
                                  style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                                  title="View Record"
                                >
                                  <Eye size={14} />
                                </button>

                                {activeTab === 'nominations' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedRecord(row);
                                      setIsEditing(true);
                                    }}
                                    className="fem-btn fem-btn-outline"
                                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                                    title="Edit"
                                  >
                                    <Edit size={14} />
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem(row.id, activeTab, row.source)}
                                  className="fem-btn fem-btn-danger"
                                  style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                                  title="Delete Record"
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
            </>
          )}
        </div>
      </main>

      {/* Record View / Edit Modal */}
      {selectedRecord && (
        <div className="fem-modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div className="fem-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="fem-modal-header">
              <div>
                <h3 style={{ margin: 0, color: '#3B095E', fontWeight: 800 }}>
                  {isEditing ? 'Edit Record' : 'Record Details'}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#7B6888' }}>
                  ID: #{selectedRecord.id} • {activeTab.toUpperCase()}
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedRecord(null)}
                style={{ background: 'transparent', border: 'none', color: '#7B6888', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="fem-modal-body">
              {isEditing ? (
                /* EDIT FORM */
                <form onSubmit={(e) => { e.preventDefault(); handleSaveNominationChanges(); }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="fem-form-group">
                      <label>Nominee Name</label>
                      <input 
                        type="text" 
                        className="fem-form-control"
                        value={editForm.nominee_name}
                        onChange={(e) => setEditForm({ ...editForm, nominee_name: e.target.value })}
                      />
                    </div>
                    <div className="fem-form-group">
                      <label>Venture / Business Name</label>
                      <input 
                        type="text" 
                        className="fem-form-control"
                        value={editForm.business_name}
                        onChange={(e) => setEditForm({ ...editForm, business_name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="fem-form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        className="fem-form-control"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                    <div className="fem-form-group">
                      <label>Phone / WhatsApp</label>
                      <input 
                        type="text" 
                        className="fem-form-control"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="fem-form-group">
                    <label>City</label>
                    <input 
                      type="text" 
                      className="fem-form-control"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    />
                  </div>

                  <div className="fem-form-group">
                    <label>Update Profile Picture</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="fem-form-control"
                      onChange={(e) => setEditFile(e.target.files[0])}
                    />
                  </div>

                  <div className="fem-form-group">
                    <label>Description / Pitch</label>
                    <textarea 
                      rows={4}
                      className="fem-form-control"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                    <button type="button" onClick={() => setIsEditing(false)} className="fem-btn fem-btn-outline">
                      Cancel
                    </button>
                    <button type="submit" className="fem-btn fem-btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                /* DETAIL VIEW */
                <div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                    {(selectedRecord.profile_picture || selectedRecord.photo_url) && (
                      <img 
                        src={selectedRecord.profile_picture || selectedRecord.photo_url} 
                        alt="" 
                        style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#3B095E', fontWeight: 800 }}>
                        {selectedRecord.nominee_name || selectedRecord.name || selectedRecord.title || selectedRecord.contact_name}
                      </h4>
                      <div style={{ color: '#7B6888', fontSize: '0.88rem' }}>
                        {selectedRecord.business_name || selectedRecord.company || selectedRecord.organization}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#FAF7FD', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#7B6888', textTransform: 'uppercase', fontWeight: 700 }}>Email</span>
                      <div style={{ fontWeight: 600, color: '#2D143E' }}>{selectedRecord.email || '—'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#7B6888', textTransform: 'uppercase', fontWeight: 700 }}>Phone</span>
                      <div style={{ fontWeight: 600, color: '#2D143E' }}>{selectedRecord.phone || '—'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#7B6888', textTransform: 'uppercase', fontWeight: 700 }}>City</span>
                      <div style={{ fontWeight: 600, color: '#2D143E' }}>{selectedRecord.city || selectedRecord.city_hub || '—'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#7B6888', textTransform: 'uppercase', fontWeight: 700 }}>Category / Tier</span>
                      <div style={{ fontWeight: 600, color: '#5E178C' }}>{selectedRecord.category || selectedRecord.tier || selectedRecord.inquiry_type || '—'}</div>
                    </div>
                  </div>

                  {selectedRecord.description && (
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#7B6888', textTransform: 'uppercase', fontWeight: 700 }}>Description / Pitch</span>
                      <p style={{ margin: '4px 0 0', lineHeight: 1.6, color: '#331A45' }}>{selectedRecord.description}</p>
                    </div>
                  )}

                  {selectedRecord.message && (
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#7B6888', textTransform: 'uppercase', fontWeight: 700 }}>Message</span>
                      <p style={{ margin: '4px 0 0', lineHeight: 1.6, color: '#331A45' }}>{selectedRecord.message}</p>
                    </div>
                  )}

                  {/* Status Toggle Buttons if in nominations */}
                  {activeTab === 'nominations' && (
                    <div style={{ borderTop: '1px solid #EAE2F3', paddingTop: '16px', marginTop: '16px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#7B6888', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                        Change Nomination Status:
                      </span>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button 
                          type="button"
                          onClick={() => handleSingleStatusUpdate(selectedRecord.id, 'winner')}
                          className="fem-btn fem-btn-gold"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          ⭐ Set as Winner
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleSingleStatusUpdate(selectedRecord.id, 'approved')}
                          className="fem-btn"
                          style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#10B981', color: '#fff' }}
                        >
                          Approve
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleSingleStatusUpdate(selectedRecord.id, 'pending')}
                          className="fem-btn"
                          style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#F59E0B', color: '#fff' }}
                        >
                          Pending
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleSingleStatusUpdate(selectedRecord.id, 'rejected')}
                          className="fem-btn"
                          style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#EF4444', color: '#fff' }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="fem-modal-footer">
              {!isEditing && activeTab === 'nominations' && (
                <button type="button" onClick={() => setIsEditing(true)} className="fem-btn fem-btn-outline">
                  <Edit size={16} />
                  <span>Edit Info</span>
                </button>
              )}
              <button type="button" onClick={() => setSelectedRecord(null)} className="fem-btn fem-btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
