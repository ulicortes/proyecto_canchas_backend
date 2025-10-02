import pg from 'pg'
const { Pool } = pg
const conn = `${process.env.DATABASE_URL}`;
const pool = new Pool({
  connectionString: conn,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool