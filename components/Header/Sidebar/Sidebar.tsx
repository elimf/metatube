import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  PlayIcon,
  StarIcon,
  CollectionIcon,
  MusicNoteIcon,
  GlobeAltIcon,
  UserIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import { Tooltip } from "react-tooltip";
import { SidebarProps } from "@/types/props/SidebarProps";
import { MenuItem } from "@/types/props/SidebarProps";
import { useRouter } from "next/navigation";
import { createMenuItem } from "./MenuItemSidebar";

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, userInfo }) => {
  const router = useRouter();
  const [showMoreVideos, setShowMoreVideos] = useState(false);
  const [showMoreSubscriptions, setShowMoreSubscriptions] = useState(false);
  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[]>([]);
  const [videosMenuItems, setVideosMenuItems] = useState<MenuItem[]>([]);
  const [explorerMenuItems, setExplorerMenuItems] = useState<MenuItem[]>([]);
  const [subscriptions, setSubscriptions] = useState(
    userInfo?.subscriptions || []
  );
  useEffect(() => {
    const generateMainMenuItems = () => [
      createMenuItem(
        <HomeIcon className="w-5 h-5" />,
        "Welcome",
        () => router.push("/") // Remplacez '/welcome' par le chemin de votre page
      ),
      createMenuItem(
        <PlayIcon className="w-5 h-5" />,
        "Shorts",
        () => router.push("/shorts") // Remplacez '/shorts' par le chemin de votre page
      ),
      createMenuItem(
        <StarIcon className="w-5 h-5" />,
        "Subscriptions",
        () => router.push("/subscriptions") // Remplacez '/subscriptions' par le chemin de votre page
      ),
    ];
    const generateVideosMenuItems = () => {
      const items = [];

      if (userInfo?.channel) {
        // Si l'utilisateur est connecté
        items.push(
          createMenuItem(<PlayIcon className="w-5 h-5" />, "Your Channel", () =>
            router.push(`channel/${userInfo.channel}`)
          )
        );
      }

      items.push(
        createMenuItem(
          <CollectionIcon className="w-5 h-5" />,
          "Historical",
          () => router.push("/history") // Remplacez '/historical' par le chemin de votre page
        ),
        createMenuItem(<StarIcon className="w-5 h-5" />, "To watch later", () =>
          router.push("/playlist?list=WL")
        ),
        createMenuItem(<ThumbUpIcon className="w-5 h-5" />, "Liked Video", () =>
          router.push("/playlist?list=LL")
        )
      );

      return items;
    };

    const generateExplorerMenuItems = () => [
      createMenuItem(<GlobeAltIcon className="w-5 h-5" />, "Trends", () =>
        router.push("/")
      ),
      createMenuItem(<MusicNoteIcon className="w-5 h-5" />, "Music", () =>
        router.push("/")
      ),
    ];

    setMainMenuItems(generateMainMenuItems());
    setVideosMenuItems(generateVideosMenuItems());
    setExplorerMenuItems(generateExplorerMenuItems());
    setSubscriptions(userInfo?.subscriptions || []);
  }, [userInfo, subscriptions, router]);

  const subscriptionsMenuItems = subscriptions.map((_, index) =>
    createMenuItem(
      <UserIcon className="w-5 h-5" />,
      `Subscription ${index + 1}`,
      () => console.log(`Subscription ${index + 1} Clicked`)
    )
  );
  const renderMenuItems = (
    items: MenuItem[],
    showMore: boolean,
    setShowMore: (value: boolean) => void,
    title?: string
  ) => {
    const initialDisplayedItems = items.slice(0, 4);
    const additionalItems = items.slice(4);
    const shouldDisplaySeeMore = !showMore && additionalItems.length > 0;
    const shouldDisplaySeeLess = showMore && additionalItems.length > 0;

    return (
      <>
        <table>
          <tbody>
            {title && !isSidebarOpen && (
              <tr>
                <td>{title}</td>
              </tr>
            )}
            {initialDisplayedItems.map((menuItem, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <a
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  group cursor-pointer"
                      onClick={menuItem.onClick}
                      data-tooltip-content={menuItem.title}
                      data-tooltip-id={menuItem.title}
                    >
                      {menuItem.icon}
                      <span className={`ms-3 ${isSidebarOpen ? "hidden" : ""}`}>
                        {menuItem.title}
                      </span>
                    </a>
                    <Tooltip id={menuItem.title} place="right" />
                  </td>
                </tr>
                <tr>
                  {!shouldDisplaySeeMore &&
                    !shouldDisplaySeeLess &&
                    initialDisplayedItems.length - 1 === index && (
                      <td>
                        <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
                      </td>
                    )}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {shouldDisplaySeeMore && !isSidebarOpen && (
          <>
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group"
              onClick={() => setShowMore(!showMore)}
            >
              <span className="ms-3">See More</span>
              <span className="ms-3">🔽</span>
            </button>
            <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
          </>
        )}
        {showMore && (
          <>
            <table>
              <tbody>
                {additionalItems.map((menuItem, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        <a
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  group cursor-pointer"
                          onClick={menuItem.onClick}
                          data-tooltip-content={menuItem.title}
                          data-tooltip-id={menuItem.title}
                        >
                          {menuItem.icon}
                          <span
                            className={`ms-3 ${isSidebarOpen ? "hidden" : ""}`}
                          >
                            {menuItem.title}
                          </span>
                        </a>
                        <Tooltip id={menuItem.title} place="right" />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {shouldDisplaySeeLess && !isSidebarOpen && (
              <>
                <button
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                >
                  <span className="ms-3">See Less</span>
                  <span className="ms-3">🔼</span>
                </button>
                <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
              </>
            )}
          </>
        )}
      </>
    );
  };

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
          {renderMenuItems(mainMenuItems, false, () => {})}
          {renderMenuItems(
            videosMenuItems,
            showMoreVideos,
            setShowMoreVideos,
            "You"
          )}
          {renderMenuItems(
            subscriptionsMenuItems,
            showMoreSubscriptions,
            setShowMoreSubscriptions,
            "Subscriptions"
          )}
          {renderMenuItems(explorerMenuItems, false, () => {}, "Explorer")}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
