import React, { useState, useEffect } from 'react';
import { Search, Vote, Share2, CheckCircle2, ShieldCheck, Heart, Sparkles, MessageCircle, Globe } from 'lucide-react';
import { PageHeader, CTAButton } from '../components';
import { castNomineeVote, fetchVoteCounts } from '../services/api';

export default function VotingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [votedNominees, setVotedNominees] = useState({});
  const [modalNominee, setModalNominee] = useState(null);
  const [voterEmail, setVoterEmail] = useState('');
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [liveCounts, setLiveCounts] = useState({});

  useEffect(() => {
    fetchVoteCounts()
      .then((res) => {
        if (res.data) setLiveCounts(res.data);
      })
      .catch((err) => console.log('Vote counts offline:', err));
  }, []);

  const nominees = [
    {
      id: 'nom-1',
      slug: 'priyanshi-shah-aarya-designs',
      founderName: 'Priyanshi Shah',
      companyName: 'Aarya Spatial Innovations',
      category: 'Innovation & Technology Leader',
      city: 'Ahmedabad, Gujarat',
      votes: 1420,
      pitch: 'Pioneering accessible modular architecture using locally sourced sustainable composites.',
    },
    {
      id: 'nom-2',
      slug: 'dr-ananya-sen-biohealth',
      founderName: 'Dr. Ananya Sen',
      companyName: 'Nova BioCare Solutions',
      category: 'Healthcare & Wellness Entrepreneur',
      city: 'Delhi NCR',
      votes: 1890,
      pitch: 'Developing early diagnostic screening kits tailored for women in Tier 2 and Tier 3 communities.',
    },
    {
      id: 'nom-3',
      slug: 'radhika-menon-craftroots',
      founderName: 'Radhika Menon',
      companyName: 'Virasat Artisan Guild',
      category: 'Social Impact Venture',
      city: 'National / Kerala & Gujarat',
      votes: 1110,
      pitch: 'Connecting 1,200 rural female handloom artisans directly with premium global retail buyers.',
    },
    {
      id: 'nom-4',
      slug: 'sneha-patel-greenpack',
      founderName: 'Sneha Patel',
      companyName: 'EcoVerve Packaging',
      category: 'Women-Led MSME of the Year',
      city: 'Ahmedabad Hub',
      votes: 980,
      pitch: 'Manufacturing biodegradable alternatives to single-use industrial plastics with 100% female staff.',
    },
  ];

  const [voteLoading, setVoteLoading] = useState(false);

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    if (!voterEmail || !modalNominee) return;
    setVoteError(null);
    setVoteLoading(true);

    try {
      const res = await castNomineeVote({
        nomineeSlug: modalNominee.slug,
        nomineeName: modalNominee.founderName,
        category: modalNominee.category,
        voterEmail: voterEmail.trim(),
      });

      const updatedTotal = res.data?.totalVotes || (modalNominee.votes + 1);

      setVotedNominees((prev) => ({
        ...prev,
        [modalNominee.id]: updatedTotal,
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

  const handleShare = (nominee, platform) => {
    const shareUrl = `${window.location.origin}/vote/${nominee.slug}`;
    const text = `Vote for ${nominee.founderName} (${nominee.companyName}) in Fempreneur Awards 2027! 50% public vote counts toward their victory:`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else {
      navigator.clipboard?.writeText(shareUrl);
      alert('Nominee voting link copied to clipboard!');
    }
  };

  return (
    <div>
      <PageHeader
        badge="Public Voting Window"
        title="Vote for Your"
        highlight="Fempreneur 2027"
        description="Public voting accounts for 50% of each nominee's final award score. Support your favorite women entrepreneurs and help amplify their impact."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Awards', path: '/awards' }, { label: 'Public Voting' }]}
        ctaText="Nominate for Award"
        ctaTo="/nominate"
      />

      <section className="section-spacing" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {/* Integrity & Fraud Control Guarantee Strip */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={22} color="var(--color-burgundy)" />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Vote Integrity Active:</strong> 1 verified vote per authenticated email session. Automated bot suppression and IP rate-limiting enforced.
              </div>
            </div>
            <span className="badge badge-gold">50% Community Weight</span>
          </div>

          {/* Search & Nominees Grid */}
          <div className="grid grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {nominees.map((nom) => {
              const currentVoteCount = votedNominees[nom.id] || nom.votes;
              const hasVoted = Boolean(votedNominees[nom.id]);

              return (
                <div
                  key={nom.id}
                  className="fem-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '2rem',
                    border: hasVoted ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <span className="badge badge-plum" style={{ fontSize: '0.72rem', marginBottom: '0.4rem' }}>
                        {nom.category}
                      </span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginTop: '0.2rem' }}>
                        {nom.founderName}
                      </h3>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                        {nom.companyName}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-plum-deep)', lineHeight: 1 }}>
                        {currentVoteCount.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold-rich)', fontWeight: 700 }}>
                        Verified Votes
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                    {nom.pitch}
                  </p>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    <strong>Region:</strong> {nom.city}
                  </div>

                  {/* Voting and Social Sharing Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
                    <CTAButton
                      onClick={() => setModalNominee(nom)}
                      variant={hasVoted ? 'gold' : 'primary'}
                      size="sm"
                      icon={Vote}
                      disabled={hasVoted}
                    >
                      {hasVoted ? 'Vote Recorded ✓' : 'Vote for Nominee'}
                    </CTAButton>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => handleShare(nom, 'whatsapp')}
                        title="Share on WhatsApp"
                        style={{ padding: '0.45rem', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}
                      >
                        <MessageCircle size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(nom, 'linkedin')}
                        title="Share on LinkedIn"
                        style={{ padding: '0.45rem', borderRadius: '50%', background: 'rgba(10, 102, 194, 0.1)', color: '#0A66C2' }}
                      >
                        <Globe size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(nom, 'copy')}
                        title="Copy Shareable Link"
                        style={{ padding: '0.45rem', borderRadius: '50%', background: 'rgba(109, 27, 68, 0.08)', color: 'var(--color-burgundy)' }}
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voting Modal */}
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
                  Your vote for {modalNominee.founderName} has been officially recorded. Thank you for championing women leaders!
                </p>
              </div>
            ) : (
              <form onSubmit={handleVoteSubmit}>
                <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                  Verify Vote
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-plum-deep)', marginBottom: '0.5rem' }}>
                  Vote for {modalNominee.founderName}
                </h3>
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

                <div className="form-group">
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
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
    </div>
  );
}
