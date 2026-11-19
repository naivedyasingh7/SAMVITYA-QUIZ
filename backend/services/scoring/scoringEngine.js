export const scoringEngine = {
  computePoints(rawScore, maxScore, maxEventPoints = 1000) {
    if (maxScore <= 0) return 0;
    return Math.round((rawScore / maxScore) * maxEventPoints);
  }
};
