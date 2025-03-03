import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings",
};

type Props = {
  children: ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return <>{children}</>;
}
