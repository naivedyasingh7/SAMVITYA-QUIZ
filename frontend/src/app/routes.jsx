import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar.jsx';
import { ProtectedRoute } from '../shared/components/ProtectedRoute.jsx';
import AdminQuizManagerPage from '../features/quiz-integration-framework/pages/AdminQuizManagerPage.jsx';
import QuizSimulationPage from '../features/quiz-integration-framework/pages/QuizSimulationPage.jsx';
import AdminLogin from '../features/admin-system/pages/AdminLogin.jsx';
import RegisterPage from '../features/participant-system/pages/RegisterPage.jsx';

export function AppRoutes() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 relative overflow-x-hidden selection:bg-indigo-600 selection:text-white flex flex-col font-sans">
      {/* Calm, Low-Contrast Subtle Gradient Tint */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.06),rgba(255,255,255,0))]" />

      {/* Navigation */}
      <Navbar />

      {/* Content Layer */}
      <main className="flex-1 relative z-10">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/quiz-session" replace />} />

          {/* Authentication & Onboarding Routes */}
          <Route path="/login" element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Participant Routes */}
          <Route path="/quiz-session" element={<QuizSimulationPage />} />
          <Route path="/quiz-simulation" element={<QuizSimulationPage />} />
          <Route path="/dashboard" element={<div className="p-8 text-center text-sm text-slate-400">Participant Dashboard</div>} />
          <Route path="/leaderboard" element={<div className="p-8 text-center text-sm text-slate-400">Leaderboard & Rankings</div>} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/quiz-manager"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizManagerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-integrations"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizManagerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={<Navigate to="/admin/quiz-manager" replace />}
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center text-sm text-slate-400">Admin Portal</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scoring"
            element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center text-sm text-slate-400">Scoring Management</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/testing"
            element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center text-sm text-slate-400">Testing & QA Portal</div>
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<div className="p-8 text-center text-sm text-slate-500">404 - Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
