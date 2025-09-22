import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

// Define the database for sources
export const db = new SQLDatabase("sources", {
  migrations: "./migrations",
});

// Source data structure
export interface Source {
  id: number;
  name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  created_at: Date;
  updated_at: Date;
  status: string;
  metadata?: Record<string, any>;
}

// Request/Response types
export interface CreateSourceRequest {
  name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  metadata?: Record<string, any>;
}

export interface CreateSourceResponse {
  id: number;
  message: string;
}

export interface GetSourceResponse {
  source: Source;
}

export interface ListSourcesResponse {
  sources: Source[];
  total: number;
}

export interface UpdateSourceRequest {
  name?: string;
  status?: string;
  metadata?: Record<string, any>;
}

// API endpoints
export const createSource = api(
  { method: "POST", path: "/sources" },
  async (req: CreateSourceRequest): Promise<CreateSourceResponse> => {
    const now = new Date();
    
    const rows = [];
    for await (const row of db.query`
      INSERT INTO sources (name, file_path, file_type, file_size, created_at, updated_at, status, metadata)
      VALUES (${req.name}, ${req.file_path}, ${req.file_type || null}, ${req.file_size || null}, 
              ${now}, ${now}, 'pending', ${JSON.stringify(req.metadata || {})})
      RETURNING id
    `) {
      rows.push(row);
    }

    if (rows.length === 0) {
      throw APIError.internal("Failed to create source");
    }

    return {
      id: rows[0].id,
      message: "Source created successfully"
    };
  }
);

export const getSource = api(
  { method: "GET", path: "/sources/:id" },
  async ({ id }: { id: number }): Promise<GetSourceResponse> => {
    const rows = [];
    for await (const row of db.query`
      SELECT id, name, file_path, file_type, file_size, created_at, updated_at, status, metadata
      FROM sources
      WHERE id = ${id}
    `) {
      rows.push(row);
    }

    if (rows.length === 0) {
      throw APIError.notFound("Source not found");
    }

    const source = rows[0];
    return {
      source: {
        id: source.id,
        name: source.name,
        file_path: source.file_path,
        file_type: source.file_type,
        file_size: source.file_size,
        created_at: source.created_at,
        updated_at: source.updated_at,
        status: source.status,
        metadata: typeof source.metadata === 'string' ? JSON.parse(source.metadata) : source.metadata
      }
    };
  }
);

export const listSources = api(
  { method: "GET", path: "/sources" },
  async ({ limit = 50, offset = 0 }: { limit?: number; offset?: number }): Promise<ListSourcesResponse> => {
    const sources = [];
    for await (const row of db.query`
      SELECT id, name, file_path, file_type, file_size, created_at, updated_at, status, metadata
      FROM sources
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) {
      sources.push(row);
    }

    const countRows = [];
    for await (const row of db.query`SELECT COUNT(*) as count FROM sources`) {
      countRows.push(row);
    }
    const total = countRows[0].count;

    return {
      sources: sources.map(source => ({
        id: source.id,
        name: source.name,
        file_path: source.file_path,
        file_type: source.file_type,
        file_size: source.file_size,
        created_at: source.created_at,
        updated_at: source.updated_at,
        status: source.status,
        metadata: typeof source.metadata === 'string' ? JSON.parse(source.metadata) : source.metadata
      })),
      total
    };
  }
);

export const updateSource = api(
  { method: "PUT", path: "/sources/:id" },
  async ({ id, ...req }: { id: number } & UpdateSourceRequest): Promise<{ message: string }> => {
    const now = new Date();
    
    // For simplicity, let's update all possible fields
    const rows = [];
    for await (const row of db.query`
      UPDATE sources 
      SET 
        name = COALESCE(${req.name || null}, name),
        status = COALESCE(${req.status || null}, status),
        metadata = COALESCE(${req.metadata ? JSON.stringify(req.metadata) : null}, metadata),
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING id
    `) {
      rows.push(row);
    }

    if (rows.length === 0) {
      throw APIError.notFound("Source not found");
    }

    return { message: "Source updated successfully" };
  }
);

export const deleteSource = api(
  { method: "DELETE", path: "/sources/:id" },
  async ({ id }: { id: number }): Promise<{ message: string }> => {
    const rows = [];
    for await (const row of db.query`DELETE FROM sources WHERE id = ${id} RETURNING id`) {
      rows.push(row);
    }

    if (rows.length === 0) {
      throw APIError.notFound("Source not found");
    }

    return { message: "Source deleted successfully" };
  }
);