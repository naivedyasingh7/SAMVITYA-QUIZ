/**
 * Computes event points from raw score and activity scoring rules.
 * Pure function for deterministic testing.
 * @param {number} rawScore
 * @param {number} maxScore
 * @param {number} activityMaxPoints
 * @param {Object} [ruleParams]
 * @returns {number} Integer points
 */
export function calculatePoints(rawScore, maxScore, activityMaxPoints = 1000, ruleParams = {}) {
  if (maxScore <= 0 || rawScore <= 0) return 0;
  const ratio = Math.min(rawScore / maxScore, 1);
  return Math.round(ratio * activityMaxPoints);
}
