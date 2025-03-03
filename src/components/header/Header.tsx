"use client";

import { usePathname } from "next/navigation";
import HeaderControls from "./HeaderControls";
import { PAGE_HEADERS } from "@/contants";
import clsx from "clsx";
import useStore from "@/lib/store";

export default function Header() {
  const pathname = usePathname();
  const { isSidebarOpen } = useStore((state) => state);

  return (
    <div className="flex items-center justify-between p-4">
      <h1
        className={clsx(
          "text-2xl font-bold",
          {
            "ml-24": !isSidebarOpen,
            "ml-0": isSidebarOpen,
          },
          "transition-all duration-300 ease-in-out",
        )}
      >
        {PAGE_HEADERS.get(pathname)}
      </h1>
      <HeaderControls />
    </div>
  );
}
