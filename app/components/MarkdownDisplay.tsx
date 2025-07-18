import React from 'react';

type MarkdownDisplayProps = {
  content: string;
};

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content }) => {
  return (
    <div className="p-4 prose">
      {content}
    </div>
  );
};

export default MarkdownDisplay;
