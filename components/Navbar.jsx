import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

const Navbar = ({ toggleSidebar, toggleDropdown, isDropdownOpen }) => {
  return (
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-neutral-950 dark:border-gray-700">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-1/12 flex items-center justify-between ">
          <button type="button" className="text-sm " onClick={toggleSidebar}>
            <MenuIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </button>
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-1 ml-10  "
          >
            <Image
              src="/metatube.png"
              className="h-8"
              alt="Flowbite Logo"
              width={48}
              height={48}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Metatube
            </span>
          </a>
        </div>

        <form className="w-6/12 flex items-center justify-between ">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-transparent rounded-lg border-s-gray-50 border-s-2 border border-gray-300 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-0"
              placeholder="To research"
              required
            />

            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border border-s-gray-50 dark:bg-transparent focus:outline-none"
            >
              <SearchIcon className="w-full h-6 text-white-500 transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
            </button>
          </div>
        </form>

        <div className="w-1/12 flex items-center justify-between ">
          <button
            type="button"
            className="flex text-sm bg-neutral-950 rounded-full md:me-0  "
            //onClick={handleAddVideoClick}
          >
            <VideoCameraIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </button>
          <button
            type="button"
            className="flex text-sm bg-neutral-950 rounded-full md:me-0  "
            //onClick={handleNotificationsClick}
          >
            <BellIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </button>

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
              className="z-50 top-16 right-0 w-64 h-screen  absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-900 dark:divide-gray-600"
              id="user-dropdown"
            >
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
