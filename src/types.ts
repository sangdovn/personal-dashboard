import { JSX, ReactNode } from "react";

export type ChildProps = {
  children?: ReactNode;
  className?: string;
};

export type SideNavItem = {
  name: string;
  path: string;
  icon?: JSX.Element;
  subMenu?: boolean;
  subMenuItems?: SideNavItem[];
};
