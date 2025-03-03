import { HEADER_ICON_SIZE } from "@/contants";
import { Bell, Moon } from "lucide-react";
import SearchBox from "./SearchBox";

export default function HeaderControls() {
  return (
    <div className="flex items-center gap-4">
      <SearchBox />

      {/* Theme Toggle */}
      <button className="cursor-pointer rounded-md bg-gray-200 p-3 hover:bg-gray-300">
        <Moon size={HEADER_ICON_SIZE} />
      </button>

      {/* Notification */}
      <button className="cursor-pointer rounded-md bg-gray-200 p-3 hover:bg-gray-300">
        <Bell size={HEADER_ICON_SIZE} />
      </button>

      {/* Avatar */}
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-gray-400 text-xl font-bold hover:bg-gray-500">
        U
      </div>
    </div>
  );
}
