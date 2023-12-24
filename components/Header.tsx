"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { HeaderProps } from "@/types/props/HeaderProps";
import { apiUserInfo } from "@/api/user/userInfo";
import { JwtTokenManager } from "@/utils/jwtManager";
import { UserInfo } from "@/types/user/UserInfo";
import { ApiResponse } from "@/types/api/ApiResponse";
import showToast from "@/utils/toast";
const tokenManager = new JwtTokenManager();
const token = tokenManager.getToken();
const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    avatar: "",
    channel: "",
    subscriptions: [],
    playlists: [],
    history: [],
    likedVideos: [],
    timestamp: "",
  });

  useEffect(() => {
    // Call apiUserInfo here before the page loads
    if (token) {
      apiUserInfo(token).then((res: UserInfo | ApiResponse) => {
        if ("statusCode" in res) {
          showToast(res.message, "error");
          console.error("API Error:", res);
        } else {
          // Handle successful response, res is of type UserInfo
          setUserInfo(res);
          console.log(res);
        }
      });
    }
  }, []);

  const mainMargin = isSidebarOpen ? "ml-16" : "ml-48";

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
          userInfo={userInfo}
        />
        <Sidebar isSidebarOpen={isSidebarOpen} userInfo={userInfo} />
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
