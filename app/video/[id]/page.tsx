"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { getVideoById } from "@/api/video/getVideoById";
import { VideoDetail } from "@/types/video/videoDetail";
import VideoInfo from "@/components/Video/VideoInfo";
import VideoSuggestions from "@/components/Video/VideoSuggestions";
import CommentsSection from "@/components/Comment/CommentSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Video = () => {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoData, setVideoData] = useState<VideoDetail>({
    title: "",
    description: "",
    thumbnail: "",
    views: 0,
    url: "",
    timestamp: "",
  });

  useEffect(() => {
    const videoIndex = pathname.indexOf("video/");
    const newvideoId =
      videoIndex !== -1 ? pathname.slice(videoIndex + 6).split("/")[0] : null;
    if (newvideoId) {
      getVideoById(newvideoId).then((res) => {
        if (res) {
          setVideoData(res);
        }
      });
    } else {
      console.log("error");
    }
  }, [pathname]);

  return (
    <Header withSidebar={true}>
      <div className="flex mt-24 px-8">
        <div className="w-3/4 pr-4">
          <div className="relative w-full h-96">
            <video
              ref={videoRef}
              className="object-cover w-full h-full"
              src={`${API_URL}/${videoData.url}`}
              controls
            />
          </div>
          <VideoInfo videoData={videoData} />
          <CommentsSection />
        </div>
        <div className="w-1/4">
          <VideoSuggestions />
        </div>
      </div>
    </Header>
  );
};

export default Video;
