/**
 * Creates blog_posts table. Drops existing (or broken) table and removes
 * any orphan tablespace file before recreating (fixes #1932 / "doesn't exist in engine").
 * Run: node scripts/create-blog-posts-table.js
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
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
CREATE TABLE blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(512) NOT NULL,
  slug VARCHAR(512) NOT NULL,
  excerpt TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  featuredMediaId VARCHAR(36) DEFAULT NULL,
  contentIntro TEXT NOT NULL,
  contentSections JSON DEFAULT NULL,
  quote TEXT DEFAULT NULL,
  keyPoints JSON DEFAULT NULL,
  tags JSON DEFAULT NULL,
  readTime INT DEFAULT NULL,
  published TINYINT(1) DEFAULT 1,
  authorBio TEXT DEFAULT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
`.trim();

function tryUnlink(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('Removed orphan file:', filePath);
    }
  } catch (e) {
    // ignore
  }
}

const conn = mysql.createConnection(config);
conn.query('DROP TABLE IF EXISTS blog_posts', (err1) => {
  if (err1) {
    console.error('Drop failed:', err1.message);
    conn.end();
    process.exit(1);
  }
  conn.query("SELECT @@datadir AS datadir", (errDir, rows) => {
    if (!errDir && rows && rows[0]) {
      const datadir = rows[0].datadir;
      const tableDir = path.join(datadir, dbName);
      tryUnlink(path.join(tableDir, 'blog_posts.ibd'));
    }
    conn.query(createTableSql, (err2) => {
      conn.end();
      if (err2) {
        console.error('Failed to create blog_posts table:', err2.message);
        process.exit(1);
      }
      console.log("Table 'blog_posts' is ready.");
    });
  });
});
