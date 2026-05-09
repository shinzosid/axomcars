-- Create stories table
create table if not exists public.stories (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  image_url text,
  cta_text text default 'Read More',
  cta_link text,
  is_published boolean default true,
  sent_to_subscribers boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.stories enable row level security;

-- Public can read published stories
create policy "Public can read published stories" on public.stories
  for select using (is_published = true);

-- Service role has full access
create policy "Service Role has full access to stories" on public.stories
  for all using (auth.role() = 'service_role');
