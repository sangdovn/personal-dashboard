import useStore from "@/lib/store";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  path: string;
  Icon: LucideIcon;
};

const ICON_SIZE = 24;

export default function SidebarItem({ name, path, Icon }: Props) {
  const { toggleSidebar } = useStore((state) => state);
  const pathName = usePathname();
  const isActive = (path: string) =>
    pathName === path ? "bg-blue-500 text-white" : "hover:bg-gray-300";

  return (
    <Link
      href={path}
      className={`flex items-center gap-x-2 rounded px-3 py-4 ${isActive(path)}`}
      onClick={toggleSidebar}
    >
      <Icon size={ICON_SIZE} /> <span>{name}</span>
    </Link>
  );
}
