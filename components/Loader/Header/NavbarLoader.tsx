import React from "react";
import Image from "next/image";
const NavbarLoader: React.FC = () => (
  <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-neutral-950 dark:border-gray-700">
    <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div className="w-2/12 flex items-center justify-between">
        {/* Placeholder for MenuIcon loader */}
        <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse "></div>
        {/* Placeholder for Logo */}
        <div className="flex items-center space-x-1 ml-2">
          <Image
            src="/metatube.png"
            className="w-8 h-8 animate-pulse"
            alt="Flowbite Logo"
            width={48}
            height={48}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Metatube
          </span>
        </div>
      </div>

      {/* Placeholder for Search Form */}
      <form className="w-6/12 flex items-center justify-between invisible">
        <div className="relative w-full">
          <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="absolute top-0 end-0 h-full bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </form>

      <div className="w-1/12 flex items-center justify-between">
        {/* Placeholder for Video Camera Icon */}
        <div className="h-5 w-5 bg-gray-300 rounded-lg animate-pulse"></div>
        {/* Placeholder for Bell Icon */}
        <div className="h-5 w-5 bg-gray-300 rounded-lg animate-pulse invisible"></div>
        {/* Placeholder for Profile Dropdown */}
        <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  </nav>
);

export default NavbarLoader;
