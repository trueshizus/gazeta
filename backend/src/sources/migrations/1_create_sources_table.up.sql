CREATE TABLE sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_sources_name ON sources(name);
CREATE INDEX idx_sources_status ON sources(status);
CREATE INDEX idx_sources_created_at ON sources(created_at);