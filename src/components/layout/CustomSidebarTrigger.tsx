"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { ChildProps } from "@/lib/types";
import clsx from "clsx";

export default function CustomSidebarTrigger({ className }: ChildProps) {
  const { toggleSidebar, openMobile, open } = useSidebar();

  const spanClasses =
    "absolute h-1 w-6 rounded bg-gray-500 transition-all duration-300 ease-in-out";

  return (
    <button
      className={clsx(
        "z-50 flex size-9 cursor-pointer items-center justify-center outline-none",
        className,
      )}
      onClick={toggleSidebar}
    >
      <span
        className={clsx(
          spanClasses,
          !open && "md:-translate-y-2 md:rotate-0",
          open && "md:translate-y-0 md:rotate-45",
          !openMobile && "-translate-y-2 rotate-0",
          openMobile && "translate-y-0 rotate-45",
        )}
      />

      <span
        className={clsx(
          spanClasses,
          !open && "md:scale-100 md:opacity-100",
          open && "md:scale-0 md:opacity-0",
          !openMobile && "scale-100 opacity-100",
          openMobile && "scale-0 opacity-0",
        )}
      />

      <span
        className={clsx(
          spanClasses,
          !open && "md:translate-y-2 md:rotate-0",
          open && "md:translate-y-0 md:-rotate-45",
          !openMobile && "translate-y-2 rotate-0",
          openMobile && "translate-y-0 -rotate-45",
        )}
      />
    </button>
  );
}
