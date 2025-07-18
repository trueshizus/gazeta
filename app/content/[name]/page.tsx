import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

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
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{fileName}</h1>
      <Image
        src={`/bucket/${fileName}`}
        alt={fileName}
        width={800}
        height={1000}
        className="max-w-full h-auto border border-gray-300 rounded shadow-lg"
        priority
      />
    </div>
  );
}
