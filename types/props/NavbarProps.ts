import { UserInfo } from "../user/UserInfo";

export interface NavbarProps {
  toggleSidebar: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  userInfo: UserInfo;
}
