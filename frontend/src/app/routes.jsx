import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../features/landing/LandingPage.jsx';
import RegisterPage from '../features/participant-system/pages/RegisterPage.jsx';
import ParticipantDashboard from '../features/participant-system/pages/ParticipantDashboard.jsx';
import AdminDashboard from '../features/admin-system/pages/AdminDashboard.jsx';
import AdminLogin from '../features/admin-system/pages/AdminLogin.jsx';
import QuizIntegrationsPage from '../features/quiz-integration-framework/pages/QuizIntegrationsPage.jsx';
import ScoringManagement from '../features/automatic-scoring/pages/ScoringManagement.jsx';
import LeaderboardPage from '../features/leaderboard/pages/LeaderboardPage.jsx';
import TestingPortal from '../features/testing-and-deployment/pages/TestingPortal.jsx';
import { Navbar } from '../shared/components/Navbar.jsx';

export function AppRoutes() {
  return (
    <Routes>
      {/* Flagship HackX-Inspired Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Module 1: Participant System (Srikirti) */}
      <Route
        path="/register"
        element={
          <div className="min-h-screen bg-[#030305] text-white pt-24 px-4">
            <Navbar />
            <RegisterPage />
          </div>
        }
      />
      <Route
        path="/dashboard"
        element={
          <div className="min-h-screen bg-[#030305] text-white pt-24 px-4">
            <Navbar />
            <ParticipantDashboard />
          </div>
        }
      />

      {/* Module 2: Admin System (Suvradeep) */}
      <Route
        path="/admin"
        element={
          <div className="min-h-screen bg-[#050508] text-white pt-24 px-4">
            <Navbar />
            <AdminLogin />
          </div>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <div className="min-h-screen bg-[#050508] text-white pt-24 px-4">
            <Navbar />
            <AdminDashboard />
          </div>
        }
      />

      {/* Module 3: Quiz Integration (Ashwin) */}
      <Route
        path="/quiz-integrations"
        element={
          <div className="min-h-screen bg-[#030305] text-white pt-24 px-4">
            <Navbar />
            <QuizIntegrationsPage />
          </div>
        }
      />

      {/* Module 4: Automatic Scoring (Divya) */}
      <Route
        path="/scoring"
        element={
          <div className="min-h-screen bg-[#030305] text-white pt-24 px-4">
            <Navbar />
            <ScoringManagement />
          </div>
        }
      />

      {/* Module 5: Leaderboard (Priyanshu) */}
      <Route
        path="/leaderboard"
        element={
          <div className="min-h-screen bg-[#030305] text-white pt-24 px-4">
            <Navbar />
            <LeaderboardPage />
          </div>
        }
      />

      {/* Module 6: Testing & QA (Naivedya) */}
      <Route
        path="/testing"
        element={
          <div className="min-h-screen bg-[#030305] text-white pt-24 px-4">
            <Navbar />
            <TestingPortal />
          </div>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-6 text-center">
            <h1 className="font-sans font-black text-6xl text-purple-400 mb-2">404</h1>
            <p className="text-gray-400 mb-6 font-mono">Page Not Found in samVITya Arena</p>
            <a
              href="/"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              Return Home
            </a>
          </div>
        }
      />
    </Routes>
  );
}
