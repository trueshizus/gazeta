// Read the files in the folder bucket

import Image from "next/image";
import fs from "fs";
import path from "path";
import Queue from "./Queue";

// Component to display individual file items
function FileItem({ filename }: { filename: string }) {
  return (
    <div>
      {filename}
    </div>
  );
}

export default async function Nav() {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/bucket'));
  
  // Convert files to items with just filename and _id
  const items = files.map(file => ({
    _id: file,
    filename: file
  }));

  return (
    <nav className="bg-green-600 h-full">
      <Queue 
        name="pages" 
        items={items} 
        component={FileItem}
      />
    </nav>
  );
}
