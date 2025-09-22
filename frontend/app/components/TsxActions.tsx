'use client'

interface TsxActionsProps {
  tsxContent: string;
  tsxFileName: string;
}

export default function TsxActions({ tsxContent, tsxFileName }: TsxActionsProps) {
  return (
    <div className="space-y-2">
      <button 
        className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        onClick={() => navigator.clipboard?.writeText(tsxContent)}
      >
        Copy TSX Code
      </button>
      <button 
        className="w-full px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
        onClick={() => {
          const blob = new Blob([tsxContent], { type: 'text/typescript' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = tsxFileName;
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download TSX File
      </button>
    </div>
  );
}
