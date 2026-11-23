/**
 * In-House Native Quiz Question Bank Service
 * Stores and manages native quiz questions created by Admins.
 * Fully eliminates third-party dependencies.
 */

const STORAGE_KEY = 'epms_quiz_questions_bank';

const DEFAULT_QUESTIONS = [
  {
    id: 'q-101',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which data structure is primarily used to implement an LRU cache?',
    options: [
      'Queue + Stack',
      'Doubly Linked List + Hash Map',
      'Binary Search Tree',
      'Min Heap'
    ],
    correctIndex: 1,
    points: 25
  },
  {
    id: 'q-102',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In PostgreSQL, which constraint guarantees idempotency of result submissions?',
    options: [
      'CHECK constraint on score',
      'UNIQUE constraint on (activity_id, external_result_id)',
      'FOREIGN KEY with CASCADE',
      'DEFAULT gen_random_uuid()'
    ],
    correctIndex: 1,
    points: 25
  },
  {
    id: 'q-103',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What pattern allows swapping external quiz platforms without altering the core codebase?',
    options: [
      'Observer Pattern',
      'Adapter / Registry Pattern',
      'Singleton Pattern',
      'Decorator Pattern'
    ],
    correctIndex: 1,
    points: 25
  },
  {
    id: 'q-104',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which HTTP method is semantically used to submit a finished quiz attempt payload?',
    options: [
      'GET',
      'POST',
      'PUT',
      'PATCH'
    ],
    correctIndex: 1,
    points: 25
  }
];

class QuestionBankService {
  constructor() {
    this._initStorage();
  }

  _initStorage() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
      }
    } catch (_) {}
  }

  /**
   * Retrieves all questions for a specific quiz activity.
   * @param {string} [activityId='act-quiz-tech-trivia']
   * @returns {Array<Object>}
   */
  getQuestions(activityId = 'act-quiz-tech-trivia') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : DEFAULT_QUESTIONS;
      return list.filter((q) => !activityId || q.activityId === activityId);
    } catch {
      return DEFAULT_QUESTIONS;
    }
  }

  /**
   * Adds a new question created by the Admin.
   * @param {Object} param0
   */
  addQuestion({
    activityId = 'act-quiz-tech-trivia',
    prompt,
    options,
    correctIndex = 0,
    points = 25
  }) {
    if (!prompt || !prompt.trim()) {
      throw new Error('Question prompt cannot be empty');
    }
    if (!Array.isArray(options) || options.length < 2) {
      throw new Error('At least 2 answer options are required');
    }

    const newQuestion = {
      id: `q-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      activityId,
      prompt: prompt.trim(),
      options: options.map((opt) => opt.trim()),
      correctIndex: Number(correctIndex),
      points: Number(points) || 25,
      createdAt: new Date().toISOString()
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [...DEFAULT_QUESTIONS];
      list.push(newQuestion);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}

    return newQuestion;
  }

  /**
   * Updates an existing question.
   */
  updateQuestion(questionId, updates) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let list = raw ? JSON.parse(raw) : [...DEFAULT_QUESTIONS];
      list = list.map((q) => (q.id === questionId ? { ...q, ...updates } : q));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes a question.
   */
  deleteQuestion(questionId) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let list = raw ? JSON.parse(raw) : [...DEFAULT_QUESTIONS];
      list = list.filter((q) => q.id !== questionId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Resets the question bank to the initial default questions.
   */
  resetToDefault() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
      return DEFAULT_QUESTIONS;
    } catch {
      return DEFAULT_QUESTIONS;
    }
  }

  /**
   * Returns list of supported quiz activities.
   */
  getActivities() {
    return [
      { id: 'act-quiz-tech-trivia', title: 'Tech & Architecture Trivia', maxPoints: 100 },
      { id: 'act-quiz-db-mastery', title: 'Database & SQL Challenge', maxPoints: 100 },
      { id: 'act-quiz-general-science', title: 'General Event Knowledge', maxPoints: 50 }
    ];
  }
}

export const questionBankService = new QuestionBankService();
