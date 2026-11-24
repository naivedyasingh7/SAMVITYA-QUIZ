/**
 * eventStore.js
 * Centralized, reactive state store and persistence engine for the samVITya '26
 * Event Points Management System.
 *
 * Implements:
 * - Deterministic seed data for collegiate club participants, activities, and transactions.
 * - Reactive subscription mechanism (window CustomEvent / BroadcastChannel).
 * - Real-time leaderboard recomputation.
 * - Immutable transaction ledger.
 * - LocalStorage persistence with graceful fallback.
 */

const STORAGE_KEY_PARTICIPANTS = 'epms_participants_v2';
const STORAGE_KEY_ACTIVITIES = 'epms_activities_v2';
const STORAGE_KEY_TRANSACTIONS = 'epms_transactions_v2';
const STORAGE_KEY_DECLARATION = 'epms_winner_declaration_v2';
const EVENT_NAME = 'epms_store_updated';

// Default initial activities for the samVITya club championship
const INITIAL_ACTIVITIES = [
  {
    id: 'act-quiz-01',
    title: 'Algorithmic Blitz: Dynamic Programming Duel',
    type: 'quiz',
    max_points: 1000,
    is_active: true,
    description: 'High-speed speed-coding & algorithmic puzzles assessing graph traversal, DP, and asymptotic complexity.',
    starts_at: '2026-11-20T09:00:00Z',
    ends_at: '2026-11-25T18:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-quiz-02',
    title: 'AI/ML Model Prompt Injection CTF',
    type: 'quiz',
    max_points: 800,
    is_active: true,
    description: 'Bypass guardrails, detect latent space anomalies, and solve generative AI challenges.',
    starts_at: '2026-11-21T10:00:00Z',
    ends_at: '2026-11-25T20:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-quiz-03',
    title: 'Web3 & Smart Contract Security Audit',
    type: 'quiz',
    max_points: 1200,
    is_active: true,
    description: 'Identify reentrancy vulnerabilities, flash loan attack vectors, and optimize gas fees.',
    starts_at: '2026-11-21T11:00:00Z',
    ends_at: '2026-11-25T22:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-01',
    title: 'Hardware Reverse Engineering Escape Room',
    type: 'offline_challenge',
    max_points: 500,
    is_active: true,
    description: 'Live physical lab challenge: Oscilloscope debugging, UART packet interception, and breadboard hacking.',
    starts_at: '2026-11-22T10:00:00Z',
    ends_at: '2026-11-24T18:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-02',
    title: 'Rapid UI/UX Accessibility Duel',
    type: 'offline_challenge',
    max_points: 600,
    is_active: true,
    description: '60-minute redesign sprint evaluated on WCAG AAA compliance, cognitive load, and micro-interactions.',
    starts_at: '2026-11-22T14:00:00Z',
    ends_at: '2026-11-25T14:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  },
  {
    id: 'act-off-03',
    title: 'Autonomous Rover Obstacle Course',
    type: 'offline_challenge',
    max_points: 750,
    is_active: true,
    description: 'Robotics arena trial: LiDAR SLAM pathfinding, obstacle evasion, and precision waypoint navigation.',
    starts_at: '2026-11-23T09:00:00Z',
    ends_at: '2026-11-25T17:00:00Z',
    created_at: '2026-11-20T08:00:00Z'
  }
];

// Default initial participants
const INITIAL_PARTICIPANTS = [
  {
    id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    full_name: 'Alex Mercer',
    email: 'alex.mercer@example.com',
    participant_code: 'EVT26-P0102',
    organization: 'VIT Computer Science Club',
    track: 'AI & Systems',
    created_at: '2026-11-20T09:15:00Z'
  },
  {
    id: 'part-002-sarah',
    full_name: 'Sarah Lin',
    email: 'sarah.lin@example.com',
    participant_code: 'EVT26-P0103',
    organization: 'Cybersecurity Club',
    track: 'Cybersecurity',
    created_at: '2026-11-20T09:20:00Z'
  },
  {
    id: 'part-003-rohan',
    full_name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    participant_code: 'EVT26-P0104',
    organization: 'ACM Student Chapter',
    track: 'Algorithms',
    created_at: '2026-11-20T09:30:00Z'
  },
  {
    id: 'part-004-aisha',
    full_name: 'Aisha Khan',
    email: 'aisha.k@example.com',
    participant_code: 'EVT26-P0105',
    organization: 'Web3 Builders Collective',
    track: 'Web3 & DeFi',
    created_at: '2026-11-20T09:45:00Z'
  },
  {
    id: 'part-005-dev',
    full_name: 'Dev Patel',
    email: 'dev.patel@example.com',
    participant_code: 'EVT26-P0106',
    organization: 'Robotics & Automation Society',
    track: 'Robotics',
    created_at: '2026-11-20T10:00:00Z'
  },
  {
    id: 'part-006-ananya',
    full_name: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    participant_code: 'EVT26-P0107',
    organization: 'Design & Code Guild',
    track: 'UI/UX Design',
    created_at: '2026-11-20T10:15:00Z'
  },
  {
    id: 'part-007-karthik',
    full_name: 'Karthik Subramanian',
    email: 'karthik.s@example.com',
    participant_code: 'EVT26-P0108',
    organization: 'Open Source Community',
    track: 'Cloud & DevOps',
    created_at: '2026-11-20T10:30:00Z'
  },
  {
    id: 'part-008-tanya',
    full_name: 'Tanya Gupta',
    email: 'tanya.g@example.com',
    participant_code: 'EVT26-P0109',
    organization: 'Data Science Club',
    track: 'Data Science',
    created_at: '2026-11-20T11:00:00Z'
  }
];

// Initial seeded transactions
const INITIAL_TRANSACTIONS = [
  {
    id: 'pt-init-01',
    participant_id: 'part-002-sarah',
    activity_id: 'act-quiz-01',
    points: 920,
    transaction_type: 'quiz_award',
    reason: 'Algorithmic Blitz: 92/100 correct answers in 4 minutes',
    created_at: '2026-11-21T12:00:00Z'
  },
  {
    id: 'pt-init-02',
    participant_id: 'part-002-sarah',
    activity_id: 'act-off-01',
    points: 480,
    transaction_type: 'offline_challenge',
    reason: 'Hardware Lab: Decoded UART firmware in record time',
    created_at: '2026-11-22T11:30:00Z'
  },
  {
    id: 'pt-init-03',
    participant_id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    activity_id: 'act-quiz-01',
    points: 850,
    transaction_type: 'quiz_award',
    reason: 'Algorithmic Blitz: 85/100 score',
    created_at: '2026-11-21T12:15:00Z'
  },
  {
    id: 'pt-init-04',
    participant_id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
    activity_id: 'act-off-02',
    points: 520,
    transaction_type: 'offline_challenge',
    reason: 'UI/UX Sprint: Highest accessibility score',
    created_at: '2026-11-22T15:00:00Z'
  },
  {
    id: 'pt-init-05',
    participant_id: 'part-003-rohan',
    activity_id: 'act-quiz-01',
    points: 890,
    transaction_type: 'quiz_award',
    reason: 'Algorithmic Blitz: 89/100 score',
    created_at: '2026-11-21T12:20:00Z'
  },
  {
    id: 'pt-init-06',
    participant_id: 'part-003-rohan',
    activity_id: 'act-off-03',
    points: 400,
    transaction_type: 'offline_challenge',
    reason: 'Rover Arena: Second fastest track completion',
    created_at: '2026-11-23T11:00:00Z'
  },
  {
    id: 'pt-init-07',
    participant_id: 'part-004-aisha',
    activity_id: 'act-quiz-03',
    points: 1100,
    transaction_type: 'quiz_award',
    reason: 'Smart Contract Audit: Discovered critical reentrancy vector',
    created_at: '2026-11-21T14:30:00Z'
  },
  {
    id: 'pt-init-08',
    participant_id: 'part-005-dev',
    activity_id: 'act-off-03',
    points: 700,
    transaction_type: 'offline_challenge',
    reason: 'Rover Arena: 1st place in LiDAR navigation obstacle trial',
    created_at: '2026-11-23T11:45:00Z'
  },
  {
    id: 'pt-init-09',
    participant_id: 'part-006-ananya',
    activity_id: 'act-off-02',
    points: 580,
    transaction_type: 'offline_challenge',
    reason: 'UI/UX Sprint: Outstanding design system & dark mode aesthetics',
    created_at: '2026-11-22T15:20:00Z'
  },
  {
    id: 'pt-init-10',
    participant_id: 'part-007-karthik',
    activity_id: 'act-quiz-02',
    points: 740,
    transaction_type: 'quiz_award',
    reason: 'AI CTF: Jailbreak challenge solved with prompt chain',
    created_at: '2026-11-21T16:00:00Z'
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
    this._initStorage();
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

  // --- Participants ---

  getParticipants() {
    try {
      const data = safeGetItem(STORAGE_KEY_PARTICIPANTS);
      return data ? JSON.parse(data) : INITIAL_PARTICIPANTS;
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  }

  getParticipantById(id) {
    const list = this.getParticipants();
    return list.find((p) => p.id === id || p.participant_code === id || p.email === id) || null;
  }

  registerParticipant({ fullName, email, organization = '', track = 'General Tech' }) {
    if (!fullName || !email) throw new Error('Full name and email are required');
    const existing = this.getParticipants();

    const normalizedEmail = email.trim().toLowerCase();
    const duplicate = existing.find((p) => p.email.toLowerCase() === normalizedEmail);
    if (duplicate) {
      return duplicate;
    }

    const nextNum = existing.length + 101;
    const code = `EVT26-P${String(nextNum).padStart(4, '0')}`;
    const newParticipant = {
      id: `part-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      full_name: fullName.trim(),
      email: normalizedEmail,
      participant_code: code,
      organization: organization.trim() || 'VIT Tech Guild',
      track: track.trim() || 'General Tech',
      created_at: new Date().toISOString()
    };

    const updated = [newParticipant, ...existing];
    safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(updated));
    this._notify();
    return newParticipant;
  }

  // --- Activities ---

  getActivities() {
    try {
      const data = safeGetItem(STORAGE_KEY_ACTIVITIES);
      return data ? JSON.parse(data) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  }

  getActivityById(id) {
    return this.getActivities().find((a) => a.id === id) || null;
  }

  createActivity({ title, type, max_points, description = '', starts_at, ends_at }) {
    if (!title || !type || !max_points) {
      throw new Error('Title, type, and max_points are required');
    }

    const list = this.getActivities();
    const newActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      type,
      max_points: Number(max_points),
      description: description.trim(),
      is_active: true,
      starts_at: starts_at || new Date().toISOString(),
      ends_at: ends_at || new Date(Date.now() + 86400000 * 3).toISOString(),
      created_at: new Date().toISOString()
    };

    const updated = [newActivity, ...list];
    safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(updated));
    this._notify();
    return newActivity;
  }

  toggleActivity(id) {
    const list = this.getActivities();
    const updated = list.map((act) => (act.id === id ? { ...act, is_active: !act.is_active } : act));
    safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(updated));
    this._notify();
    return updated.find((a) => a.id === id);
  }

  // --- Transactions & Points Engine ---

  getTransactions(filter = {}) {
    let list = [];
    try {
      const data = safeGetItem(STORAGE_KEY_TRANSACTIONS);
      list = data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
    } catch {
      list = INITIAL_TRANSACTIONS;
    }

    if (filter.participantId) {
      list = list.filter((t) => t.participant_id === filter.participantId);
    }
    if (filter.activityId) {
      list = list.filter((t) => t.activity_id === filter.activityId);
    }
    if (filter.type) {
      list = list.filter((t) => t.transaction_type === filter.type);
    }

    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  recordTransaction({
    participant_id,
    activity_id = null,
    points,
    transaction_type = 'quiz_award',
    reason = '',
    admin_id = null
  }) {
    if (!participant_id) throw new Error('participant_id is required');
    if (typeof points !== 'number' || isNaN(points)) throw new Error('points must be a valid number');

    // Leaderboard lock check
    if (this.isLeaderboardLocked() && transaction_type !== 'manual_adjustment') {
      throw new Error('Leaderboard is locked. Further score changes require admin unlock.');
    }

    const currentList = this.getTransactions();
    const newTx = {
      id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      participant_id,
      activity_id,
      points: Math.round(points),
      transaction_type,
      reason: reason.trim() || 'Points transaction',
      admin_id,
      created_at: new Date().toISOString()
    };

    const updated = [newTx, ...currentList];
    safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(updated));
    this._notify();
    return newTx;
  }

  // --- Leaderboard & Ranking Computation ---

  getLeaderboard() {
    const participants = this.getParticipants();
    const transactions = this.getTransactions();
    const activities = this.getActivities();
    const activityMap = new Map(activities.map((a) => [a.id, a]));

    const participantMap = new Map();
    participants.forEach((p) => {
      participantMap.set(p.id, {
        participant_id: p.id,
        full_name: p.full_name,
        email: p.email,
        participant_code: p.participant_code,
        organization: p.organization,
        track: p.track || 'General Tech',
        total_points: 0,
        quiz_points: 0,
        offline_points: 0,
        manual_adjustments: 0,
        activity_count: 0,
        last_updated: p.created_at
      });
    });

    transactions.forEach((tx) => {
      let entry = participantMap.get(tx.participant_id);
      if (!entry) {
        // Fallback for dynamically created IDs
        entry = {
          participant_id: tx.participant_id,
          full_name: 'Club Competitor',
          email: '',
          participant_code: tx.participant_id.substring(0, 10).toUpperCase(),
          organization: 'VIT Club',
          track: 'General Tech',
          total_points: 0,
          quiz_points: 0,
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
      } else {
        entry.manual_adjustments += tx.points;
      }

      if (new Date(tx.created_at) > new Date(entry.last_updated)) {
        entry.last_updated = tx.created_at;
      }
    });

    // Sort descending by total_points, then by quiz_points
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

  // --- Reset & Mock Data Generation ---

  resetToDefaults() {
    safeSetItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    safeSetItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(INITIAL_PARTICIPANTS));
    safeSetItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
    safeRemoveItem(STORAGE_KEY_DECLARATION);
    this._notify();
  }
}

export const eventStore = new EventStore();
export default eventStore;
