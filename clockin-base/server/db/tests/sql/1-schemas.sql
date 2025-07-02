CREATE EXTENSION IF NOT EXISTS plpgsql;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET client_encoding = 'UTF8';
SET row_security = on;
SET search_path TO test;

CREATE TABLE test.users (
  id UUID DEFAULT auth.uid() PRIMARY KEY,
  user_id TEXT UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT UNIQUE,
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

CREATE TABLE test.companies (
  company_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  occupational_field TEXT NOT NULL,
  owner_id UUID REFERENCES test.users (id) ON DELETE SET NULL,
  address_1 TEXT NOT NULL,
  address_2 TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,
  address_zip TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE test.employees (
  employee_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES test.users (id) ON DELETE SET NULL,
  company_id UUID REFERENCES test.companies (company_id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  wage NUMERIC(10, 2) NOT NULL,
  wage_frequency TEXT NOT NULL,
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE test.companies_in_user (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES test.users (id) ON DELETE SET NULL,
  company_id UUID REFERENCES test.companies (company_id) ON DELETE SET NULL,
  is_active BOOLEAN
);

CREATE TABLE test.employees_in_company (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES test.companies (company_id) ON DELETE SET NULL,
  employee_id UUID REFERENCES test.employees (employee_id) ON DELETE SET NULL,
  is_active BOOLEAN
);