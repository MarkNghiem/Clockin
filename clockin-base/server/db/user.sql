CREATE EXTENSION plpgsql;
CREATE EXTENSION IF NOT EXISTS 'pgcrypto';
SET client_encoding = 'UTF8';
SET row_security = on;
SET search_path TO public;

CREATE TABLE public.user (
  employee_id UUID DEFAULT gen_random_uuid() PRIMARY KEY
  
)