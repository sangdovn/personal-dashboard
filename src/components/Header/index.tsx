"use client";

import useStore from "@/lib/store";
import clsx from "clsx";
import Link from "next/link";
import { HEADER_ICON_SIZE } from "@/constants";
import { Bell, Moon } from "lucide-react";

export default function Header() {
  const { isSidebarOpen } = useStore((state) => state);

  return (
    <>
      {/* Header Wrapper */}
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
            <button className="cursor-pointer rounded-md bg-gray-200 p-3 hover:bg-gray-300">
              <Moon size={HEADER_ICON_SIZE} />
            </button>

            {/* Notification */}
            <button className="cursor-pointer rounded-md bg-gray-200 p-3 hover:bg-gray-300">
              <Bell size={HEADER_ICON_SIZE} />
            </button>

            {/* User */}
            <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-gray-400 text-xl font-bold hover:bg-gray-500">
              SD
            </div>
          </div>
        </div>

        {/* <HeaderControls /> */}
      </div>
    </>
  );
}
