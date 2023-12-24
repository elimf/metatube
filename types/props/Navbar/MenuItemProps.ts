export interface MenuItem {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
}
