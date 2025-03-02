import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Welcome",
  description: "This is central",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
