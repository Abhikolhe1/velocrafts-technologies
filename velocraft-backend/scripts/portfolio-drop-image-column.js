/**
 * Removes the old image column from portfolio table (use imageId + Media relation only).
 * Run: node scripts/portfolio-drop-image-column.js
 */
require('dotenv/config');
const mysql = require('mysql');

const dbName = process.env.DB_NAME || 'velocraft';
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: dbName,
};

const conn = mysql.createConnection(config);
conn.query(`ALTER TABLE portfolio DROP COLUMN image`, (err) => {
  if (err) {
    if (err.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
      console.log("Column 'image' does not exist (already removed).");
    } else {
      console.error('Alter failed:', err.message);
      conn.end();
      process.exit(1);
    }
  } else {
    console.log("Column 'image' dropped from portfolio.");
  }
  conn.end();
});
