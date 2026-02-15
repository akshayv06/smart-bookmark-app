"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Bookmark } from "@/type/bookmark";

const supabase = createClient();

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch initial bookmarks
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setBookmarks(data as Bookmark[]);

      setLoading(false);

      // Realtime subscription
      const sub = supabase
        .channel(`public:bookmarks:user=${session.user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${session.user.id}`,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setBookmarks((prev) => {
                // Avoid duplicate temp bookmark
                if (prev.some((b) => b.id === payload.new.id)) return prev;
                return [payload.new as Bookmark, ...prev];
              });
              setAlert("Bookmark added!");
              setTimeout(() => setAlert(""), 3000);
            } else if (payload.eventType === "DELETE") {
              setBookmarks((prev) =>
                prev.filter((b) => b.id !== payload.old.id)
              );
              setAlert("Bookmark deleted!");
              setTimeout(() => setAlert(""), 3000);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(sub);
      };
    };

    fetchBookmarks();
  }, []);

  // Add bookmark with optimistic update
  const handleAdd = async (title: string, url: string, category?: string) => {
    setAdding(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Temporary bookmark for instant UI
    const tempBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      category: category || "",
      created_at: new Date().toISOString(),
    };

    setBookmarks((prev) => [tempBookmark, ...prev]);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          title,
          url,
          category: category || null,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      // Remove temp bookmark on failure
      setBookmarks((prev) => prev.filter((b) => b.id !== tempBookmark.id));
      setAlert("Failed to add bookmark");
    } else if (data && data.length > 0) {
      // Replace temp bookmark with real one from DB
      setBookmarks((prev) =>
        prev.map((b) =>
          b.id === tempBookmark.id ? (data[0] as Bookmark) : b
        )
      );
      setAlert("Bookmark added!");
    }

    setTimeout(() => setAlert(""), 3000);
    setAdding(false);
  };

  // Delete bookmark with optimistic update
  const handleDelete = async (id: string) => {
    // Optimistically remove from UI
    const removed = bookmarks.find((b) => b.id === id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));

    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) {
      console.error(error);
      // Revert if delete fails
      if (removed) setBookmarks((prev) => [removed, ...prev]);
      setAlert("Failed to delete bookmark");
      setTimeout(() => setAlert(""), 3000);
    } else {
      setAlert("Bookmark deleted!");
      setTimeout(() => setAlert(""), 3000);
    }
  };

  return { bookmarks, loading, adding, alert, handleAdd, handleDelete };
}
