import Pipe from "./components/Pipe";
import { PipeMap } from "./components/Pipes/config";

export default async function Home() {
  const pipes = Object.keys(PipeMap);

  return (
    <main className="bg-slate-950 w-full grid auto-cols-max grid-flow-col gap-2">
      {pipes.map((pipe) => {
        return <Pipe key={pipe} pipe={pipe} className="bg-slate-300 rounded" />;
      })}
    </main>
  );
}
