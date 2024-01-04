import React from "react";
import VideoSkeleton from "@/components/Video/VideoSkeleton"; // Adjust the path based on your project structure

const VideoSuggestions = () => {
  // Dummy data for video suggestions
  const dummyVideoSuggestions = [
    {
      _id: "1",
      title: "Video 1",
      thumbnail: "uploads/1704236437514-18115947.png",
      url: "uploads/1704236437748-977405136.mp4",
      views: 1000,
      timestamp: "1642396800000",
      description: "erere",
    },
    {
      _id: "2",
      title: "Video 2",
      thumbnail: "uploads/1704236437514-18115947.png",
      url: "uploads/1704236437748-977405136.mp4",
      views: 1500,
      timestamp: "1642396800000",
      description: "erere",
    },
    {
      _id: "3",
      title: "Video 3",
      thumbnail: "uploads/1704236437514-18115947.png",
      url: "uploads/1704236437748-977405136.mp4",
      views: 1200,
      timestamp: "1642396800000",
      description: "erere",
    },
    {
      _id: "4",
      title: "Video 4",
      thumbnail: "uploads/1704236437514-18115947.png",
      url: "uploads/1704236437748-977405136.mp4",
      views: 1800,
      timestamp: "1642396800000",
      description: "erere",
    },
    {
      _id: "5",
      title: "Video 5",
      thumbnail: "uploads/1704236437514-18115947.png",
      url: "uploads/1704236437748-977405136.mp4",
      views: 900,
      timestamp: "1642396800000",
      description: "erere",
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Suggestions</h2>
      <div className="h-auto overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {dummyVideoSuggestions.map((video, index) => (
            <VideoSkeleton key={index} item={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSuggestions;
