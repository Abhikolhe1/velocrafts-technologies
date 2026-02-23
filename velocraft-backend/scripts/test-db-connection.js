/**
 * Test MySQL connection. Run: node scripts/test-db-connection.js
 * Use this to verify MySQL is running and reachable before starting the backend.
 */
require('dotenv/config');
const mysql = require('mysql');

const config = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'velocraft',
  connectTimeout: 10000,
};

console.log('Testing MySQL connection...');
console.log('  Host:', config.host);
console.log('  Port:', config.port);
console.log('  User:', config.user);
console.log('  Database:', config.database);
console.log('');

const conn = mysql.createConnection(config);

conn.connect((err) => {
  if (err) {
    console.error('FAILED:', err.message);
    console.error('');
    console.error('Common fixes:');
    console.error('  1. Start MySQL in XAMPP Control Panel');
    console.error('  2. Check DB_PORT (XAMPP default: 3306)');
    console.error('  3. If you set a MySQL password, add DB_PASSWORD=yourpassword to .env');
    console.error('  4. Try DB_HOST=localhost instead of 127.0.0.1');
    process.exit(1);
  }
  console.log('SUCCESS: Connected to MySQL');
  conn.end();
  process.exit(0);
});
