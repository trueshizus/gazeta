import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import TsxActions from "../../components/TsxActions";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function ContentPage({ params }: Props) {
  const { name } = await params;
  
  // Construct the expected filename
  const fileName = name.endsWith('.jpg') ? name : `${name}.jpg`;
  const bucketPath = path.join(process.cwd(), 'public/bucket');
  const filePath = path.join(bucketPath, fileName);
  
  // Check if file exists and get stats
  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch {
    return notFound();
  }

  // Extract page number from filename
  const pageNumber = parseInt(fileName.match(/\d+/)?.[0] || '0', 10);
  
  // Format the display name
  const displayName = fileName.replace(/\.jpg$/, '').replace(/_/g, ' ');
  
  // Get file metadata
  const fileSize = (stats.size / 1024).toFixed(2); // KB
  const lastModified = stats.mtime.toLocaleDateString();
  
  // Check if TSX file exists
  const tsxFileName = fileName.replace('.jpg', '.tsx');
  const tsxFilePath = path.join(process.cwd(), tsxFileName);
  const hasTsxFile = fs.existsSync(tsxFilePath);
  
  // Read TSX file content if it exists
  let tsxContent = '';
  if (hasTsxFile) {
    try {
      tsxContent = fs.readFileSync(tsxFilePath, 'utf8');
    } catch (error) {
      console.error('Error reading TSX file:', error);
    }
  }
  
  return (
    <>
      <main className="bg-white border border-slate-300 rounded-lg shadow-sm w-5/12 p-2 resize-x overflow-auto min-w-[300px]">
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
          
          <div className="flex-1 p-4 overflow-auto bg-slate-50">
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
          </div>
        </div>
      </main>
      
      <aside className="w-5/12 bg-slate-50 border border-slate-300 rounded-lg shadow-sm grow p-2">
        <div className="h-full flex flex-col">
          <header className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              {hasTsxFile ? 'Parsed Content (TSX)' : 'No TSX File Available'}
            </h2>
            {hasTsxFile && (
              <p className="text-sm text-slate-500 mt-1">
                Generated from image using Qwen2.5-VL
              </p>
            )}
          </header>
          
          <div className="flex-1 overflow-auto p-4">
            {hasTsxFile ? (
              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-lg">
                  <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 rounded-t-lg">
                    <span className="text-sm font-medium text-slate-700">TSX Component Code</span>
                  </div>
                  <pre className="p-4 text-sm text-slate-800 overflow-auto max-h-96">
                    <code>{tsxContent}</code>
                  </pre>
                </div>
                
                <div className="mt-4">
                  <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-t-lg">
                    <span className="text-sm font-medium text-slate-700">Actions</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 border-t-0 rounded-b-lg">
                    <TsxActions tsxContent={tsxContent} tsxFileName={tsxFileName} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 pt-8">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="mb-2">No TSX file found for this page.</p>
                <p className="text-sm">Run the parser to generate:</p>
                <code className="text-xs bg-slate-200 px-2 py-1 rounded mt-2 inline-block">
                  bun parse --page="{pageNumber.toString().padStart(3, '0')}"
                </code>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
