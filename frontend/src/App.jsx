import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Global Components
import { Navbar, Footer, ScrollToTop, EmptyState } from './components';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AwardsPage from './pages/AwardsPage';
import CategoriesPage from './pages/CategoriesPage';
import NominatePage from './pages/NominatePage';
import ApplyPage from './pages/ApplyPage';
import VotingPage from './pages/VotingPage';
import WinnersPage from './pages/WinnersPage';
import EventsPage from './pages/EventsPage';
import SpeakersPage from './pages/SpeakersPage';
import PartnersPage from './pages/PartnersPage';
import BookPage from './pages/BookPage';
import StoryDrivePage from './pages/StoryDrivePage';
import CityChaptersPage from './pages/CityChaptersPage';
import DirectoryPage from './pages/DirectoryPage';
import MembershipPage from './pages/MembershipPage';
import BlogPage from './pages/BlogPage';
import ImpactPage from './pages/ImpactPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}
