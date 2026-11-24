import React from 'react';
import { User, Award, Shield, Compass, Sparkles } from 'lucide-react';

export function ParticipantProfile({ participant }) {
  if (!participant) return null;

  return (
    <div className="glass-surface rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-purple-600/30 font-space border border-white/20">
            {participant.full_name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">{participant.full_name}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300">
                {participant.track || 'AI & Systems'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{participant.organization || 'VIT Technical Guild'}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-slate-300">
              <span className="text-purple-300 font-bold">{participant.participant_code}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{participant.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Current Standing</span>
            <span className="text-2xl font-black font-space bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Rank #{participant.rank || 1}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <Award className="w-5 h-5 stroke-[2]" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ParticipantProfile;
