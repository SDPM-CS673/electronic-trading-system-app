const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

console.log("init-db.js is running");

// Load schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Supabase connection string
const connectionString = 'postgresql://postgres.luittvqvnpygmcifdtwq:CS673@unitrade@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, // Ensure SSL is enabled and certificate is verified
    ca: fs.readFileSync('./prod-ca-2021.crt').toString(), 
  }
});

// Connect to PostgreSQL server
client.connect()
  .then(async () => {
    console.log("Connected to PostgreSQL server.");

    console.log('Running schema...');
    // Split schema into individual statements
    const statements = schema.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

    // Execute each statement
    for (const stmt of statements) {
      try {
        console.log(`Executing: ${stmt}`);
        await client.query(stmt);
      } catch (err) {
        console.error('Error executing statement:', stmt);
        console.error(err);
        await client.end();
        return;
      }
    }

    console.log('Schema executed successfully.');
    await client.end();
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err);
    client.end();
  });
