# Axom Cars Lead Alert System (Supabase Architecture)

This folder contains a standalone, production-ready lead management and alert system built with Next.js, Supabase Free Tier, and Telegram Bot API. 

## Features
- **100% Free**: Uses Supabase free tier and Telegram Bot API.
- **Secure**: Telegram tokens are hidden in backend Edge Functions, not exposed in the browser.
- **Reliable**: Includes a GitHub Actions heartbeat to prevent Supabase from pausing your project due to inactivity.

---

## 1. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and sign in/create an account.
2. Click **New Project** and select your organization.
3. Enter a project name (e.g., `axom-cars-leads`) and a strong database password.
4. Select a region closest to your customers (e.g., Mumbai or Singapore).
5. Once the project finishes provisioning, go to **Project Settings -> API** to find your `Project URL` and `anon public key`.

## 2. Deploying the Database Schema

You need to create the `leads` table and the trigger that calls the Edge Function.
1. In your Supabase dashboard, go to the **SQL Editor**.
2. Open the file `supabase/migrations/20260508000000_create_leads_table.sql` from this codebase.
3. Copy the entire contents of that file and paste it into the Supabase SQL Editor.
4. Click **Run**. Your table, policies, and triggers are now created!

## 3. Deploying the Edge Function

The Edge Function handles securely sending the Telegram message when a new lead is inserted.

1. Open a terminal and navigate to `supabase-lead-system`:
   ```bash
   cd supabase-lead-system
   ```
2. Log in to the Supabase CLI:
   ```bash
   npx supabase login
   ```
3. Link your local directory to your remote Supabase project:
   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REFERENCE_ID
   ```
   *(You can find your Reference ID in the Supabase Dashboard URL: `https://supabase.com/dashboard/project/<THIS-IS-THE-ID>`)*
4. Set your Telegram secrets securely in Supabase:
   ```bash
   npx supabase secrets set TELEGRAM_BOT_TOKEN="your_bot_token_here"
   npx supabase secrets set TELEGRAM_CHAT_ID="-your_chat_id_here"
   npx supabase secrets set RESEND_API_KEY="your_resend_api_key_here"
   npx supabase secrets set ADMIN_EMAIL="your_admin_email_here"
   ```
5. Deploy the function:
   ```bash
   npx supabase functions deploy telegram-alert
   ```

## 4. Setting up the GitHub Actions Heartbeat

Supabase pauses free projects after 7 days of inactivity. We set up a GitHub Action to prevent this.

1. Go to your GitHub repository for this project.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Add two new Repository Secrets:
   - `SUPABASE_URL`: Your Supabase Project URL.
   - `SUPABASE_ANON_KEY`: Your Supabase anon public key.
4. The workflow in `.github/workflows/supabase-heartbeat.yml` will now automatically ping your database every 2 days to keep it alive!

## 5. Running the Next.js Frontend Locally

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Open the `.env.local` file and add your Supabase URL and Anon Key.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser. Submit a lead, and you should instantly receive a Telegram message!

## 6. Vercel Deployment

To deploy the frontend to the web for free:
1. Create an account on [Vercel.com](https://vercel.com).
2. Click **Add New Project** and import your GitHub repository.
3. Set the Root Directory to `supabase-lead-system/frontend`.
4. In the Environment Variables section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.

---

## Optional Advanced Features Architecture

### CRM Integration
Instead of just sending a Telegram message, you can modify `supabase/functions/telegram-alert/index.ts` to also send a `POST` request to Hubspot, Zoho, or Salesforce APIs using `fetch()`.

### WhatsApp Alerts
Instead of the Telegram API, you can integrate the Meta WhatsApp Cloud API in the Edge Function to send templated WhatsApp messages to your sales team.

### Lead Assignment (Round Robin)
Add a `assigned_to` column in your Supabase `leads` table. Create an Edge Function that triggers before insert (`BEFORE INSERT`), queries your `users` table to find the sales rep with the least leads, and automatically sets the `assigned_to` ID.

### Duplicate Lead Prevention
In the Supabase SQL editor, you can add a unique constraint on the `phone` or `email` column, or write a trigger that checks if a lead with the same phone number was submitted in the last 24 hours.

### Real-time Admin Dashboard
Since Supabase supports Realtime WebSockets, you can build a page in the Next.js frontend that subscribes to the `leads` table:
```javascript
supabase.channel('custom-all-channel')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
```
This allows your sales team to see new leads pop up on their screen instantly without refreshing.
