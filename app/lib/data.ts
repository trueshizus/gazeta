import fs from 'fs';
import path from 'path';

export type Page = {
  _id: string;
  filename: string;
  pageNumber?: number;
  hasNotes?: boolean;
};

export async function getPages(): Promise<Page[]> {
  const bucketPath = path.join(process.cwd(), 'public/bucket');
  const files = fs.readdirSync(bucketPath);

  // Filter to only include .jpg files
  const jpgFiles = files.filter(file => file.endsWith('.jpg'));

  // Convert files to items with metadata
  const items = jpgFiles.map(file => {
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
    };
  });

  // Sort by page number
  return items.sort((a, b) => (a.pageNumber || 0) - (b.pageNumber || 0));
}
