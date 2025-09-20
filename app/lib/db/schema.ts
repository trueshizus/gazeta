import { pgTable, serial, varchar, text, bigint, timestamp, jsonb, index } from 'drizzle-orm/pg-core';

export const source = pgTable('source', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  filePath: text('file_path').notNull(),
  fileType: varchar('file_type', { length: 50 }),
  fileSize: bigint('file_size', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  metadata: jsonb('metadata'),
}, (table) => ({
  nameIdx: index('idx_source_name').on(table.name),
  statusIdx: index('idx_source_status').on(table.status),
  createdAtIdx: index('idx_source_created_at').on(table.createdAt),
}));