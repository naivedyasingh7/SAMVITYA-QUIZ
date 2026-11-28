import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
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

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const {
      attempt_id,
      participant_id,
      activity_id,
      provider = "internal",
      external_result_id,
      raw_score,
      max_score,
      completion_status = "completed",
      metadata = {}
    } = await req.json();

    if (!participant_id || !activity_id || !external_result_id) {
      return new Response(
        JSON.stringify({ success: false, error: "participant_id, activity_id, and external_result_id are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if leaderboard is locked
    const { data: lockRow } = await supabase
      .from("winner_declarations")
      .select("is_locked")
      .eq("is_locked", true)
      .maybeSingle();

    if (lockRow?.is_locked) {
      return new Response(
        JSON.stringify({ success: false, error: "Leaderboard is locked. Score submissions are closed." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Idempotency check on (activity_id, external_result_id)
    const { data: existingResult } = await supabase
      .from("quiz_results")
      .select("id")
      .eq("activity_id", activity_id)
      .eq("external_result_id", external_result_id)
      .maybeSingle();

    if (existingResult) {
      return new Response(
        JSON.stringify({ success: true, duplicate: true, message: "Result already processed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: activity } = await supabase
      .from("activities")
      .select("max_points, title")
      .eq("id", activity_id)
      .single();

    const maxPts = Number(activity?.max_points || 100);
    const safeMaxScore = Math.max(1, Number(max_score || 100));
    const boundedRaw = Math.max(0, Math.min(safeMaxScore, Number(raw_score || 0)));
    const awardedPoints = completion_status === "disqualified"
      ? 0
      : Math.round((boundedRaw / safeMaxScore) * maxPts);

    // Insert quiz_results row
    const { data: quizResult, error: resErr } = await supabase
      .from("quiz_results")
      .insert({
        attempt_id: attempt_id || crypto.randomUUID(),
        participant_id,
        activity_id,
        provider,
        external_result_id,
        raw_score: boundedRaw,
        max_score: safeMaxScore,
        completion_status,
        metadata
      })
      .select()
      .single();

    if (resErr) throw resErr;

    // Append immutable points_transactions row (trigger updates leaderboard automatically)
    const { data: tx, error: txErr } = await supabase
      .from("points_transactions")
      .insert({
        participant_id,
        activity_id,
        quiz_result_id: quizResult.id,
        points: awardedPoints,
        transaction_type: "quiz_award",
        reason: `${activity?.title || "Quiz"}: Scored ${boundedRaw}/${safeMaxScore}`
      })
      .select()
      .single();

    if (txErr) throw txErr;

    return new Response(
      JSON.stringify({ success: true, awarded_points: awardedPoints, quiz_result: quizResult, transaction: tx }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
