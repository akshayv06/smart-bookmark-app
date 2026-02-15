"use client";

import { useState } from "react";

interface Props {
  onAdd: (title: string, url: string, category?: string) => void;
  adding: boolean;
}

export default function BookmarkForm({ onAdd, adding }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    onAdd(title, url, category || undefined);
    setTitle("");
    setUrl("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Website Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <input
        type="url"
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Category (Optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={adding}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {adding ? "Adding..." : "Save Bookmark"}
      </button>
    </form>
  );
}
