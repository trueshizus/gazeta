import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Database connection configuration
const connectionString = `postgresql://${process.env.DB_USER || 'gazeta_user'}:${process.env.DB_PASSWORD || 'gazeta_password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'gazeta'}`;

// Create the postgres client
const client = postgres(connectionString);

// Create the drizzle database instance
export const db = drizzle(client, { schema });

// Export the schema for use in other files
export { schema };