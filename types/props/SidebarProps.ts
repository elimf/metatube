import { UserInfo } from "../user/UserInfo";

export interface MenuItemProps {
  icon: JSX.Element;
  title: string;
  path: string;
  isSidebarOpen?: boolean;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  userInfo :UserInfo | null;
}

export interface SidebarState {
  showMoreVideos: boolean;
  showMoreSubscriptions: boolean;
}
