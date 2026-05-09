-- Create newsletter_subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  status text not null default 'pending', -- pending, confirmed, unsubscribed
  confirm_token text unique not null,
  unsubscribe_token text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  confirmed_at timestamp with time zone,
  unsubscribed_at timestamp with time zone
);

-- Enable Row Level Security (RLS)
alter table public.newsletter_subscribers enable row level security;

-- Only the edge function (service_role) should have full access. 
-- Public cannot read or write directly.
create policy "Service Role has full access" on public.newsletter_subscribers
  for all
  using (auth.role() = 'service_role');

-- Create indexes for performance
create index if not exists idx_newsletter_email on public.newsletter_subscribers(email);
create index if not exists idx_newsletter_confirm_token on public.newsletter_subscribers(confirm_token);
create index if not exists idx_newsletter_unsubscribe_token on public.newsletter_subscribers(unsubscribe_token);
