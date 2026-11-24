import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { adminService } from '../services/adminService.js';
import { activityService } from '../services/activityService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Award, CheckCircle, Search, Users, Activity, Sparkles } from 'lucide-react';

export default function AwardPoints() {
  const [participants, setParticipants] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [points, setPoints] = useState(100);
  const [reason, setReason] = useState('');
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
      if (pList.length > 0) setSelectedParticipantId(pList[0].participant_id || pList[0].id);
      if (aList.length > 0) setSelectedActivityId(aList[0].id);
    };
    init();
    const unsub = eventStore.subscribe(() => init());
    return unsub;
  }, []);

  const handleAward = async (e) => {
    e.preventDefault();
    if (!selectedParticipantId || !points) return;
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await adminService.awardOfflinePoints({
        participant_id: selectedParticipantId,
        activity_id: selectedActivityId || null,
        points: Number(points),
        reason: reason.trim() || 'Offline challenge completion'
      });
      setStatusMessage({
        type: 'success',
        text: `Successfully awarded +${points} points to selected participant!`
      });
      setReason('');
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to award points'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedParticipant = participants.find(
    (p) => (p.participant_id || p.id) === selectedParticipantId
  );

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-4xl">
        <div className="border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
              Event Booth / Coordinator Portal
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight font-space">
            Award Offline Game & Challenge Points
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Credit verified points for in-person escape rooms, hardware debugging labs, and rapid design sprints.
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' && <CheckCircle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="glass-surface p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <form onSubmit={handleAward} className="space-y-6 text-xs">
            {/* Participant Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Select Competitor *
              </label>
              <select
                value={selectedParticipantId}
                onChange={(e) => setSelectedParticipantId(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-xs text-white bg-slate-900 rounded-xl"
                required
              >
                {participants.map((p) => (
                  <option key={p.participant_id || p.id} value={p.participant_id || p.id}>
                    {p.full_name} — {p.participant_code} ({p.organization || 'Club'}) | Current: {p.total_points || 0} pts
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Challenge / Booth Activity
              </label>
              <select
                value={selectedActivityId}
                onChange={(e) => setSelectedActivityId(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-xs text-white bg-slate-900 rounded-xl"
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
                Points Value *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {[50, 100, 250, 500, 750, 1000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPoints(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      points === val
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
                max="5000"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-white font-mono rounded-xl"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Audit Justification & Notes *
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Cleared hardware escape room terminal with zero hints"
                className="w-full glass-input px-3.5 py-2.5 text-xs text-white rounded-xl"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording Points...' : 'Verify and Award Points'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
