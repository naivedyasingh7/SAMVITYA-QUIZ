import React, { createContext, useContext, useState } from 'react';

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
  const loginParticipant = ({ codeOrEmail = 'EVT26-P0102' } = {}) => {
    const isEmail = codeOrEmail.includes('@');
    const participantUser = {
      id: 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
      name: 'Alex Mercer',
      email: isEmail ? codeOrEmail : 'alex.mercer@example.com',
      code: isEmail ? 'EVT26-P0102' : codeOrEmail.toUpperCase(),
      role: 'participant'
    };
    setAuthSession('participant', participantUser);
    return participantUser;
  };

  /**
   * Register a new Participant
   */
  const registerParticipant = ({ fullName, email, organization = '' }) => {
    const randomCode = `EVT26-P${Math.floor(1000 + Math.random() * 9000)}`;
    const randomUuid = `part-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newParticipant = {
      id: randomUuid,
      name: fullName.trim(),
      email: email.trim(),
      organization: organization.trim(),
      code: randomCode,
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
        isAdmin: role === 'admin',
        isParticipant: role === 'participant',
        isAuthenticated: Boolean(currentUser && role !== 'guest'),
        loginAdmin,
        loginParticipant,
        registerParticipant,
        logout,
        setRole: (r) => setAuthSession(r, currentUser)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
