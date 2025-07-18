import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Gazeta</h1>
      <p className="text-gray-600">Select a page from the sidebar to begin reading.</p>
    </div>
  );
}
