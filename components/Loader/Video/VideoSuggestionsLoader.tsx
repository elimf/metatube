import React from "react";
import VideoPreviewLoader from "./VideoPreviewLoader"; // Adjust the path based on your project structure

const VideoSuggestions = () => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Suggestions</h2>
      <div className="h-auto overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <VideoPreviewLoader key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSuggestions;
