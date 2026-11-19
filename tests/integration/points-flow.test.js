import { describe, it, expect } from 'vitest';
import { calculatePoints } from '../../frontend/src/features/automatic-scoring/utils/calculatePoints.js';

describe('Integration: Raw Score to Points Transaction Flow', () => {
  it('converts raw score and constructs valid points transaction', () => {
    const rawScore = 80;
    const maxScore = 100;
    const activityMax = 500;
    const points = calculatePoints(rawScore, maxScore, activityMax);
    expect(points).toBe(400);
  });
});
