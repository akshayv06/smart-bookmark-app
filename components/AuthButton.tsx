"use client";

import { FcGoogle } from "react-icons/fc";
import { createClient } from "../lib/supabase";

const supabase = createClient();

export default function AuthButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) console.error(error.message);
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow hover:shadow-lg transition"
    >
      <FcGoogle size={24} />
      Sign in with Google
    </button>
  );
}
