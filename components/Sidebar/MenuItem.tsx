import { MenuItemProps } from "@/types/props/SidebarProps";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  path,
  isSidebarOpen,
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push(path);
  };

  return (
    <>
      <a
        onClick={onClick}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group"
        data-tooltip-content={title}
        data-tooltip-id={title}
      >
        {icon}
        <span className={`ms-3 ${isSidebarOpen ? "hidden" : ""}`}>{title}</span>
      </a>
      <Tooltip id={title} place="right" />
    </>
  );
};

export default MenuItem;
