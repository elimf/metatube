import React, { useState } from "react";
import {
  HomeIcon,
  PlayIcon,
  StarIcon,
  CollectionIcon,
  DocumentTextIcon,
  MusicNoteIcon,
  GlobeAltIcon,
  UserIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";

const Sidebar = ({ isSidebarOpen }) => {
  const [showMoreVideos, setShowMoreVideos] = useState(false);
  const [showMoreSubscriptions, setShowMoreSubscriptions] = useState(false);

  const createMenuItem = (icon, title, onClick, bool) => ({
    icon: icon,
    title: title,
    onClick: onClick,
    divider: bool,
  });

  const mainMenuItems = [
    createMenuItem(<HomeIcon className="w-5 h-5" />, "Welcome", () =>
      console.log("Welcome Clicked")
    ),
    createMenuItem(<PlayIcon className="w-5 h-5" />, "Shorts", () =>
      console.log("Shorts Clicked")
    ),
    createMenuItem(<StarIcon className="w-5 h-5" />, "Subscriptions", () =>
      console.log("Subscriptions Clicked")
    ),
  ];

  const videosMenuItems = [
    createMenuItem(<PlayIcon className="w-5 h-5" />, "Shorts", () =>
      console.log("Shorts Clicked")
    ),
    createMenuItem(<CollectionIcon className="w-5 h-5" />, "Historical", () =>
      console.log("Historical Clicked")
    ),
    createMenuItem(
      <DocumentTextIcon className="w-5 h-5" />,
      "Your videos",
      () => console.log("Your videos Clicked")
    ),
    createMenuItem(<StarIcon className="w-5 h-5" />, "To watch later", () =>
      console.log("To watch later Clicked")
    ),
    createMenuItem(<ThumbUpIcon className="w-5 h-5" />, "Liked Video", () =>
      console.log("Liked Video Clicked")
    ),
  ];

  const subscriptionsMenuItems = Array.from({ length: 6 }, (_, index) =>
    createMenuItem(
      <UserIcon className="w-5 h-5" />,
      `Subscription ${index + 1}`,
      () => console.log(`Subscription ${index + 1} Clicked`)
    )
  );

  const explorerMenuItems = [
    createMenuItem(<GlobeAltIcon className="w-5 h-5" />, "Trends", () =>
      console.log("Trends Clicked")
    ),
    createMenuItem(<MusicNoteIcon className="w-5 h-5" />, "Music", () =>
      console.log("Music Clicked")
    ),
  ];

  const renderMenuItems = (items, showMore, setShowMore, title) => {
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
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={menuItem.onClick}
                    >
                      {menuItem.icon}
                      <span className={`ms-3 ${isSidebarOpen ? "hidden" : ""}`}>
                        {menuItem.title}
                      </span>
                    </a>
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
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          onClick={menuItem.onClick}
                        >
                          {menuItem.icon}
                          <span
                            className={`ms-3 ${isSidebarOpen ? "hidden" : ""}`}
                          >
                            {menuItem.title}
                          </span>
                        </a>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {shouldDisplaySeeLess && isSidebarOpen && (
              <>
                <button
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
          {renderMenuItems(mainMenuItems, false, null)}
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
          {renderMenuItems(explorerMenuItems, false, null, "Explorer")}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
