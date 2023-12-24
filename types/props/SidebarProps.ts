import { UserInfo } from "../user/UserInfo";

export interface MenuItem {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  userInfo :UserInfo
}

export interface SidebarState {
  showMoreVideos: boolean;
  showMoreSubscriptions: boolean;
}
