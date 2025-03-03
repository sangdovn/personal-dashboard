import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "YouTube Summarizer",
  description: "YouTube Summarizer",
};

type Props = {
  children: ReactNode;
};

export default function YouTubeSummarizerLayout({ children }: Props) {
  return <>{children}</>;
}
