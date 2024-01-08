import { UserInfo } from "../../../user/UserInfo";

export interface ProfilDropdownProps {
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  userInfo: UserInfo | null;
}
