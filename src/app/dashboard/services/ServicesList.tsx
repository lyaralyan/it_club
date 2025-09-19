import Image from "next/image";
import React from "react";
import { Pencil, Trash } from "lucide-react";

type Props = {
  item: ServiceListItem;
  onEdit?: (item: ServiceListItem) => void;
  onDelete?: (id: string) => void;
};

const ServicesList = ({ item, onEdit, onDelete }: Props) => {
  return (
    <div className="relative p-2 shadow rounded-xl w-[180px] flex flex-col items-center border bg-white group">
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.image}`}
        alt={item?.image}
        width={100}
        height={100}
        className="rounded-lg border"
        priority={false}
        unoptimized={true}
      />

      <p className="mt-2 text-center font-semibold">{item.title}</p>

      <p className="text-sm text-center text-gray-600 line-clamp-3 w-full px-1">
        {item.description}
      </p>

      <div className="absolute top-1 right-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit?.(item)}
          className="p-1 hover:bg-gray-100 rounded"
          title="Edit">
          <Pencil size={16} />
        </button>
        <button
          onClick={() => item.id && onDelete?.(item.id)}
          className="p-1 hover:bg-gray-100 rounded text-red-500"
          title="Delete">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServicesList;
