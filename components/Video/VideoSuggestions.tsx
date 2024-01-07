import React from "react";
import VideoPreview from "@/components/Video/VideoPreview"; // Adjust the path based on your project structure
import { VideoDetail, SuggestionVideo } from "@/types/video/videoDetail";

const VideoSuggestions = ({
  suggestions,
}: {
  suggestions: SuggestionVideo[];
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Suggestions</h2>
      <div className="h-auto overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {suggestions.map((video, index) => (
            <VideoPreview key={index} item={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSuggestions;
