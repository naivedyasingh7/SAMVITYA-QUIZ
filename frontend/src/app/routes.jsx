import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from '../features/landing/LandingPage.jsx';
import RegisterPage from '../features/participant-system/pages/RegisterPage.jsx';
import ParticipantDashboard from '../features/participant-system/pages/ParticipantDashboard.jsx';
import ActivitiesPage from '../features/participant-system/pages/ActivitiesPage.jsx';
import MyHistoryPage from '../features/participant-system/pages/MyHistoryPage.jsx';
import AdminDashboard from '../features/admin-system/pages/AdminDashboard.jsx';
import AdminLogin from '../features/admin-system/pages/AdminLogin.jsx';
import ManageParticipants from '../features/admin-system/pages/ManageParticipants.jsx';
import ManageActivities from '../features/admin-system/pages/ManageActivities.jsx';
import AwardPoints from '../features/admin-system/pages/AwardPoints.jsx';
import QuizIntegrationsPage from '../features/quiz-integration-framework/pages/QuizIntegrationsPage.jsx';
import QuizSimulationPage from '../features/quiz-integration-framework/pages/QuizSimulationPage.jsx';
import AdminQuizManagerPage from '../features/quiz-integration-framework/pages/AdminQuizManagerPage.jsx';
import ScoringManagement from '../features/automatic-scoring/pages/ScoringManagement.jsx';
import LeaderboardPage from '../features/leaderboard/pages/LeaderboardPage.jsx';
import AdminAnalytics from '../features/leaderboard/pages/AdminAnalytics.jsx';
import TestingPortal from '../features/testing-and-deployment/pages/TestingPortal.jsx';
import { ProtectedRoute } from '../shared/components/ProtectedRoute.jsx';
import { Navbar } from '../shared/components/Navbar.jsx';

/**
 * Route shell that conditionally displays the universal top navbar
 * for internal pages, while letting the landing page render its bespoke HackX header.
 */
function PageLayout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#030305] text-[#FAF8F5] relative overflow-x-hidden selection:bg-purple-600 selection:text-white flex flex-col font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.08),rgba(0,0,0,0))]" />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  );
}

export function AppRoutes() {
  return (
    <PageLayout>
      <Routes>
        {/* Core HackX 4.0 Landing Experience at root */}
        <Route path="/" element={<LandingPage />} />

        {/* Phase 1: Participant system (Srikirti) */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<RegisterPage />} />
        <Route path="/participant/register" element={<RegisterPage />} />
        <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
        <Route path="/dashboard" element={<ParticipantDashboard />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/history" element={<MyHistoryPage />} />

        {/* Phase 2: Admin system (Suvradeep) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/participants"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageParticipants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activities"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageActivities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/award-points"
          element={
            <ProtectedRoute requiredRole="admin">
              <AwardPoints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quiz-manager"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminQuizManagerPage />
            </ProtectedRoute>
          }
        />

        {/* Phase 3: Quiz integration framework (Ashwin) */}
        <Route path="/quiz-integrations" element={<QuizIntegrationsPage />} />
        <Route path="/quiz-simulation" element={<QuizSimulationPage />} />
        <Route path="/quiz-session" element={<QuizSimulationPage />} />
        <Route
          path="/quiz-manager"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminQuizManagerPage />
            </ProtectedRoute>
          }
        />

        {/* Phase 4: Automatic scoring (Divya) */}
        <Route
          path="/scoring"
          element={
            <ProtectedRoute requiredRole="admin">
              <ScoringManagement />
            </ProtectedRoute>
          }
        />

        {/* Phase 5: Leaderboard & analytics (Priyanshu) */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route
          path="/leaderboard/analytics"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Phase 6: Testing and deployment (Naivedya) */}
        <Route path="/testing" element={<TestingPortal />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  );
}
export default AppRoutes;
