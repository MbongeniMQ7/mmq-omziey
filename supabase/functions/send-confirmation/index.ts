import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, goal, message } = await req.json();

    if (!name || !email || !goal) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, goal" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Save application to Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await supabase.from("applications").insert([
      { name, email, phone, goal, message }
    ]);

    if (dbError) {
      console.error("DB insert error:", dbError);
    }

    // 2. Send confirmation email via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Flexi <onboarding@resend.dev>",
        to: [email],
        subject: "We received your application — Flexi Fitness",
        html: `
          <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 560px; margin: 0 auto; background: #FAF5FA; padding: 40px 32px; border-radius: 16px;">
            <h1 style="font-size: 28px; font-weight: 800; text-transform: uppercase; color: #191417; margin-bottom: 4px; letter-spacing: 1px;">
              FLEXI
            </h1>
            <p style="font-size: 11px; color: #E12E99; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 32px;">Train Smarter. Move Better. Live Longer.</p>

            <h2 style="font-size: 22px; font-weight: 700; color: #191417; margin-bottom: 12px;">
              Hey ${name}, you're in! 🎉
            </h2>
            <p style="color: #756C73; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
              We've received your application for <strong style="color: #191417;">${goal}</strong>. 
              Omziey will personally review your goals and reach out within <strong style="color: #E12E99;">24 hours</strong> to schedule your free consultation.
            </p>

            <div style="background: #fff; border: 1px solid rgba(25,20,23,0.08); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
              <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #756C73; margin: 0 0 12px;">Your Application Summary</p>
              <table style="width: 100%; font-size: 13px; color: #191417; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #756C73;">Name</td><td style="text-align: right; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 6px 0; color: #756C73; border-top: 1px solid rgba(25,20,23,0.06);">Goal</td><td style="text-align: right; font-weight: 600; color: #E12E99;">${goal}</td></tr>
                <tr><td style="padding: 6px 0; color: #756C73; border-top: 1px solid rgba(25,20,23,0.06);">Phone</td><td style="text-align: right; font-weight: 600;">${phone || "—"}</td></tr>
              </table>
            </div>

            <a href="https://wa.me/27676164204?text=Hi%20Omziey%2C%20I%20just%20applied%20on%20the%20Flexi%20website%20and%20want%20to%20start%20ASAP!"
              style="display: inline-block; background: #25D366; color: #fff; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 28px; border-radius: 50px; margin-bottom: 32px;">
              Chat on WhatsApp
            </a>

            <p style="font-size: 11px; color: #756C73; border-top: 1px solid rgba(25,20,23,0.06); padding-top: 20px; margin: 0;">
              © 2025 Flexi Fitness · Designed by <a href="https://www.instagram.com/mbongrizzy_rsa/" style="color: #E12E99;">Mbongrizzy</a>
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error("Resend error:", err);
      return new Response(
        JSON.stringify({ error: "Failed to send email", detail: err }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-confirmation' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
