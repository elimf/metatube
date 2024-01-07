import React from "react";
import Image from "next/image";
import { Channel } from "@/types";

const ChannelInfo: React.FC<{ channelData: Channel }> = ({ channelData }) => {
  return (
    <section>
      <div className="flex items-center mt-8">
        <Image
          src={
            channelData.icon
              ? channelData.icon
              : "https://via.placeholder.com/400"
          }
          alt={channelData.channelName}
          className="w-64 h-64 rounded-full"
          width={64}
          height={64}
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">
            {channelData.channelName}{" "}
            {channelData.isVerified && (
              <i className="fas fa-check-circle text-blue-500"></i>
            )}
          </h1>
          <p className="text-gray-600">
            {channelData.subscribers.toLocaleString()} subscribers{" "}
            {channelData.videos.length} videos
          </p>
          <p className="text-gray-600">{channelData.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ChannelInfo;
