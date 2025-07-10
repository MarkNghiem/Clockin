/*
- SQL function to update the column 'updated_at'
- Trigger when the user update their info
*/
CREATE OR REPLACE FUNCTION test.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql STABLE
SET search_path TO test
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


CREATE OR REPLACE FUNCTION test.is_admin()
RETURNS boolean
LANGUAGE plpgsql STABLE
SET search_path TO test
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM test.users
    WHERE auth.uid() = user_id AND user_role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION test.delete_inactive_5_years_employees()
RETURNS TRIGGER
LANGUAGE plpgsql STABLE
SET search_path TO test
AS $$
BEGIN
  IF 
    NEW.updated_at < NOW() - INTERVAL '5 years'
    AND NEW.is_active = false THEN
    DELETE FROM test.employees WHERE employee_id = test.employee_id;
    RETURN NULL;
  END IF;
  RETURN NEW;
END;
$$;