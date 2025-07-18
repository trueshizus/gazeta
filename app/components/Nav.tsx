import Queue from "./Queue";
import { getPages } from "../lib/data";
import PageItem from "./PageItem";

export default async function Nav() {
  const items = await getPages();

  return (
    <nav className="h-full">
      <Queue 
        name="Newspaper Pages" 
        items={items} 
        component={PageItem}
        variant="compact"
      />
    </nav>
  );
}
