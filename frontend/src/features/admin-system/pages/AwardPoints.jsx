import React, { useState, useEffect, useMemo } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { adminService } from '../services/adminService.js';
import { activityService } from '../services/activityService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Award, CheckCircle, AlertCircle, Search, UserCheck } from 'lucide-react';

export default function AwardPoints() {
  const [participants, setParticipants] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [participantQuery, setParticipantQuery] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [points, setPoints] = useState(20);
  const [reason, setReason] = useState('Treasure Hunt: Clue completion');
  const [adminName, setAdminName] = useState('ADMIN2026');
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const pList = await adminService.getAllParticipants();
      const aList = (await activityService.listActivities()).filter(
        (a) => a.type === 'offline_challenge' || a.is_active
      );
      setParticipants(pList);
      setActivities(aList);
      if (pList.length > 0 && !selectedParticipantId) {
        setSelectedParticipantId(pList[0].participant_id || pList[0].id);
      }
      if (aList.length > 0 && !selectedActivityId) {
        setSelectedActivityId(aList[0].id);
      }
    };
    init();
    const unsub = eventStore.subscribe(() => init());
    return unsub;
  }, []);

  const filteredParticipants = useMemo(() => {
    const q = participantQuery.toLowerCase().trim();
    if (!q) return participants.slice(0, 8);
    return participants
      .filter((p) => {
        const code = (p.username || p.participant_code || '').toLowerCase();
        const name = (p.full_name || '').toLowerCase();
        const email = (p.email || '').toLowerCase();
        return code.includes(q) || name.includes(q) || email.includes(q);
      })
      .slice(0, 8);
  }, [participants, participantQuery]);

  const handleAward = async (e) => {
    e.preventDefault();
    if (!selectedParticipantId || !points) return;
    setIsSubmitting(true);
    setStatusMessage(null);

    const chosenActivity = activities.find((a) => a.id === selectedActivityId);

    try {
      await adminService.awardOfflinePoints({
        participant_id: selectedParticipantId,
        activity_id: selectedActivityId || null,
        points: Number(points),
        reason: reason.trim() || `${chosenActivity?.title || 'Offline Game'}: Points awarded`,
        admin_id: adminName.trim() || 'admin-001'
      });

      const matchedPart = participants.find((p) => (p.participant_id || p.id) === selectedParticipantId);
      setStatusMessage({
        type: 'success',
        text: `Successfully added +${points} points to ${matchedPart?.username || 'Competitor'} (${matchedPart?.full_name || ''}). Leaderboard synced.`
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to award points'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentParticipant = participants.find(
    (p) => (p.participant_id || p.id) === selectedParticipantId
  );

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                Offline Game Points Console
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-space">
              Award &amp; Record Offline Points
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Search any competitor by ID (P001, P250...) or name, choose an activity, and issue verified points.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="glass-surface p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <form onSubmit={handleAward} className="space-y-6 text-xs">
            {/* Searchable Participant Picker (Scales to 500+ participants) */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Find Competitor ({participants.length} total) *
                </label>
                {currentParticipant && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-[11px] font-mono text-indigo-200">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Selected: <strong>{currentParticipant.username}</strong> — {currentParticipant.full_name} ({currentParticipant.total_points || 0} pts • #{currentParticipant.rank || '-'})
                  </span>
                )}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={participantQuery}
                  onChange={(e) => setParticipantQuery(e.target.value)}
                  placeholder="Type participant code (e.g. P001, P420), name, or email..."
                  className="w-full glass-input pl-10 pr-4 py-2.5 text-xs text-white rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {filteredParticipants.length === 0 ? (
                  <div className="col-span-full py-4 text-center text-slate-500 font-mono">
                    No competitor matched &ldquo;{participantQuery}&rdquo;.
                  </div>
                ) : (
                  filteredParticipants.map((p) => {
                    const pid = p.participant_id || p.id;
                    const isSelected = pid === selectedParticipantId;
                    return (
                      <button
                        key={pid}
                        type="button"
                        onClick={() => setSelectedParticipantId(pid)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-400/60 text-white shadow-sm'
                            : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-mono font-bold text-indigo-300 mr-1.5">
                            {p.username || p.participant_code}
                          </span>
                          <span className="font-semibold truncate">{p.full_name}</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-emerald-300 shrink-0">
                          {p.total_points || 0} pts
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Offline Game Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Offline Game / Challenge *
              </label>
              <select
                value={selectedActivityId}
                onChange={(e) => {
                  setSelectedActivityId(e.target.value);
                  const act = activities.find((a) => a.id === e.target.value);
                  if (act) setReason(`${act.title}: Completed task`);
                }}
                className="w-full glass-input px-3.5 py-3 text-xs text-white bg-slate-900 rounded-xl"
              >
                {activities.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title} ({a.type}) — Max: {a.max_points} pts
                  </option>
                ))}
              </select>
            </div>

            {/* Points with Preset Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Points Earned *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {[10, 20, 30, 40, 50, 100].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPoints(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      Number(points) === val
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    +{val} pts
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                max="1000"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-white font-mono rounded-xl"
                required
              />
            </div>

            {/* Reason & Admin Identifier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Justification / Activity Detail *
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Treasure Hunt: Stage 2 puzzle solved"
                  className="w-full glass-input px-3.5 py-2.5 text-xs text-white rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Admin Coordinator ID *
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="e.g. admin-001 or staff name"
                  className="w-full glass-input px-3.5 py-2.5 text-xs text-white rounded-xl"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedParticipantId}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>{isSubmitting ? 'Updating Database...' : 'Add Points & Sync Leaderboard'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
