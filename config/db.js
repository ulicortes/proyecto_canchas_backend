import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  connectionString: 'postgresql://postgres.fmgzjzabrjtlmftrciqh:to0bWWDHWvuTLWlv@aws-1-sa-east-1.pooler.supabase.com:6543/postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool