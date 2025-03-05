"use client";

import { NAV_ITEMS } from "@/constants";
import SidebarItem from "./SidebarItem";
import clsx from "clsx";
import Link from "next/link";
import useStore from "@/lib/store";
import BurgerButton from "../ui/BurgerButton";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useStore((state) => state);

  return (
    <>
      {/* Sidebar Wrapper */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 border-r border-gray-200 bg-red-300 transition-all duration-300",
          isSidebarOpen && "w-full md:w-64",
          !isSidebarOpen && "w-0",
        )}
      >
        <BurgerButton
          className="absolute top-4 left-4 z-50"
          isOpen={isSidebarOpen}
          toggleOpen={toggleSidebar}
        />
        {/* Content Layout */}
        <nav className="flex flex-col gap-8 overflow-x-hidden overflow-y-auto">
          <Link
            href="/"
            className={clsx(
              "flex h-16 items-center justify-center gap-2 transition-all duration-300",
              "md:justify-end md:px-4",
              isSidebarOpen && "opacity-100",
              !isSidebarOpen && "pointer-events-none opacity-0",
            )}
          >
            <span className="h-8 w-8 rounded-lg bg-zinc-300" />
            <span className={clsx("text-xl font-bold")}>John Doe</span>
          </Link>

          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
