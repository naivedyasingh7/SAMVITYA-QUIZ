import { describe, it, expect } from 'vitest';

describe('Leaderboard Sorting & Ranking', () => {
  it('orders entries by total_points descending', () => {
    const data = [
      { participant_id: 'p1', total_points: 300 },
      { participant_id: 'p2', total_points: 950 },
      { participant_id: 'p3', total_points: 500 }
    ];
    const sorted = [...data].sort((a, b) => b.total_points - a.total_points);
    expect(sorted[0].participant_id).toBe('p2');
    expect(sorted[1].participant_id).toBe('p3');
    expect(sorted[2].participant_id).toBe('p1');
  });
});
