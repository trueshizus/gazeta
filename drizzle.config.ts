import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'gazeta_user',
    password: process.env.DB_PASSWORD || 'gazeta_password',
    database: process.env.DB_NAME || 'gazeta',
  },
});