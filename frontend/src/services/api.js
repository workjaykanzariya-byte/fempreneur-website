const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const ADMIN_API_ORIGIN = (import.meta.env.VITE_ADMIN_API_URL || 'https://fempreneur.club').replace(/\/$/, '');

export const resolveAdminAssetUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  if (trimmed.startsWith('/uploads/')) {
    return `${ADMIN_API_ORIGIN}${trimmed}`;
  }
  return trimmed;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('fem_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const safeFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: `Server returned status ${response.status}` };
    }

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the backend server. Please verify your connection.');
    }
    throw err;
  }
};

// 1. Nominations
export const checkDuplicateNomination = async (params) => {
  const query = new URLSearchParams(params).toString();
  return safeFetch(`${API_BASE_URL}/nominations/check-duplicate?${query}`);
};

export const submitNomination = async (nominationData) => {
  return safeFetch(`${API_BASE_URL}/nominations`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(nominationData),
  });
};

export const fetchNominations = async () => {
  return safeFetch(`${API_BASE_URL}/nominations`, {
    headers: getAuthHeaders(),
  });
};

export const fetchPublicNominations = async () => {
  return safeFetch(`${API_BASE_URL}/nominations/public`);
};

export const fetchPublicNominee = async (slugOrId) => {
  return safeFetch(`${API_BASE_URL}/nominations/public/${encodeURIComponent(slugOrId)}`);
};


// 2. Voting
export const castNomineeVote = async (voteData) => {
  return safeFetch(`${API_BASE_URL}/votes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(voteData),
  });
};

export const fetchVoteCounts = async () => {
  return safeFetch(`${API_BASE_URL}/votes/counts`);
};

// 3. Memberships
export const enrollMembership = async (membershipData) => {
  if (membershipData instanceof FormData) {
    const token = localStorage.getItem('fem_token');
    return safeFetch(`${API_BASE_URL}/memberships`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: membershipData,
    });
  }
  return safeFetch(`${API_BASE_URL}/memberships`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(membershipData),
  });
};

// 4. Events & Passes
export const registerEventPass = async (passData) => {
  return safeFetch(`${API_BASE_URL}/events/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(passData),
  });
};

// 5. Coffee Table Book Orders
export const orderCoffeeTableBook = async (orderData) => {
  return safeFetch(`${API_BASE_URL}/book/order`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
};

// 6. VyapaarJagat 1,000 Stories Drive
export const submitFounderStory = async (storyData) => {
  return safeFetch(`${API_BASE_URL}/stories/submit`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(storyData),
  });
};

export const fetchStories = async () => {
  return safeFetch(`${API_BASE_URL}/stories`);
};

// 7. Inquiries (Contact, Corporate Partner, Speaker, City Chapters)
export const submitGeneralInquiry = async (inquiryData) => {
  return safeFetch(`${API_BASE_URL}/inquiries`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(inquiryData),
  });
};

