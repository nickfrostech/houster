-- Supabase Hostelly full reset and schema setup
-- Run this in Supabase SQL editor to drop existing objects and recreate tables, triggers, policies.

-- 1. Drop existing triggers/functions/tables/types if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
DROP FUNCTION IF EXISTS public.update_updated_at_column();

DROP TABLE IF EXISTS public.allocations CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.rooms CASCADE;
DROP TABLE IF EXISTS public.hostels CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS public.application_status CASCADE;
DROP TYPE IF EXISTS public.gender_type CASCADE;
DROP TYPE IF EXISTS public.user_role CASCADE;

-- 2. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create enum types
CREATE TYPE public.user_role AS ENUM ('student', 'admin');
CREATE TYPE public.gender_type AS ENUM ('male', 'female', 'mixed');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');

-- 4. Create tables
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  full_name text NOT NULL,
  role public.user_role DEFAULT 'student',
  matric_number text,
  department text,
  level_year integer,
  gender public.gender_type,
  phone_number text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.hostels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  gender public.gender_type NOT NULL,
  location text NOT NULL,
  description text,
  number_of_rooms integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  hostel_id uuid NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  room_number text NOT NULL,
  total_bed_spaces integer DEFAULT 4,
  available_bed_spaces integer DEFAULT 4,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (hostel_id, room_number)
);

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hostel_id uuid NOT NULL REFERENCES public.hostels(id) ON DELETE RESTRICT,
  status public.application_status DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz,
  UNIQUE (student_id)
);

CREATE TABLE public.allocations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE RESTRICT,
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE RESTRICT,
  allocated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (student_id)
);

-- 5. Create updated_at trigger helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Create auth user trigger to populate profile row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, matric_number, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'matric_number',
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allocations ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies
-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Hostels
CREATE POLICY "Everyone can view hostels" ON public.hostels
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert hostels" ON public.hostels
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update hostels" ON public.hostels
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete hostels" ON public.hostels
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Rooms
CREATE POLICY "Everyone can view rooms" ON public.rooms
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert rooms" ON public.rooms
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update rooms" ON public.rooms
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete rooms" ON public.rooms
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Applications
CREATE POLICY "Students can view own applications" ON public.applications
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Admins can view all applications" ON public.applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update applications" ON public.applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Allocations
CREATE POLICY "Students can view own allocations" ON public.allocations
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Admins can view all allocations" ON public.allocations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can insert allocations" ON public.allocations
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update allocations" ON public.allocations
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
