// Example of improved Queue component with better color contrast
import React from "react";
import RadioLink from "./RadioLink";
import Panel from "./Panel";

interface QueueItem {
  _id: string;
  [key: string]: any;
}

interface QueueProps<T extends QueueItem> {
  name: string;
  items: T[];
  component: (props: T) => React.JSX.Element;
  selectable?: boolean;
  variant?: 'default' | 'compact' | 'card';
  onSelectionChange?: (id: string) => void;
}

export default function ImprovedQueue<T extends QueueItem>({ 
  name, 
  items, 
  component, 
  selectable = true, 
  variant = 'default', 
  onSelectionChange 
}: QueueProps<T>) {
  return (
    <fieldset className="h-full overflow-hidden rounded">
      {/* Improved header with better contrast */}
      <legend className="bg-slate-800 px-4 py-2 text-center text-white mx-auto rounded text-sm font-semibold shadow-sm">
        {name}
      </legend>

      <Panel as="section" className="bg-white border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 overflow-y-scroll h-full scrollbar rounded mt-2">
        {items.map((item) => (
          <div key={item._id}>
            <label
              htmlFor={item._id}
              className={`
                border-b border-slate-200 
                transition-all duration-200 ease-in-out
                hover:bg-slate-50 
                has-[:checked]:bg-sky-50 
                has-[:checked]:border-l-4 
                has-[:checked]:border-l-sky-500
                has-[:checked]:shadow-sm
                p-3 flex flex-col cursor-pointer
                focus-within:ring-2 focus-within:ring-sky-200
              `}
            >
              {selectable && (
                <RadioLink 
                  id={item._id} 
                  name={name} 
                  onSelectionChange={onSelectionChange}
                />
              )}
              <div>{component({ ...item })}</div>
            </label>
          </div>
        ))}
      </Panel>
    </fieldset>
  );
}
