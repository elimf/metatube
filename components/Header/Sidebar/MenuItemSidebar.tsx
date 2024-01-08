import { MenuItem } from "@/types/props/Header/SidebarProps";

export const createMenuItem = (
  icon: JSX.Element,
  title: string,
  onClick: () => void
): MenuItem => ({
  icon,
  title,
  onClick,
});
