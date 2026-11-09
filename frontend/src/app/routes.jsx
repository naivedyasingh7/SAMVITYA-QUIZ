import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Placeholder route configuration linking to the 6 feature modules
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<div className="p-8 text-center text-xl">Participant Registration (Srikirti - participant-system)</div>} />
      <Route path="/dashboard" element={<div className="p-8 text-center text-xl">Participant Dashboard (Srikirti - participant-system)</div>} />
      <Route path="/admin/*" element={<div className="p-8 text-center text-xl">Admin Portal (Suvradeep - admin-system)</div>} />
      <Route path="/quiz-integrations" element={<div className="p-8 text-center text-xl">Quiz Integrations (Ashwin - quiz-integration-framework)</div>} />
      <Route path="/scoring" element={<div className="p-8 text-center text-xl">Scoring Management (Divya - automatic-scoring)</div>} />
      <Route path="/leaderboard" element={<div className="p-8 text-center text-xl">Leaderboard & Rankings (Priyanshu - leaderboard)</div>} />
      <Route path="/testing" element={<div className="p-8 text-center text-xl">Testing & QA Portal (Naivedya - testing-and-deployment)</div>} />
      <Route path="*" element={<div className="p-8 text-center text-gray-500">404 - Page Not Found</div>} />
    </Routes>
  );
}
