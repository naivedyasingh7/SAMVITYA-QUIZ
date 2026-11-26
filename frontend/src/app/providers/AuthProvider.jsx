import React, { createContext, useContext, useState } from 'react';
import { eventStore } from '../../shared/services/eventStore.js';
import { sanitizeEmail, sanitizeText } from '@shared/utils/sanitize.js';

const AuthContext = createContext(null);

const STORAGE_KEY_ROLE = 'epms_role';
const STORAGE_KEY_USER = 'epms_user';
const STORAGE_KEY_LOCKOUT = 'epms_admin_lockout';

// Configured via environment variables with event defaults
const EXPECTED_ADMIN_USERNAME = (
  (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_ADMIN_USERNAME) ||
  'ADMIN2026'
).trim();

const EXPECTED_ADMIN_SECRET = (
  (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_ADMIN_PASSWORD) ||
  'WRONGPASSWORD2026'
);

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 30 * 1000; // 30 seconds brute-force cooldown
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12-hour session expiry

function isSessionValid(user) {
  if (!user || typeof user !== 'object') return false;
  if (user.expiresAt && Date.now() > user.expiresAt) return false;
  return true;
}

export function AuthProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      const parsed = savedUser ? JSON.parse(savedUser) : null;
      if (!isSessionValid(parsed)) {
        localStorage.removeItem(STORAGE_KEY_ROLE);
        localStorage.removeItem(STORAGE_KEY_USER);
        return 'guest';
      }
      return localStorage.getItem(STORAGE_KEY_ROLE) || 'guest';
    } catch {
      return 'guest';
    }
  });

  const [currentUser, setCurrentUserState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      const parsed = saved ? JSON.parse(saved) : null;
      return isSessionValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  });

  const setAuthSession = (newRole, newUser) => {
    setRoleState(newRole);
    setCurrentUserState(newUser);
    try {
      if (newRole && newRole !== 'guest' && newUser) {
        const sessionPayload = {
          ...newUser,
          expiresAt: Date.now() + SESSION_TTL_MS
        };
        localStorage.setItem(STORAGE_KEY_ROLE, newRole);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sessionPayload));
      } else {
        localStorage.removeItem(STORAGE_KEY_ROLE);
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (_) {}
  };

  /**
   * Log in as an Administrator with credential validation & brute-force rate limiting.
   */
  const loginAdmin = ({ username, email, password } = {}) => {
    // Check brute-force lockout
    try {
      const rawLock = localStorage.getItem(STORAGE_KEY_LOCKOUT);
      if (rawLock) {
        const lockState = JSON.parse(rawLock);
        if (lockState.lockedUntil && Date.now() < lockState.lockedUntil) {
          const secs = Math.ceil((lockState.lockedUntil - Date.now()) / 1000);
          throw new Error(`Too many failed attempts. Please wait ${secs}s before retrying.`);
        }
      }
    } catch (err) {
      if (err.message.includes('Too many failed attempts')) throw err;
    }

    const cleanUser = sanitizeText(username || email || '', 64);
    const cleanPass = String(password || '');

    if (!cleanUser || !cleanPass) {
      throw new Error('Admin username and password are required.');
    }

    const validUser = cleanUser === EXPECTED_ADMIN_USERNAME;
    const validPass = cleanPass === EXPECTED_ADMIN_SECRET;

    if (!validUser || !validPass) {
      try {
        const rawLock = localStorage.getItem(STORAGE_KEY_LOCKOUT);
        const lockState = rawLock ? JSON.parse(rawLock) : { attempts: 0, lockedUntil: null };
        const nextAttempts = (lockState.attempts || 0) + 1;
        const lockedUntil = nextAttempts >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_MS : null;
        localStorage.setItem(
          STORAGE_KEY_LOCKOUT,
          JSON.stringify({ attempts: lockedUntil ? 0 : nextAttempts, lockedUntil })
        );
      } catch (_) {}
      throw new Error('Invalid administrator username or password.');
    }

    // Clear lockout on success
    try {
      localStorage.removeItem(STORAGE_KEY_LOCKOUT);
    } catch (_) {}

    const adminUser = {
      id: 'admin-001',
      name: cleanUser,
      username: cleanUser,
      role: 'admin'
    };
    setAuthSession('admin', adminUser);
    return adminUser;
  };

  /**
   * Log in an existing Participant by code or email
   */
  const loginParticipant = ({ codeOrEmail = '' } = {}) => {
    const cleanInput = sanitizeText(codeOrEmail, 128);
    if (!cleanInput) {
      throw new Error('Participant username or email is required.');
    }

    const target = eventStore.getParticipantById(cleanInput);
    if (!target) {
      throw new Error(`No registered participant found for "${cleanInput}". Please register first.`);
    }

    const participantUser = {
      id: target.id,
      name: target.full_name,
      email: target.email,
      code: target.username || target.participant_code,
      username: target.username || target.participant_code,
      organization: target.organization,
      track: target.track,
      role: 'participant'
    };
    setAuthSession('participant', participantUser);
    return participantUser;
  };

  /**
   * Register a new Participant with sequential unique username P00x
   */
  const registerParticipant = ({ fullName, email, organization = '', track = 'General Tech' }) => {
    const cleanName = sanitizeText(fullName, 128);
    const cleanEmail = sanitizeEmail(email);
    const cleanOrg = sanitizeText(organization, 128);
    const cleanTrack = sanitizeText(track, 64);

    if (!cleanName || !cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error('A valid full name and email address are required.');
    }

    const created = eventStore.registerParticipant({
      fullName: cleanName,
      email: cleanEmail,
      organization: cleanOrg,
      track: cleanTrack
    });

    const newParticipant = {
      id: created.id,
      name: created.full_name,
      email: created.email,
      organization: created.organization,
      track: created.track,
      code: created.username || created.participant_code,
      username: created.username || created.participant_code,
      role: 'participant'
    };
    setAuthSession('participant', newParticipant);
    return newParticipant;
  };

  /**
   * Log out current user
   */
  const logout = () => {
    setAuthSession('guest', null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAdmin: role === 'admin' && isSessionValid(currentUser),
        isParticipant: role === 'participant' && isSessionValid(currentUser),
        isAuthenticated: Boolean(currentUser && role !== 'guest' && isSessionValid(currentUser)),
        loginAdmin,
        loginParticipant,
        registerParticipant,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
