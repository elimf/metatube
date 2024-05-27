"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { HeaderProps } from "@/types/props/Header/HeaderProps";
import { apiUserInfo } from "@/app/api/user/userinfo";
import { JwtTokenManager } from "@/utils/jwtManager";
import { UserInfo } from "@/types";
import { apiRefresh } from "@/app/api/auth/refresh";
import SidebarLoader from "../Loader/Header/SidebarLoader";
import NavbarLoader from "../Loader/Header/NavbarLoader";

const Header: React.FC<HeaderProps> = ({ children, withSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const tokenManager = useMemo(() => new JwtTokenManager(), []);
  const token = tokenManager.getToken();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [userInfo, setUserInfo] = useState<UserInfo | null>({
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
    const fetchData = async () => {
      if (token) {
        tokenManager.isTokenValid(token).then((res) => {
          if (!res) {
            apiRefresh();
          }
        });

        const result = await apiUserInfo(token);
        if (
          "statusCode" in result &&
          result.statusCode === 401 &&
          result.message === "Invalid JWT token"
        ) {
          apiRefresh();
        } else if (!("statusCode" in result)) {
          setUserInfo(result);
        } else {
          setUserInfo(null);
        }
      }
      setLoadingUserInfo(false);
    };

    fetchData();
  }, [token, tokenManager]);

  const mainMargin = isSidebarOpen ? "ml-16" : "ml-48";

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        {loadingUserInfo ? (
          <NavbarLoader />
        ) : (
          <Navbar
            toggleSidebar={toggleSidebar}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            userInfo={userInfo}
            withSidebar={withSidebar}
            withSearch={withSidebar}
            withNotifications={withSidebar}
            withUpload={withSidebar}
          />
        )}

        {withSidebar && (
          <>
            {loadingUserInfo ? (
              <SidebarLoader />
            ) : (
              <Sidebar isSidebarOpen={isSidebarOpen} userInfo={userInfo} />
            )}
          </>
        )}
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto ${
            withSidebar ? mainMargin : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Header;
