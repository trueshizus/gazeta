import React from "react";
import RadioLink from "./RadioLink";
import Panel from "./Panel";

interface QueueItem {
  _id: string;
  [key: string]: any;
}

interface QueueProps {
  name: string;
  items: QueueItem[];
  component: (props: QueueItem) => React.JSX.Element;
}

export default function Queue({ name, items, component }: QueueProps) {
  return (
    <fieldset className="h-full overflow-hidden rounded">
      <legend className="bg-slate-700 px-4 py-1 text-center text-slate-50 mx-auto rounded text-sm font-medium">
        {name}
      </legend>

      <Panel as="section" className="bg-slate-50 border-slate-200 has-[:focus]:border-slate-400 has-[:focus]:border-2 overflow-y-scroll h-full scrollbar rounded mt-2">
        {items.map((item) => (
          <div key={item._id}>
            <label
              htmlFor={item._id}
              className="border-b border-slate-200 has-[:checked]:bg-slate-100 has-[:checked]:border-l-4 has-[:checked]:border-l-slate-600 p-3 flex flex-col hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <RadioLink id={item._id} name={name} />
              <div>{component({ ...item })}</div>
            </label>
          </div>
        ))}
      </Panel>
    </fieldset>
  );
}
