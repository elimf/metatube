import React, { useState } from "react";
import VideoSkeleton from "../Video/VideoSkeleton";
import VideoGrid from "../Video/VideoGrid";
import ShortGrid from "../Video/ShortGrid";
import Home from "./Home";
import PlaylistGrid from "../Video/PlaylistGrid";
import { Channel } from "@/types/channel";

const TabBar : React.FC<{ channelData: Channel }> = ({
  channelData,
}) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    {
      id: "tab1",
      label: "Welcome",
      content: (
        <Home videoItems={channelData.videos} shortItems={channelData.videos} />
      ),
      accessible: true,
    },
    {
      id: "tab2",
      label: "Videos",
      content: <VideoGrid items={channelData.videos} />,
      accessible: true,
    },
    {
      id: "tab3",
      label: "Shorts",
      content: <ShortGrid items={channelData.videos} />,
      accessible: true,
    },
    {
      id: "tab4",
      label: "Outputs",
      content: "Content for Tab 4",
      accessible: false,
    },
    {
      id: "tab5",
      label: "Playlists",
      content: <PlaylistGrid playlists={channelData.playlists} />,
      accessible: true,
    },
    {
      id: "tab6",
      label: "Community",
      content: "Content for Tab 6",
      accessible: false,
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 p-4 text-center ${
              activeTab === tab.id ? "border-b-2 border-blue-500" : ""
            } ${tab.accessible ? "" : "cursor-not-allowed opacity-50"}`}
            onClick={() => handleTabClick(tab.id)}
            disabled={!tab.accessible}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content for the active tab */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`mt-4 p-4  ${activeTab === tab.id ? "" : "hidden"}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
