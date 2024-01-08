import { MenuItemSidebarProps } from "@/types";

export const createMenuItem = (
  icon: JSX.Element,
  title: string,
  onClick: () => void
): MenuItemSidebarProps => ({
  icon,
  title,
  onClick,
});
