import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const { full_name, email, organization } = await req.json();
    // Generate unique participant code e.g. EVT26-Pxxxx
    const code = `EVT26-P${Math.floor(1000 + Math.random() * 9000)}`;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: crypto.randomUUID(),
          participant_code: code,
          full_name,
          email,
          organization
        }
      }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
});
