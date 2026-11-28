import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { ParticipantTable } from '../components/ParticipantTable.jsx';
import { adminService } from '../services/adminService.js';
import { pointsService } from '../../automatic-scoring/services/pointsService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Users, Search, Plus, Minus, X, CheckCircle, AlertCircle, Award } from 'lucide-react';

export default function ManageParticipants() {
  const [participants, setParticipants] = useState([]);
  const [offlineGames, setOfflineGames] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null); // { participant, type: 'add' | 'deduct' }
  const [pointsVal, setPointsVal] = useState(20);
  const [reason, setReason] = useState('');
  const [adminName, setAdminName] = useState('ADMIN2026');
  const [notice, setNotice] = useState(null);

  // Quick Offline Game Area state
  const [quickParticipantId, setQuickParticipantId] = useState('');
  const [quickGameId, setQuickGameId] = useState('');
  const [quickPoints, setQuickPoints] = useState(20);

  const loadParticipants = async () => {
    const list = await adminService.getAllParticipants();
    const games = eventStore.getActivities().filter((a) => a.type === 'offline_challenge');
    const txs = eventStore.getTransactions();
    setParticipants(list);
    setOfflineGames(games);
    setTransactions(txs);
    if (list.length > 0 && !quickParticipantId) {
      setQuickParticipantId(list[0].participant_id || list[0].id);
    }
    if (games.length > 0 && !quickGameId) {
      setQuickGameId(games[0].id);
    }
  };

  useEffect(() => {
    loadParticipants();
    const unsub = eventStore.subscribe(() => loadParticipants());
    return unsub;
  }, []);

  const handleToggleOfflineGame = async (participant, game, isCurrentlyTicked, netPoints) => {
    try {
      if (isCurrentlyTicked) {
        const deductPts = Math.abs(Number(netPoints) || Math.min(Number(game.max_points) || 20, 50));
        await adminService.awardOfflinePoints({
          participant_id: participant.participant_id || participant.id,
          activity_id: game.id,
          points: -deductPts,
          reason: `${game.title}: Unticked / removed`,
          admin_id: adminName
        });
        setNotice({
          type: 'success',
          text: `Removed tick for "${game.title}" (-${deductPts} pts) for ${participant.username || participant.participant_code}.`
        });
      } else {
        const awardPts = Math.min(Number(game.max_points) || 20, 50);
        await adminService.awardOfflinePoints({
          participant_id: participant.participant_id || participant.id,
          activity_id: game.id,
          points: awardPts,
          reason: `${game.title}: Completed & ticked off`,
          admin_id: adminName
        });
        setNotice({
          type: 'success',
          text: `Ticked off "${game.title}" (+${awardPts} pts) for ${participant.username || participant.participant_code}!`
        });
      }
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  const handleQuickAward = async (e) => {
    e.preventDefault();
    if (!quickParticipantId || !quickGameId) return;
    const game = offlineGames.find((g) => g.id === quickGameId);
    const part = participants.find((p) => (p.participant_id || p.id) === quickParticipantId);
    try {
      await adminService.awardOfflinePoints({
        participant_id: quickParticipantId,
        activity_id: quickGameId,
        points: Number(quickPoints),
        reason: `${game?.title || 'Offline Game'}: Awarded by ${adminName}`,
        admin_id: adminName
      });
      setNotice({
        type: 'success',
        text: `Awarded +${quickPoints} pts for ${game?.title || 'Offline Game'} to ${part?.username || 'Participant'}!`
      });
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  const filtered = participants.filter((p) => {
    const q = search.toLowerCase().trim();
    const u = (p.username || p.participant_code || '').toLowerCase();
    const n = (p.full_name || '').toLowerCase();
    const org = (p.organization || '').toLowerCase();
    return u.includes(q) || n.includes(q) || org.includes(q);
  });

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    if (!activeModal?.participant) return;

    const isDeduct = activeModal.type === 'deduct';
    const finalPoints = isDeduct ? -Math.abs(Number(pointsVal)) : Math.abs(Number(pointsVal));

    try {
      if (isDeduct) {
        await pointsService.manualAdjustment({
          participant_id: activeModal.participant.participant_id || activeModal.participant.id,
          points: finalPoints,
          reason: reason.trim() || 'Offline game deduction',
          admin_id: adminName
        });
      } else {
        await adminService.awardOfflinePoints({
          participant_id: activeModal.participant.participant_id || activeModal.participant.id,
          points: finalPoints,
          reason: reason.trim() || 'Offline game points added',
          admin_id: adminName
        });
      }

      setNotice({
        type: 'success',
        text: `Successfully ${isDeduct ? 'deducted' : 'added'} ${Math.abs(finalPoints)} points for ${activeModal.participant.username}!`
      });
      setTimeout(() => {
        setNotice(null);
        setActiveModal(null);
        setReason('');
      }, 1500);
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                Competitor Directory ({filtered.length} of {participants.length})
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-space">
              Participant Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live table of registered competitors, quiz points, offline game points, and total score.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ID (P001), name, or email..."
                className="w-full glass-input pl-9 pr-8 py-2.5 text-xs text-white rounded-xl"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inline Offline Game Area — Give Points */}
        <div className="glass-surface p-5 rounded-2xl border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Quick Offline Game Award
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Instant sync to leaderboard
            </span>
          </div>
          <form onSubmit={handleQuickAward} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs items-end">
            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                Participant (Filtered: {filtered.length})
              </label>
              <select
                value={quickParticipantId}
                onChange={(e) => setQuickParticipantId(e.target.value)}
                className="w-full glass-input px-3 py-2 text-white rounded-lg bg-slate-900"
              >
                {filtered.slice(0, 100).map((p) => (
                  <option key={p.participant_id || p.id} value={p.participant_id || p.id} className="bg-slate-900">
                    {p.username || p.participant_code} — {p.full_name} ({p.total_points || 0} pts)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Offline Game</label>
              <select
                value={quickGameId}
                onChange={(e) => setQuickGameId(e.target.value)}
                className="w-full glass-input px-3 py-2 text-white rounded-lg bg-slate-900"
              >
                {offlineGames.map((g) => (
                  <option key={g.id} value={g.id} className="bg-slate-900">
                    {g.title} (Max {g.max_points} pts)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Points to Give</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={quickPoints}
                onChange={(e) => setQuickPoints(e.target.value)}
                className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              Give Game Points
            </button>
          </form>
        </div>

        {notice && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              notice.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {notice.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{notice.text}</span>
          </div>
        )}

        {/* Live Table */}
        <ParticipantTable
          participants={filtered}
          offlineGames={offlineGames}
          transactions={transactions}
          onToggleOfflineGame={handleToggleOfflineGame}
          onAwardPoints={(p) => {
            setActiveModal({ participant: p, type: 'add' });
            setPointsVal(20);
            setReason('Treasure Hunt: Task completion');
          }}
          onDeductPoints={(p) => {
            setActiveModal({ participant: p, type: 'deduct' });
            setPointsVal(10);
            setReason('Penalty deduction for rule violation');
          }}
        />

        {/* Add/Deduct Points Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <div className="glass-surface max-w-md w-full p-6 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="font-bold text-sm text-white">
                  {activeModal.type === 'deduct' ? 'Deduct Points from' : 'Add Points to'}{' '}
                  <span className="text-indigo-300 font-mono font-bold">
                    {activeModal.participant.username}
                  </span>{' '}
                  ({activeModal.participant.full_name})
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleActionSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Points Delta *</label>
                  <div className="flex gap-2 mb-2">
                    {[10, 20, 30, 50].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPointsVal(v)}
                        className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                          pointsVal === v
                            ? activeModal.type === 'deduct'
                              ? 'bg-rose-600 text-white shadow'
                              : 'bg-emerald-600 text-white shadow'
                            : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
                        }`}
                      >
                        {activeModal.type === 'deduct' ? '-' : '+'}
                        {v}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={pointsVal}
                    onChange={(e) => setPointsVal(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Game / Audit Reason *
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Treasure Hunt clue #2 solved"
                    className="w-full glass-input px-3 py-2 text-white rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Authorized Admin ID *
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-white rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg font-bold shadow-md transition-all ${
                      activeModal.type === 'deduct'
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                    }`}
                  >
                    {activeModal.type === 'deduct' ? 'Confirm Deduction' : 'Confirm Award'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
