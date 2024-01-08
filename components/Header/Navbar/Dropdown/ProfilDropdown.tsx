"use client";
import React from "react";
import Image from "next/image";
import { ProfilDropdownProps } from "@/types/props/Header/Navbar/ProfilDropdownProps";
import { checkIfUserIsAuthenticated } from "@/utils/authManager";
import MenuList from "./MenuList";
import { NotSignedInSection } from "./NotSigned";
import { UserInfoSection } from "./UserInfoSection";

const ProfilDropdown: React.FC<ProfilDropdownProps> = ({
  toggleDropdown,
  isDropdownOpen,
  userInfo,
}) => {
  const isAuthenticated = checkIfUserIsAuthenticated();
  const dropdownHeight = isAuthenticated ? "h-auto" : "h-50";

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
          src={
            userInfo?.avatar ||
            "https://api.dicebear.com/7.x/avataaars-neutral/png?eyes=xDizzy"
          }
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
          {isAuthenticated && userInfo ? (
            <>
              <UserInfoSection userInfo={userInfo} />
              <MenuList isAuthenticated={isAuthenticated} />
            </>
          ) : (
            <NotSignedInSection />
          )}
        </div>
      )}
    </>
  );
};

export default ProfilDropdown;
