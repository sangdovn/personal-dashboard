import { Home, Settings, Youtube } from "lucide-react";

export const HEADER_ICON_SIZE = 24;

export const SIDEBAR_ICON_SIZE = 24;

export const PAGE_HEADERS = new Map([
  ["/", "Home"],
  ["/youtube-summarizer", "YouTube Summarizer"],
  ["/settings", "Settings"],
]);

export const NAV_ITEMS = [
  { name: "Dashboard", path: "/", Icon: Home },
  { name: "Youtube Summarizer", path: "/youtube-summarizer", Icon: Youtube },
  { name: "Settings", path: "/settings", Icon: Settings },
];
