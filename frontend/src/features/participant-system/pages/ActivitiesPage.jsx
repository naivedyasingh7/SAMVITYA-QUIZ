import React, { useState, useEffect } from 'react';
import { activityService } from '../../admin-system/services/activityService.js';
import { ActivityCard } from '../components/ActivityCard.jsx';
import { useAuth } from '../../../shared/hooks/useAuth.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Sparkles, Search, Filter, Layers, Zap, Target } from 'lucide-react';

export default function ActivitiesPage() {
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'quiz' | 'offline_challenge'
  const [searchQuery, setSearchQuery] = useState('');

  const activeId = currentUser?.id || 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81';

  const loadActivities = async () => {
    const list = await activityService.listActivities();
    setActivities(list);
  };

  useEffect(() => {
    loadActivities();
    const unsub = eventStore.subscribe(() => loadActivities());
    return unsub;
  }, []);

  const filtered = activities.filter((act) => {
    const matchesType = filterType === 'all' || act.type === filterType;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Championship Events Arena
            </span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight font-space">
            All Club Activities & Challenges
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Choose from high-speed online algorithmic quizzes, reverse engineering labs, and robotics trials. Points count towards the grand Protocol Zero 2026 podium.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({activities.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === 'quiz'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quizzes</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('offline_challenge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === 'offline_challenge'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Offline Labs</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search activities by title, domain, or track..."
          className="w-full glass-input pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 rounded-xl"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center border-dashed">
          <p className="text-sm font-medium text-slate-300">No activities match your search.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the filter to 'All'.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              participantId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
