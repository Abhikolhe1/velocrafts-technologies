/**
 * Creates portfolio table. Drops if exists then creates.
 * Run: node scripts/create-portfolio-table.js
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

const createTableSql = `
CREATE TABLE portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  \`order\` INT DEFAULT 0,
  slug VARCHAR(512) NOT NULL,
  title VARCHAR(512) NOT NULL,
  image VARCHAR(1024) DEFAULT NULL,
  shortDescription TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT DEFAULT NULL,
  approach TEXT DEFAULT NULL,
  technologies JSON DEFAULT NULL,
  category VARCHAR(255) NOT NULL,
  results JSON DEFAULT NULL,
  client VARCHAR(512) DEFAULT NULL,
  duration VARCHAR(255) DEFAULT NULL,
  teamSize VARCHAR(255) DEFAULT NULL,
  keyFeatures JSON DEFAULT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
`.trim();

const conn = mysql.createConnection(config);
conn.query('DROP TABLE IF EXISTS portfolio', (err1) => {
  if (err1) {
    console.error('Drop failed:', err1.message);
    conn.end();
    process.exit(1);
  }
  conn.query(createTableSql, (err2) => {
    conn.end();
    if (err2) {
      console.error('Failed to create portfolio table:', err2.message);
      process.exit(1);
    }
    console.log("Table 'portfolio' is ready.");
  });
});
