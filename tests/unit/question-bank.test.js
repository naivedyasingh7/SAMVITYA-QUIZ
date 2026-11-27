import { describe, it, expect } from 'vitest';
import {
  questionBankService,
  DEFAULT_QUESTIONS
} from '../../frontend/src/features/quiz-integration-framework/services/questionBankService.js';

describe('Question Bank: 50 Questions & 10-Question Randomization', () => {
  it('contains 50 technical questions in the default bank', () => {
    expect(DEFAULT_QUESTIONS).toHaveLength(50);
    const bank = questionBankService.getQuestions('act-quiz-tech-trivia');
    expect(bank.length).toBeGreaterThanOrEqual(50);
  });

  it('serves 10 unique random questions per participant and preserves assignment for the same key', () => {
    const setA1 = questionBankService.getRandomizedQuizQuestions('act-quiz-tech-trivia', 10, 'P001:att-1');
    const setA2 = questionBankService.getRandomizedQuizQuestions('act-quiz-tech-trivia', 10, 'P001:att-1');

    expect(setA1).toHaveLength(10);
    expect(new Set(setA1.map((q) => q.id)).size).toBe(10);
    expect(setA1.map((q) => q.id)).toEqual(setA2.map((q) => q.id));

    // Different participants/attempts get jumbled selections
    const setB = questionBankService.getRandomizedQuizQuestions('act-quiz-tech-trivia', 10, 'P002:att-2');
    expect(setB).toHaveLength(10);
    expect(setB.map((q) => q.id)).not.toEqual(setA1.map((q) => q.id));
  });
});
