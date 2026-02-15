// BookmarkItem.tsx
"use client";
import { Bookmark } from "@/type/bookmark";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

export default function BookmarkItem({ bookmark, onDelete }: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-3">
      <div>
        <div className="font-semibold">{bookmark.title}</div>
        <div className="text-gray-500">{bookmark.url}</div>
        {bookmark.category && (
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{bookmark.category}</span>
        )}
      </div>
      <div className="flex gap-2">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Visit Website
        </a>
        <button onClick={() => onDelete(bookmark.id)}>
          <AiOutlineDelete size={24} className="text-red-500 hover:text-red-700" />
        </button>
      </div>
    </div>
  );
}
