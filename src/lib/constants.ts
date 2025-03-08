import { HelpCircle, LayoutDashboard, Send, Youtube } from "lucide-react";

export const NAV_ITEMS = {
  Application: [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    {
      name: "YouTube Summarizer",
      path: "/youtube-summarizer",
      icon: Youtube,
    },
  ],
  Help: [
    { name: "Support", path: "/support", icon: HelpCircle },
    { name: "Feedback", path: "/feedback", icon: Send },
  ],
};
