const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Database is reachable!");
    await client.end();
  } catch (err) {
    console.error("❌ Cannot reach database:", err.message);
  }
})();
