import React from "react";
import VideoSkeleton from "./VideoSkeleton";

interface VideoGridProps {
  items: number[];
  singleRow?: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ items, singleRow = false }) => {
  const containerClass = singleRow
    ? "flex space-x-4 overflow-x-auto"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <div key={item} className={singleRow ? "flex-none" : ""}>
          <VideoSkeleton item={item} />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
