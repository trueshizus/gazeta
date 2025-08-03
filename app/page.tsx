import { getPages } from "./lib/data";

export default async function Home() {
  const pages = await getPages();
  const totalPages = pages.length;
  const pagesWithNotes = pages.filter(page => page.hasNotes).length;
  
  return (
    <>
      <main className="bg-white border border-slate-300 rounded-lg shadow-sm w-5/12 p-2 resize-x overflow-auto min-w-[300px]">
        <div className="h-full p-6 flex flex-col">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Gazeta</h1>
            <p className="text-slate-600 text-lg">
              Select a page from the sidebar to begin exploring the digital newspaper archive.
            </p>
          </header>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <div className="w-28 h-28 bg-slate-100 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
                <svg className="w-14 h-14 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-700">Digital Newspaper Archive</h2>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Browse through historical newspaper pages and explore the past through digitized content.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-slate-800 mb-2">{totalPages}</div>
                <div className="text-sm text-slate-600">Total Pages</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-slate-800 mb-2">{pagesWithNotes}</div>
                <div className="text-sm text-slate-600">Pages with Notes</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-slate-800 mb-2">{Math.round((pagesWithNotes / totalPages) * 100)}%</div>
                <div className="text-sm text-slate-600">Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <aside className="w-5/12 bg-slate-50 border border-slate-300 rounded-lg shadow-sm grow p-2">
        <div className="text-center text-slate-400 pt-8">
          <p>Welcome to Gazeta Digital Archive</p>
          <p className="text-sm mt-2">Select a page to view its content and parsed information</p>
        </div>
      </aside>
    </>
  );
}
