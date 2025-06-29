CREATE EXTENSION plpgsql;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET client_encoding = 'UTF8';
SET row_security = on;
SET search_path TO public;

CREATE TABLE public.test_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text_not_null TEXT NOT NULL,
  number_not_null INTEGER NOT NULL,
  text_nullable TEXT,
  number_nullable INTEGER,
  salary NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER set_update_at_test_table
BEFORE UPDATE ON public.test_table
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

REVOKE ALL ON public.test_table FROM anon, authenticated;
GRANT INSERT ON public.test_table TO authenticated;

ALTER TABLE public.test_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access for admins and data owners on Test"
ON public.test_table
FOR ALL
USING ((SELECT auth.uid()) = id OR is_admin())
WITH CHECK((SELECT auth.uid()) = id OR is_admin());

INSERT INTO public.test_table (text_not_null, number_not_null, salary)
VALUES ('hi', 123, 67.89);

INSERT INTO public.test_table (text_not_null, number_not_null, salary)
VALUES ('hello', 456, 12.34);