import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// Test connection
pool
  .connect()
  .then((client) => {
    console.log("📌 PostgreSQL connected successfully!");
    client.release(); // release connection back to pool
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection error:", err.message);
  });

pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB Time:", res.rows[0].now))
  .catch((err) => console.error(err));

export default pool;
