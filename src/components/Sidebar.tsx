"use client";

import { Home, Settings, Youtube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();
  const isActive = (path: string) =>
    pathName === path
      ? "bg-blue-500 text-white"
      : "hover:bg-gray-700 hover:text-white";
  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          href="/dashboard"
          className={`flex items-center space-x-2 p-2 rounded hover:text-gray-300 ${isActive(
            "/dashboard"
          )}`}
        >
          <Home size={20} /> <span>Home</span>
        </Link>
        <Link
          href="/dashboard/youtube-summarizer"
          className={`flex items-center space-x-2 p-2 rounded hover:text-gray-300 ${isActive(
            "/dashboard/youtube-summarizer"
          )}`}
        >
          <Youtube size={20} /> <span>YouTube Summarizer</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className={`flex items-center space-x-2 p-2 rounded hover:text-gray-300 ${isActive(
            "/dashboard/settings"
          )}`}
        >
          <Settings size={20} /> <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
