"use client";

import { useEffect } from "react";
import { useMarkdown } from "../components/MarkdownContext";
import Image from "next/image";

type PageContentProps = {
  pageNumber: string;
  fileName: string;
  displayName: string;
  fileSize: string;
  lastModified: string;
  markdownContent: string;
};

export default function PageContent({
  pageNumber,
  fileName,
  displayName,
  fileSize,
  lastModified,
  markdownContent,
}: PageContentProps) {
  const { setMarkdownContent, setCurrentPageNumber } = useMarkdown();

  useEffect(() => {
    setMarkdownContent(markdownContent);
    setCurrentPageNumber(pageNumber);
    
    // Cleanup when component unmounts
    return () => {
      setMarkdownContent("");
      setCurrentPageNumber(null);
    };
  }, [markdownContent, pageNumber, setMarkdownContent, setCurrentPageNumber]);

  const numericPageNumber = parseInt(pageNumber, 10);

  return (
    <div className="h-full flex flex-col">
      <header className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">{displayName}</h1>
        <div className="flex items-center text-sm text-slate-500 mt-1">
          <span className="mr-3">Page {numericPageNumber}</span>
          <span className="mr-3">•</span>
          <span className="mr-3">{fileSize} KB</span>
          <span className="mr-3">•</span>
          <span>Last modified: {lastModified}</span>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full flex justify-center">
          <Image
            src={`/bucket/${fileName}`}
            alt={displayName}
            width={800}
            height={1000}
            className="max-w-full max-h-full h-auto object-contain border border-slate-300 rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
