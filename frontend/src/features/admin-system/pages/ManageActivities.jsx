import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { ActivityForm } from '../components/ActivityForm.jsx';
import { activityService } from '../services/activityService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Activity, Plus, ToggleLeft, ToggleRight, Zap, Target } from 'lucide-react';

export default function ManageActivities() {
  const [activities, setActivities] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const loadActivities = async () => {
    const list = await activityService.listActivities();
    setActivities(list);
  };

  useEffect(() => {
    loadActivities();
    const unsub = eventStore.subscribe(() => loadActivities());
    return unsub;
  }, []);

  const handleToggle = async (id) => {
    await activityService.toggleActivity(id);
  };

  const handleCreate = async (formData) => {
    await activityService.createActivity(formData);
    setIsAdding(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                Event Management
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-space">
              Championship Activities & Challenges
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure active quizzes, offline booth challenges, point weightages, and availability.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Cancel' : 'Create New Activity'}</span>
          </button>
        </div>

        {/* Create Form Collapse/Modal */}
        {isAdding && (
          <div className="glass-surface p-6 rounded-2xl border border-indigo-500/30 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add New Club Championship Activity</h3>
            <ActivityForm onSubmit={handleCreate} onCancel={() => setIsAdding(false)} />
          </div>
        )}

        {/* Activities Table */}
        <div className="glass-card border border-white/10 overflow-hidden shadow-2xl">
          <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
            <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Max Points</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Toggle Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 max-w-md">
                    <span className="font-bold text-white text-sm block">{act.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{act.description}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono uppercase ${
                        act.type === 'quiz'
                          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {act.type === 'quiz' ? <Zap className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                      <span>{act.type === 'quiz' ? 'Quiz' : 'Offline Lab'}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-300 text-sm">
                    {act.max_points} pts
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        act.is_active
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {act.is_active ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleToggle(act.id)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                        act.is_active
                          ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/30'
                      }`}
                    >
                      {act.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
