/**
 * Creates the database if it doesn't exist.
 * Run before migrate when the database hasn't been created yet.
 */
require('dotenv/config');
const mysql = require('mysql');

const dbName = process.env.DB_NAME || 'velocraft';
const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
});

conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
  conn.end();
  if (err) {
    console.error('Failed to create database:', err.message);
    process.exit(1);
  }
  console.log(`Database '${dbName}' is ready.`);
});
