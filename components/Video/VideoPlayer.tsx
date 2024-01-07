import { VideoDetail } from "@/types/video/videoDetail";
import React from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VideoPlayer: React.FC<{ videoData: VideoDetail }> = ({ videoData }) => (
  <div className="relative w-full h-96">
    <video
      className="object-cover w-full h-full"
      src={`${API_URL}/${videoData.url}`}
      controls
      autoPlay
    />
  </div>
);

export default VideoPlayer;
