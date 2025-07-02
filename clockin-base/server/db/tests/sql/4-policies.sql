-- Revoke all permissions from anon and authenticated
REVOKE ALL ON test.users FROM anon, authenticated;
REVOKE ALL ON test.companies FROM anon, authenticated;
REVOKE ALL ON test.employees FROM anon, authenticated;
REVOKE ALL ON test.companies_in_user FROM anon, authenticated;
REVOKE ALL ON test.employees_in_company FROM anon, authenticated;
GRANT INSERT ON test.users TO authenticated;

-- Enable RLS
ALTER TABLE test.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE test.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE test.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE test.companies_in_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE test.employees_in_company ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Full access for admins and data owners on Users"
ON test.users
FOR ALL
USING ((SELECT auth.uid()) = id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Companies"
ON test.companies
FOR ALL
USING ((SELECT auth.uid()) = owner_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = owner_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Employees"
ON test.employees
FOR ALL
USING ((SELECT auth.uid()) = user_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = user_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Companies In User"
ON test.companies_in_user
FOR ALL
USING ((SELECT auth.uid()) = user_id OR is_admin())
WITH CHECK ((SELECT auth.uid()) = user_id OR is_admin());

CREATE POLICY "Full access for admins and data owners on Employees In Company"
ON test.employees_in_company
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM test.employees e
    WHERE e.employee_id = employees_in_company.employee_id
    AND (SELECT auth.uid()) = e.user_id
    OR is_admin()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM test.employees e
    WHERE e.employee_id = employees_in_company.employee_id
    AND (SELECT auth.uid()) = e.user_id
    OR is_admin()
  )
);