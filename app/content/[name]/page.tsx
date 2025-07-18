import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import MarkdownDisplay from "../../components/MarkdownDisplay";
import Panel from "../../components/Panel";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function ContentPage({ params }: Props) {
  const { name } = await params;
  
  // Check if the file exists in the bucket folder
  const bucketPath = path.join(process.cwd(), 'public/bucket');
  const files = fs.readdirSync(bucketPath);
  
  // Find the file (handle both with and without .jpg extension)
  const fileName = files.find(file => 
    file === name || 
    file === `${name}.jpg` || 
    file.replace('.jpg', '') === name
  );
  
  if (!fileName) {
    notFound();
  }

  // Extract page number from filename
  const pageNumber = parseInt(fileName.match(/\d+/)?.[0] || '0', 10);
  
  // Format the display name
  const displayName = fileName.replace(/\.jpg$/, '').replace(/_/g, ' ');
  
  // Read markdown content
  const mdPath = path.join(process.cwd(), 'public/bucket', `${fileName.replace('.jpg', '')}.md`);
  let mdContent = '';
  if (fs.existsSync(mdPath)) {
    mdContent = fs.readFileSync(mdPath, 'utf-8');
  }

  // Get file stats
  const stats = fs.statSync(path.join(bucketPath, fileName));
  const fileSize = (stats.size / 1024).toFixed(2); // KB
  const lastModified = stats.mtime.toLocaleDateString();
  
  return (
    <div className="h-full flex flex-col">
      <header className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">{displayName}</h1>
        <div className="flex items-center text-sm text-slate-500 mt-1">
          <span className="mr-3">Page {pageNumber}</span>
          <span className="mr-3">•</span>
          <span className="mr-3">{fileSize} KB</span>
          <span className="mr-3">•</span>
          <span>Last modified: {lastModified}</span>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <Panel as="main" className="flex-1 p-4 overflow-auto bg-slate-50">
          <div className="flex justify-center">
            <Image
              src={`/bucket/${fileName}`}
              alt={displayName}
              width={800}
              height={1000}
              className="max-w-full h-auto border border-slate-300 rounded-lg shadow-lg"
              priority
            />
          </div>
        </Panel>
        

      </div>
    </div>
  );
}
