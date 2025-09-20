import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ParsedContent from "@/app/components/ParsedContent";
import Pipe from "@/app/components/Pipe";
import PipeMap from "@/app/components/Pipe";
import { NuqsAdapter } from "nuqs/adapters/next";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

interface ParsedContent {
  pageNumber: number;
  content: string;
  generatedAt: string;
}

export default async function Page({ params }: Props) {
  const pipes = Object.keys(PipeMap);
  const { name } = await params;
  
  return (
    <main className="bg-slate-950 w-full grid auto-cols-max grid-flow-col gap-2">
      <h1>content</h1>
      <NuqsAdapter>
      {pipes.map(pipe => {
        return (
          <Pipe key={pipe} pipe={pipe} className="bg-slate-300 rounded" />
        );
      })}
      </NuqsAdapter>

    </main>
  );
}

// export default async function ContentPage({ params }: Props) {
//   const pipes = Object.keys(PipeMap);
//   const { name } = await params;
  
//   // Construct the expected filename
//   const fileName = name.endsWith('.jpg') ? name : `${name}.jpg`;
//   const bucketPath = path.join(process.cwd(), 'public/bucket');
//   const filePath = path.join(bucketPath, fileName);
  
//   // Check if file exists and get stats
//   let stats;
//   try {
//     stats = fs.statSync(filePath);
//   } catch {
//     return notFound();
//   }

//   // Extract page number from filename
//   const pageNumber = parseInt(fileName.match(/\d+/)?.[0] || '0', 10);
  
//   // Format the display name
//   const displayName = fileName.replace(/\.jpg$/, '').replace(/_/g, ' ');
  
//   // Get file metadata
//   const fileSize = (stats.size / 1024).toFixed(2); // KB
//   const lastModified = stats.mtime.toLocaleDateString();
  
//   // Check if JSON file exists
//   const jsonFileName = fileName.replace('.jpg', '.json');
//   const jsonFilePath = path.join(process.cwd(), jsonFileName);
//   const hasJsonFile = fs.existsSync(jsonFilePath);
  
//   // Read JSON file content if it exists
//   let parsedContent: ParsedContent | null = null;
//   if (hasJsonFile) {
//     try {
//       const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
//       parsedContent = JSON.parse(jsonContent);
//     } catch (error) {
//       console.error('Error reading JSON file:', error);
//     }
//   }

//   // const pipes = ['pipe1', 'pipe2', 'pipe3']; // Example pipes, replace with actual data if needed

  
//   return (
//     // <>
//     //   <main className="bg-white border border-slate-300 rounded-lg shadow-sm w-5/12 p-2 resize-x overflow-auto min-w-[300px]">
//     //     <div className="h-full flex flex-col">
//     //       <header className="px-6 py-4 border-b border-slate-200">
//     //         <h1 className="text-2xl font-bold text-slate-800">{displayName}</h1>
//     //         <div className="flex items-center text-sm text-slate-500 mt-1">
//     //           <span className="mr-3">Page {pageNumber}</span>
//     //           <span className="mr-3">•</span>
//     //           <span className="mr-3">{fileSize} KB</span>
//     //           <span className="mr-3">•</span>
//     //           <span>Last modified: {lastModified}</span>
//     //         </div>
//     //       </header>
          
//     //       <div className="flex-1 p-4 overflow-auto bg-slate-50">
//     //         <div className="flex justify-center">
//     //           <Image
//     //             src={`/bucket/${fileName}`}
//     //             alt={displayName}
//     //             width={800}
//     //             height={1000}
//     //             className="max-w-full h-auto border border-slate-300 rounded-lg shadow-lg"
//     //             priority
//     //           />
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </main>
      
//     //   <aside className="w-5/12 bg-slate-50 border border-slate-300 rounded-lg shadow-sm grow p-2">
//     //   <ParsedContent page={fileName} />

//     //   </aside>
//     // </>

//     <main className="bg-red-300 w-full flex gap-2">
//       {pipes.map(pipe => 
//         <Pipe key={pipe} pipe={pipe}  className="flex-1" />
//       )}

//     </main>
//   );
// }
