import React from "react";

export default function YouTubeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>YouTube Layout</h1>
      {children}
    </>
  );
}
