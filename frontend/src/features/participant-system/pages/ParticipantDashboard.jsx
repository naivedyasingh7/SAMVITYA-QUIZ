import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth.js';
import { participantService } from '../services/participantService.js';
import { leaderboardService } from '../../leaderboard/services/leaderboardService.js';
import { QRRegistration } from '../components/QRRegistration.jsx';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Award, Zap, Target, History, Trophy, User, Sparkles, CheckCircle, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ParticipantDashboard() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default to P001 (Alex Mercer) if not logged in
  const activeIdentifier = currentUser?.code || currentUser?.username || currentUser?.id || 'P001';

  const loadData = async () => {
    try {
      const p = await participantService.getProfile(activeIdentifier);
      const h = await participantService.getMyHistory(p?.id || activeIdentifier);
      const lb = await leaderboardService.getRankings();
      setProfile(p);
      setHistory(h);
      setLeaderboard(lb);
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
  }, [activeIdentifier]);

  const pData = profile || {
    id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    username: 'P001',
    full_name: 'Alex Mercer',
    participant_code: 'P001',
    email: 'alex.mercer@example.com',
    organization: 'VIT Computer Science Club',
    track: 'AI & Systems',
    status: 'Active',
    total_points: 150,
    quiz_points: 100,
    offline_points: 50,
    game_points: 50,
    rank: 3
  };

  const username = pData.username || pData.participant_code || 'P001';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: My Profile */}
      <div className="glass-surface rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 border border-white/20 flex items-center justify-center text-white font-black text-2xl font-space shadow-xl shadow-purple-600/30">
              {username}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black text-white tracking-tight">{pData.full_name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>{pData.status || 'Active'}</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400 font-mono">
                <span>Unique Username: <strong className="text-indigo-300">{username}</strong></span>
                <span>•</span>
                <span>{pData.organization || 'VIT Technical Guild'}</span>
                <span>•</span>
                <span>{pData.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                Leaderboard Position
              </span>
              <span className="text-2xl sm:text-3xl font-black font-space bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Rank #{pData.rank || 3}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: My Scores (Score Breakdown Cards) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span>My Scores — Participant {username}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Read-Only Participant Verified Ledger</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 border border-purple-500/30 hover:border-purple-400/50 transition-all">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Total Points
            </span>
            <div className="text-3xl font-black font-space text-white">
              {pData.total_points || 0}
            </div>
            <span className="text-[10px] text-purple-300/80 font-mono mt-1 block">
              Quiz Points + Offline Points
            </span>
          </div>

          <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/30 transition-all">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Leaderboard Rank
            </span>
            <div className="text-3xl font-black font-space text-amber-300">
              #{pData.rank || 3}
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">
              Across all competitors
            </span>
          </div>

          <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/30 transition-all">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Online Quiz
            </span>
            <div className="text-3xl font-black font-space text-indigo-300">
              {pData.quiz_points || 0}
            </div>
            <span className="text-[10px] text-indigo-300/70 font-mono mt-1 block">
              Speed & trivia points
            </span>
          </div>

          <div className="glass-card p-5 border border-white/10 hover:border-emerald-500/30 transition-all">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Offline Games
            </span>
            <div className="text-3xl font-black font-space text-emerald-300">
              {pData.game_points ?? pData.offline_points ?? 0}
            </div>
            <span className="text-[10px] text-emerald-300/70 font-mono mt-1 block">
              Treasure hunt, stargazing, labs
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Left = Activity History & Live Leaderboard; Right = QR 2 Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): My Activity & Embedded Live Leaderboard */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 3: My Activity Feed */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white font-space">
                  My Activity Feed
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {history.length} events logged
              </span>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No points activity recorded yet.</p>
            ) : (
              <div className="space-y-2.5">
                {history.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">
                        {tx.reason}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {tx.transaction_type === 'quiz_award' ? 'Online Quiz' : 'Offline Game'} • {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <span className="font-mono font-black text-sm text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      +{tx.points}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Live Leaderboard (Embedded on Participant Portal) */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="font-bold text-sm text-white font-space">
                  Live Event Leaderboard
                </h3>
              </div>
              <Link to="/leaderboard" className="text-xs text-purple-300 hover:text-white font-semibold transition-colors">
                Full Rankings &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
                <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3 w-16">Rank</th>
                    <th className="py-2.5 px-3">Username</th>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-slate-300 font-mono">
                  {leaderboard.slice(0, 5).map((entry) => {
                    const isMe = (entry.username || entry.participant_code) === username;
                    return (
                      <tr
                        key={entry.participant_id}
                        className={`transition-colors ${
                          isMe
                            ? 'bg-purple-600/20 text-purple-100 font-bold border-l-2 border-l-purple-400'
                            : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold">
                          {entry.rank === 1 ? '🥇 1' : entry.rank === 2 ? '🥈 2' : entry.rank === 3 ? '🥉 3' : `#${entry.rank}`}
                        </td>
                        <td className="py-2.5 px-3 text-indigo-300 font-bold">
                          {entry.username || entry.participant_code}
                          {isMe && <span className="ml-1 text-[10px] text-purple-300 font-normal font-sans">(You)</span>}
                        </td>
                        <td className="py-2.5 px-3 font-sans font-medium text-white">
                          {entry.full_name}
                        </td>
                        <td className="py-2.5 px-3 text-right font-black text-white">
                          {entry.total_points}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Individual Participant QR (QR 2) */}
        <div className="space-y-6">
          <QRRegistration
            participantUsername={username}
            participantCode={username}
            participantName={pData.full_name}
          />

          <div className="glass-card p-5 border border-white/10 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
              Offline Booth Check-In Guide
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When completing games like <strong>Treasure Hunt</strong> or the <strong>Stargazing Challenge</strong>, present your QR 2 badge to the station coordinator. They will scan your pass to immediately award game points to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
