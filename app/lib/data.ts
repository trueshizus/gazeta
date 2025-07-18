import fs from 'fs';
import path from 'path';

export type Page = {
  _id: string;
  filename: string;
  pageNumber?: number;
  hasNotes?: boolean;
  lastModified?: string;
  fileSize?: number;
};

export async function getPages(): Promise<Page[]> {
  const bucketPath = path.join(process.cwd(), 'public/bucket');
  const files = fs.readdirSync(bucketPath);

  // Filter to only include .jpg files
  const jpgFiles = files.filter(file => file.endsWith('.jpg'));

  // Convert files to items with enhanced metadata
  const items = jpgFiles.map(file => {
    // Get file stats
    const stats = fs.statSync(path.join(bucketPath, file));
    
    // Check if markdown notes exist for this file
    const mdPath = path.join(bucketPath, file.replace('.jpg', '.md'));
    const hasNotes = fs.existsSync(mdPath);
    
    // Extract page number from filename
    const pageNumber = parseInt(file.match(/\d+/)?.[0] || '0', 10);
    
    return {
      _id: file,
      filename: file,
      pageNumber,
      hasNotes,
      lastModified: stats.mtime.toISOString(),
      fileSize: Math.round(stats.size / 1024) // Size in KB
    };
  });

  // Sort by page number
  return items.sort((a, b) => (a.pageNumber || 0) - (b.pageNumber || 0));
}
