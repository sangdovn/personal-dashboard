"use client";

import useStore from "@/lib/store";
import clsx from "clsx";
import Link from "next/link";
import { Bell, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { isSidebarOpen } = useStore((state) => state);

  return (
    <div
      className={clsx(
        "sticky inset-x-0 top-0 z-30 border-b border-gray-200 bg-white",
        "transition-all duration-300 ease-in-out",
      )}
    >
      {/* Content Layout */}
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center">
          <Link
            href="/"
            className={clsx(
              "hidden items-center justify-center gap-4 transition-all duration-300",
              "md:ml-12 md:flex",
              !isSidebarOpen && "md:opacity-100",
              isSidebarOpen && "md:pointer-events-none md:opacity-0",
            )}
          >
            <span className="h-8 w-8 rounded-lg bg-gray-300" />
            <span className="flex text-xl font-bold">Sang Do</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button className="cursor-pointer" size="icon" variant="ghost">
            <Moon />
          </Button>

          {/* Notification */}
          <Button className="cursor-pointer" size="icon" variant="ghost">
            <Bell />
          </Button>

          {/* User */}
          <Button className="cursor-pointer" size="icon" variant="outline">
            SD
          </Button>
        </div>
      </div>
    </div>
  );
}
