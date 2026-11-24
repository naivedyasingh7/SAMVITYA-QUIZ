import React, { useState } from 'react';
import { PlusCircle, Award, Target, Zap } from 'lucide-react';

export function ActivityForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('quiz'); // 'quiz' | 'offline_challenge'
  const [maxPoints, setMaxPoints] = useState(1000);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit?.({
      title: title.trim(),
      type,
      max_points: Number(maxPoints),
      description: description.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
          Activity Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Algorithmic Speed Duel or Hardware CTF"
          className="w-full glass-input px-3.5 py-2 text-xs text-white rounded-lg"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
            Category Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full glass-input px-3 py-2 text-xs text-white bg-slate-900 rounded-lg"
          >
            <option value="quiz">Online Quiz</option>
            <option value="offline_challenge">Offline Lab / Challenge</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
            Max Points Awardable
          </label>
          <input
            type="number"
            min="10"
            max="5000"
            step="10"
            value={maxPoints}
            onChange={(e) => setMaxPoints(e.target.value)}
            className="w-full glass-input px-3 py-2 text-xs text-white rounded-lg"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
          Activity Description & Rules
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed scoring criteria, room location, or quiz topics..."
          className="w-full glass-input px-3.5 py-2 text-xs text-white rounded-lg"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Publish Activity</span>
        </button>
      </div>
    </form>
  );
}
export default ActivityForm;
