import React, { useState } from 'react';
import { Award, PlusCircle, MinusCircle, Eye, Search, CheckCircle, X } from 'lucide-react';
import { eventStore } from '../../../shared/services/eventStore.js';

export function ParticipantTable({
  participants = [],
  offlineGames = [],
  transactions = [],
  onAwardPoints,
  onDeductPoints,
  onToggleOfflineGame
}) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const totalPages = Math.max(1, Math.ceil(participants.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedParticipants = participants.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleOpenProfile = (p) => {
    const history = eventStore.getTransactions({ participantId: p.participant_id || p.id });
    setSelectedProfile({ ...p, history });
  };

  const isGameTicked = (participantId, game) => {
    return transactions.some(
      (tx) =>
        tx.participant_id === participantId &&
        (tx.activity_id === game.id ||
          (tx.reason || '').toLowerCase().includes(game.title.toLowerCase()))
    );
  };

  return (
    <>
      <div className="overflow-x-auto glass-card border border-white/10 shadow-2xl">
        <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
          <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4">Participant ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4 text-right">Quiz Pts</th>
              <th className="py-3 px-4 text-right">Game Pts</th>
              <th className="py-3 px-4 text-right font-bold">Total Pts</th>
              <th className="py-3 px-4">Offline Games Ticked Off</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {paginatedParticipants.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-xs text-slate-500 font-mono">
                  No competitors found.
                </td>
              </tr>
            ) : (
              paginatedParticipants.map((p) => {
                const pid = p.participant_id || p.id;
                const username = p.username || p.participant_code || 'P000';
                return (
                  <tr key={pid} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-300 text-sm">
                      {username}
                    </td>
                    <td className="py-3 px-4 font-medium text-white">
                      {p.full_name}
                      <span className="text-[10px] text-slate-500 block font-mono font-normal">
                        {p.organization || 'VIT Guild'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-purple-300 font-semibold text-sm">
                      {p.quiz_points || 0}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-300 font-semibold text-sm">
                      {p.game_points ?? p.offline_points ?? 0}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-white text-base">
                      {p.total_points || 0}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {offlineGames.map((game) => {
                          const ticked = isGameTicked(pid, game);
                          return (
                            <button
                              key={game.id}
                              type="button"
                              onClick={() => !ticked && onToggleOfflineGame?.(p, game)}
                              title={ticked ? `${game.title} completed` : `Tick off ${game.title} (+${game.max_points} pts)`}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono border transition-all ${
                                ticked
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold cursor-default'
                                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:border-indigo-400/50 hover:text-white cursor-pointer'
                              }`}
                            >
                              <span>{ticked ? '☑' : '☐'}</span>
                              <span className="truncate max-w-[110px]">{game.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenProfile(p)}
                          className="px-2 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs transition-colors inline-flex items-center gap-1"
                          title="View Profile & Score History"
                        >
                          <Eye className="w-3 h-3 text-purple-400" />
                          <span>Profile</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onAwardPoints?.(p)}
                          className="px-2 py-1 rounded-md bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-200 border border-emerald-500/30 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          title="Add Offline Game Points"
                        >
                          <PlusCircle className="w-3 h-3 text-emerald-400" />
                          <span>Add</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeductPoints?.(p)}
                          className="px-2 py-1 rounded-md bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 border border-rose-500/30 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          title="Deduct Game Points"
                        >
                          <MinusCircle className="w-3 h-3 text-rose-400" />
                          <span>Deduct</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-white/[0.01] text-xs font-mono text-slate-400">
            <span>
              Showing {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, participants.length)} of {participants.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-40 text-white"
              >
                Prev
              </button>
              <span className="text-slate-300">
                Page {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-40 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="glass-surface max-w-lg w-full p-6 sm:p-7 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-lg text-white font-space">
                {selectedProfile.username}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{selectedProfile.full_name}</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedProfile.email} • {selectedProfile.organization}
                </span>
              </div>
            </div>

            {/* Score Summary Box */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-center">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Quiz Points</span>
                <span className="text-lg font-black font-mono text-purple-300">
                  {selectedProfile.quiz_points || 0}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Game Points</span>
                <span className="text-lg font-black font-mono text-emerald-300">
                  {selectedProfile.game_points ?? selectedProfile.offline_points ?? 0}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Points</span>
                <span className="text-xl font-black font-mono text-white">
                  {selectedProfile.total_points || 0}
                </span>
              </div>
            </div>

            {/* Itemized Points Log */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                Itemized Activity History
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {!selectedProfile.history || selectedProfile.history.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No points logged yet.</p>
                ) : (
                  selectedProfile.history.map((h) => (
                    <div
                      key={h.id}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium text-white block">{h.reason}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(h.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className={`font-mono font-bold ${h.points >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {h.points >= 0 ? `+${h.points}` : h.points} pts
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ParticipantTable;
