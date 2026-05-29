# Supabase Setup for Hostelly

This document explains how to set up your Supabase project for Hostelly.

## 1. Environment Variables

Create a `.env.local` or `.env` file in the root of your project and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Authentication Setup

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** -> **Providers**
3. Ensure **Email** is enabled (it should be by default)
4. (Optional) Disable email confirmation for easier testing during development in **Auth Providers -> Email**.

## 3. Database Schema

Execute the following SQL commands in your Supabase SQL Editor to create the necessary tables and policies.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Define Roles Type
create type user_role as enum ('student', 'admin');
create type gender_type as enum ('male', 'female', 'mixed');
create type application_status as enum ('pending', 'approved', 'rejected');

-- 1. Profiles Table (Extends Auth Users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null,
  role user_role default 'student',
  matric_number text,
  department text,
  level_year integer,
  gender gender_type,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Hostels Table
create table hostels (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  gender gender_type not null,
  location text not null,
  description text,
  number_of_rooms integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Rooms Table
create table rooms (
  id uuid default uuid_generate_v4() primary key,
  hostel_id uuid references hostels(id) on delete cascade not null,
  room_number text not null,
  total_bed_spaces integer default 4,
  available_bed_spaces integer default 4,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (hostel_id, room_number)
);

-- 4. Applications Table
create table applications (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id) on delete cascade not null,
  hostel_id uuid references hostels(id) on delete restrict not null,
  status application_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone,
  unique (student_id) -- one application per student
);

-- 5. Allocations Table
create table allocations (
  id uuid default uuid_generate_v4() primary key,
  application_id uuid references applications(id) on delete restrict not null,
  student_id uuid references profiles(id) on delete cascade not null,
  room_id uuid references rooms(id) on delete restrict not null,
  allocated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (student_id)
);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_applications_updated_at
before update on applications
for each row execute function update_updated_at_column();
```

## 4. Row Level Security (RLS)

Execute this script after creating the tables to secure the database.

```sql
-- Enable RLS
alter table profiles enable row level security;
alter table hostels enable row level security;
alter table rooms enable row level security;
alter table applications enable row level security;
alter table allocations enable row level security;

-- Profiles: Users can read their own profile. Admins can read all.
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Hostels: Everyone can view. Admins can insert/update/delete.
create policy "Everyone can view hostels" on hostels for select using (true);
create policy "Admins can insert hostels" on hostels for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update hostels" on hostels for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Rooms: Everyone can view. Admins can insert/update/delete.
create policy "Everyone can view rooms" on rooms for select using (true);
create policy "Admins can insert rooms" on rooms for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update rooms" on rooms for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Applications: Students can view and insert their own. Admins can read/update all.
create policy "Students can view own applications" on applications for select using (auth.uid() = student_id);
create policy "Students can insert own applications" on applications for insert with check (auth.uid() = student_id);
create policy "Admins can view all applications" on applications for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update applications" on applications for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Allocations: Students can view their own. Admins can insert/update/read all.
create policy "Students can view own allocations" on allocations for select using (auth.uid() = student_id);
create policy "Admins can view all allocations" on allocations for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can insert allocations" on allocations for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
```

## 5. Seed Data (Optional, for Admins)

To quickly add an admin user: Wait until you sign up via the Hostelly UI, then run this SQL command:

```sql
update profiles set role = 'admin' where email = 'your.email@example.com';
```
