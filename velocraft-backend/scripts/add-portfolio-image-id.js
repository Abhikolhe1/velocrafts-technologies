/**
 * Adds imageId column to portfolio table (for Media relation).
 * Run: node scripts/add-portfolio-image-id.js
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
conn.query(
  `ALTER TABLE portfolio ADD COLUMN imageId VARCHAR(36) DEFAULT NULL`,
  (err) => {
    if (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log("Column 'imageId' already exists.");
      } else {
        console.error('Alter failed:', err.message);
        conn.end();
        process.exit(1);
      }
    } else {
      console.log("Column 'imageId' added to portfolio.");
    }
    conn.end();
  }
);
