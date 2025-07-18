// Read the files in the folder bucket

import Image from "next/image";
import fs from "fs";
import path from "path";
import Queue from "./Queue";

// Component to display individual file items
function FileItem({ filename }: { filename: string }) {
  return (
    <div className="text-stone-700 text-sm">
      {filename}
    </div>
  );
}

export default async function Nav() {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/bucket'));
  
  // Filter to only include .jpg files
  const jpgFiles = files.filter(file => file.endsWith('.jpg'));
  
  // Convert files to items with just filename and _id
  const items = jpgFiles.map(file => ({
    _id: file,
    filename: file
  }));

  return (
    <nav className="h-full">
      <Queue 
        name="pages" 
        items={items} 
        component={FileItem}
      />
    </nav>
  );
}
