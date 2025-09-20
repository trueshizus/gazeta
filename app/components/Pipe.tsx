'use client';
import { useQueryState } from "nuqs";
import { PipeMap } from "./Pipes/config";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


type PipeProps = {
  pipe: string;
  id?: string;
  className?: string;
};

export default function Pipe({ pipe, className }: PipeProps) {
    const [name, setName] = useQueryState('name')
console.log(name);
  const PipeComponent = PipeMap[pipe];
  return (
    <section className={`${className}`}>
      
        <PipeComponent />
  
    </section>
  );
}
