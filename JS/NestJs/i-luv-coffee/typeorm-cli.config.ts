import { DataSource } from 'typeorm';

// Migrations are managed out NestJS by ORM layer
// This is the configuration for the cli
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [], // Listing the entities helps create migrations when drift is detected
  migrations: [],
});

/**
 * // Run migration(s)
npx typeorm migration:run -d dist/typeorm-cli.config

// REVERT migration(s)
npx typeorm migration:revert -d dist/typeorm-cli.config

// Let TypeOrm generate migrations (for you)
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
 */
