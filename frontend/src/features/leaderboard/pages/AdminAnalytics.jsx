import React, { useState, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboardService.js';
import { adminService } from '../../admin-system/services/adminService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Shield, Trophy, Lock, Unlock, CheckCircle, BarChart3, PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#A855F7', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

export default function AdminAnalytics() {
  const [rankings, setRankings] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [declarationTitle, setDeclarationTitle] = useState('Protocol Zero 2026 Grand Championship Champions');
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const loadData = async () => {
    const list = await leaderboardService.getRankings();
    const locked = await leaderboardService.isLocked();
    setRankings(list);
    setIsLocked(locked);
  };

  useEffect(() => {
    loadData();
    const unsub = eventStore.subscribe(() => loadData());
    return unsub;
  }, []);

  const handleLockLeaderboard = async () => {
    try {
      await leaderboardService.declareWinners({
        title: declarationTitle,
        adminId: 'admin-001'
      });
      setFeedback({ type: 'success', text: 'Leaderboard locked! Official winners have been published.' });
      setModalOpen(false);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  const handleUnlock = async () => {
    await leaderboardService.unlockLeaderboard();
    setFeedback({ type: 'success', text: 'Leaderboard unlocked for ongoing score submissions.' });
  };

  // Prepare chart data
  const top10ChartData = rankings.slice(0, 8).map((r) => ({
    name: r.full_name?.split(' ')[0] || r.participant_code,
    quiz: r.quiz_points || 0,
    offline: r.offline_points || 0
  }));

  // Track breakdown data
  const trackMap = {};
  rankings.forEach((r) => {
    const t = r.track || 'General Tech';
    trackMap[t] = (trackMap[t] || 0) + (r.total_points || 0);
  });
  const trackData = Object.entries(trackMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 font-semibold">
              Event Intelligence & Final Declarations
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight font-space">
            Leaderboard Analytics & Winner Locking Ceremony
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize participant score trajectories, track performance distributions, and lock final ceremony standings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isLocked ? (
            <button
              type="button"
              onClick={handleUnlock}
              className="px-4 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock Leaderboard</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Trophy className="w-4 h-4" />
              <span>Lock & Declare Official Winners</span>
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Competitors Score Composition */}
        <div className="glass-card p-6 border border-white/10 space-y-4">
          <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
            Top 8 Competitors Point Breakdown (Quiz vs Offline)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10ChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0e121b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="quiz" stackId="a" fill="#A855F7" name="Quiz Points" radius={[0, 0, 0, 0]} />
                <Bar dataKey="offline" stackId="a" fill="#10B981" name="Offline Points" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Track Points Distribution */}
        <div className="glass-card p-6 border border-white/10 space-y-4">
          <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
            Points Share by Club Track
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trackData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {trackData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0e121b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lock Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-surface max-w-md w-full p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-300">
              <Trophy className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white font-space">
                Declare Final Winners & Lock Scores
              </h3>
              <p className="text-xs text-slate-300 mt-1.5">
                This locks the leaderboard against further automated submissions. The top 3 will be enshrined as the official Protocol Zero '26 champions.
              </p>
            </div>

            <div className="text-left text-xs">
              <label className="block text-slate-300 font-semibold mb-1">Ceremony Title</label>
              <input
                type="text"
                value={declarationTitle}
                onChange={(e) => setDeclarationTitle(e.target.value)}
                className="w-full glass-input px-3.5 py-2 text-white rounded-lg"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLockLeaderboard}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 hover:opacity-95 transition-all"
              >
                Confirm & Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
