import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth.js';
import { participantService } from '../services/participantService.js';
import { activityService } from '../../admin-system/services/activityService.js';
import { ParticipantProfile } from '../components/ParticipantProfile.jsx';
import { QRRegistration } from '../components/QRRegistration.jsx';
import { ActivityCard } from '../components/ActivityCard.jsx';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Award, Zap, Target, History, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ParticipantDashboard() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeId = currentUser?.id || 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81';

  const loadData = async () => {
    try {
      const p = await participantService.getProfile(activeId);
      const acts = await activityService.listActivities();
      const h = await participantService.getMyHistory(activeId);
      setProfile(p);
      setActivities(acts);
      setHistory(h);
    } catch (err) {
      console.error('Error loading participant dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = eventStore.subscribe(() => {
      loadData();
    });
    return unsubscribe;
  }, [activeId]);

  if (isLoading && !profile) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-slate-400">Loading competitor pass...</p>
      </div>
    );
  }

  const effectiveProfile = profile || {
    id: activeId,
    full_name: currentUser?.name || 'Alex Mercer',
    participant_code: currentUser?.code || 'EVT26-P0102',
    email: currentUser?.email || 'alex.mercer@example.com',
    organization: 'VIT Computer Science Club',
    track: 'AI & Systems',
    total_points: 1370,
    quiz_points: 850,
    offline_points: 520,
    rank: 2
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Competitor Profile Banner */}
      <ParticipantProfile participant={effectiveProfile} />

      {/* 4 Stat KPI Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Total Score</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-space bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
            {effectiveProfile.total_points}
          </div>
          <span className="text-[10px] text-purple-300/70 font-mono mt-1 block">Live Verified Points</span>
        </div>

        <div className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Championship Rank</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black font-space text-purple-300">
            #{effectiveProfile.rank}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">Across All Guilds</span>
        </div>

        <div className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Quiz Arena</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black font-space text-indigo-200">
            {effectiveProfile.quiz_points}
          </div>
          <span className="text-[10px] text-indigo-400/70 font-mono mt-1 block">Online Speed Points</span>
        </div>

        <div className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Lab & Escape Rooms</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-space text-emerald-200">
            {effectiveProfile.offline_points}
          </div>
          <span className="text-[10px] text-emerald-400/70 font-mono mt-1 block">Offline Challenge Points</span>
        </div>
      </div>

      {/* Main Grid: Left = Available Challenges; Right = QR Pass & Personal Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 2 Spans */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Available Championship Activities</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Participate in active quiz arenas and physical club challenges to claim points.
              </p>
            </div>
            <Link
              to="/activities"
              className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activities.slice(0, 4).map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                participantId={effectiveProfile.id}
              />
            ))}
          </div>

          {/* Quick Quiz Arena Banner */}
          <div className="glass-surface p-6 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                Live Quiz Session
              </span>
              <h4 className="text-lg font-black text-white tracking-tight">
                Ready for the Algorithmic Speed Quiz?
              </h4>
              <p className="text-xs text-slate-300 max-w-md">
                Answer high-concurrency CS & logic questions. Scores are validated and credited to your rank immediately.
              </p>
            </div>
            <Link
              to={`/quiz-simulation?act=act-quiz-01&pid=${effectiveProfile.id}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Quiz Arena</span>
            </Link>
          </div>
        </div>

        {/* Right Column: 1 Span */}
        <div className="space-y-6">
          {/* Digital QR Badge */}
          <QRRegistration
            participantCode={effectiveProfile.participant_code}
            participantName={effectiveProfile.full_name}
          />

          {/* Recent Points Ledger */}
          <div className="glass-card p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                  Recent Awards Ledger
                </h4>
              </div>
              <Link to="/history" className="text-[11px] text-purple-400 hover:text-purple-300 font-mono">
                Full Log
              </Link>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No recent points recorded.</p>
            ) : (
              <div className="space-y-3">
                {history.slice(0, 4).map((tx) => (
                  <div key={tx.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 truncate max-w-[160px]">
                        {tx.reason || 'Activity Completion'}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        +{tx.points} pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{tx.transaction_type}</span>
                      <span>{new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
