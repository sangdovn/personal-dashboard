"use client";

import { NAV_ITEMS } from "@/contants";
import SidebarItem from "./SidebarItem";
import useStore from "@/lib/store";
import BurgerButton from "./BurgerButton";
import clsx from "clsx";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useStore((state) => state);

  return (
    <>
      <BurgerButton isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-10 overflow-hidden bg-gray-100 pt-24",
          {
            "w-64": isSidebarOpen,
            "w-0": !isSidebarOpen,
          },
          "transition-all duration-300 ease-in-out",
        )}
      >
        <nav className="flex flex-col gap-y-2">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </aside>
    </>
  );
}
