import { UserInfo } from "@/types/user/UserInfo";
import React from "react";
import Image from "next/image";


export const UserInfoSection: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => (
  <div className="px-4 py-3 flex items-center">
    <Image
      className="w-12 h-12 rounded-full mr-2"
      src={userInfo.avatar || "/avatar.avif"}
      alt="user photo"
      width={32}
      height={32}
    />
    <div className="px-4 py-3 flex items-center flex-col">
      <span className="block text-base font-bold text-gray-900 dark:text-white">
        {userInfo.username}
      </span>
      <span className="block text-sm text-gray-300 dark:text-white">
        @{userInfo.username}
      </span>
    </div>
  </div>
);

