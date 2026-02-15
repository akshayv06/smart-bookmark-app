"use client";

import { useState } from "react";

interface Props {
  onAdd: (title: string, url: string, category?: string) => void;
  adding: boolean;
  onClose: () => void;
}

export default function AddBookmarkModal({ onAdd, adding, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return alert("Title and URL are required");
    onAdd(title, url, category);
    setTitle("");
    setUrl("");
    setCategory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-transform scale-110">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Save a Website
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Website Name"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="https://..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category (Optional)</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                adding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } transition`}
              disabled={adding}
            >
              {adding ? "Saving..." : "Save Bookmark"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
