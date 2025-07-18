import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full p-6 flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Welcome to Gazeta</h1>
        <p className="text-stone-600 text-lg">Select a page from the sidebar to begin reading the digital newspaper.</p>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-stone-500">No page selected</p>
        </div>
      </div>
    </div>
  );
}
