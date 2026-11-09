import React from 'react';
import { Navbar } from '../components/Navbar.jsx';

export function ParticipantLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar title="Participant Hub" />
      <main className="flex-1 max-w-3xl w-full mx-auto p-4">{children}</main>
    </div>
  );
}
