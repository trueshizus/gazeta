"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
  onSelectionChange?: (id: string) => void;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

export default function RadioLink({ id, name, onSelectionChange }: Props) {
  const router = useRouter();

  const handleSelection = () => {
    if (onSelectionChange) {
      onSelectionChange(id);
    } else {
      router.push(`/content/${id}`);
    }
  };

  return (
    <input
      id={id}
      type="radio"
      name={name}
      value={id}
      onChange={handleSelection}
      className="appearance-none outline-none"
    />
  );
}
