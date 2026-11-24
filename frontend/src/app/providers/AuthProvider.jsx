import React, { createContext, useContext, useState } from 'react';
import { eventStore } from '../../shared/services/eventStore.js';

const AuthContext = createContext(null);

const STORAGE_KEY_ROLE = 'epms_role';
const STORAGE_KEY_USER = 'epms_user';

export function AuthProvider({ children }) {
  // Read persisted authentication state from localStorage
  const [role, setRoleState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ROLE) || 'guest';
    } catch {
      return 'guest';
    }
  });

  const [currentUser, setCurrentUserState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setAuthSession = (newRole, newUser) => {
    setRoleState(newRole);
    setCurrentUserState(newUser);
    try {
      if (newRole && newRole !== 'guest') {
        localStorage.setItem(STORAGE_KEY_ROLE, newRole);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_ROLE);
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (_) {}
  };

  /**
   * Log in as an Administrator
   */
  const loginAdmin = ({ email = 'admin@event.org', password = '' } = {}) => {
    const adminUser = {
      id: 'admin-001',
      name: 'Event Administrator',
      email: email || 'admin@event.org',
      role: 'admin'
    };
    setAuthSession('admin', adminUser);
    return adminUser;
  };

  /**
   * Log in an existing Participant by code or email
   */
  const loginParticipant = ({ codeOrEmail = 'P001' } = {}) => {
    const target = eventStore.getParticipantById(codeOrEmail);
    if (target) {
      const participantUser = {
        id: target.id,
        name: target.full_name,
        email: target.email,
        code: target.username || target.participant_code || 'P001',
        username: target.username || target.participant_code || 'P001',
        organization: target.organization,
        track: target.track,
        role: 'participant'
      };
      setAuthSession('participant', participantUser);
      return participantUser;
    }

    const isEmail = codeOrEmail.includes('@');
    const participantUser = {
      id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
      name: 'Alex Mercer',
      email: isEmail ? codeOrEmail : 'alex.mercer@example.com',
      code: isEmail ? 'P001' : codeOrEmail.toUpperCase(),
      username: isEmail ? 'P001' : codeOrEmail.toUpperCase(),
      role: 'participant'
    };
    setAuthSession('participant', participantUser);
    return participantUser;
  };

  /**
   * Register a new Participant with sequential unique username P00x
   */
  const registerParticipant = ({ fullName, email, organization = '', track = 'General Tech' }) => {
    const created = eventStore.registerParticipant({ fullName, email, organization, track });
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
        setCurrentUser: (u) => setAuthSession(role, u),
        role,
        setRole: (r) => setAuthSession(r, currentUser),
        isAdmin: role === 'admin',
        isParticipant: role === 'participant',
        isAuthenticated: Boolean(currentUser && role !== 'guest'),
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
