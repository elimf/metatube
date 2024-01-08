import { UserInfo } from "@/types";

export interface ProfilDropdownProps {
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  userInfo: UserInfo | null;
}
