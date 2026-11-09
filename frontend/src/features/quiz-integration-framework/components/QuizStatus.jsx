import React from 'react';

export function QuizStatus({ attempt }) {
  return (
    <div className="text-sm">
      Status: <span className="font-semibold text-amber-600">{attempt?.status || 'Ready'}</span>
    </div>
  );
}
