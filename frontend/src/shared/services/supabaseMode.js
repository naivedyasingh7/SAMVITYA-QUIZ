import { supabase } from '../../../../backend/utils/supabaseClient.js';

export function isLiveSupabaseMode() {
  try {
    return import.meta.env.VITE_ENABLE_MOCK_DATA === 'false';
  } catch {
    return false;
  }
}

export { supabase };
