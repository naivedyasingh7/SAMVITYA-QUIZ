/**
 * eventStore.js
 * Centralized, reactive state store and persistence engine for the samVITya '26
 * Real-Time Event Participant Management + Gamification System.
 *
 * Implements:
 * - P00x username standard (P001, P002, P003...)
 * - Separate tracking of Quiz Points vs Offline Game Points
 * - Seed data matching event flow: Treasure Hunt, Stargazing Challenge, Tech Trivia
 * - Two QR code system (Event Registration QR1 & Individual Participant QR2)
 * - Reactive broadcast channel for live real-time sync across portals
 */

import {
  sanitizeText,
  sanitizeEmail,
  escapeCsvCell,
  validatePointsBounds
} from '@shared/utils/sanitize.js';

const STORAGE_KEY_PARTICIPANTS = 'epms_participants_v3';
const STORAGE_KEY_ACTIVITIES = 'epms_activities_v3';
const STORAGE_KEY_TRANSACTIONS = 'epms_transactions_v3';
const STORAGE_KEY_DECLARATION = 'epms_winner_declaration_v3';
const EVENT_NAME = 'epms_store_updated';

// Available Offline Games and Online Quizzes
const INITIAL_ACTIVITIES = [
  {
    id: 'act-quiz-trivia',
    title: 'Online Quiz: Tech & CS Trivia',
    type: 'quiz',
    max_points: 100,
    is_active: true,
    description: 'High-speed speed-coding & computer science fundamentals quiz. Instant automated grading.',
    starts_at: '2026-11-20T09:00:00Z',
    ends_at: '2026-11-25T18:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-quiz-algo',
    title: 'Algorithmic Speed Duel',
    type: 'quiz',
    max_points: 100,
    is_active: true,
    description: 'Dynamic programming, graph traversal, and time complexity challenge.',
    starts_at: '2026-11-21T10:00:00Z',
    ends_at: '2026-11-25T20:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-treasure',
    title: 'Treasure Hunt',
    type: 'offline_challenge',
    max_points: 50,
    is_active: true,
    description: 'Campus-wide physical riddle trail and QR clue discovery adventure.',
    starts_at: '2026-11-22T10:00:00Z',
    ends_at: '2026-11-25T18:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-stargazing',
    title: 'Stargazing Challenge',
    type: 'offline_challenge',
    max_points: 30,
    is_active: true,
    description: 'Astronomy club telescope observation, constellation mapping, and celestial quiz.',
    starts_at: '2026-11-22T19:00:00Z',
    ends_at: '2026-11-24T23:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-hardware',
    title: 'Hardware Escape Room',
    type: 'offline_challenge',
    max_points: 50,
    is_active: true,
    description: 'Hands-on breadboard debugging, oscilloscope decoding, and circuit hacking.',
    starts_at: '2026-11-23T10:00:00Z',
    ends_at: '2026-11-25T17:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-robotics',
    title: 'Robotics Obstacle Arena',
    type: 'offline_challenge',
    max_points: 60,
    is_active: true,
    description: 'Autonomous rover trial: LiDAR obstacle avoidance and precision track driving.',
    starts_at: '2026-11-23T11:00:00Z',
    ends_at: '2026-11-25T17:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  }
];

// Seeded participants matching the user's exact specification & leaderboard
const INITIAL_PARTICIPANTS = [
  {
    id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    username: 'P001',
    full_name: 'Alex Mercer',
    email: 'alex.mercer@example.com',
    participant_code: 'P001',
    organization: 'VIT Computer Science Club',
    track: 'AI & Systems',
    status: 'Active',
    created_at: '2026-11-20T09:15:00Z'
  },
  {
    id: 'part-002-sarah',
    username: 'P002',
    full_name: 'Sarah Lin',
    email: 'sarah.lin@example.com',
    participant_code: 'P002',
    organization: 'Cybersecurity Club',
    track: 'Cybersecurity',
    status: 'Active',
    created_at: '2026-11-20T09:20:00Z'
  },
  {
    id: 'part-003-rohan',
    username: 'P003',
    full_name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    participant_code: 'P003',
    organization: 'ACM Student Chapter',
    track: 'Algorithms',
    status: 'Active',
    created_at: '2026-11-20T09:30:00Z'
  },
  {
    id: 'part-008-tanya',
    username: 'P008',
    full_name: 'Tanya Gupta',
    email: 'tanya.g@example.com',
    participant_code: 'P008',
    organization: 'Data Science Club',
    track: 'Data Science',
    status: 'Active',
    created_at: '2026-11-20T09:40:00Z'
  },
  {
    id: 'part-014-vikram',
    username: 'P014',
    full_name: 'Vikram Aditya',
    email: 'vikram.a@example.com',
    participant_code: 'P014',
    organization: 'Robotics Guild',
    track: 'Robotics',
    status: 'Active',
    created_at: '2026-11-20T09:50:00Z'
  },
  {
    id: 'part-004-aisha',
    username: 'P004',
    full_name: 'Aisha Khan',
    email: 'aisha.k@example.com',
    participant_code: 'P004',
    organization: 'Web3 Builders Collective',
    track: 'Web3 & DeFi',
    status: 'Active',
    created_at: '2026-11-20T10:00:00Z'
  },
  {
    id: 'part-005-dev',
    username: 'P005',
    full_name: 'Dev Patel',
    email: 'dev.patel@example.com',
    participant_code: 'P005',
    organization: 'Design & Code Guild',
    track: 'UI/UX Design',
    status: 'Active',
    created_at: '2026-11-20T10:15:00Z'
  }
];

// Seeded Transactions ensuring exact prompt points:
// P008: Total 180 (Rank #1)
// P014: Total 165 (Rank #2)
// P001: Quiz: 100, Treasure Hunt: 30, Stargazing: 20 => Total: 150 (Rank #3)
// P003: Quiz: 90, Offline Game: 10 => Total: 100
// P002: Quiz: 65, Offline Game: 30 => Total: 95
const INITIAL_TRANSACTIONS = [
  // P008 (Rank #1, Total 180)
  {
    id: 'pt-008-1',
    participant_id: 'part-008-tanya',
    activity_id: 'act-quiz-trivia',
    points: 100,
    transaction_type: 'quiz_award',
    reason: 'Online quiz: Perfect score 100/100',
    admin_id: 'system',
    created_at: '2026-11-21T11:00:00Z'
  },
  {
    id: 'pt-008-2',
    participant_id: 'part-008-tanya',
    activity_id: 'act-off-treasure',
    points: 50,
    transaction_type: 'offline_challenge',
    reason: 'Treasure Hunt: First team to unlock final chest',
    admin_id: 'admin-001',
    created_at: '2026-11-22T12:00:00Z'
  },
  {
    id: 'pt-008-3',
    participant_id: 'part-008-tanya',
    activity_id: 'act-off-stargazing',
    points: 30,
    transaction_type: 'offline_challenge',
    reason: 'Stargazing challenge: Mapped all constellations',
    admin_id: 'admin-001',
    created_at: '2026-11-22T20:30:00Z'
  },

  // P014 (Rank #2, Total 165)
  {
    id: 'pt-014-1',
    participant_id: 'part-014-vikram',
    activity_id: 'act-quiz-trivia',
    points: 95,
    transaction_type: 'quiz_award',
    reason: 'Online quiz: High speed submission',
    admin_id: 'system',
    created_at: '2026-11-21T11:30:00Z'
  },
  {
    id: 'pt-014-2',
    participant_id: 'part-014-vikram',
    activity_id: 'act-off-hardware',
    points: 40,
    transaction_type: 'offline_challenge',
    reason: 'Hardware Escape Room: Decoded UART packet',
    admin_id: 'admin-001',
    created_at: '2026-11-23T11:00:00Z'
  },
  {
    id: 'pt-014-3',
    participant_id: 'part-014-vikram',
    activity_id: 'act-off-stargazing',
    points: 30,
    transaction_type: 'offline_challenge',
    reason: 'Stargazing challenge: Celestial identification',
    admin_id: 'admin-001',
    created_at: '2026-11-22T21:00:00Z'
  },

  // P001 (Rank #3, Total 150: Quiz 100, Treasure Hunt 30, Stargazing 20)
  {
    id: 'pt-001-1',
    participant_id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    activity_id: 'act-quiz-trivia',
    points: 100,
    transaction_type: 'quiz_award',
    reason: 'Online quiz: Perfect 100/100 score',
    admin_id: 'system',
    created_at: '2026-11-21T12:00:00Z'
  },
  {
    id: 'pt-001-2',
    participant_id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    activity_id: 'act-off-treasure',
    points: 30,
    transaction_type: 'offline_challenge',
    reason: 'Treasure Hunt: Found 6 clue checkpoints',
    admin_id: 'admin-001',
    created_at: '2026-11-22T14:00:00Z'
  },
  {
    id: 'pt-001-3',
    participant_id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    activity_id: 'act-off-stargazing',
    points: 20,
    transaction_type: 'offline_challenge',
    reason: 'Stargazing challenge: Completed lunar observation task',
    admin_id: 'admin-001',
    created_at: '2026-11-22T21:30:00Z'
  },

  // P003 (Quiz: 90, Game: 10, Total: 100)
  {
    id: 'pt-003-1',
    participant_id: 'part-003-rohan',
    activity_id: 'act-quiz-algo',
    points: 90,
    transaction_type: 'quiz_award',
    reason: 'Online quiz: Algorithmic Duel 90/100',
    admin_id: 'system',
    created_at: '2026-11-21T13:00:00Z'
  },
  {
    id: 'pt-003-2',
    participant_id: 'part-003-rohan',
    activity_id: 'act-off-treasure',
    points: 10,
    transaction_type: 'offline_challenge',
    reason: 'Treasure Hunt: Stage 1 completion',
    admin_id: 'admin-001',
    created_at: '2026-11-22T14:30:00Z'
  },

  // P002 (Quiz: 65, Game: 30, Total: 95)
  {
    id: 'pt-002-1',
    participant_id: 'part-002-sarah',
    activity_id: 'act-quiz-trivia',
    points: 65,
    transaction_type: 'quiz_award',
    reason: 'Online quiz: Score 65/100',
    admin_id: 'system',
    created_at: '2026-11-21T13:30:00Z'
  },
  {
    id: 'pt-002-2',
    participant_id: 'part-002-sarah',
    activity_id: 'act-off-treasure',
    points: 30,
    transaction_type: 'offline_challenge',
    reason: 'Treasure Hunt: Solved cryptogram',
    admin_id: 'admin-001',
    created_at: '2026-11-22T15:00:00Z'
  }
];

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

function safeRemoveItem(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
      return;
    }
  } catch (_) {}
  memoryStore.delete(key);
}

