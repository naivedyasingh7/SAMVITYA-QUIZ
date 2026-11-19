import { useState } from 'react';

export function useNotification() {
  const [notification, setNotification] = useState(null);

  const show = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  return { notification, show };
}
