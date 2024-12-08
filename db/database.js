const dotenv = require("dotenv");
const { Pool } = require("pg");
const fs = require('fs');
const Sequelize = require('sequelize');

const session = require('express-session');
const connectSessionSequelize = require('connect-session-sequelize')(session.Store);
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('./prod-ca-2021.crt').toString(), 
    }
});

const sequelize = new Sequelize(
    process.env.DB_NAME || 'database_development',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '1234',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql', // Change dialect if using another database
        logging: console.log, // Disable query logging; set to console.log for debugging
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Database connection error:', err));

// Create the session store
const sessionStore = new connectSessionSequelize({
    db: sequelize,
    tableName: 'Sessions',
    checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
    expiration: 24 * 60 * 60 * 1000, // 24 hours
});

// Sync the session store to create the `sessions` table in your database
sessionStore.sync();
module.exports = {
    sessionStore:  sessionStore,
    pool: pool
};
