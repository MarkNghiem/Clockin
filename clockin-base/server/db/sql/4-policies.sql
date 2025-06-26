-- Revoke all permissions from anon and authenticated
REVOKE ALL ON public.users FROM anon, authenticated;
REVOKE ALL ON public.companies FROM anon, authenticated;
REVOKE ALL ON public.employees FROM anon, authenticated;
REVOKE ALL ON public.companies_in_user FROM anon, authenticated;
REVOKE ALL ON public.employees_in_company FROM anon, authenticated;
GRANT INSERT ON public.users TO authenticated;

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
USING ((SELECT auth.uid()) = id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = id OR is_admin());

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