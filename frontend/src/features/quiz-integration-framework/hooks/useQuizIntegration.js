import { useState } from 'react';

export function useQuizIntegration() {
  const [activeAttempt, setActiveAttempt] = useState(null);
  return { activeAttempt, setActiveAttempt };
}
