// BookmarkList.tsx
"use client";
import { Bookmark } from "@/type/bookmark";
import BookmarkItem from "./BookmarkItem";

interface Props {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}

export default function BookmarkList({ bookmarks, onDelete }: Props) {
  if (!bookmarks.length) return <div className="text-gray-500">No bookmarks found.</div>;
  return (
    <div className="mt-4">
      {bookmarks.map((b) => (
        <BookmarkItem key={b.id} bookmark={b} onDelete={onDelete} />
      ))}
    </div>
  );
}
