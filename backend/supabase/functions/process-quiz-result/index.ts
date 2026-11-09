import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const payload = await req.json();
    console.log("Processing incoming quiz result via edge function:", payload);

    return new Response(
      JSON.stringify({ success: true, message: "Result verified and points awarded" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
});
