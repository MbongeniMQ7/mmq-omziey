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

    // 2. Fetch brochure PDF and encode as base64 for attachment
    let brochureAttachment: { filename: string; content: string } | null = null;
    try {
      const pdfRes = await fetch("https://remix-flexi.vercel.app/Flexi_Brochure_Book_v3.pdf");
      if (pdfRes.ok) {
        const pdfBuffer = await pdfRes.arrayBuffer();
        const uint8 = new Uint8Array(pdfBuffer);
        let binary = "";
        for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
        brochureAttachment = {
          filename: "Flexi_Brochure_Book_v3.pdf",
          content: btoa(binary),
        };
      }
    } catch (e) {
      console.error("Failed to fetch brochure:", e);
    }

    // 3. Send confirmation email via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Flexi <onboarding@resend.dev>",
        to: [email],
        subject: `${name}, your Flexi application is confirmed ✓`,
        attachments: brochureAttachment ? [brochureAttachment] : undefined,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Flexi Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f0e8f0;font-family:'Helvetica Neue',Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0e8f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header bar -->
          <tr>
            <td style="background:#191417;border-radius:16px 16px 0 0;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:26px;font-weight:900;letter-spacing:4px;color:#ffffff;text-transform:uppercase;">FLEXI</p>
                    <p style="margin:6px 0 0;font-size:10px;color:#E12E99;text-transform:uppercase;letter-spacing:3px;">Train Smarter · Move Better · Live Longer</p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:#E12E99;color:#fff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:6px 14px;border-radius:50px;">Confirmed ✓</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pink accent line -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#E12E99,#ff6ec7);"></td>
          </tr>

          <!-- Main body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <!-- Greeting -->
              <p style="margin:0 0 6px;font-size:22px;font-weight:800;color:#191417;letter-spacing:-0.3px;">
                Hey ${name} 👋
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#756C73;line-height:1.7;">
                We've received your application and you're one step closer to your best self.
                <strong style="color:#191417;">Omolemo</strong> will personally review your goals and
                reach out within <strong style="color:#E12E99;">24 hours</strong> to lock in your
                free consultation.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:rgba(25,20,23,0.07);margin-bottom:28px;"></div>

              <!-- Application summary card -->
              <p style="margin:0 0 14px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;color:#E12E99;">
                Your Application
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF5FA;border-radius:12px;border:1px solid rgba(25,20,23,0.07);overflow:hidden;">
                <tr style="border-bottom:1px solid rgba(25,20,23,0.07);">
                  <td style="padding:14px 20px;font-size:12px;color:#756C73;text-transform:uppercase;letter-spacing:1px;width:40%;">Name</td>
                  <td style="padding:14px 20px;font-size:13px;font-weight:700;color:#191417;text-align:right;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(25,20,23,0.07);">
                  <td style="padding:14px 20px;font-size:12px;color:#756C73;text-transform:uppercase;letter-spacing:1px;">Goal</td>
                  <td style="padding:14px 20px;font-size:13px;font-weight:700;color:#E12E99;text-align:right;">${goal}</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(25,20,23,0.07);">
                  <td style="padding:14px 20px;font-size:12px;color:#756C73;text-transform:uppercase;letter-spacing:1px;">Phone</td>
                  <td style="padding:14px 20px;font-size:13px;font-weight:600;color:#191417;text-align:right;">${phone || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:12px;color:#756C73;text-transform:uppercase;letter-spacing:1px;">Email</td>
                  <td style="padding:14px 20px;font-size:13px;font-weight:600;color:#191417;text-align:right;">${email}</td>
                </tr>
              </table>

              <!-- What happens next -->
              <div style="margin:32px 0 28px;background:#FAF5FA;border-left:3px solid #E12E99;border-radius:0 10px 10px 0;padding:18px 20px;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#E12E99;">What happens next?</p>
                <p style="margin:4px 0;font-size:13px;color:#191417;line-height:1.7;">
                  1 · Omolemo reviews your goal profile<br/>
                  2 · You get a personalised program outline<br/>
                  3 · Free 30-min consultation call is scheduled
                </p>
              </div>

              <!-- CTA buttons -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="https://wa.me/27676164204?text=Hi%20Omolemo%2C%20I%20just%20applied%20on%20the%20Flexi%20website!%20My%20name%20is%20${encodeURIComponent(name)}%20and%20my%20goal%20is%20${encodeURIComponent(goal)}."
                      style="display:inline-block;background:#E12E99;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:14px 24px;border-radius:50px;">
                      Message Omziey
                    </a>
                  </td>
                  <td>
                    <a href="https://remix-flexi.vercel.app"
                      style="display:inline-block;background:transparent;color:#191417;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:13px 24px;border-radius:50px;border:1.5px solid rgba(25,20,23,0.15);">
                      View Programs
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#191417;border-radius:0 0 16px 16px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);line-height:1.7;">
                      © 2025 Flexi Fitness. All rights reserved.<br/>
                      Designed by <a href="https://www.instagram.com/mbongrizzy_rsa/" style="color:#E12E99;text-decoration:none;">Mbongrizzy</a>
                    </p>
                  </td>
                  <td align="right">
                    <a href="https://www.instagram.com/omziey/" style="display:inline-block;margin-left:10px;">
                      <span style="display:inline-block;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);text-align:center;line-height:30px;font-size:13px;color:rgba(255,255,255,0.4);">&#9679;</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
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
