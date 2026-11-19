import React from 'react';

export function TestingDashboard({ onRunSimulations }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h3 className="text-lg font-bold">QA Testing & Concurrency Control</h3>
      <p className="text-sm text-gray-500">Trigger multi-participant simulation and idempotency tests.</p>
      <button onClick={onRunSimulations} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">
        Run Concurrency Test
      </button>
    </div>
  );
}
