"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { getVideoById } from "@/api/video/getVideoById";
import { VideoDetail } from "@/types/video/videoDetail";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { dateFormat } from "@/utils/dateFormat";
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
      <div className="flex-grow mt-24 px-8">
        <div className="relative w-full h-96">
          <video
            ref={videoRef}
            className="object-cover w-full h-full"
            src={`${API_URL}/${videoData.url}`}
            controls
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">{videoData.title}</h1>
        <p className="text-gray-500 mb-4">{videoData.views} views</p>
        <p className="text-lg mt-4">{videoData.description}</p>
        <p> {dateFormat(+videoData.timestamp)}</p>
      </div>
    </Header>
  );
};

export default Video;
