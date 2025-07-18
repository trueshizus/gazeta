import fs from 'fs';
import path from 'path';

export type Page = {
  _id: string;
  filename: string;
};

export async function getPages(): Promise<Page[]> {
  const bucketPath = path.join(process.cwd(), 'public/bucket');
  const files = fs.readdirSync(bucketPath);

  // Filter to only include .jpg files
  const jpgFiles = files.filter(file => file.endsWith('.jpg'));

  // Convert files to items with just filename and _id
  const items = jpgFiles.map(file => ({
    _id: file,
    filename: file
  }));

  return items;
}
