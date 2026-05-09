import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { S3Client, PutObjectCommand } from "https://esm.sh/@aws-sdk/client-s3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-secret',
}

serve(async (req: Request) => {
  // Handle CORS
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

    // 2. Get the file from request
    // We expect a direct binary body (WebP)
    const blob = await req.blob()
    if (!blob || blob.size === 0) {
      throw new Error('No image data received')
    }

    // 3. R2 Configuration
    const ACCESS_KEY_ID = Deno.env.get('R2_ACCESS_KEY_ID')
    const SECRET_ACCESS_KEY = Deno.env.get('R2_SECRET_ACCESS_KEY')
    const ACCOUNT_ID = Deno.env.get('R2_ACCOUNT_ID')
    const BUCKET_NAME = Deno.env.get('R2_BUCKET_NAME')
    const PUBLIC_DOMAIN = Deno.env.get('R2_PUBLIC_DOMAIN')

    if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !ACCOUNT_ID || !BUCKET_NAME) {
      throw new Error('R2 configuration is missing in environment variables')
    }

    // 4. Initialize S3 Client for R2
    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    })

    // 5. Upload to R2
    const folder = Deno.env.get('R2_FOLDER') || 'newsletter' // Default to newsletter folder
    const fileName = `${folder.replace(/\/$/, '')}/news-${Date.now()}.webp`
    const arrayBuffer = await blob.arrayBuffer()

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: new Uint8Array(arrayBuffer),
      ContentType: 'image/webp',
    }))

    // 6. Return the public URL
    const publicUrl = `${PUBLIC_DOMAIN.replace(/\/$/, '')}/${fileName}`

    return new Response(JSON.stringify({ 
      success: true, 
      publicUrl,
      size: blob.size
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err: any) {
    console.error('R2 Upload Error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
