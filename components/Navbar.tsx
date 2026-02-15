"use client";
import { FcAddDatabase } from "react-icons/fc";
import { FiSearch } from "react-icons/fi";

interface NavbarProps {
  onOpenAddModal: () => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export default function Navbar({ onOpenAddModal, searchTerm, setSearchTerm }: NavbarProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white shadow">
      <div className="flex items-center gap-3">
        <FcAddDatabase size={32} />
        <span className="text-2xl font-bold">SmartMarks</span>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg px-3 py-2 text-gray-800 w-64 focus:outline-none"
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
        </div>
        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          + Add Bookmark
        </button>
      </div>
    </div>
  );
}
