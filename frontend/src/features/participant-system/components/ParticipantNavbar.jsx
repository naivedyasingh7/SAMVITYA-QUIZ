import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, LayoutDashboard, Gamepad2, History } from 'lucide-react';

export function ParticipantNavbar({ participantCode }) {
  return (
    <nav className="glass-surface flex flex-wrap justify-between items-center gap-3 px-4 py-3 rounded-2xl border border-white/10">
      <div className="flex items-center gap-2.5">
        <QrCode className="w-5 h-5 text-purple-400" />
        <span className="font-bold text-white tracking-tight">Participant Portal</span>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
        <Link to="/participant/dashboard" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <Link to="/activities" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Activities</span>
        </Link>
        <Link to="/my-history" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </Link>
      </div>

      {participantCode && (
        <span className="text-xs font-mono font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full">
          {participantCode}
        </span>
      )}
    </nav>
  );
}
export default ParticipantNavbar;
