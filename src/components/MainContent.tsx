"use client";

import { ReactNode } from "react";
import Header from "./Header";
import useStore from "@/lib/store";
import clsx from "clsx";

type Props = {
  children: ReactNode;
};

export default function MainContent({ children }: Props) {
  const { isSidebarOpen } = useStore((state) => state);

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col",
        // {
        //   "pl-64": isSidebarOpen,
        //   "pl-0": !isSidebarOpen,
        // },
        "transition-all duration-300 ease-in-out",
      )}
    >
      <Header />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
