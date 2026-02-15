"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-screen w-64 bg-gray-800 text-white p-4">
      <div>
        <div className="mb-8 text-xl font-semibold">Menu</div>
        <ul className="flex flex-col gap-4">
          <li className="hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">All Bookmarks</li>
          <li className="hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">Design</li>
          <li className="hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">Development</li>
          <li className="hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">Settings</li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <FcGoogle size={32} />
        <div>
          <div className="font-semibold">Demo User</div>
          <div className="text-sm text-gray-400">demo@smartmarks.app</div>
        </div>
      </div>
    </div>
  );
}
