import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import PageContent from "./PageContent";

type Props = {
  params: {
    pageNumber: string;
  };
};

export default async function PageNumberPage({ params }: Props) {
  const { pageNumber } = await params;

  // Validate page number format (should be 3 digits like "001")
  if (!/^\d{3}$/.test(pageNumber)) {
    notFound();
  }

  // Convert page number to filename format
  const fileName = `gazeta_${pageNumber}.jpg`;
  const bucketPath = path.join(process.cwd(), 'public/bucket');
  const imagePath = path.join(bucketPath, fileName);

  // Check if the image file exists
  if (!fs.existsSync(imagePath)) {
    notFound();
  }
  
  // Format the display name
  const displayName = fileName.replace(/\.jpg$/, '').replace(/_/g, ' ');

  // Read markdown content
  const mdPath = path.join(bucketPath, `gazeta_${pageNumber}.md`);
  let mdContent = '';
  if (fs.existsSync(mdPath)) {
    mdContent = fs.readFileSync(mdPath, 'utf-8');
  }

  // Get file stats
  const stats = fs.statSync(imagePath);
  const fileSize = (stats.size / 1024).toFixed(2); // KB
  const lastModified = stats.mtime.toLocaleDateString();
  
  return (
    <PageContent
      pageNumber={pageNumber}
      fileName={fileName}
      displayName={displayName}
      fileSize={fileSize}
      lastModified={lastModified}
      markdownContent={mdContent}
    />
  );
}
