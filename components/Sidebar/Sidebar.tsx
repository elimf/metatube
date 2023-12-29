import React, { useState, useEffect } from "react";
import { SidebarProps } from "@/types/props/SidebarProps";
import { PlayIcon, UserIcon } from "@heroicons/react/solid";
import MenuItem from "./MenuItem";
import {
  mainMenuItems,
  videosMenuItems,
  explorerMenuItems,
} from "./MenuItemData";
import { RenderMenuItems } from "./RenderMenuItems";
const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, userInfo }) => {
  const [showMoreVideos, setShowMoreVideos] = useState(false);
  const [showMoreSubscriptions, setShowMoreSubscriptions] = useState(false);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const subscriptionsMenuItems = subscriptions.map((_, index) =>
    MenuItem({
      icon: <UserIcon className="w-5 h-5" />,
      title: `Subscription ${index + 1}`,
      path: "#",
      isSidebarOpen: false,
    })
  );
  useEffect(() => {
    if (userInfo?.playlists) {
      videosMenuItems.concat(
        userInfo.playlists?.map((playlist, index) => (
          <MenuItem
            key={index + playlist}
            icon={<PlayIcon className="w-5 h-5" />}
            title="`${playlist}`"
            path="/"
            isSidebarOpen={false}
          />
        ))
      );
    }
    const newMenuItemKey = userInfo?.channel;
    const isKeyUnique = !videosMenuItems.some(
      (item) => item.key === newMenuItemKey
    );
    if (userInfo?.channel && isKeyUnique) {
      videosMenuItems.unshift(
        <MenuItem
          key={newMenuItemKey}
          icon={<PlayIcon className="w-5 h-5" />}
          title="Your Channel"
          path={`/channel/${userInfo.channel}`}
          isSidebarOpen={false}
        />
      );
    }

    setSubscriptions(userInfo?.subscriptions || []);
  }, [userInfo]);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-30 h-screen pt-20 transition-transform ${
        isSidebarOpen ? "w-16" : "w-48 -translate-x-full"
      } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-neutral-950 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-neutral-950">
        <ul className="space-y-2 font-medium">
          {RenderMenuItems(mainMenuItems, false, () => {}, isSidebarOpen)}
          {RenderMenuItems(
            videosMenuItems,
            showMoreVideos,
            setShowMoreVideos,
            isSidebarOpen,
            "You"
          )}
          {RenderMenuItems(
            subscriptionsMenuItems,
            showMoreSubscriptions,
            setShowMoreSubscriptions,
            isSidebarOpen,
            "Subscriptions"
          )}
          {RenderMenuItems(
            explorerMenuItems,
            false,
            () => {},
            isSidebarOpen,
            "Explorer"
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
