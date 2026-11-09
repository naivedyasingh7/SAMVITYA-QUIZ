import React, { useState } from 'react';

export function ActivityForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [activityType, setActivityType] = useState('online_quiz');
  const [maxPoints, setMaxPoints] = useState(1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ title, activity_type: activityType, max_points: Number(maxPoints) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select value={activityType} onChange={(e) => setActivityType(e.target.value)} className="w-full border p-2 rounded">
          <option value="online_quiz">Online Quiz</option>
          <option value="offline_game">Offline Game</option>
          <option value="bonus">Bonus Task</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Max Points</label>
        <input type="number" value={maxPoints} onChange={(e) => setMaxPoints(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded font-medium">Save Activity</button>
    </form>
  );
}
