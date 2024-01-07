"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { getVideoById } from "@/api/video/getVideoById";
import { VideoDetail } from "@/types/video/videoDetail";
import VideoInfo from "@/components/Video/VideoInfo";
import VideoSuggestions from "@/components/Video/VideoSuggestions";
import VideoSuggestionsLoader from "@/components/Loader/Video/VideoSuggestionsLoader";
import CommentsSection from "@/components/Comment/CommentSection";
import CommentsLoader from "@/components/Loader/Comment/CommentsLoader";
import VideoInfoLoader from "@/components/Loader/Video/VideoInfoLoader";
import VideoPlayer from "@/components/Video/VideoPlayer";
import VideoPlayerLoader from "@/components/Loader/Video/VideoPlayerLoader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Video = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); // Added loading state
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
      setLoading(true); // Set loading to true before fetching data
      getVideoById(newvideoId)
        .then((res) => {
          if (res) {
            setVideoData(res);
          }
        })
        .finally(() => setLoading(false)); // Set loading to false after fetching data
    } else {
      console.log("error");
    }
  }, [pathname]);

  return (
    <Header withSidebar={true}>
      <div className="flex mt-24 px-8">
        <div className="w-3/4 pr-4">
          {loading ? (
            <>
              <VideoPlayerLoader />
              <VideoInfoLoader />
              <CommentsLoader />
            </>
          ) : (
            <>
              <VideoPlayer videoData={videoData} />
              <VideoInfo videoData={videoData} />
              <CommentsSection />
            </>
          )}
        </div>
        <div className="w-1/4">
          {loading ? <VideoSuggestionsLoader /> : <VideoSuggestions />}
        </div>
      </div>
    </Header>
  );
};

export default Video;
