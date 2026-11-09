import React from 'react';
import { TestingDashboard } from '../components/TestingDashboard.jsx';

export default function TestingPortal() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-black">QA Testing & Deployment Portal</h2>
      <TestingDashboard onRunSimulations={() => console.log('Running QA suite')} />
    </div>
  );
}
