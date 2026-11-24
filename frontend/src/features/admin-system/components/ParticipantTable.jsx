import React from 'react';
import { Award, PlusCircle, ArrowUpRight } from 'lucide-react';

export function ParticipantTable({ participants = [], onAwardPoints }) {
  return (
    <div className="overflow-x-auto glass-card border border-white/10 shadow-2xl">
      <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
        <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
          <tr>
            <th className="py-3 px-4">Rank</th>
            <th className="py-3 px-4">Competitor</th>
            <th className="py-3 px-4">Code</th>
            <th className="py-3 px-4">Guild / Organization</th>
            <th className="py-3 px-4">Quiz Pts</th>
            <th className="py-3 px-4">Offline Pts</th>
            <th className="py-3 px-4">Total Score</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04] text-slate-300">
          {participants.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-8 text-center text-xs text-slate-500">
                No participants registered yet.
              </td>
            </tr>
          ) : (
            participants.map((p, idx) => (
              <tr key={p.participant_id || p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-amber-300">
                  #{p.rank || idx + 1}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
                      {p.full_name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <span className="font-semibold text-white block">{p.full_name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-indigo-300 font-medium">
                  {p.participant_code}
                </td>
                <td className="py-3 px-4 text-slate-400">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/10">
                    {p.organization || 'VIT Technical Guild'}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-purple-300">
                  {p.quiz_points || 0}
                </td>
                <td className="py-3 px-4 font-mono text-emerald-300">
                  {p.offline_points || 0}
                </td>
                <td className="py-3 px-4 font-mono font-black text-white text-sm">
                  {p.total_points || 0}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onAwardPoints?.(p)}
                    className="px-2.5 py-1 rounded-md bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/30 text-xs font-medium transition-colors inline-flex items-center gap-1"
                  >
                    <PlusCircle className="w-3 h-3" />
                    <span>Award Pts</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ParticipantTable;
