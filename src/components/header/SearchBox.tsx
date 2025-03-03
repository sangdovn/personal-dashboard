import { HEADER_ICON_SIZE } from "@/contants";
import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-gray-200 p-3">
      <Search className="text-gray-400" size={HEADER_ICON_SIZE} />
      <input
        type="text"
        placeholder="Search..."
        className="w-64 focus:outline-none"
      />
    </div>
  );
}
