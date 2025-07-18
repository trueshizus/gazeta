import Image from "next/image";

type PageItemProps = {
  _id: string;
  filename: string;
  pageNumber: number;
};

export default function PageItem({ _id, filename, pageNumber }: PageItemProps) {
  return (
    <div className="p-2">
      <div className="text-xs text-gray-600 mb-1">Page {pageNumber}</div>
      <Image
        src={`/bucket/${filename}`}
        alt={`Gaceta page ${pageNumber}`}
        width={120}
        height={160}
        className="border border-gray-300 rounded shadow-sm"
      />
    </div>
  );
}
