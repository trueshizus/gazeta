import Image from "next/image";

type PageItemProps = {
  _id: string;
  filename: string;
  pageNumber: number;
};

export default function PageItem({ _id, filename, pageNumber }: PageItemProps) {
  // Format the filename for better display
  const displayName = filename.replace(/\.jpg$/, '').replace(/_/g, ' ');

  return (
    <div className="p-2 flex items-center gap-3">
      <Image
        src={`/bucket/${filename}`}
        alt={`Gazeta page ${pageNumber}`}
        width={60}
        height={80}
        className="border border-gray-300 rounded shadow-sm"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
      />
      <div>
        <div className="text-sm font-medium text-slate-700">{displayName}</div>
        <div className="text-xs text-slate-500">Page {pageNumber}</div>
      </div>
    </div>
  );
}
