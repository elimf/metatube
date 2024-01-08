import { UserInfo } from "@/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const UserInfoSection: React.FC<{ userInfo: UserInfo }> = ({
  userInfo,
}) => (
  <>
    <div className=" flex-row px-4 py-3">
      <div className="flex items-center ">
        <div className="flex  ">
          <Image
            className="w-12 h-12 rounded-full mr-2"
            src={userInfo.avatar || "/avatar.avif"}
            alt="user photo"
            width={32}
            height={32}
          />
        </div>
        <div className=" flex-col px-4 py-3">
          <span className="block text-base font-bold text-gray-900 dark:text-white">
            {userInfo.username}
          </span>
          <span className="block text-sm text-gray-300 dark:text-white">
            @{userInfo.username}
          </span>
        </div>
      </div>
      <div>
        {userInfo.channel ? (
          <Link
            className="block text-sm text-gray-900 dark:text-white"
            href={"/channel/" + userInfo.channel}
          >
            Display my channel
          </Link>
        ) : (
          <Link
            className="block text-sm text-gray-900 dark:text-white"
            href={"/channel/"}
          >
            Create my channel
          </Link>
        )}
      </div>
    </div>
  </>
);
