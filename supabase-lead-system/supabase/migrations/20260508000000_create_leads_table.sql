-- Create the leads table
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    vehicle TEXT,
    location TEXT,
    source TEXT DEFAULT 'Website Lead Form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the website form)
CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) to read leads
CREATE POLICY "Allow authenticated reads" ON public.leads
    FOR SELECT TO authenticated USING (true);

-- Create a database webhook trigger to call the Edge Function
-- (This requires the pg_net extension, which is enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.trigger_telegram_alert()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM net.http_post(
        url := current_setting('app.settings.edge_function_url', true) || '/telegram-alert',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
        ),
        body := row_to_json(NEW)::jsonb
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_lead_created
    AFTER INSERT ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.trigger_telegram_alert();
