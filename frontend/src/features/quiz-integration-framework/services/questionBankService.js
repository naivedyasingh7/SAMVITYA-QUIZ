/**
 * In-House Native Quiz Question Bank Service
 * Stores and manages 50 similar foundational technical questions.
 * Shuffles (Fisher-Yates) and serves 10 random questions to each participant.
 */

const STORAGE_KEY = 'epms_quiz_questions_bank_v4';
const ASSIGNMENT_PREFIX = 'epms_quiz_assign_v1_';

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

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const DEFAULT_QUESTIONS = [
  // 1-10: Web & HTML/CSS Basics
  {
    id: 'q-101',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does HTML stand for in web development?',
    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'Home Tool Management Layout'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-102',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which CSS property is used to change the text color of an element?',
    options: ['font-color', 'text-style', 'color', 'fg-color'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-103',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which HTML tag is used to create a clickable hyperlink?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-104',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does CSS stand for?',
    options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Syntax', 'Colorful System Styles'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-105',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which HTML tag is used to insert an image on a web page?',
    options: ['<picture>', '<image>', '<img>', '<src>'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-106',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In CSS, which symbol is used to select an element by its ID?',
    options: ['.', '#', '*', '@'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-107',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which HTML tag defines the largest heading?',
    options: ['<h6>', '<head>', '<h1>', '<header>'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-108',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does DOM stand for in browser JavaScript?',
    options: ['Document Object Model', 'Data Output Module', 'Dynamic Order Management', 'Display Object Markup'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-109',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which CSS property controls the space inside an element between its content and border?',
    options: ['margin', 'padding', 'spacing', 'gap'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-110',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which HTML attribute provides alternative text for an image if it fails to load?',
    options: ['title', 'alt', 'caption', 'fallback'],
    correctIndex: 1,
    points: 10
  },

  // 11-20: Python & JavaScript Basics
  {
    id: 'q-111',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which of the following data types in Python is immutable (cannot be modified after creation)?',
    options: ['List', 'Tuple', 'Dictionary', 'Set'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-112',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In JavaScript, which keyword is used to declare a variable whose value can be reassigned?',
    options: ['const', 'let', 'fixed', 'immutable'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-113',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In Python, which keyword is used to define a function?',
    options: ['function', 'func', 'def', 'fn'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-114',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What will `typeof []` return in JavaScript?',
    options: ['array', 'object', 'list', 'undefined'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-115',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Python built-in function returns the number of items in a list or string?',
    options: ['count()', 'size()', 'len()', 'length()'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-116',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In JavaScript, which operator checks both value AND type equality?',
    options: ['==', '=', '===', '!='],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-117',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does JSON stand for?',
    options: ['Java Standard Object Notation', 'JavaScript Object Notation', 'Joined Syntax Output Network', 'JavaScript Ordered Nodes'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-118',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In Python, which symbol starts a single-line comment?',
    options: ['//', '/*', '#', '--'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-119',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which JavaScript array method adds a new element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'append()'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-120',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What is the output of `bool(0)` in Python?',
    options: ['True', 'False', '0', 'None'],
    correctIndex: 1,
    points: 10
  },

  // 21-30: Git, Version Control & CLI
  {
    id: 'q-121',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Git command records staged snapshots into the project commit history?',
    options: ['git push', 'git stage', 'git commit', 'git pull'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-122',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Git command downloads the latest commits from a remote repository and merges them?',
    options: ['git pull', 'git push', 'git init', 'git status'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-123',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Git command creates a copy of an existing remote repository onto your local machine?',
    options: ['git fork', 'git copy', 'git clone', 'git fetch'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-124',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Git command shows modified, staged, and untracked files in your working directory?',
    options: ['git log', 'git status', 'git diff', 'git branch'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-125',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In a Linux/macOS terminal, which command lists the files in the current directory?',
    options: ['cd', 'ls', 'pwd', 'mkdir'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-126',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which terminal command prints the current working directory path?',
    options: ['pwd', 'cd', 'whoami', 'echo'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-127',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which file in a Git repository lists files and folders that Git should ignore?',
    options: ['.gitkeep', '.gitignore', '.gitexclude', '.env'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-128',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which command initializes a brand-new Git repository in the current folder?',
    options: ['git start', 'git new', 'git init', 'git create'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-129',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In Node.js projects, which file lists the project dependencies and npm scripts?',
    options: ['config.xml', 'package.json', 'index.html', 'README.md'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-130',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which Git command stages a modified file for the next commit?',
    options: ['git add', 'git save', 'git stage-all', 'git track'],
    correctIndex: 0,
    points: 10
  },

  // 31-40: Networking, HTTP & Databases
  {
    id: 'q-131',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What standard HTTP status code signifies that a web request succeeded?',
    options: ['200 OK', '404 Not Found', '500 Server Error', '403 Forbidden'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-132',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which HTTP status code means the requested page or resource was not found?',
    options: ['200', '301', '404', '503'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-133',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which protocol secures web traffic between a browser and a web server using encryption?',
    options: ['HTTP', 'FTP', 'HTTPS', 'Telnet'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-134',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does DNS stand for on the internet?',
    options: ['Domain Name System', 'Data Network Service', 'Digital Node Server', 'Dynamic Name Storage'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-135',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does URL stand for?',
    options: ['Universal Resource Link', 'Uniform Resource Locator', 'Unified Routing Layer', 'User Reference Link'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-136',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which SQL clause is used to filter records and return only rows that satisfy a condition?',
    options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-137',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which SQL statement is used to retrieve data from a database table?',
    options: ['GET', 'FETCH', 'SELECT', 'READ'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 'q-138',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In relational databases, what uniquely identifies each row in a table?',
    options: ['Foreign Key', 'Primary Key', 'Index Key', 'Sort Key'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-139',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which SQL keyword sorts query results in ascending or descending order?',
    options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'GROUP BY'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-140',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which port number is the default for standard HTTPS traffic?',
    options: ['21', '80', '443', '8080'],
    correctIndex: 2,
    points: 10
  },

  // 41-50: Data Structures, Algorithms & Computer Hardware
  {
    id: 'q-141',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which fundamental data structure follows the First-In, First-Out (FIFO) principle?',
    options: ['Stack', 'Queue', 'Binary Search Tree', 'Graph'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-142',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Hash Table'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-143',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does RAM stand for in computer hardware?',
    options: ['Random Access Memory', 'Readily Actionable Module', 'Rapid Array Memory', 'Read And Modify'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-144',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What is the time complexity of accessing an element in an array by its index?',
    options: ['O(1) - Constant Time', 'O(n) - Linear Time', 'O(log n) - Logarithmic Time', 'O(n^2) - Quadratic Time'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-145',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'How many bits are in 1 byte?',
    options: ['4 bits', '8 bits', '16 bits', '32 bits'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-146',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'Which number system uses only the digits 0 and 1?',
    options: ['Decimal', 'Octal', 'Hexadecimal', 'Binary'],
    correctIndex: 3,
    points: 10
  },
  {
    id: 'q-147',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What is the time complexity of Binary Search on a sorted array of n elements?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 'q-148',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does CPU stand for?',
    options: ['Central Processing Unit', 'Core Program Utility', 'Computer Power Unit', 'Central Peripheral User'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-149',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'What does API stand for in software engineering?',
    options: ['Application Programming Interface', 'Automated Program Integration', 'Advanced Protocol Index', 'Application Process Indicator'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q-150',
    activityId: 'act-quiz-tech-trivia',
    prompt: 'In Boolean logic, what is the result of `true AND false`?',
    options: ['true', 'false', 'null', '1'],
    correctIndex: 1,
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
      if (!Array.isArray(parsed) || parsed.length < 50) {
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
      const normalizedActId = (activityId === 'act-quiz-trivia' || activityId === 'act-quiz-algo')
        ? 'act-quiz-tech-trivia'
        : activityId;
      const filtered = list.filter((q) => !activityId || q.activityId === normalizedActId || q.activityId === activityId);
      return filtered.length > 0 ? filtered : list;
    } catch {
      return DEFAULT_QUESTIONS;
    }
  }

  /**
   * Jumbles the 50-question bank via Fisher-Yates shuffle and returns `count` random questions.
   * Caches the randomized assignment per `assignmentKey` (e.g., participantId:attemptId)
   * so refreshing mid-attempt preserves the participant's assigned set.
   */
  getRandomizedQuizQuestions(activityId = 'act-quiz-tech-trivia', count = 10, assignmentKey = null) {
    const bank = this.getQuestions(activityId);
    const targetCount = Math.min(count, bank.length);

    if (assignmentKey) {
      const cacheKey = `${ASSIGNMENT_PREFIX}${assignmentKey}`;
      try {
        const cachedIdsRaw = safeGetItem(cacheKey);
        if (cachedIdsRaw) {
          const ids = JSON.parse(cachedIdsRaw);
          if (Array.isArray(ids) && ids.length === targetCount) {
            const byId = new Map(bank.map((q) => [q.id, q]));
            const resolved = ids.map((id) => byId.get(id)).filter(Boolean);
            if (resolved.length === targetCount) {
              return resolved;
            }
          }
        }
      } catch (_) {}

      const selected = shuffleArray(bank).slice(0, targetCount);
      try {
        safeSetItem(cacheKey, JSON.stringify(selected.map((q) => q.id)));
      } catch (_) {}
      return selected;
    }

    return shuffleArray(bank).slice(0, targetCount);
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
   * Resets the question bank to the 50 default questions.
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
      { id: 'act-quiz-tech-trivia', title: 'Tech & CS Fundamentals (50-Question Bank • 10 Random)', maxPoints: 100 },
      { id: 'act-quiz-trivia', title: 'Online Quiz: Tech & CS Trivia', maxPoints: 100 },
      { id: 'act-quiz-db-mastery', title: 'Database & SQL Challenge', maxPoints: 100 },
      { id: 'act-quiz-general-science', title: 'General Event Knowledge', maxPoints: 50 }
    ];
  }
}

export const questionBankService = new QuestionBankService();
