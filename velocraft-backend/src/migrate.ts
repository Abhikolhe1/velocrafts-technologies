import 'dotenv/config';
import {VelocraftsApplication} from './application';

/**
 * Migrate database schema for all models.
 *
 * Usage:
 *   npm run migrate          - Alter existing tables (preserves data)
 *   npm run migrate -- --rebuild  - Drop and recreate tables (DELETES ALL DATA)
 */
export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)...', existingSchema);

  const app = new VelocraftsApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  console.log('Migration completed successfully.');
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema:', err);
  process.exit(1);
});
