import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-secret',
}

serve(async (req) => {
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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Fetch Story
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .single()

    if (storyError || !story) throw new Error('Story not found')

    // 3. Fetch All Confirmed Subscribers
    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('email, unsubscribe_token')
      .eq('status', 'confirmed')

    if (subError) throw subError
    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: 'No confirmed subscribers found' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 4. Send Emails via Resend (Batching recommended for very large lists, but here we loop)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const SITE_URL = (Deno.env.get('SITE_URL') ?? 'https://axomcars.in').trim().replace(/\/$/, '')
    
    console.log(`Broadcasting story "${story.title}" to ${subscribers.length} subscribers...`)

    const results = await Promise.all(subscribers.map(async (sub) => {
      const unsubscribeLink = `${Deno.env.get('SUPABASE_URL')}/functions/v1/newsletter-handler/unsubscribe?token=${sub.unsubscribe_token}`
      
      return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Axom Cars <onboarding@resend.dev>',
          to: [sub.email],
          subject: story.title,
          html: `
            <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; background-color: #fff;">
              ${story.image_url ? `<img src="${story.image_url}" alt="${story.title}" style="width: 100%; height: auto; display: block;">` : ''}
              <div style="padding: 30px;">
                <h1 style="color: #1d70b8; margin-top: 0; font-size: 24px;">${story.title}</h1>
                <div style="color: #444; line-height: 1.6; font-size: 16px;">
                  ${story.body.replace(/\n/g, '<br>')}
                </div>
                ${story.cta_link ? `
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${story.cta_link}" style="background-color: #1d70b8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">${story.cta_text}</a>
                  </div>
                ` : ''}
              </div>
              <div style="padding: 20px; background-color: #f9f9f9; text-align: center; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">© 2026 Axom Cars. All rights reserved.</p>
                <p style="margin-top: 10px;"><a href="${unsubscribeLink}" style="color: #1d70b8; font-size: 12px; text-decoration: underline;">Unsubscribe</a></p>
              </div>
            </div>
          `,
        }),
      })
    }))

    // 5. Mark as sent
    await supabase.from('stories').update({ sent_to_subscribers: true }).eq('id', storyId)

    return new Response(JSON.stringify({ 
      message: `Successfully sent to ${subscribers.length} subscribers!`,
      details: results.map(r => r.status) 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Broadcast error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
