import React, { useState } from "react";
import Image from "next/image";
import { ProfilDropdownProps } from "@/types/props/ProfilDropdownProps";

const ProfilDropdown: React.FC<ProfilDropdownProps> = ({
  toggleDropdown,
  isDropdownOpen,
  isAuthenticated,
}) => {
     const dropdownHeight = isAuthenticated ? "h-screen" : "h-50";
  return (
    <>
      <button
        type="button"
        className="flex text-sm bg-neutral-950 rounded-full md:me-0  "
        id="user-menu-button"
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="w-8 h-8 rounded-full"
          src="/metatube.png"
          alt="user photo"
          width={32}
          height={32}
        />
      </button>
      {isDropdownOpen && (
        <div
          className={`z-50 top-16 right-0 w-64 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-900 dark:divide-gray-600 ${dropdownHeight}`}
          id="user-dropdown"
        >
          {isAuthenticated ? ( // if user is authenticated
            <>
              <div className="px-4 py-3 ">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </> // if user is not authenticated
          ) : (
            <>
              <div className="px-4 py-3">
                <p className="text-sm leading-5">Not signed in</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilDropdown;
