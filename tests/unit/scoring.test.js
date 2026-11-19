import { describe, it, expect } from 'vitest';
import { calculatePoints } from '../../frontend/src/features/automatic-scoring/utils/calculatePoints.js';

describe('Scoring Calculation Math', () => {
  it('correctly calculates linear proportional points', () => {
    const points = calculatePoints(8500, 10000, 1000);
    expect(points).toBe(850);
  });

  it('caps points at activityMaxPoints', () => {
    const points = calculatePoints(12000, 10000, 1000);
    expect(points).toBe(1000);
  });

  it('returns 0 for negative or zero raw scores', () => {
    expect(calculatePoints(0, 10000, 1000)).toBe(0);
    expect(calculatePoints(-50, 10000, 1000)).toBe(0);
  });
});
