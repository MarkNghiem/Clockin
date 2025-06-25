CREATE EXTENSION plpgsql;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET client_encoding = 'UTF8';
SET row_security = on;
SET search_path TO public;

CREATE TABLE public.users (
  user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL UNIQUE,
  address_1 TEXT,
  address_2 TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  country TEXT,
  country_code TEXT,
  phone_number TEXT,
  user_role TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.companies (
  company_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  occupational_field TEXT NOT NULL,
  owner_id UUID REFERENCES public.users (user_id) NOT NULL,
  address_1 TEXT NOT NULL,
  address_2 TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,
  address_zip TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.employees (
  employee_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users (user_id),
  company_id UUID REFERENCES public.companies (company_id),
  title TEXT NOT NULL,
  wage TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.companies_in_user (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users (user_id),
  company_id UUID REFERENCES public.companies (company_id)
);

CREATE TABLE public.employees_in_company (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies (company_id),
  employee_id UUID REFERENCES public.employees (employee_id)
);

/*
- SQL function to update the column 'updated_at'
- Trigger when the user update their info
*/
CREATE OR REPLACE FUNCTION public.update_updated_at_column ()
RETURNS TRIGGER
LANGUAGE plpgsql STABLE
SET search_path TO public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_update_at_users
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_update_at_companies
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_update_at_employees
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql STABLE
SET search_path TO public 
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE auth.uid() = user_id AND user_role = 'admin'
  );
END;
$$;

-- Revoke all permissions from anon and authenticated
REVOKE ALL ON public.users FROM anon, authenticated;
REVOKE ALL ON public.companies FROM anon, authenticated;
REVOKE ALL ON public.employees FROM anon, authenticated;
REVOKE ALL ON public.companies_in_user FROM anon, authenticated;
REVOKE ALL ON public.employees_in_company FROM anon, authenticated;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies_in_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees_in_company ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Full access for admins and data owners on Users"
ON public.users
FOR ALL
USING ((SELECT auth.uid()) = user_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = user_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Companies"
ON public.companies
FOR ALL
USING ((SELECT auth.uid()) = owner_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = owner_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Employees"
ON public.employees
FOR ALL
USING ((SELECT auth.uid()) = user_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = user_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Companies In User"
ON public.companies_in_user
FOR ALL
USING ((SELECT auth.uid()) = user_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = user_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Employees In Company"
ON public.employees_in_company
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employees e
    WHERE e.employee_id = employees_in_company.employee_id
    AND (SELECT auth.uid()) = e.user_id
    OR is_admin()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.employees e
    WHERE e.employee_id = employees_in_company.employee_id
    AND (SELECT auth.uid()) = e.user_id
    OR is_admin()
  )
);