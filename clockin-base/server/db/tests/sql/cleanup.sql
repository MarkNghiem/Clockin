-- Drop extensions
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS plpgsql;

-- Drop triggers
DROP TRIGGER IF EXISTS set_update_at_users ON test.users;
DROP TRIGGER IF EXISTS set_update_at_companies ON test.companies;
DROP TRIGGER IF EXISTS set_update_at_employees ON test.employees;

-- Drop policies
DROP POLICY IF EXISTS "Allow Self Sign-Up" ON test.users;
DROP POLICY IF EXISTS "Full access for admins and data owners on Users" ON test.users;
DROP POLICY IF EXISTS "Full access for admins and data owners on Companies" ON test.companies;
DROP POLICY IF EXISTS "Full access for admins and data owners on Employees" ON test.employees;
DROP POLICY IF EXISTS "Full access for admins and data owners on Companies In User" ON test.companies_in_user;
DROP POLICY IF EXISTS "Full access for admins and data owners on Employees In Company" ON test.employees_in_company;

-- Drop functions
DROP FUNCTION IF EXISTS test.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS test.is_admin() CASCADE;

-- Drop all tables
DROP TABLE IF EXISTS test.employees_in_company CASCADE;
DROP TABLE IF EXISTS test.companies_in_user CASCADE;
DROP TABLE IF EXISTS test.employees CASCADE;
DROP TABLE IF EXISTS test.companies CASCADE;
DROP TABLE IF EXISTS test.users CASCADE;