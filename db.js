import pkg from 'pg'
const { Pool } = pkg;

const pool = new Pool({
    connectionString:'postgresql://neondb_owner:npg_CvcbQ7pX1knx@ep-proud-shadow-a1usbsqc-pooler.ap-southeast-1.aws.neon.tech/clientsync?sslmode=require&channel_binding=require'
})

// Test connection
pool.connect()
  .then(client => {
    console.log("📌 PostgreSQL connected successfully!");
    client.release(); // release connection back to pool
  })
  .catch(err => {
    console.error("❌ PostgreSQL connection error:", err.message);
  });

  pool.query('SELECT NOW()')
  .then(res => console.log("DB Time:", res.rows[0].now))
  .catch(err => console.error(err));


export default pool;