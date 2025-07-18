// Example of improved content page header with better visual hierarchy
export function ImprovedContentHeader({ 
  displayName, 
  pageNumber, 
  fileSize, 
  lastModified, 
  hasNotes 
}: {
  displayName: string;
  pageNumber: number;
  fileSize: string;
  lastModified: string;
  hasNotes: boolean;
}) {
  return (
    <header className="px-6 py-4 border-b border-slate-200 bg-white">
      {/* Breadcrumb navigation */}
      <nav className="text-sm text-slate-500 mb-2">
        <span>Gazeta</span>
        <span className="mx-2">›</span>
        <span className="text-slate-700">Page {pageNumber}</span>
      </nav>
      
      {/* Main title with status indicator */}
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold text-slate-900">{displayName}</h1>
        {hasNotes && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 014 11.5V5zM8.5 8a.5.5 0 01.5-.5h2a.5.5 0 010 1H9a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h2a.5.5 0 010 1H9a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
            </svg>
            Notes Available
          </span>
        )}
      </div>
      
      {/* Metadata with improved styling */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center text-slate-600">
          <span className="font-medium">Page</span>
          <span className="ml-1 px-2 py-0.5 bg-slate-100 rounded text-slate-800 font-mono">
            {pageNumber}
          </span>
        </div>
        
        <div className="w-px h-4 bg-slate-300"></div>
        
        <div className="text-slate-600">
          <span className="font-medium">Size:</span>
          <span className="ml-1 font-mono">{fileSize} KB</span>
        </div>
        
        <div className="w-px h-4 bg-slate-300"></div>
        
        <div className="text-slate-600">
          <span className="font-medium">Modified:</span>
          <span className="ml-1">{lastModified}</span>
        </div>
      </div>
    </header>
  );
}
