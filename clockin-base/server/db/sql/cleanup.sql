-- Drop extensions
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS plpgsql;

-- Drop triggers
DROP TRIGGER IF EXISTS set_update_at_users ON public.users;
DROP TRIGGER IF EXISTS set_update_at_companies ON public.companies;
DROP TRIGGER IF EXISTS set_update_at_employees ON public.employees;

-- Drop policies
DROP POLICY IF EXISTS "Allow Self Sign-Up" ON public.users;
DROP POLICY IF EXISTS "Full access for admins and data owners on Users" ON public.users;
DROP POLICY IF EXISTS "Full access for admins and data owners on Companies" ON public.companies;
DROP POLICY IF EXISTS "Full access for admins and data owners on Employees" ON public.employees;
DROP POLICY IF EXISTS "Full access for admins and data owners on Companies In User" ON public.companies_in_user;
DROP POLICY IF EXISTS "Full access for admins and data owners on Employees In Company" ON public.employees_in_company;

-- Drop functions
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- Drop all tables
DROP TABLE IF EXISTS public.employees_in_company CASCADE;
DROP TABLE IF EXISTS public.companies_in_user CASCADE;
DROP TABLE IF EXISTS public.employees CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;