class EventStore {
  constructor() {
    this._listeners = new Set();
    this._cache = {
      participants: null,
      activities: null,
      transactions: null
    };
    this._participantIndex = new Map();
    this._initStorage();
    this._rebuildParticipantIndex();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (
          e.key === STORAGE_KEY_PARTICIPANTS ||
          e.key === STORAGE_KEY_ACTIVITIES ||
          e.key === STORAGE_KEY_TRANSACTIONS ||
          e.key === STORAGE_KEY_DECLARATION
        ) {
          this._invalidateCache();
          this._notify();
        }
      });
    }
  }

  _invalidateCache() {
    this._cache.participants = null;
    this._cache.activities = null;
    this._cache.transactions = null;
    this._rebuildParticipantIndex();
  }

  _rebuildParticipantIndex() {
    this._participantIndex.clear();
    const list = this.getParticipants();
    for (const p of list) {
      if (p.id) this._participantIndex.set(String(p.id).toLowerCase(), p);
      if (p.username) this._participantIndex.set(String(p.username).toLowerCase(), p);
      if (p.participant_code) this._participantIndex.set(String(p.participant_code).toLowerCase(), p);
      if (p.email) this._participantIndex.set(String(p.email).toLowerCase(), p);
    }
  }

  _initStorage() {
    try {
      if (!safeGetItem(STORAGE_KEY_ACTIVITIES)) {
        safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
      }
      if (!safeGetItem(STORAGE_KEY_PARTICIPANTS)) {
        safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(INITIAL_PARTICIPANTS));
      }
      if (!safeGetItem(STORAGE_KEY_TRANSACTIONS)) {
        safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      }
    } catch (err) {
      console.warn('EventStore storage init warning:', err);
    }
  }

  _notify() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    }
    this._listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error('Listener callback error:', e);
      }
    });
  }

  subscribe(listener) {
    this._listeners.add(listener);
    const windowHandler = () => listener();
    if (typeof window !== 'undefined') {
      window.addEventListener(EVENT_NAME, windowHandler);
    }
    return () => {
      this._listeners.delete(listener);
      if (typeof window !== 'undefined') {
        window.removeEventListener(EVENT_NAME, windowHandler);
      }
    };
  }

  // --- Participants Management ---

  getParticipants() {
    if (this._cache.participants) {
      return this._cache.participants;
    }
    try {
      const data = safeGetItem(STORAGE_KEY_PARTICIPANTS);
      const parsed = data ? JSON.parse(data) : INITIAL_PARTICIPANTS;
      this._cache.participants = Array.isArray(parsed) ? parsed : INITIAL_PARTICIPANTS;
      return this._cache.participants;
    } catch {
      this._cache.participants = INITIAL_PARTICIPANTS;
      return this._cache.participants;
    }
  }

  getParticipantById(identifier) {
    if (!identifier) return null;
    const query = String(identifier).toLowerCase().trim();
    if (this._participantIndex.size === 0) {
      this._rebuildParticipantIndex();
    }
    return this._participantIndex.get(query) || null;
  }

  _getNextParticipantNumber(existing) {
    let maxNum = existing.length;
    for (const p of existing) {
      const code = p.username || p.participant_code || '';
      const match = /^P(\d+)$/i.exec(code);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return maxNum + 1;
  }

  registerParticipant({ fullName, email, organization = '', track = 'General Tech' }) {
    const cleanName = sanitizeText(fullName, 128);
    const cleanEmail = sanitizeEmail(email);
    const cleanOrg = sanitizeText(organization, 128);
    const cleanTrack = sanitizeText(track, 64);

    if (!cleanName || !cleanEmail) throw new Error('Full name and email are required');
    const existing = this.getParticipants();

    const duplicate = this._participantIndex.get(cleanEmail);
    if (duplicate) {
      return duplicate;
    }

    let nextIndex = this._getNextParticipantNumber(existing);
    while (this._participantIndex.has(`p${String(nextIndex).padStart(3, '0')}`)) {
      nextIndex++;
    }
    const username = `P${String(nextIndex).padStart(3, '0')}`;
    const newParticipant = {
      id: `part-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      username,
      full_name: cleanName,
      email: cleanEmail,
      participant_code: username,
      organization: cleanOrg || 'VIT Technical Guild',
      track: cleanTrack || 'General Tech',
      status: 'Active',
      created_at: new Date().toISOString()
    };

    const updated = [newParticipant, ...existing];
    this._cache.participants = updated;
    this._participantIndex.set(newParticipant.id.toLowerCase(), newParticipant);
    this._participantIndex.set(username.toLowerCase(), newParticipant);
    this._participantIndex.set(cleanEmail, newParticipant);

    safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(updated));
    this._notify();
    return newParticipant;
  }

  registerParticipantsBatch(items = []) {
    const existing = this.getParticipants();
    const created = [];
    let nextIdx = this._getNextParticipantNumber(existing);

    for (const item of items) {
      const cleanName = sanitizeText(item.fullName || item.full_name, 128);
      const cleanEmail = sanitizeEmail(item.email);
      if (!cleanName || !cleanEmail) continue;
      if (this._participantIndex.has(cleanEmail)) continue;

      while (this._participantIndex.has(`p${String(nextIdx).padStart(3, '0')}`)) {
        nextIdx++;
      }
      const username = `P${String(nextIdx++).padStart(3, '0')}`;
      const p = {
        id: `part-${Date.now()}-${nextIdx}-${Math.random().toString(36).substring(2, 6)}`,
        username,
        full_name: cleanName,
        email: cleanEmail,
        participant_code: username,
        organization: sanitizeText(item.organization, 128) || 'VIT Technical Guild',
        track: sanitizeText(item.track, 64) || 'General Tech',
        status: 'Active',
        created_at: new Date().toISOString()
      };
      created.push(p);
      this._participantIndex.set(p.id.toLowerCase(), p);
      this._participantIndex.set(username.toLowerCase(), p);
      this._participantIndex.set(cleanEmail, p);
    }

    if (created.length > 0) {
      const updated = [...[...created].reverse(), ...existing];
      this._cache.participants = updated;
      safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(updated));
      this._notify();
    }
    return created;
  }

  // --- Activities & Games Management ---

  getActivities() {
    if (this._cache.activities) {
      return this._cache.activities;
    }
    try {
      const data = safeGetItem(STORAGE_KEY_ACTIVITIES);
      const parsed = data ? JSON.parse(data) : INITIAL_ACTIVITIES;
      this._cache.activities = Array.isArray(parsed) ? parsed : INITIAL_ACTIVITIES;
      return this._cache.activities;
    } catch {
      this._cache.activities = INITIAL_ACTIVITIES;
      return this._cache.activities;
    }
  }

  getActivityById(id) {
    return this.getActivities().find((a) => a.id === id) || null;
  }

  createActivity({ title, type, max_points, description = '', starts_at, ends_at }) {
    const cleanTitle = sanitizeText(title, 128);
    const cleanDesc = sanitizeText(description, 512);
    if (!cleanTitle || !type || !max_points) {
      throw new Error('Title, type, and max_points are required');
    }

    const boundedMax = validatePointsBounds(max_points, 1, 5000);
    const list = this.getActivities();
    const newActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: cleanTitle,
      type, // 'quiz' | 'offline_challenge'
      max_points: boundedMax,
      description: cleanDesc,
      is_active: true,
      starts_at: starts_at || new Date().toISOString(),
      ends_at: ends_at || new Date(Date.now() + 86400000 * 3).toISOString(),
      created_at: new Date().toISOString()
    };

    const updated = [newActivity, ...list];
    this._cache.activities = updated;
    safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(updated));
    this._notify();
    return newActivity;
  }

  toggleActivity(id) {
    const list = this.getActivities();
    const updated = list.map((act) => (act.id === id ? { ...act, is_active: !act.is_active } : act));
    this._cache.activities = updated;
    safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(updated));
    this._notify();
    return updated.find((a) => a.id === id);
  }

  // --- Points & Transaction Engine ---

  _getAllTransactionsRaw() {
    if (this._cache.transactions) {
      return this._cache.transactions;
    }
    try {
      const data = safeGetItem(STORAGE_KEY_TRANSACTIONS);
      const parsed = data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
      this._cache.transactions = Array.isArray(parsed) ? parsed : INITIAL_TRANSACTIONS;
      return this._cache.transactions;
    } catch {
      this._cache.transactions = INITIAL_TRANSACTIONS;
      return this._cache.transactions;
    }
  }

  getTransactions(filter = {}) {
    let list = this._getAllTransactionsRaw();

    if (filter.participantId) {
      list = list.filter((t) => t.participant_id === filter.participantId);
    }
    if (filter.activityId) {
      list = list.filter((t) => t.activity_id === filter.activityId);
    }
    if (filter.type) {
      list = list.filter((t) => t.transaction_type === filter.type);
    }

    return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  recordTransaction({
    participant_id,
    activity_id = null,
    points,
    transaction_type = 'offline_challenge',
    reason = '',
    admin_id = 'admin-001'
  }) {
    if (!participant_id) throw new Error('participant_id is required');
    const boundedPoints = validatePointsBounds(points, -500, 1000);

    if (this.isLeaderboardLocked() && transaction_type !== 'manual_adjustment') {
      throw new Error('Leaderboard is locked. Further score changes require admin unlock.');
    }

    // Resolve participant in O(1)
    const target = this.getParticipantById(participant_id);
    const resolvedId = target ? target.id : participant_id;

    const currentList = this._getAllTransactionsRaw();
    const newTx = {
      id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      participant_id: resolvedId,
      activity_id,
      points: boundedPoints,
      transaction_type, // 'quiz_award' | 'offline_challenge' | 'manual_adjustment'
      reason: sanitizeText(reason, 256) || 'Points transaction',
      admin_id: sanitizeText(admin_id, 64) || 'admin-001',
      created_at: new Date().toISOString()
    };

    const updated = [newTx, ...currentList];
    this._cache.transactions = updated;
    safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(updated));
    this._notify();
    return newTx;
  }

  recordTransactionsBatch(items = []) {
    if (this.isLeaderboardLocked()) {
      throw new Error('Leaderboard is locked. Further score changes require admin unlock.');
    }

    const currentList = this._getAllTransactionsRaw();
    const created = [];
    const now = Date.now();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item || !item.participant_id) continue;
      const boundedPoints = validatePointsBounds(item.points, -500, 1000);
      const target = this.getParticipantById(item.participant_id);
      const resolvedId = target ? target.id : item.participant_id;

      created.push({
        id: `pt-${now}-${i}-${Math.random().toString(36).substring(2, 6)}`,
        participant_id: resolvedId,
        activity_id: item.activity_id || null,
        points: boundedPoints,
        transaction_type: item.transaction_type || 'offline_challenge',
        reason: sanitizeText(item.reason, 256) || 'Batch points transaction',
        admin_id: sanitizeText(item.admin_id, 64) || 'admin-001',
        created_at: new Date(now + i).toISOString()
      });
    }

    if (created.length > 0) {
      const updated = [...created.reverse(), ...currentList];
      this._cache.transactions = updated;
      safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(updated));
      this._notify();
    }
    return created;
  }

  // --- Real-time Leaderboard & Rankings ---

  getLeaderboard() {
    const participants = this.getParticipants();
    const transactions = this.getTransactions();

    const participantMap = new Map();
    participants.forEach((p) => {
      participantMap.set(p.id, {
        participant_id: p.id,
        username: p.username || p.participant_code || 'P000',
        full_name: p.full_name,
        email: p.email,
        participant_code: p.username || p.participant_code,
        organization: p.organization,
        track: p.track || 'General Tech',
        total_points: 0,
        quiz_points: 0,
        game_points: 0,
        offline_points: 0,
        manual_adjustments: 0,
        activity_count: 0,
        last_updated: p.created_at
      });
    });

    transactions.forEach((tx) => {
      let entry = participantMap.get(tx.participant_id);
      if (!entry) {
        entry = {
          participant_id: tx.participant_id,
          username: 'P000',
          full_name: 'Competitor',
          email: '',
          participant_code: 'P000',
          organization: 'VIT Club',
          track: 'General Tech',
          total_points: 0,
          quiz_points: 0,
          game_points: 0,
          offline_points: 0,
          manual_adjustments: 0,
          activity_count: 0,
          last_updated: tx.created_at
        };
        participantMap.set(tx.participant_id, entry);
      }

      entry.total_points += tx.points;
      entry.activity_count += 1;

      if (tx.transaction_type === 'quiz_award') {
        entry.quiz_points += tx.points;
      } else if (tx.transaction_type === 'offline_challenge') {
        entry.offline_points += tx.points;
        entry.game_points += tx.points;
      } else {
        entry.manual_adjustments += tx.points;
      }

      if (new Date(tx.created_at) > new Date(entry.last_updated)) {
        entry.last_updated = tx.created_at;
      }
    });

    // Total Points = Quiz Points + Offline Points
    const sorted = Array.from(participantMap.values()).sort((a, b) => {
      if (b.total_points !== a.total_points) {
        return b.total_points - a.total_points;
      }
      return b.quiz_points - a.quiz_points;
    });

    return sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }

  // --- Winner Announcement & Locking ---

  isLeaderboardLocked() {
    try {
      const data = safeGetItem(STORAGE_KEY_DECLARATION);
      if (!data) return false;
      const decl = JSON.parse(data);
      return Boolean(decl && decl.is_locked);
    } catch {
      return false;
    }
  }

  getWinnerDeclaration() {
    try {
      const data = safeGetItem(STORAGE_KEY_DECLARATION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  declareWinners({ title = 'samVITya 2026 Grand Championship Winners', adminId = 'admin-001' }) {
    const leaderboard = this.getLeaderboard();
    const topWinners = leaderboard.slice(0, 3).map((item) => ({
      rank: item.rank,
      participant_id: item.participant_id,
      username: item.username,
      full_name: item.full_name,
      participant_code: item.participant_code,
      organization: item.organization,
      total_points: item.total_points
    }));

    const declaration = {
      id: `decl-${Date.now()}`,
      title,
      winners: topWinners,
      is_locked: true,
      declared_by_admin_id: adminId,
      declared_at: new Date().toISOString()
    };

    safeSetItem(STORAGE_KEY_DECLARATION, JSON.stringify(declaration));
    this._notify();
    return declaration;
  }

  unlockLeaderboard() {
    safeRemoveItem(STORAGE_KEY_DECLARATION);
    this._notify();
    return { success: true };
  }

  // --- Fallback Backup, Restore & Storage Health ---

  exportBackupSnapshot() {
    return {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      participants: this.getParticipants(),
      activities: this.getActivities(),
      transactions: this._getAllTransactionsRaw(),
      declaration: this.getWinnerDeclaration()
    };
  }

  restoreBackupSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== 'object') {
      throw new Error('Invalid backup snapshot format.');
    }
    if (!Array.isArray(snapshot.participants) || !Array.isArray(snapshot.transactions)) {
      throw new Error('Backup snapshot must contain participants and transactions arrays.');
    }

    safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(snapshot.participants));
    safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(snapshot.transactions));
    if (Array.isArray(snapshot.activities)) {
      safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(snapshot.activities));
    }
    if (snapshot.declaration) {
      safeSetItem(STORAGE_KEY_DECLARATION, JSON.stringify(snapshot.declaration));
    } else {
      safeRemoveItem(STORAGE_KEY_DECLARATION);
    }

    this._invalidateCache();
    this._notify();
    return {
      restoredParticipants: snapshot.participants.length,
      restoredTransactions: snapshot.transactions.length
    };
  }

  exportLeaderboardCsv() {
    const lb = this.getLeaderboard();
    const headers = ['Rank', 'Username', 'Full Name', 'Email', 'Organization', 'Quiz Points', 'Game Points', 'Total Points'];
    const lines = [headers.map(escapeCsvCell).join(',')];

    for (const row of lb) {
      lines.push([
        row.rank,
        row.username,
        row.full_name,
        row.email,
        row.organization,
        row.quiz_points,
        row.game_points,
        row.total_points
      ].map(escapeCsvCell).join(','));
    }
    return lines.join('\n');
  }

  getStorageHealth() {
    const pJson = JSON.stringify(this.getParticipants());
    const tJson = JSON.stringify(this._getAllTransactionsRaw());
    const aJson = JSON.stringify(this.getActivities());
    const estimatedBytes = pJson.length + tJson.length + aJson.length;
    const quotaBytes = 5 * 1024 * 1024; // ~5MB typical browser localStorage limit
    const quotaPercent = Math.min(100, Math.round((estimatedBytes / quotaBytes) * 1000) / 10);

    return {
      participantCount: this.getParticipants().length,
      transactionCount: this._getAllTransactionsRaw().length,
      estimatedKB: Math.round(estimatedBytes / 1024),
      quotaPercent,
      status: quotaPercent > 80 ? 'WARNING' : 'HEALTHY'
    };
  }

  resetToDefaults() {
    safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(INITIAL_PARTICIPANTS));
    safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
    safeRemoveItem(STORAGE_KEY_DECLARATION);
    this._invalidateCache();
    this._notify();
  }
}

export const eventStore = new EventStore();
export default eventStore;
