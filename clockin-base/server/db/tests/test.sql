CREATE EXTENSION plpgsql;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET client_encoding = 'UTF8';
SET row_security = on;
SET search_path TO test;
-- CREATE SCHEMA IF NOT EXISTS test

CREATE TABLE test.test_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text_not_null TEXT NOT NULL,
  number_not_null INTEGER NOT NULL,
  text_nullable TEXT,
  number_nullable INTEGER,
  salary NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION test.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql STABLE
SET search_path TO public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


CREATE OR REPLACE FUNCTION test.is_admin()
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

CREATE OR REPLACE FUNCTION test.delete_inactive_5_years_employees()
RETURNS TRIGGER
LANGUAGE plpgsql STABLE
SET search_path TO public
AS $$
BEGIN
  IF 
    NEW.updated_at < NOW() - INTERVAL '5 years'
    AND NEW.is_active = false THEN
    DELETE FROM public.employees WHERE employee_id = NEW.employee_id;
    RETURN NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_update_at_test_table
BEFORE UPDATE ON test.test_table
FOR EACH ROW
EXECUTE FUNCTION test.update_updated_at_column();

REVOKE ALL ON test.test_table FROM anon, authenticated;
GRANT INSERT ON test.test_table TO authenticated;

ALTER TABLE test.test_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access for admins and data owners on Test"
ON test.test_table
FOR ALL
USING ((SELECT auth.uid()) = id OR is_admin())
WITH CHECK((SELECT auth.uid()) = id OR is_admin());

INSERT INTO test.test_table (text_not_null, number_not_null, salary)
VALUES ('hi', 123, 67.89);

INSERT INTO test.test_table (text_not_null, number_not_null, salary)
VALUES ('hello', 456, 12.34);