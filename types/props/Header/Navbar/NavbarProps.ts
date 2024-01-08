import { UserInfo } from "@/types";

export interface NavbarProps {
  toggleSidebar: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  userInfo: UserInfo | null;
  withSidebar?: boolean;
  withSearch?: boolean;
  withNotifications?: boolean;
  withUpload?: boolean;
}
