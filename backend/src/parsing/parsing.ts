import { api, APIError } from "encore.dev/api";
import { getSource, updateSource } from "../sources/sources.js";

// Request/Response types for parsing
export interface ParseSourceRequest {
  sourceId: number;
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ParseSourceResponse {
  sourceId: number;
  content: string;
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  parsedAt: Date;
}

// Parse a source file (placeholder implementation)
export const parseSource = api(
  { method: "POST", path: "/parsing/parse" },
  async (req: ParseSourceRequest): Promise<ParseSourceResponse> => {
    // Get the source from the database
    const sourceResponse = await getSource({ id: req.sourceId });
    const source = sourceResponse.source;

    if (source.status === 'parsing') {
      throw APIError.aborted("Source is already being parsed");
    }

    // Update status to parsing
    await updateSource({
      id: req.sourceId,
      status: 'parsing'
    });

    try {
      // TODO: Implement actual parsing logic here
      // This would call your existing parse.ts functionality
      // For now, return a placeholder
      const content = `<p>Parsed content for source: ${source.name}</p>
                      <p>File: ${source.file_path}</p>
                      ${req.coordinates ? `<p>Coordinates: ${JSON.stringify(req.coordinates)}</p>` : ''}`;

      // Update status to completed
      await updateSource({
        id: req.sourceId,
        status: 'completed',
        metadata: {
          ...source.metadata,
          lastParsed: new Date().toISOString(),
          coordinates: req.coordinates
        }
      });

      return {
        sourceId: req.sourceId,
        content,
        coordinates: req.coordinates,
        parsedAt: new Date()
      };
    } catch (error) {
      // Update status to failed
      await updateSource({
        id: req.sourceId,
        status: 'failed',
        metadata: {
          ...source.metadata,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
      
      throw APIError.internal("Failed to parse source");
    }
  }
);

// Get parsed content for a source
export const getParsedContent = api(
  { method: "GET", path: "/parsing/content/:sourceId" },
  async ({ sourceId }: { sourceId: number }): Promise<{ content: string; metadata?: any }> => {
    const sourceResponse = await getSource({ id: sourceId });
    const source = sourceResponse.source;

    if (source.status !== 'completed') {
      throw APIError.failedPrecondition("Source has not been parsed yet");
    }

    // TODO: Retrieve actual parsed content from storage
    // For now, return placeholder content
    return {
      content: `<p>Retrieved parsed content for source: ${source.name}</p>`,
      metadata: source.metadata
    };
  }
);