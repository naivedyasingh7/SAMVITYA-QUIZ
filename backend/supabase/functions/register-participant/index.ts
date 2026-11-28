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
    const { full_name, email, phone, organization } = await req.json();

    const cleanName = String(full_name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanName || !cleanEmail) {
      return new Response(
        JSON.stringify({ success: false, error: "full_name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Returning participant check (idempotent by email)
    const { data: existing } = await supabase
      .from("participants")
      .select("*")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ success: true, returning: true, data: existing }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Atomic sequence-based participant code (collision-free under 500 concurrent requests)
    const { data: codeData, error: seqErr } = await supabase.rpc("next_participant_code");
    if (seqErr) throw seqErr;

    const participantCode = codeData || `P${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: created, error: insertErr } = await supabase
      .from("participants")
      .insert({
        participant_code: participantCode,
        full_name: cleanName,
        email: cleanEmail,
        phone: phone ? String(phone).trim() : null,
        organization: organization ? String(organization).trim() : null,
        status: "active"
      })
      .select()
      .single();

    if (insertErr) throw insertErr;

    // Initialize leaderboard row with 0 points
    await supabase
      .from("leaderboard")
      .upsert({ participant_id: created.id, total_points: 0, online_points: 0, offline_points: 0 });

    return new Response(
      JSON.stringify({ success: true, returning: false, data: created }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
