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

  return (
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      {children}
    </>
  );
};

export default Header;
