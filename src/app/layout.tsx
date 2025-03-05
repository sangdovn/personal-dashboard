import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import ResizableContainer from "@/components/ResizableContainer";

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
          <Sidebar />
          <ResizableContainer>{children}</ResizableContainer>
        </Providers>
      </body>
    </html>
  );
}
