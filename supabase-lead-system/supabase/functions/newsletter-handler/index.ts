import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  console.log(`Newsletter Function: ${req.method} request to ${req.url}`)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    // --- SUBSCRIBE ROUTE ---
    if (req.method === 'POST' && path === 'subscribe') {
      const { email } = await req.json()

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email address' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Check for existing subscriber
      const { data: existing, error: fetchError } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('email', email)
        .single()

      if (existing) {
        if (existing.status === 'confirmed') {
          return new Response(JSON.stringify({ message: 'You are already subscribed!' }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        // If pending or unsubscribed, we proceed to update/send email
      }

      const confirmToken = crypto.randomUUID()
      const unsubscribeToken = crypto.randomUUID()

      const { error: upsertError } = await supabase
        .from('newsletter_subscribers')
        .upsert({
          email,
          status: 'pending',
          confirm_token: confirmToken,
          unsubscribe_token: unsubscribeToken,
          unsubscribed_at: null
        }, { onConflict: 'email' })

      if (upsertError) throw upsertError

      const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
      const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://axomcars.in'

      // Use req.url as base if SUPABASE_URL is missing
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || new URL(req.url).origin
      const confirmLink = `${supabaseUrl}/functions/v1/newsletter-handler/confirm?token=${confirmToken}`

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Axom Cars <onboarding@resend.dev>',
          to: [email],
          subject: 'Confirm your Axom Cars Newsletter subscription',
          html: `
            <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #1d70b8;">Welcome to the Axom Cars Family!</h2>
              <p>Thank you for your interest in our newsletter. Please confirm your email address to start receiving stories, offers, and updates from the world of Tata Motors.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmLink}" style="background-color: #1d70b8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirm Subscription</a>
              </div>
              <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">© 2026 Axom Cars. All rights reserved.</p>
            </div>
          `,
        }),
      })

      if (!res.ok) {
        const resendError = await res.text()
        console.error('Resend error:', resendError)
        throw new Error(`Failed to send confirmation email: ${resendError}`)
      }

      return new Response(JSON.stringify({ message: 'Confirmation email sent! Please check your inbox.' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Helper for clean redirects
    const redirectWithParams = (status: string, msg: string) => {
      const baseUrl = (Deno.env.get('SITE_URL') ?? 'https://axomcars.in').trim().replace(/\/$/, '')
      const redirectUrl = `${baseUrl}/newsletter.html?status=${status}&msg=${encodeURIComponent(msg)}`
      return Response.redirect(redirectUrl, 302)
    }

    // --- CONFIRM ROUTE ---
    if (path === 'confirm') {
      const token = url.searchParams.get('token')
      if (!token) return new Response('Missing token', { status: 400 })

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
        .eq('confirm_token', token)
        .select()
        .single()

      if (error || !data) {
        return redirectWithParams('error', 'Invalid or expired token')
      }

      return redirectWithParams('success', 'Subscription confirmed!')
    }

    // --- UNSUBSCRIBE ROUTE ---
    if (path === 'unsubscribe') {
      const token = url.searchParams.get('token')
      if (!token) return new Response('Missing token', { status: 400 })

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
        .eq('unsubscribe_token', token)
        .select()
        .single()

      if (error || !data) {
        return redirectWithParams('error', 'Could not unsubscribe')
      }

      return redirectWithParams('success', 'You have been unsubscribed')
    }

    return new Response('Not Found', { status: 404 })

  } catch (err: any) {
    const errorMessage = err.message || 'An unknown error occurred'
    console.error('Newsletter Error:', errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
