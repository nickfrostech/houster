-- 1. Create a SECURITY DEFINER function to check admin status
-- Security Definer functions run bypassing RLS, which prevents the infinite recursion loop.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Drop the recursive policy on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- 3. Recreate it using the new helper function
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING ( public.is_admin() );

-- 4. (Optional but recommended) Update other admin checks to use the faster function
DROP POLICY IF EXISTS "Admins can insert hostels" ON public.hostels;
CREATE POLICY "Admins can insert hostels" ON public.hostels FOR INSERT WITH CHECK ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can update hostels" ON public.hostels;
CREATE POLICY "Admins can update hostels" ON public.hostels FOR UPDATE USING ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can delete hostels" ON public.hostels;
CREATE POLICY "Admins can delete hostels" ON public.hostels FOR DELETE USING ( public.is_admin() );

DROP POLICY IF EXISTS "Admins can insert rooms" ON public.rooms;
CREATE POLICY "Admins can insert rooms" ON public.rooms FOR INSERT WITH CHECK ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can update rooms" ON public.rooms;
CREATE POLICY "Admins can update rooms" ON public.rooms FOR UPDATE USING ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can delete rooms" ON public.rooms;
CREATE POLICY "Admins can delete rooms" ON public.rooms FOR DELETE USING ( public.is_admin() );

DROP POLICY IF EXISTS "Admins can view all applications" ON public.applications;
CREATE POLICY "Admins can view all applications" ON public.applications FOR SELECT USING ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
CREATE POLICY "Admins can update applications" ON public.applications FOR UPDATE USING ( public.is_admin() );

DROP POLICY IF EXISTS "Admins can view all allocations" ON public.allocations;
CREATE POLICY "Admins can view all allocations" ON public.allocations FOR SELECT USING ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can insert allocations" ON public.allocations;
CREATE POLICY "Admins can insert allocations" ON public.allocations FOR INSERT WITH CHECK ( public.is_admin() );
DROP POLICY IF EXISTS "Admins can update allocations" ON public.allocations;
CREATE POLICY "Admins can update allocations" ON public.allocations FOR UPDATE USING ( public.is_admin() );
