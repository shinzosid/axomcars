import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL")

// WhatsApp Cloud API Configuration
const WHATSAPP_ACCESS_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN")
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID")
const WHATSAPP_RECIPIENT_PHONE = Deno.env.get("WHATSAPP_RECIPIENT_PHONE")
const WHATSAPP_TEMPLATE_NAME = Deno.env.get("WHATSAPP_TEMPLATE_NAME") || "new_lead_alert"


serve(async (req) => {
  try {
    // Check method
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    // Ensure environment variables are set
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !RESEND_API_KEY || !ADMIN_EMAIL) {
      console.error("Missing environment variables.")
      return new Response(JSON.stringify({ error: "Server Configuration Error" }), { status: 500 })
    }

    // Parse the payload from the database webhook
    const payload = await req.json()
    const lead = payload.record // The inserted row from 'leads' table

    if (!lead) {
      return new Response(JSON.stringify({ error: "Invalid payload format" }), { status: 400 })
    }

    // Format the time securely based on the created_at timestamp
    const dateObj = new Date(lead.created_at)
    const timeString = dateObj.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    const dateString = dateObj.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

    // 1. Format Telegram Message (HTML)
    const telegramMessage = `
🚗 <b>New Website Lead</b>

👤 <b>Name:</b> ${lead.name}
📞 <b>Phone:</b> <a href="tel:${lead.phone}">${lead.phone}</a>
✉️ <b>Email:</b> ${lead.email || "N/A"}
🚘 <b>Interested In:</b> ${lead.vehicle || "N/A"}
📍 <b>Location:</b> ${lead.location || "N/A"}
📅 <b>Date:</b> ${dateString}
🕒 <b>Time:</b> ${timeString}

⚡ <b>Source:</b> ${lead.source || "Website Lead Form"}
    `.trim()

    // 2. Format Email Content (HTML)
    const emailHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #1d70b8; text-align: center;">🚗 New Lead Received</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Phone:</strong> <a href="tel:${lead.phone}" style="color: #1d70b8; text-decoration: none;">${lead.phone}</a></p>
          <p><strong>Email:</strong> ${lead.email || "N/A"}</p>
          <p><strong>Interested In:</strong> ${lead.vehicle || "N/A"}</p>
          <p><strong>Location:</strong> ${lead.location || "N/A"}</p>
          <p><strong>Source:</strong> ${lead.source || "Website Lead Form"}</p>
          <p><strong>Date:</strong> ${dateString}</p>
          <p><strong>Time:</strong> ${timeString}</p>
        </div>
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
          Automated via Axom Cars Supabase System
        </p>
      </div>
    `

    // --- EXECUTION ---

    const hasWhatsAppConfig = !!(WHATSAPP_ACCESS_TOKEN && WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_RECIPIENT_PHONE)

    // Send to Telegram
    const telegramPromise = fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    // Send Email via Resend
    const emailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Leads <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `🚗 New Lead: ${lead.name} - ${lead.vehicle || "Inquiry"}`,
        html: emailHtml,
      }),
    })

    // Send WhatsApp Template Message if configured
    let whatsappPromise: Promise<Response | null> = Promise.resolve(null)
    if (hasWhatsAppConfig) {
      whatsappPromise = fetch(`https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: WHATSAPP_RECIPIENT_PHONE,
          type: "template",
          template: {
            name: WHATSAPP_TEMPLATE_NAME,
            language: {
              code: "en_US",
            },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: lead.name },
                  { type: "text", text: lead.phone },
                  { type: "text", text: lead.vehicle || "N/A" },
                  { type: "text", text: lead.location || "N/A" },
                  { type: "text", text: lead.source || "Website Lead Form" },
                ],
              },
            ],
          },
        }),
      })
    } else {
      console.log("WhatsApp credentials not fully configured. Skipping WhatsApp alert.")
    }

    const [telRes, emailRes, waRes] = await Promise.all([telegramPromise, emailPromise, whatsappPromise])

    if (!telRes.ok) {
      console.error("Telegram Error:", await telRes.text())
    }
    if (!emailRes.ok) {
      console.error("Resend Error:", await emailRes.text())
    }
    if (waRes && !waRes.ok) {
      console.error("WhatsApp Error:", await waRes.text())
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    console.error("Function error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
