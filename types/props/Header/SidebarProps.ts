import { UserInfo } from "@/types";

export interface MenuItemSidebarProps {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  userInfo: UserInfo | null;
}

export interface SidebarState {
  showMoreVideos: boolean;
  showMoreSubscriptions: boolean;
}
