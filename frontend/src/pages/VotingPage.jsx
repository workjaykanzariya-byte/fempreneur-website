import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import {
  Search,
  Vote,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Globe,
  Download,
  Award,
  Trophy,
  ArrowRight,
  X,
  Copy,
  ExternalLink,
  Filter,
  AlertCircle
} from 'lucide-react';
import { PageHeader, CTAButton, FempreneurAwardCreative } from '../components';
import {
  castNomineeVote,
  fetchVoteCounts,
  fetchPublicNominations,
  fetchPublicNominee,
} from '../services/api';

const DEFAULT_NOMINEES = [
  {
    id: 'sample-1',
    dbId: null,
    slug: 'priyanshi-shah-aarya-designs',
    founderName: 'Priyanshi Shah',
    companyName: 'Aarya Spatial Innovations',
    category: 'Innovation & Technology Leader',
    track: 'rated',
    city: 'Ahmedabad, Gujarat',
    votes: 1420,
    pitch: 'Pioneering accessible modular architecture using locally sourced sustainable composites.',
    photo: '/images/entrepreneurs/priyanshi-shah.jpg?v=2',
    nominationId: 'FEM-2027-0101',
    votingUrl: '/voting?nominee=priyanshi-shah-aarya-designs',
  },
  {
    id: 'sample-2',
    dbId: null,
    slug: 'dr-ananya-sen-biohealth',
    founderName: 'Dr. Ananya Sen',
    companyName: 'Nova BioCare Solutions',
    category: 'Healthcare & Wellness Entrepreneur',
    track: 'rated',
    city: 'Delhi NCR',
    votes: 1890,
    pitch: 'Developing early diagnostic screening kits tailored for women in Tier 2 and Tier 3 communities.',
    photo: '/images/entrepreneurs/dr-ananya-sen.jpg?v=2',
    nominationId: 'FEM-2027-0102',
    votingUrl: '/voting?nominee=dr-ananya-sen-biohealth',
  },
  {
    id: 'sample-3',
    dbId: null,
    slug: 'radhika-menon-craftroots',
    founderName: 'Radhika Menon',
    companyName: 'Virasat Artisan Guild',
    category: 'Social Impact Venture',
    track: 'honorary',
    city: 'National / Kerala & Gujarat',
    votes: 1110,
    pitch: 'Connecting 1,200 rural female handloom artisans directly with premium global retail buyers.',
    photo: '/images/entrepreneurs/radhika-menon.jpg',
    nominationId: 'FEM-2027-0103',
    votingUrl: '/voting?nominee=radhika-menon-craftroots',
  },
  {
    id: 'sample-4',
    dbId: null,
    slug: 'sneha-patel-greenpack',
    founderName: 'Sneha Patel',
    companyName: 'EcoVerve Packaging',
    category: 'Women-Led MSME of the Year',
    track: 'rated',
    city: 'Ahmedabad Hub',
    votes: 980,
    pitch: 'Manufacturing biodegradable alternatives to single-use industrial plastics with 100% female staff.',
    photo: '/images/entrepreneurs/sneha-patel.jpg',
    nominationId: 'FEM-2027-0104',
    votingUrl: '/voting?nominee=sneha-patel-greenpack',
  },
];

