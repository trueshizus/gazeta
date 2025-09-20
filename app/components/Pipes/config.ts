import Article from "./Article";
import Group from "./Group";
import Layout from "./Layout";
import Render from "./Render";

export const PipeMap: Record<string, React.FC> = {
  render: Render,
  group: Group,
  layout: Layout,
  article: Article,
  // pipe3: () => { return <span>Pipe 3</span>; },
};
// pipe1: Render, --- IGNORE ---