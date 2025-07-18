import Queue from "./Queue";
import { getPages } from "../lib/data";

// Component to display individual file items
function FileItem({ filename }: { filename: string }) {
  return (
    <div className="text-stone-700 text-sm">
      {filename}
    </div>
  );
}

export default async function Nav() {
  const items = await getPages();

  return (
    <nav className="h-full">
      <Queue 
        name="pages" 
        items={items} 
        component={FileItem}
      />
    </nav>
  );
}
