import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import MarkdownDisplay from "../../components/MarkdownDisplay";

type Props = {
  params: {
    name: string;
  };
};

export default function ContentPage({ params }: Props) {
  const { name } = params;
  
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

  // Read markdown content
  const mdPath = path.join(process.cwd(), 'public/bucket', `${fileName.replace('.jpg', '')}.md`);
  let mdContent = '';
  if (fs.existsSync(mdPath)) {
    mdContent = fs.readFileSync(mdPath, 'utf-8');
  }
  
  return (
    <div className="flex h-full bg-white">
      <main className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <Image
            src={`/bucket/${fileName}`}
            alt={fileName}
            width={800}
            height={1000}
            className="max-w-full h-auto border border-slate-300 rounded-lg shadow-lg"
            priority
          />
        </div>
      </main>
      <aside className="w-1/3 border-l border-slate-200 p-4 overflow-auto">
        <MarkdownDisplay content={mdContent} />
      </aside>
    </div>
  );
}