export default function VotingPage() {
  const [searchParams] = useSearchParams();
  const { slug: routeSlug } = useParams();
  const targetSlug = routeSlug || searchParams.get('nominee');

  const [nomineesList, setNomineesList] = useState(DEFAULT_NOMINEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [votedNominees, setVotedNominees] = useState({});
  const [modalNominee, setModalNominee] = useState(null);
  const [creativeModalNominee, setCreativeModalNominee] = useState(null);
  const [spotlightNominee, setSpotlightNominee] = useState(null);

  // Voting form states
  const [voterEmail, setVoterEmail] = useState('');
  const [spotlightEmail, setSpotlightEmail] = useState('');
  const [voteLoading, setVoteLoading] = useState(false);
  const [spotlightVoteLoading, setSpotlightVoteLoading] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [spotlightVoteSuccess, setSpotlightVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [spotlightVoteError, setSpotlightVoteError] = useState(null);

  const spotlightRef = useRef(null);

  // 1. Fetch live nominations from database & merge
  useEffect(() => {
    const loadLiveNominations = async () => {
      try {
        const res = await fetchPublicNominations();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const dbNominees = res.data.map((row) => {
            const cleanSlug = (row.nominee_name || 'nominee')
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '-')
              .replace(/-+/g, '-');
            const fallbackSlug = `${cleanSlug}-${String(row.id).slice(-4)}`;
            const votingSlug = row.voting_url ? row.voting_url.split('nominee=')[1] || cleanSlug : fallbackSlug;

            return {
              id: `db-${row.id}`,
              dbId: row.id,
              slug: votingSlug || cleanSlug,
              founderName: row.nominee_name || row.founder_name,
              companyName: row.business_name || row.venture_name,
              category: row.category_name || row.category_code,
              track: row.track || 'honorary',
              city: row.city || 'Ahmedabad & Mumbai',
              votes: parseInt(row.public_votes || 0, 10),
              pitch: row.description || row.pitch || 'Dedicated woman entrepreneur nominated for Fempreneur Awards 2027.',
              photo: row.profile_picture || null,
              businessLogo: row.business_logo || null,
              nominationId: `FEM-2027-${String(row.id).padStart(4, '0')}`,
              votingUrl: row.voting_url || `/voting?nominee=${votingSlug}`,
            };
          });

          // Combine DB nominees with default showcase nominees
          setNomineesList([...dbNominees, ...DEFAULT_NOMINEES]);
        }
      } catch (err) {
        console.warn('Could not load live public nominations:', err.message);
      }
    };

    loadLiveNominations();
  }, []);

  // 2. Fetch live vote counts
  useEffect(() => {
    fetchVoteCounts()
      .then((res) => {
        if (res?.data) {
          setVotedNominees((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch((err) => console.warn('Vote counts offline:', err.message));
  }, []);

  // 3. Resolve spotlight nominee when targetSlug is provided via URL
  useEffect(() => {
    if (!targetSlug) return;

    const cleanTarget = targetSlug.toLowerCase().trim();

    // Check in existing list first
    const found = nomineesList.find((n) => {
      const nomSlug = (n.slug || '').toLowerCase();
      const nomNameSlug = (n.founderName || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
      return (
        nomSlug === cleanTarget ||
        nomSlug.includes(cleanTarget) ||
        cleanTarget.includes(nomSlug) ||
        nomNameSlug.includes(cleanTarget) ||
        String(n.dbId) === cleanTarget
      );
    });

    if (found) {
      setSpotlightNominee(found);
      setTimeout(() => {
        spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
    } else {
      // Fetch directly from public nominee endpoint
      fetchPublicNominee(cleanTarget)
        .then((res) => {
          if (res?.data) {
            const row = res.data;
            const singleNom = {
              id: `db-${row.id}`,
              dbId: row.id,
              slug: targetSlug,
              founderName: row.nominee_name || row.founder_name,
              companyName: row.business_name || row.venture_name,
              category: row.category_name || row.category_code,
              track: row.track || 'honorary',
              city: row.city || 'Ahmedabad & Mumbai',
              votes: parseInt(row.public_votes || 0, 10),
              pitch: row.description || row.pitch || 'Dedicated woman entrepreneur nominated for Fempreneur Awards 2027.',
              photo: row.profile_picture || null,
              businessLogo: row.business_logo || null,
              nominationId: `FEM-2027-${String(row.id).padStart(4, '0')}`,
              votingUrl: row.voting_url || `/voting?nominee=${targetSlug}`,
            };
            setSpotlightNominee(singleNom);
            setNomineesList((prev) => [singleNom, ...prev]);
            setTimeout(() => {
              spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 250);
          }
        })
        .catch((err) => console.warn('Spotlight fetch error:', err.message));
    }
  }, [targetSlug, nomineesList.length]);

  // Modal Vote Handler
  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    if (!voterEmail || !modalNominee) return;
    setVoteError(null);
    setVoteLoading(true);

    try {
      const res = await castNomineeVote({
        nomineeId: modalNominee.dbId,
        nomineeSlug: modalNominee.slug,
        nomineeName: modalNominee.founderName,
        category: modalNominee.category,
        voterEmail: voterEmail.trim(),
      });

      const updatedTotal = res.data?.totalVotes || modalNominee.votes + 1;
      setVotedNominees((prev) => ({
        ...prev,
        [modalNominee.id]: updatedTotal,
        [modalNominee.dbId]: updatedTotal,
      }));

      setVoteSuccess(true);
      setVoteLoading(false);

      setTimeout(() => {
        setVoteSuccess(false);
        setModalNominee(null);
        setVoterEmail('');
      }, 2000);
    } catch (err) {
      setVoteLoading(false);
      setVoteError(err.message || 'Error recording vote. You may have already cast a vote for this nominee.');
    }
  };

  // Direct Spotlight Vote Handler
  const handleSpotlightVoteSubmit = async (e) => {
    e.preventDefault();
    if (!spotlightEmail || !spotlightNominee) return;
    setSpotlightVoteError(null);
    setSpotlightVoteLoading(true);

    try {
      const res = await castNomineeVote({
        nomineeId: spotlightNominee.dbId,
        nomineeSlug: spotlightNominee.slug,
        nomineeName: spotlightNominee.founderName,
        category: spotlightNominee.category,
        voterEmail: spotlightEmail.trim(),
      });

      const updatedTotal = res.data?.totalVotes || spotlightNominee.votes + 1;
      setVotedNominees((prev) => ({
        ...prev,
        [spotlightNominee.id]: updatedTotal,
        [spotlightNominee.dbId]: updatedTotal,
      }));

      // Update spotlight nominee's local vote count
      setSpotlightNominee((prev) => ({ ...prev, votes: updatedTotal }));

      setSpotlightVoteSuccess(true);
      setSpotlightVoteLoading(false);
      setSpotlightEmail('');

      setTimeout(() => {
        setSpotlightVoteSuccess(false);
      }, 4000);
    } catch (err) {
      setSpotlightVoteLoading(false);
      setSpotlightVoteError(err.message || 'You have already recorded a verified vote for this nominee.');
    }
  };

  const handleShare = (nominee, platform) => {
    const rawPath = nominee.votingUrl || `/voting?nominee=${nominee.slug}`;
    const shareUrl = rawPath.startsWith('http')
      ? rawPath
      : `${window.location.origin}${rawPath.startsWith('/') ? '' : '/'}${rawPath}`;

    const text = nominee.track === 'rated'
      ? `Vote for ${nominee.founderName} (${nominee.companyName}) in Fempreneur Awards 2027! 50% public voting counts toward their final award score:`
      : `Support ${nominee.founderName} (${nominee.companyName}), official Honorary Nominee for Fempreneur Awards 2027!`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else {
      navigator.clipboard?.writeText(shareUrl);
      alert('Nominee voting link copied to clipboard!');
    }
  };

  // Filter Nominees
  const filteredNominees = nomineesList.filter((nom) => {
    const matchesSearch =
      nom.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nom.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nom.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      nom.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const categoriesList = [
    'All',
    'Woman Entrepreneur of the Year',
    'Innovation & Technology Leader',
    'Healthcare & Wellness Entrepreneur',
    'Social Impact Venture',
    'Women-Led MSME of the Year',
    'Emerging Woman Entrepreneur',
    'Startup Founder of the Year',
  ];

  return (
    <div>
      <PageHeader
        badge="Public Voting Window"
        title="Vote for Your"
        highlight="Fempreneur 2027"
        description="Public voting accounts for 50% of each nominee's final score in the Rated Challenge. Support your favorite women entrepreneurs, explore their official award creatives, and help amplify their impact."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Awards', path: '/awards' }, { label: 'Public Voting' }]}
        ctaText="Nominate for Award"
        ctaTo="/awards/apply"
        image="/images/voting/voting-public-support.jpg"
        imageAlt="Vote for Your Fempreneur 2027 Community Support"
        imageBadge="50% Verified Public Voting"
        imageMaxWidth="560px"
        imageMaxHeight="440px"
      />

      {/* ========================================================================= */}
      {/* NOMINEE SPOTLIGHT SECTION (SHOWN WHEN OPENED DIRECTLY VIA UNIQUE LINK)     */}
      {/* ========================================================================= */}
      {spotlightNominee && (
        <section
          ref={spotlightRef}
          style={{
            background: 'linear-gradient(180deg, #1C032C 0%, #2A0642 50%, #170225 100%)',
            color: '#FFFFFF',
            paddingTop: '3.5rem',
            paddingBottom: '4.5rem',
            borderBottom: '2px solid rgba(212, 175, 55, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Lighting Orbs */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233, 30, 99, 0.22) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            
            {/* Top Close / Return Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#F5D77F', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Sparkles size={16} />
                <span>Nominee Spotlight &amp; Verified Voting Page</span>
              </div>

              <button
                type="button"
                onClick={() => setSpotlightNominee(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              >
                <X size={14} />
                <span>Browse All Nominees</span>
              </button>
            </div>

            {/* Spotlight Grid: Creative Card on Left, Details & Direct Vote on Right */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Official Award Creative with Download Button */}
              <div>
                <FempreneurAwardCreative
                  nomineeName={spotlightNominee.founderName}
                  businessName={spotlightNominee.companyName}
                  category={spotlightNominee.category}
                  track={spotlightNominee.track}
                  nominationId={spotlightNominee.nominationId}
                  profilePicture={spotlightNominee.photo}
                  businessLogo={spotlightNominee.businessLogo}
                  votingUrl={
                    spotlightNominee.votingUrl?.startsWith('http')
                      ? spotlightNominee.votingUrl
                      : `${window.location.origin}${spotlightNominee.votingUrl?.startsWith('/') ? '' : '/'}${spotlightNominee.votingUrl}`
                  }
                  city={spotlightNominee.city}
                  showActions={true}
                />
              </div>

              {/* Right Column: Profile Dossier & Direct Voting Form */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '24px',
                  padding: '2.25rem',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Category & Verified Vote Count */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.4rem 1rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(90deg, #6A1B9A 0%, #E91E63 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      border: '1px solid #F5D77F',
                    }}
                  >
                    {spotlightNominee.category}
                  </span>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 900, color: '#F5D77F', lineHeight: 1 }}>
                      {((votedNominees[spotlightNominee.id] || votedNominees[spotlightNominee.dbId]) || spotlightNominee.votes).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#D1C4E9', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
                      Verified Votes
                    </div>
                  </div>
                </div>

                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    margin: '0 0 0.35rem 0',
                    lineHeight: 1.2,
                  }}
                >
                  {spotlightNominee.founderName}
                </h1>

                <div style={{ fontSize: '1.05rem', color: '#F5D77F', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {spotlightNominee.companyName}
                </div>

                <p style={{ fontSize: '0.95rem', color: '#E0D0EB', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {spotlightNominee.pitch}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.84rem', color: '#D1C4E9', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div>
                    <strong style={{ color: '#F5D77F' }}>Region:</strong> {spotlightNominee.city}
                  </div>
                  <div>
                    <strong style={{ color: '#F5D77F' }}>Track:</strong>{' '}
                    <span style={{ textTransform: 'capitalize' }}>
                      {spotlightNominee.track === 'rated' ? 'Rated Challenge (50% Public Votes)' : 'Honorary Recognition'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#F5D77F' }}>Nomination ID:</strong> {spotlightNominee.nominationId}
                  </div>
                </div>

                {/* Direct Vote Box */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1.5px solid rgba(233, 30, 99, 0.35)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                    🗳️ Cast Your Verified Vote for {spotlightNominee.founderName}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#D1C4E9', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
                    To ensure 100% authenticity and prevent bot manipulation, please enter your email address to record your verified vote.
                  </p>

                  {spotlightVoteSuccess ? (
                    <div
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1.5px solid #10B981',
                        color: '#6EE7B7',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <CheckCircle2 size={20} />
                      <span>Thank you! Your verified vote has been officially recorded.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSpotlightVoteSubmit}>
                      {spotlightVoteError && (
                        <div
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid #EF4444',
                            color: '#FCA5A5',
                            fontSize: '0.84rem',
                            marginBottom: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                          }}
                        >
                          <AlertCircle size={16} />
                          <span>{spotlightVoteError}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <input
                          type="email"
                          required
                          value={spotlightEmail}
                          onChange={(e) => setSpotlightEmail(e.target.value)}
                          placeholder="Enter your email to verify vote"
                          style={{
                            flex: 1,
                            minWidth: '220px',
                            padding: '0.85rem 1rem',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(255, 255, 255, 0.25)',
                            background: '#FFFFFF',
                            color: '#1C1224',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />

                        <button
                          type="submit"
                          disabled={spotlightVoteLoading}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.85rem 1.6rem',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 50%, #6A1B9A 100%)',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            border: 'none',
                            cursor: spotlightVoteLoading ? 'wait' : 'pointer',
                            boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Vote size={18} />
                          <span>{spotlightVoteLoading ? 'Verifying...' : 'Vote Now'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Quick Share Strip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: '#D1C4E9', fontWeight: 600 }}>Share this campaign:</span>
                  <button
                    type="button"
                    onClick={() => handleShare(spotlightNominee, 'whatsapp')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      background: '#25D366',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare(spotlightNominee, 'linkedin')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      background: '#0A66C2',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Globe size={14} />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare(spotlightNominee, 'copy')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                    }}
                  >
                    <Copy size={14} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* ALL NOMINEES PUBLIC DIRECTORY                                             */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          
          {/* Integrity & Fraud Control Guarantee Strip */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={26} color="var(--color-burgundy)" />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--color-plum-deep)' }}>Verified Voting Protocol Active:</strong> 1 authenticated vote per email address. Real-time rate limiting and jury audit verification applied.
              </div>
            </div>
            <span className="badge badge-gold" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              50% Public Voting Weight
            </span>
          </div>

          {/* Search Bar & Category Filter Bar */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="text"
                  placeholder="Search nominee by name, company, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.75rem',
                    borderRadius: '12px',
                    border: '1.5px solid #E5E7EB',
                    background: '#FAF7FC',
                    fontSize: '0.92rem',
                    color: '#1C1224',
                    outline: 'none',
                  }}
                />
              </div>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{ padding: '0.85rem 1.25rem', borderRadius: '10px', background: '#F3F4F6', border: 'none', color: '#4B5563', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categoriesList.map((cat, idx) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: isSelected ? '1.5px solid #6A1B9A' : '1px solid #E5E7EB',
                      background: isSelected ? 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#4B5563',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(106, 27, 154, 0.2)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nominees Grid */}
          {filteredNominees.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FAF7FC', borderRadius: '18px', border: '1px dashed #D8B4FE' }}>
              <AlertCircle size={36} color="#6A1B9A" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1224', marginBottom: '0.35rem' }}>No Nominees Found</h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                We could not find any active nominees matching your filter criteria. Try searching with a different keyword or category.
              </p>
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: '#6A1B9A', color: '#FFFFFF', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {filteredNominees.map((nom) => {
                const currentVoteCount = (votedNominees[nom.id] || votedNominees[nom.dbId]) || nom.votes;
                const hasVoted = Boolean(votedNominees[nom.id] || votedNominees[nom.dbId]);

                return (
                  <div
                    key={nom.id}
                    className="fem-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: '1.75rem',
                      border: hasVoted ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)',
                      position: 'relative',
                    }}
                  >
                    {/* Top Bar: Category & Verified Votes */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.65rem', marginBottom: '1.25rem' }}>
                      <span className="badge badge-plum" style={{ fontSize: '0.72rem', maxWidth: '65%', lineHeight: 1.3 }}>
                        {nom.category}
                      </span>

                      <div style={{ textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-plum-deep)', lineHeight: 1 }}>
                          {currentVoteCount.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gold-rich)', fontWeight: 700, marginTop: '0.2rem' }}>
                          Verified Votes
                        </div>
                      </div>
                    </div>

                    {/* Woman Entrepreneur Photo + Details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.25rem' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        {nom.photo ? (
                          <img
                            src={nom.photo}
                            alt={`${nom.founderName} - ${nom.companyName}`}
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '18px',
                              objectFit: 'cover',
                              border: '2.5px solid var(--color-burgundy)',
                              boxShadow: '0 6px 18px rgba(106, 27, 154, 0.16)',
                              display: 'block',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '18px',
                              background: 'linear-gradient(135deg, #6A1B9A 0%, #2E0848 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontSize: '1.6rem',
                              fontWeight: 900,
                              color: '#F5D77F',
                              border: '2.5px solid var(--color-burgundy)',
                            }}
                          >
                            {(nom.founderName || 'F')[0]}
                          </div>
                        )}
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0, lineHeight: 1.25 }}>
                          {nom.founderName}
                        </h3>
                        <div style={{ fontSize: '0.92rem', color: 'var(--color-burgundy)', fontWeight: 600, marginTop: '0.25rem' }}>
                          {nom.companyName}
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {nom.pitch}
                    </p>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span><strong>Region:</strong> {nom.city}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6A1B9A', fontWeight: 700 }}>{nom.nominationId}</span>
                    </div>

                    {/* Creative Button & Vote CTA */}
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.85rem' }}>
                      <button
                        type="button"
                        onClick={() => setCreativeModalNominee(nom)}
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          background: '#FAF5FC',
                          border: '1.5px solid #E9D5FF',
                          color: '#6A1B9A',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F3E8FF')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#FAF5FC')}
                      >
                        <Award size={15} />
                        <span>View Creative</span>
                      </button>

                      <CTAButton
                        onClick={() => setModalNominee(nom)}
                        variant={hasVoted ? 'gold' : 'primary'}
                        size="sm"
                        icon={Vote}
                        disabled={hasVoted}
                        style={{ flex: 1.2 }}
                      >
                        {hasVoted ? 'Vote Recorded ✓' : 'Vote for Nominee'}
                      </CTAButton>
                    </div>

                    {/* Social Sharing Toolbar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.74rem', color: '#9CA3AF', fontWeight: 600 }}>Share to support:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => handleShare(nom, 'whatsapp')}
                          title="Share on WhatsApp"
                          style={{ padding: '0.45rem', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', border: 'none', cursor: 'pointer' }}
                        >
                          <MessageCircle size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShare(nom, 'linkedin')}
                          title="Share on LinkedIn"
                          style={{ padding: '0.45rem', borderRadius: '50%', background: 'rgba(106, 27, 154, 0.08)', color: '#0A66C2', border: 'none', cursor: 'pointer' }}
                        >
                          <Globe size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShare(nom, 'copy')}
                          title="Copy Shareable Link"
                          style={{ padding: '0.45rem', borderRadius: '50%', background: 'rgba(106, 27, 154, 0.08)', color: 'var(--color-burgundy)', border: 'none', cursor: 'pointer' }}
                        >
                          <Share2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VOTE MODAL                                                                */}
      {/* ========================================================================= */}
      {modalNominee && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-overlay)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div className="fem-card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem', position: 'relative' }}>
            {voteSuccess ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <CheckCircle2 size={48} color="var(--color-gold-rich)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>Vote Verified!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Your vote for <strong>{modalNominee.founderName}</strong> has been officially recorded. Thank you for championing women leaders!
                </p>
              </div>
            ) : (
              <form onSubmit={handleVoteSubmit}>
                <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                  Verify Vote
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.75rem 0 1.25rem' }}>
                  {modalNominee.photo ? (
                    <img
                      src={modalNominee.photo}
                      alt={modalNominee.founderName}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        border: '2px solid var(--color-burgundy)',
                        boxShadow: '0 4px 12px rgba(106, 27, 154, 0.15)',
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #6A1B9A 0%, #2E0848 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        color: '#F5D77F',
                      }}
                    >
                      {(modalNominee.founderName || 'F')[0]}
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', margin: 0, lineHeight: 1.25 }}>
                      Vote for {modalNominee.founderName}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: 'var(--color-burgundy)', fontWeight: 600, marginTop: '0.2rem' }}>
                      {modalNominee.companyName}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Please enter your email address to authenticate your vote. To prevent automated manipulation, each voter may cast one verified vote per nominee.
                </p>

                {voteError && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--color-coral-soft)',
                      border: '1px solid rgba(224, 93, 93, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {voteError}
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="voterEmail">Your Email Address *</label>
                  <input
                    id="voterEmail"
                    type="email"
                    required
                    value={voterEmail}
                    onChange={(e) => setVoterEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <CTAButton type="button" onClick={() => setModalNominee(null)} variant="ghost" size="sm" disabled={voteLoading}>
                    Cancel
                  </CTAButton>
                  <CTAButton type="submit" variant="primary" size="md" disabled={voteLoading}>
                    {voteLoading ? 'Recording Vote...' : 'Confirm & Cast Vote'}
                  </CTAButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATIVE MODAL (OPENED WHEN USER CLICKS "VIEW CREATIVE")                   */}
      {/* ========================================================================= */}
      {creativeModalNominee && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 2, 25, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: '1.5rem',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              maxWidth: '580px',
              width: '100%',
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#6A1B9A', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <Sparkles size={16} style={{ color: '#E91E63' }} />
                <span>Nominee Award Creative</span>
              </div>
              <button
                type="button"
                onClick={() => setCreativeModalNominee(null)}
                style={{
                  background: '#F3F4F6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#4B5563',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Embedded Creative Component */}
            <FempreneurAwardCreative
              nomineeName={creativeModalNominee.founderName}
              businessName={creativeModalNominee.companyName}
              category={creativeModalNominee.category}
              track={creativeModalNominee.track}
              nominationId={creativeModalNominee.nominationId}
              profilePicture={creativeModalNominee.photo}
              businessLogo={creativeModalNominee.businessLogo}
              votingUrl={
                creativeModalNominee.votingUrl?.startsWith('http')
                  ? creativeModalNominee.votingUrl
                  : `${window.location.origin}${creativeModalNominee.votingUrl?.startsWith('/') ? '' : '/'}${creativeModalNominee.votingUrl}`
              }
              city={creativeModalNominee.city}
              showActions={true}
              compact={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
