import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY secret");
    }

    const url = new URL(req.url);
    const limit = Math.min(500, Math.max(1, Number(url.searchParams.get("limit") || 100)));
    const offset = Math.max(0, Number(url.searchParams.get("offset") || 0));

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Query pre-aggregated leaderboard joined with participant profile
    const { data, error } = await supabase
      .from("leaderboard")
      .select(`
        participant_id,
        total_points,
        online_points,
        offline_points,
        last_updated_at,
        participants!inner (
          participant_code,
          full_name,
          status
        )
      `)
      .eq("participants.status", "active")
      .order("total_points", { ascending: false })
      .order("online_points", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const ranked = (data || []).map((row, idx) => ({
      rank: offset + idx + 1,
      participant_id: row.participant_id,
      participant_code: row.participants?.participant_code,
      full_name: row.participants?.full_name,
      quiz_points: row.online_points,
      offline_points: row.offline_points,
      total_points: row.total_points,
      last_updated: row.last_updated_at
    }));

    return new Response(
      JSON.stringify({ success: true, count: ranked.length, data: ranked }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=5, s-maxage=5, stale-while-revalidate=10"
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
