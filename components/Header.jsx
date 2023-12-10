"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Header = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const mainMargin = isSidebarOpen ? "ml-16" : "ml-48";
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
        />
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto  ${mainMargin}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Header;
