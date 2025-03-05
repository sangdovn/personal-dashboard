"use client";

import useStore from "@/lib/store";
import { ChildProps } from "@/types";
import clsx from "clsx";

export default function ResizableContainer({ children }: ChildProps) {
  const { isSidebarOpen } = useStore((state) => state);
  return (
    <div
      className={clsx(
        "h-dvh min-w-0 overflow-hidden transition-all duration-300",
        isSidebarOpen && "md:ml-64",
        isSidebarOpen && "md:ml-0",
      )}
    >
      {children}
    </div>
  );
}
