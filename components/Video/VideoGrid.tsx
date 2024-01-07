import React from "react";
import VideoSkeleton from "./VideoSkeleton";
import { Video } from "@/types/video/video";

interface VideoGridProps {
  items: Video[];
  singleRow?: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ items, singleRow = false }) => {
  // Check if the items array is empty
  if (items.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No videos available</p>
      </div>
    );
  }

  const containerClass = singleRow
    ? "flex space-x-4 overflow-x-auto"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <div key={item._id} className={singleRow ? "flex-none" : ""}>
          <VideoSkeleton item={item} useHover={true} />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
