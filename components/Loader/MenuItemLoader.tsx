import React from "react";

interface MenuItemLoaderProps {
  repeatCount: number;
}

const MenuItemLoader: React.FC<MenuItemLoaderProps> = ({ repeatCount }) => (
  <>
    <table width={"100%"}>
      <tbody>
        <tr>
          <td className="bg-gray-200 w-8 h-4 mb-2">&nbsp;</td>
        </tr>
        {[...Array(repeatCount)].map((_, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>
                <div className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-200 h-4 mx-2 my-2 animate-pulse">
                  &nbsp;
                  <span className={"ms-3 "}>&nbsp;</span>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
        <tr>
          <td>
            <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

export default MenuItemLoader;
