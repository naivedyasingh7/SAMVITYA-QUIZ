/**
 * In-House Native Quiz Question Bank Service
 * Stores and manages native quiz questions created by Admins.
 * 10 Easy Foundational Technical Questions for samVITya 2026.
 */

const STORAGE_KEY = 'epms_quiz_questions_bank_v3';

const memoryStore = new Map();

function safeGetItem(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch (_) {}
  return memoryStore.get(key) || null;
}

function safeSetItem(key, value) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
  } catch (_) {}
  memoryStore.set(key, value);
}

export const DEFAULT_QUESTIONS = [
  {
    id: 'q-101',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does HTML stand for in web development?',
    options: [
      'HyperText Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Logic',
      'Home Tool Management Layout'
    ],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-102',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which of the following data types in Python is immutable (cannot be modified after creation)?',
    options: [
      'List',
      'Tuple',
      'Dictionary',
      'Set'
    ],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-103',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Git command records staged snapshots into the project commit history?',
    options: [
      'git push',
      'git stage',
      'git commit',
      'git pull'
    ],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-104',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What standard HTTP status code signifies that a web request succeeded?',
    options: [
      '200 OK',
      '404 Not Found',
      '500 Server Error',
      '403 Forbidden'
    ],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-105',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which fundamental data structure follows the First-In, First-Out (FIFO) principle?',
    options: [
      'Stack',
      'Queue',
      'Binary Search Tree',
      'Graph'
    ],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-106',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In JavaScript, which keyword is used to declare a variable whose value can be reassigned?',
    options: [
      'const',
      'let',
      'fixed',
      'immutable'
    ],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-107',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which SQL clause is used to filter records and return only rows that satisfy a condition?',
    options: [
      'ORDER BY',
      'GROUP BY',
      'WHERE',
      'HAVING'
    ],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-108',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which protocol secures web traffic between a browser and a web server using encryption?',
    options: [
      'HTTP',
      'FTP',
      'HTTPS',
      'Telnet'
    ],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-109',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does RAM stand for in computer hardware?',
    options: [
      'Random Access Memory',
      'Readily Actionable Module',
      'Rapid Array Memory',
      'Read And Modify'
    ],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-110',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What is the time complexity of accessing an element in an array by its index?',
    options: [
      'O(1) - Constant Time',
      'O(n) - Linear Time',
      'O(log n) - Logarithmic Time',
      'O(n^2) - Quadratic Time'
    ],
    correctIndex: 0,
    points: 10
  }
];

class QuestionBankService {
  constructor() {
    this._initStorage();
  }

  _initStorage() {
    try {
      const raw = safeGetItem(STORAGE_KEY);
      if (!raw) {
        safeSetItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
        return;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length < 10) {
        safeSetItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
      }
    } catch (_) {
      safeSetItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
    }
  }

  /**
   * Retrieves all questions for a specific quiz activity.
   * @param {string} [activityId='act-quiz-tech-trivia']
   * @returns {Array<Object>}
   */
  getQuestions(activityId = 'act-quiz-tech-trivia') {
    try {
      const raw = safeGetItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : DEFAULT_QUESTIONS;
      const normalizedActId = (activityId === 'act-quiz-trivia') ? 'act-quiz-tech-trivia' : activityId;
      const filtered = list.filter((q) => !activityId || q.activityId === normalizedActId || q.activityId === activityId);
      return filtered.length > 0 ? filtered : list;
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
    points = 10
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
      points: Number(points) || 10,
      createdAt: new Date().toISOString()
    };

    try {
      const raw = safeGetItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [...DEFAULT_QUESTIONS];
      list.push(newQuestion);
      safeSetItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}

    return newQuestion;
  }

  /**
   * Updates an existing question.
   */
  updateQuestion(questionId, updates) {
    try {
      const raw = safeGetItem(STORAGE_KEY);
      let list = raw ? JSON.parse(raw) : [...DEFAULT_QUESTIONS];
      list = list.map((q) => (q.id === questionId ? { ...q, ...updates } : q));
      safeSetItem(STORAGE_KEY, JSON.stringify(list));
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
      const raw = safeGetItem(STORAGE_KEY);
      let list = raw ? JSON.parse(raw) : [...DEFAULT_QUESTIONS];
      list = list.filter((q) => q.id !== questionId);
      safeSetItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Resets the question bank to the 10 easy default questions.
   */
  resetToDefault() {
    try {
      safeSetItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
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
      { id: 'act-quiz-tech-trivia', title: 'Tech & CS Fundamentals (10 Easy Questions)', maxPoints: 100 },
      { id: 'act-quiz-trivia', title: 'Online Quiz: Tech & CS Trivia', maxPoints: 100 },
      { id: 'act-quiz-db-mastery', title: 'Database & SQL Challenge', maxPoints: 100 },
      { id: 'act-quiz-general-science', title: 'General Event Knowledge', maxPoints: 50 }
    ];
  }
}

export const questionBankService = new QuestionBankService();
