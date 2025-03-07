import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import CustomTrigger from "@/components/ui/CustomSidebarTrigger";

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
            <CustomTrigger className="absolute top-2 left-2" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
