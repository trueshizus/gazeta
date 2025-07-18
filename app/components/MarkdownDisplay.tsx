import React from 'react';

type MarkdownDisplayProps = {
  content: string;
};

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content }) => {
  if (!content || content.trim() === '') {
    return null;
  }
  
  // Create a very simple parser for our minimal markdown needs
  const formattedContent = content
    // Replace markdown headings with styled spans
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-slate-800 mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold text-slate-800 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-slate-800 mb-2">$1</h3>')
    // Handle paragraphs with double line breaks
    .split(/\n\s*\n/).join('</p><p class="mb-4 text-slate-700">');

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div 
        className="prose prose-slate max-w-none" 
        dangerouslySetInnerHTML={{ 
          __html: `<p class="mb-4 text-slate-700">${formattedContent}</p>` 
        }} 
      />
    </div>
  );
};

export default MarkdownDisplay;
