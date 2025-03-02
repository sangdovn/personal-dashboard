import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export interface DashboardLayoutParam {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutParam) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
