-- Initialize the gazeta database
-- This script creates the source table which represents files that will be parsed by the system

-- Create the source table
CREATE TABLE IF NOT EXISTS source (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    metadata JSONB
);

-- Create an index on the name for faster lookups
CREATE INDEX IF NOT EXISTS idx_source_name ON source(name);

-- Create an index on the status for filtering
CREATE INDEX IF NOT EXISTS idx_source_status ON source(status);

-- Create an index on the created_at for sorting
CREATE INDEX IF NOT EXISTS idx_source_created_at ON source(created_at);

-- Add a comment to the table
COMMENT ON TABLE source IS 'Represents files that will be parsed by the system';
COMMENT ON COLUMN source.name IS 'Human-readable name or identifier for the source file';
COMMENT ON COLUMN source.file_path IS 'Full path to the source file';
COMMENT ON COLUMN source.file_type IS 'MIME type or file extension';
COMMENT ON COLUMN source.file_size IS 'Size of the file in bytes';
COMMENT ON COLUMN source.status IS 'Processing status: pending, processing, completed, error';
COMMENT ON COLUMN source.metadata IS 'Additional metadata about the source file in JSON format';