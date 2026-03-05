/**
 * Seeds the portfolio table from portfolio-seed-data.json (from frontend projects).
 * Clears existing rows then inserts so re-run "pushes" fresh data.
 * Run: npm run create:portfolio-table (once), then npm run seed:portfolio
 * To refresh JSON from frontend: npm run generate:portfolio-seed
 */
require('dotenv/config');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const dbName = process.env.DB_NAME || 'velocraft';
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: dbName,
};

const dataPath = path.join(__dirname, 'portfolio-seed-data.json');
if (!fs.existsSync(dataPath)) {
  console.warn('No portfolio-seed-data.json. Run: npm run generate:portfolio-seed');
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
if (!projects.length) {
  console.log('No projects in seed data.');
  process.exit(0);
}

const conn = mysql.createConnection(config);

const cols = [
  '`order`', 'slug', 'title', 'image', 'shortDescription', 'description',
  'challenge', 'approach', 'technologies', 'category', 'results',
  'client', 'duration', 'teamSize', 'keyFeatures',
];
const placeholders = cols.map(() => '?').join(', ');
const insertSql = `INSERT INTO portfolio (${cols.join(', ')}) VALUES (${placeholders})`;

function row(p, order) {
  return [
    order,
    p.slug,
    p.title,
    p.image || null,
    p.shortDescription,
    p.description,
    p.challenge || null,
    p.approach || null,
    p.technologies ? JSON.stringify(p.technologies) : null,
    p.category,
    p.results ? JSON.stringify(p.results) : null,
    p.client || null,
    p.duration || null,
    p.teamSize || null,
    p.keyFeatures ? JSON.stringify(p.keyFeatures) : null,
  ];
}

conn.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
  conn.query('DELETE FROM portfolio', (delErr) => {
    if (delErr) {
      console.error('Clear portfolio failed (table may not exist):', delErr.message);
      conn.end();
      process.exit(1);
    }
    console.log('Cleared portfolio table.');
    let done = 0;
    projects.forEach((p, i) => {
      const order = p.order != null ? p.order : i + 1;
      conn.query(insertSql, row(p, order), (e) => {
        if (e) console.error('Insert failed for', p.slug, e.message);
        else console.log('Seeded:', p.slug, '(order', order, ')');
        done++;
        if (done === projects.length) {
          conn.end();
          console.log('Portfolio seed completed. Data is now served from backend.');
        }
      });
    });
  });
});
