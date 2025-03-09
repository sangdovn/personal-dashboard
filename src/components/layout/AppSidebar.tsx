"use client";
import { ChevronUp, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomSidebarTrigger from "@/components/layout/CustomSidebarTrigger";
import { Button } from "@/components/ui/button";

export default function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();

  const handleClick = () => {
    if (isMobile) toggleSidebar();
  };

  return (
    <Sidebar
      side="left"
      collapsible="offcanvas"
      variant="sidebar"
      className="overflow-hidden"
    >
      <SidebarHeader>
        <div className="flex flex-row items-center justify-between">
          <Button asChild onClick={handleClick} variant="ghost">
            <Link href="/" className="">
              <h1 className="text-2xl">Logo</h1>
            </Link>
          </Button>
          {isMobile && <CustomSidebarTrigger />}
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {Object.entries(NAV_ITEMS).map(([key, values]) => (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>{key}</SidebarGroupLabel>
            <SidebarGroupContent>
              {values.map((item) => (
                <SidebarMenuButton
                  key={item.path}
                  isActive={pathname === item.path}
                  asChild
                >
                  <Link
                    href={item.path}
                    className="px-3 py-4"
                    onClick={handleClick}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> John Doe
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
