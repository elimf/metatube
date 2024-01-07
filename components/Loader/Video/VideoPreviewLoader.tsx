import React from "react";

const VideoPreviewLoader = () => (
  <div className="animate-pulse bg-gray-300 rounded-lg overflow-hidden">
    <div className="w-full h-40"></div>
    <div className="p-4">
      <div className="h-4 w-3/4 mb-2 bg-gray-400 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
    </div>
  </div>
);

export default VideoPreviewLoader;
