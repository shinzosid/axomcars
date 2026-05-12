import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-secret',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Security Check
    const adminSecret = req.headers.get('x-admin-secret')
    if (adminSecret !== 'axom_broadcast_2026') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const { storyId } = await req.json()
    if (!storyId) throw new Error('Missing storyId')

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://www.axomcars.in'

    // 2. Get the story details
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .single()

    if (storyError || !story) throw new Error('Story not found')

    // 3. Get all confirmed subscribers
    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'confirmed')

    if (subError) throw subError

    // 4. Send Emails via Resend (Batched or Loop)
    // For simplicity, we loop. For larger lists, use Resend Batch API
    let sentCount = 0
    for (const sub of (subscribers || [])) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Axom Cars <info@axomcars.in>',
            to: [sub.email],
            subject: story.title,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                ${story.image_url ? `<img src="${story.image_url}" style="width: 100%; height: auto;">` : ''}
                <div style="padding: 30px;">
                  <h1 style="color: #1a1a1a; margin-top: 0;">${story.title}</h1>
                  <p style="color: #444; line-height: 1.6; font-size: 16px;">${story.body.replace(/\n/g, '<br>')}</p>
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${SITE_URL}/newsletter.html?id=${story.id}" style="background: #1d70b8; color: #fff; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                      Read Full Story
                    </a>
                  </div>
                  ${story.cta_link ? `
                    <div style="margin-top: 15px; text-align: center;">
                      <a href="${story.cta_link}" style="color: #1d70b8; text-decoration: underline; font-size: 14px;">
                        ${story.cta_text || 'View Related Link'}
                      </a>
                    </div>
                  ` : ''}
                </div>
                <div style="background: #f9f9f9; padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee;">
                  &copy; 2026 Axom Cars, Guwahati<br>
                  <a href="https://axomcars.in/unsubscribe.html?email=${encodeURIComponent(sub.email)}" style="color: #999;">Unsubscribe</a>
                </div>
              </div>
            `
          })
        })
        if (res.ok) sentCount++
      } catch (e) {
        console.error(`Failed to send to ${sub.email}:`, e)
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      sentCount,
      total: subscribers?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err: any) {
    console.error('Broadcast Error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