// 8. Newsletter
export const subscribeNewsletter = async (email) => {
  return safeFetch(`${API_BASE_URL}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

// 9. Auth
export const loginApi = async (credentials) => {
  return safeFetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
};

export const registerApi = async (userData) => {
  return safeFetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
};

export const getMeApi = async () => {
  return safeFetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });
};

// 10. Platform Stats
export const fetchPlatformStats = async () => {
  return safeFetch(`${API_BASE_URL}/stats`);
};

// 11. Public Winners (Synced with Admin Panel & Backend DB)
export const fetchPublicWinners = async () => {
  try {
    const res = await safeFetch(`${ADMIN_API_ORIGIN}/api/web/winners/public`);
    const rows = Array.isArray(res?.data) ? res.data : [];
    return rows.map((row) => ({
      ...row,
      photo_url: resolveAdminAssetUrl(row.photo_url),
    }));
  } catch (err) {
    console.warn('Public winners fetch fallback to static data:', err?.message || err);
    return [];
  }
};

// 12. Public Speakers & Jury (Synced with Admin Panel)
export const fetchPublicJury = async () => {
  try {
    const res = await safeFetch(`${ADMIN_API_ORIGIN}/api/web/jury/public`);
    const rows = Array.isArray(res?.data) ? res.data : [];
    return rows.map((row) => ({
      ...row,
      photo_url: resolveAdminAssetUrl(row.photo_url),
    }));
  } catch (err) {
    console.warn('Public jury fetch fallback to static data:', err?.message || err);
    return [];
  }
};

// 13. Public Sponsors (Synced with Admin Panel)
export const fetchPublicSponsors = async () => {
  try {
    const res = await safeFetch(`${ADMIN_API_ORIGIN}/api/web/sponsors/public`);
    const rows = Array.isArray(res?.data) ? res.data : [];
    return rows.map((row) => ({
      ...row,
      photo_url: resolveAdminAssetUrl(row.photo_url),
    }));
  } catch (err) {
    console.warn('Public sponsors fetch fallback to static data:', err?.message || err);
    return [];
  }
};

// 14. Public Partners (Synced with Admin Panel)
export const fetchPublicPartners = async () => {
  try {
    const res = await safeFetch(`${ADMIN_API_ORIGIN}/api/web/partners/public`);
    const rows = Array.isArray(res?.data) ? res.data : [];
    return rows.map((row) => ({
      ...row,
      photo_url: resolveAdminAssetUrl(row.photo_url),
    }));
  } catch (err) {
    console.warn('Public partners fetch fallback to static data:', err?.message || err);
    return [];
  }
};

// 15. Public Blogs (Synced with Admin Panel)
export const fetchPublicBlogs = async () => {
  try {
    const res = await safeFetch(`${ADMIN_API_ORIGIN}/api/web/blogs/public`);
    const rows = Array.isArray(res?.data) ? res.data : [];
    return rows.map((row) => ({
      ...row,
      featured_image: resolveAdminAssetUrl(row.featured_image),
    }));
  } catch (err) {
    console.warn('Public blogs fetch fallback to static data:', err?.message || err);
    return [];
  }
};

// 16. Public Voice of Fempreneur Videos (Synced with Admin Panel)
export const fetchPublicVoiceVideos = async () => {
  try {
    const res = await safeFetch(`${ADMIN_API_ORIGIN}/api/web/voice-videos/public`);
    return Array.isArray(res?.data) ? res.data : [];
  } catch (err) {
    console.warn('Public voice videos fetch fallback:', err?.message || err);
    return [];
  }
};

/**
 * Normalizes backend winner records and merges them with static winnersData
 * without duplicates. Backend records take priority for matching (name, year).
 */
export const mergeWinnersWithStatic = (dbRows = [], staticWinners = []) => {
  const normalizedDb = (Array.isArray(dbRows) ? dbRows : [])
    .filter((row) => row && row.name)
    .map((row) => {
      const year = String(row.award_year || '2026').trim();
      const category = row.category_name || row.category || row.track || 'Fempreneur Award';
      return {
        id: row.id,
        source: row.source || 'legacy',
        isDynamic: true,
        awardTitle: category,
        name: String(row.name).trim(),
        company: row.company ? String(row.company).trim() : '',
        category,
        year,
        city: row.city ? String(row.city).trim() : '',
        highlight: row.impact_text || row.description || '',
        storyUrl: row.website_link || 'https://vyapaarjagat.com',
        image: row.photo_url || '',
      };
    });

  const seen = new Set();
  const merged = [];

  for (const w of normalizedDb) {
    const key = `${w.name.toLowerCase()}::${w.year}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(w);
    }
  }

  for (const w of staticWinners) {
    const name = String(w.name || '').trim();
    const year = String(w.year || '').trim();
    const key = `${name.toLowerCase()}::${year}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(w);
    }
  }

  return merged;
};

// 12. Public Speakers (Synced with Admin Panel & Backend DB)
export const fetchPublicSpeakers = async () => {
  try {
    const res = await safeFetch(`${API_BASE_URL}/web/speakers/public`);
    return Array.isArray(res?.data) ? res.data : [];
  } catch (err) {
    console.warn('Public speakers fetch error:', err?.message || err);
    return [];
  }
};
