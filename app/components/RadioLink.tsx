"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
};

export default function RadioLink({ id, name }: Props) {
  const router = useRouter();

  const handleSelection = () => {
    router.push(`/content/${id}`);
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
