const { Pool } = require('pg');

const PG_URI =
	'postgresql://postgres.hjjjaisbkxmousioisza:7379454242164353867454@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

  const pool = new Pool({
    connectionString: PG_URI
  });

  module.exports = {
    query: (text, param, cb) => {
      console.log(`Executed Query ${text}`);
      return pool.query(text, param, cb)
    }
  };
  
  // Schema:
  // public.people
  /* 
    _id: serial NOT NULL
    name: varchar NOT NULL
    title: varchar
    status: varchar
    wage: numeric(10, 2) NOT NULL
    total_hrs: numeric(10, 2)
    company: varchar
  */