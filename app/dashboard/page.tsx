"use client";

import { JSX, useEffect, useState } from "react";
import { FiBookmark, FiPenTool, FiCode, FiLogOut } from "react-icons/fi"; // Added FiLogOut
import AddBookmarkModal from "@/components/AddBookmarkModal";
import useBookmarks from "@/hooks/useBookmarks";
import { createClient } from "@/lib/supabase";
import BookmarkList from "@/components/BookmarkList";

const supabase = createClient();

export default function Dashboard() {
  const { bookmarks, loading, adding, alert, handleAdd, handleDelete } =
    useBookmarks();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch user info from Supabase auth
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata.full_name || user.email?.split("@")[0]);
        setUserEmail(user.email || "user@example.com");
        setUserAvatar(user.user_metadata.avatar_url || null);
      }
    };
    fetchUser();
  }, []);

  // Filter bookmarks based on search and selected category
  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory
      ? b.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Loading...</p>;

  // Sidebar categories
  const categories = ["All Bookmarks", "Design", "Development"];

  // Map category to icon
  const categoryIcons: Record<string, JSX.Element> = {
    "All Bookmarks": <FiBookmark className="inline mr-2 text-lg" />,
    Design: <FiPenTool className="inline mr-2 text-lg" />,
    Development: <FiCode className="inline mr-2 text-lg" />,
  };

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Optional: redirect to login page after logout
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center p-6">
            <img
              src="/icons8-bookmark-94.png"
              alt="SmartMarks"
              className="w-12 h-12 mr-2"
            />
            <span className="text-xl font-bold">SmartMarks</span>
          </div>
          <nav className="flex flex-col mt-6 px-4 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`flex items-center text-gray-700 font-semibold text-left hover:text-blue-600 transition ${
                  selectedCategory === cat ||
                  (cat === "All Bookmarks" && !selectedCategory)
                    ? "text-blue-600"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(cat === "All Bookmarks" ? null : cat)
                }
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile + Logout */}
        <div className="p-4 border-t border-gray-200 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                {userName[0]}
              </div>
            )}
            <div>
              <div className="font-semibold">{userName}</div>
              <div className="text-sm text-gray-500">{userEmail}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 mt-2 w-full text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Bookmarks</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search bookmarks..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowModal(true)}
            >
              Add Bookmark
            </button>
          </div>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {alert}
          </div>
        )}

        {/* Bookmark List */}
        <BookmarkList bookmarks={filteredBookmarks} onDelete={handleDelete} />

        {/* Add Bookmark Modal */}
        {showModal && (
          <AddBookmarkModal
            onAdd={handleAdd}
            adding={adding}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </div>
  );
}
