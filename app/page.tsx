"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/icons8-bookmark-94.png"   // put your logo inside public/icons8-bookmark-94.png
          alt="SmartMarks Logo"
          width={80}
          height={80}
          className="rounded-2xl shadow-md"
        />
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
        SmartMarks
      </h1>

      <p className="text-lg text-gray-600 mb-2 text-center">
        Your intelligent web brain.
      </p>

      <p className="text-gray-500 mb-8 text-center max-w-md">
        Private, fast, and organized.
      </p>

      {/* Features */}
      <div className="grid gap-3 mb-10 text-center text-gray-700">
        <p> Real-time sync across devices</p>
        <p> Private & Secure storage</p>
        <p> Smart categorization</p>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleLogin}
        className="flex items-center gap-3 px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:scale-105"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <p className="mt-6 text-sm text-gray-400">
        Get started in seconds
      </p>
    </div>
  );
}
