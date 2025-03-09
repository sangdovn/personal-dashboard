import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers, AppSidebar, CustomSidebarTrigger } from "@/components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppSidebar />
          <main className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden">
            <CustomSidebarTrigger className="absolute top-2 left-2" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
