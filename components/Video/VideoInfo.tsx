"use client";
import { VideoDetail } from "@/types";
import { dateFormat } from "@/utils/dateFormat";
import React, { useState } from "react";
import Image from "next/image";
import { DownloadIcon, ThumbUpIcon, ShareIcon } from "@heroicons/react/solid";
import SubscriptionForm from "../Interaction/SubscriptionForm";
import LikeButton from "../Interaction/Like/LikeButton";
import { LikedEntityType } from "@/utils/enumLike";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface VideoInfoProps {
  videoData: VideoDetail;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ videoData }) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);
  const handleInfoClick = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <div className="mt-4">
      {/* Video Information Header */}
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold mb-2">{videoData.title}</h1>
      </div>

      {/* Video Title and Channel Information */}
      <div>
        <div className="flex items-center justify-between mb-2 ">
          {/* Channel Image */}
          <div className="flex items-center justify-between mb-2">
            {/* Channel Image and Channel Info */}
            <div className="flex items-center">
              <Image
                src={
                  videoData.channel.icon
                    ? `${API_URL}/${videoData.channel.icon}`
                    : `https://api.dicebear.com/7.x/initials/png?seed=${videoData.channel.channelName}&backgroundColor=d1d4f9&color=%23fff}`
                }
                alt={"Channel Image"}
                className="w-16 h-16 rounded-full mr-2"
                width={64}
                height={64}
              />
              {/* Channel Name and Subscribers */}
              <div>
                <p className="text-lg font-bold">
                  {videoData.channel.channelName}
                </p>
                <p>{videoData.channel.subscribers} subscribers</p>
              </div>
            </div>

            {/* Subscribe Button */}
            <SubscriptionForm
              isSubscribed={false}
              channelId={videoData.channel._id}
            />
          </div>

          <div className="flex mr-8">
            <LikeButton
              isLiked={videoData.liked}
              likeCount={videoData.likedBy.length}
              videoId={videoData._id}
              type={LikedEntityType.VIDEO}
            />

            <button className="text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
              <ShareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Share
            </button>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              >
                <DownloadIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="border-gray-300 py-2">
          <div
            className="cursor-pointer bg-gray-200 rounded-lg shadow-md p-4"
            onClick={handleInfoClick}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">{videoData.views} views</p>
              <p className="text-gray-600">
                {dateFormat(+videoData.timestamp)}
              </p>
            </div>
            {!isCollapsed && (
              <div className="mt-4">
                <p className="text-lg text-black">{videoData.description}</p>
              </div>
            )}
            {isCollapsed && (
              <div className="mt-4 overflow-hidden max-h-20">
                <p className="text-lg text-black">{videoData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
