import React from "react";
import { JwtTokenManager } from "@/utils/jwtManager";
import {
  LogoutIcon,
  GlobeIcon,
  ShoppingCartIcon,
  DatabaseIcon,
  KeyIcon,
  MapIcon,
  LockClosedIcon,
  FlagIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { MenuItem } from "@/types/props/Header/Navbar/MenuItemProps";
import { Tooltip } from "react-tooltip";

const MenuList: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const tokenManager = new JwtTokenManager();

  const mainMenuItems = [
    {
      label: "Sign out",
      onClick: () => tokenManager.cleaner(),
      icon: <LogoutIcon className="w-4 h-4 mr-2" />,
    },
  ];

  const metatubeMenuItems: MenuItem[] = [
    {
      label: "MetaTube Studio",

      icon: <GlobeIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Purchases and Subscriptions",

      icon: <ShoppingCartIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
  ];
  const dataMenuItems: MenuItem[] = [
    {
      label: "Your data in MetaTube",
      icon: <DatabaseIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Apparence: Device theme",
      icon: <MoonIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Language: English",
      icon: <FlagIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Restricted Mode : Off",
      icon: <LockClosedIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Country: France",
      icon: <MapIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Keyboard Shortcuts",
      icon: <KeyIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
  ];
  const settingsMenuItems: MenuItem[] = [
    {
      label: "Settings",
      icon: <CogIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
  ];
  const helpMenuItems: MenuItem[] = [
    {
      label: "Help",
      icon: <QuestionMarkCircleIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
    {
      label: "Send feedback",
      icon: <InformationCircleIcon className="w-4 h-4 mr-2" />,
      disabled: true,
    },
  ];
  return (
    <ul className="py-2" aria-labelledby="user-menu-button">
      {mainMenuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <li>
        <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
      </li>
      {metatubeMenuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <li>
        <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
      </li>
      {dataMenuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <li>
        <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
      </li>
      {settingsMenuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <li>
        <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
      </li>
      {helpMenuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </ul>
  );
};

const MenuItem: React.FC<MenuItem> = ({ label, onClick, icon, disabled }) => (
  <>
    <li>
      {disabled ? (
        <a
          className="flex items-center px-4 py-2 text-sm text-gray-400 cursor-not-allowed "
          data-tooltip-content={" Functionality under development"}
          data-tooltip-id={`tooltip-${label}`}
        >
          {icon}
          {label}
          <Tooltip id={`tooltip-${label}`} place="right" />
        </a>
      ) : (
        <a
          onClick={onClick}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          {icon}
          {label}
        </a>
      )}
    </li>
  </>
);

export default MenuList;
