import { supabase } from '../utils/supabaseClient.js';

/**
 * Enforces Admin authorization on backend routes.
 * Validates Bearer JWT against Supabase Auth and verifies admin membership.
 */
export async function requireAdminRole(req, res, next) {
  try {
    const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Missing or malformed Bearer token'
      });
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Empty access token'
      });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or expired token'
      });
    }

    const { data: adminRecord, error: adminErr } = await supabase
      .from('admins')
      .select('id, role, is_active')
      .eq('id', data.user.id)
      .eq('is_active', true)
      .single();

    if (adminErr || !adminRecord) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Active administrator privileges required'
      });
    }

    req.user = data.user;
    req.admin = adminRecord;
    return next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Authentication verification failed'
    });
  }
}
