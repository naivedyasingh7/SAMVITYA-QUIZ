import { useState, useEffect } from 'react';
import { storage } from '../../shared/utils/storage.js';

export function useParticipant() {
  const [participant, setParticipant] = useState(() => storage.get('participant_session'));
  const [isLoading, setIsLoading] = useState(false);

  const saveSession = (data) => {
    storage.set('participant_session', data);
    setParticipant(data);
  };

  const clearSession = () => {
    storage.remove('participant_session');
    setParticipant(null);
  };

  return { participant, saveSession, clearSession, isLoading };
}
