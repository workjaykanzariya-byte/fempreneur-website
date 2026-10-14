import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout & Global Components
import { Navbar, Footer, ScrollToTop, EmptyState } from './components';

// Lightweight, Non-Intrusive Page Loading Indicator
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '3px solid rgba(106, 27, 154, 0.15)',
            borderTopColor: '#6A1B9A',
            animation: 'fem-spin 0.75s linear infinite',
          }}
        />
        <span
          style={{
            fontSize: '0.82rem',
            color: '#6A1B9A',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          Loading...
        </span>
      </div>
    </div>
  );
}

// Lazy-Loaded Page Components (Optimized for instant initial render & fast routing)
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AwardsPage = lazy(() => import('./pages/AwardsPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const NominatePage = lazy(() => import('./pages/NominatePage'));
const ApplyPage = lazy(() => import('./pages/ApplyPage'));
const VotingPage = lazy(() => import('./pages/VotingPage'));
const WinnersPage = lazy(() => import('./pages/WinnersPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const SpeakersPage = lazy(() => import('./pages/SpeakersPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const StoryDrivePage = lazy(() => import('./pages/StoryDrivePage'));
const CityChaptersPage = lazy(() => import('./pages/CityChaptersPage'));
const DirectoryPage = lazy(() => import('./pages/DirectoryPage'));
const MembershipPage = lazy(() => import('./pages/MembershipPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// 404 Fallback Page
function NotFoundPage() {
  return (
    <div style={{ padding: '4rem 1rem', background: '#FFFFFF', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container-narrow">
        <EmptyState
          badge="404 Error"
          title="Page Not Found"
          description="The page you are looking for does not exist or has been relocated within the Fempreneur platform."
          actionText="Return to Homepage"
          actionTo="/"
        />
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/web" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* Core Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Awards & Evaluation Track */}
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/awards/apply" element={<ApplyPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/nominate" element={<NominatePage />} />
          <Route path="/nominate/apply" element={<Navigate to="/awards/apply" replace />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/winners" element={<WinnersPage />} />

          {/* Events & Dual-City Hubs */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/city-chapters" element={<CityChaptersPage />} />

          {/* Community & Network */}
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/community-hub" element={<MembershipPage />} />
          <Route path="/story-drive" element={<StoryDrivePage />} />
          <Route path="/voice-of-fempreneur" element={<StoryDrivePage />} />

          {/* Media & Partnerships */}
          <Route path="/coffee-table-book" element={<BookPage />} />
          <Route path="/book" element={<Navigate to="/coffee-table-book" replace />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/sponsors" element={<Navigate to="/partners" replace />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/impact" element={<ImpactPage />} />

          {/* Inbound & Support */}
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
