import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "YouTube Video Summarizer",
  description:
    "Get instant AI-generated summaries of YouTube videos with key points, executive summaries, and actionable insights.",
};

export default function YouTubeSummarizerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
