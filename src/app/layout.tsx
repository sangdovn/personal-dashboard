import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import MainContent from "@/components/MainContent";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <MainContent>{children}</MainContent>
          </div>
        </Providers>
      </body>
    </html>
  );
}
