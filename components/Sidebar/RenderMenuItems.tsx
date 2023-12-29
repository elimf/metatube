import React from "react";
import { MenuItemProps } from "@/types/props/SidebarProps";
import MenuItem from "@mui/material/MenuItem";

export const RenderMenuItems = (
  items: React.FC<MenuItemProps>[],
  showMore: boolean,
  setShowMore: (value: boolean) => void,
  isSidebarOpen: boolean,
  title?: string
) => {
  const initialDisplayedItems: React.FC<MenuItemProps>[] = items.slice(0, 4);
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
          {initialDisplayedItems.map((menuItem, index) => {
            // Vérifiez si menuItem est une instance de React.ReactElement
            if (React.isValidElement(menuItem)) {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{menuItem}</td>
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
              );
            }
          })}
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
                    <td>{menuItem}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {shouldDisplaySeeLess && !isSidebarOpen && (
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
