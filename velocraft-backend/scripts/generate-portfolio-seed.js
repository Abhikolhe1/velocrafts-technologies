/**
 * Reads frontend projects.js and writes portfolio-seed-data.json (without id, with order).
 * Run from backend: node scripts/generate-portfolio-seed.js
 */
const path = require('path');
const fs = require('fs');

const frontendPath = path.resolve(__dirname, '../../velocraft-frontend/src/data/projects.js');
const outPath = path.join(__dirname, 'portfolio-seed-data.json');

let content;
try {
  content = fs.readFileSync(frontendPath, 'utf8');
} catch (e) {
  console.error('Could not read', frontendPath, e.message);
  process.exit(1);
}

// Build a CommonJS snippet: capture full array "[ ... ]"
const exportMatch = content.match(/export const projects = (\[[\s\S]*\]);\s*\n\s*export const getProjectById/);
if (!exportMatch) {
  console.error('Could not find projects array in', frontendPath);
  process.exit(1);
}
const arrayStr = exportMatch[1].trim();
const tempPath = path.join(__dirname, '.portfolio-seed-temp.cjs');
fs.writeFileSync(tempPath, 'const projects = ' + arrayStr + ';\nmodule.exports = { projects };', 'utf8');
let projects;
try {
  projects = require(tempPath).projects;
} finally {
  try { fs.unlinkSync(tempPath); } catch (_) {}
}
if (!Array.isArray(projects)) {
  console.error('Expected projects to be an array');
  process.exit(1);
}

const out = projects.map((p, i) => {
  const {id, ...rest} = p;
  return {...rest, order: i + 1};
});
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', out.length, 'projects to', outPath);
