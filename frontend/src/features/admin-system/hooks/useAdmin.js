import { useState } from 'react';

export function useAdmin() {
  const [adminUser, setAdminUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return { adminUser, isAuthenticated };
}
