"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { FcGoogle } from "react-icons/fc"; // Google icon

const supabase = createClient();

export default function HomePage() {
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error("Login error:", error.message);
      alert("Failed to login. Check console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Smart Bookmark App</h1>
      <p className="mb-8 text-gray-600 text-center px-4">
        Save and manage your bookmarks privately in real-time
      </p>
<button
  onClick={handleLogin}
  className="flex items-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition border border-gray-300"
>
  <FcGoogle size={24} />
  Sign in with Google
</button>

    </div>
  );
}
