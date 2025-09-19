import Render from "./Pipes/Render";

type PipeProps = {
  pipe: string;
  id?: string;
  className?: string;
};

const PipeMap: Record<string, React.FC> = {
  render: Render,
  pipe2: () => <span>Pipe 2</span>,
  pipe3: () => <span>Pipe 3</span>,
};

export default async function Pipe({ pipe, className }: PipeProps) {
  const PipeComponent = PipeMap[pipe];
  return <span className={`${className} bg-amber-700`}>{PipeComponent ? <PipeComponent /> : pipe}</span>;
}
