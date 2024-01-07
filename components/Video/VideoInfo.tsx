"use client";
import { VideoDetail } from "@/types/video/videoDetail";
import { dateFormat } from "@/utils/dateFormat";
import React, { useState } from "react";
import Image from "next/image";
import { DownloadIcon, ThumbUpIcon, ShareIcon } from "@heroicons/react/solid";
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
                src={`${API_URL}/${videoData.channel.icon}`}
                alt={"test"}
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
            <button className="ml-2 text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center me-2 dark:bg-white dark:hover:bg-gray-800 dark:focus:ring-gray-700">
              Subscribe
            </button>
          </div>

          <div className="flex mr-8">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <ThumbUpIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Like
            </button>

            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <ShareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Share
            </button>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              >
                <DownloadIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Downloads
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
