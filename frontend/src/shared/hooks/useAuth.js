import { useAuthContext } from '../../app/providers/AuthProvider.jsx';

export function useAuth() {
  return useAuthContext();
}
