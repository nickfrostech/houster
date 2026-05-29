-- Run this script in the Supabase SQL Editor if you see "Failed to load dashboard data"
-- or if the navbar says "Hi, Student" consistently after sign up.

-- 1. Grant usage on the schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant all privileges on all tables to anon and authenticated
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- 3. Grant all privileges on all sequences
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 4. Grant all privileges on all routines (like functions created for triggers)
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

-- 5. Force update the default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated;

-- Note: RLS (Row Level Security) policies will still protect the data even with these GRANTS.
-- GRANTS are required for the PostgREST API to even reach the RLS policy evaluation stage.
