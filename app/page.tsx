import Image from "next/image";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1fr_1fr] bg-purple-600">
      <Nav />

      <article className="bg-amber-600 overflow-y-auto"></article>
      <aside className="text-left overflow-y-auto"></aside>
    </div>
  );
}
