const { Pool } = require('pg');

// Directly provide the connection string (use the correct one for your Render PostgreSQL database)
const connectionString = 'postgresql://unitrade_user:pU4nYcB6thLOZRF1yrvpoTB1z5nxj7Mm@dpg-csp9019u0jms73bh5c30-a.oregon-postgres.render.com/unitrade';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,  // Allows the connection to proceed even with self-signed certificates
  },
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL:', res.rows[0]);
    await pool.end();
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();
