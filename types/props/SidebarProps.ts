export interface MenuItem {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
}

export interface SidebarState {
  showMoreVideos: boolean;
  showMoreSubscriptions: boolean;
}
