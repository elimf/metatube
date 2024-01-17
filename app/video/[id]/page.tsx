"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import { getVideoById } from "@/api/video/getVideoById";
import { VideoDetail } from "@/types";
import VideoInfo from "@/components/Video/VideoInfo";
import VideoSuggestions from "@/components/Video/VideoSuggestions";
import VideoSuggestionsLoader from "@/components/Loader/Video/VideoSuggestionsLoader";
import CommentsSection from "@/components/Interaction/Comment/CommentSection";
import CommentsLoader from "@/components/Loader/Comment/CommentsLoader";
import VideoInfoLoader from "@/components/Loader/Video/VideoInfoLoader";
import VideoPlayer from "@/components/Video/VideoPlayer";
import VideoPlayerLoader from "@/components/Loader/Video/VideoPlayerLoader";
import { JwtTokenManager } from "@/utils/jwtManager";
import { apiRefresh } from "@/api/auth/refresh";

const Video = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); // Added loading state
  const [videoData, setVideoData] = useState<VideoDetail>({
    _id: "",
    title: "",
    description: "",
    thumbnail: "",
    views: 0,
    url: "",
    timestamp: "",
    likedBy: [],
    comments: [],
    suggestions: [],
    channel: {
      _id: "",
      channelName: "",
      icon: "",
      subscribers: 0,
    },
    liked: false,
    subscribed: false,
  });
  const tokenManager = new JwtTokenManager();
const handleSubscriptionChange = (newSubscriptionStatus: boolean) => {
  setVideoData((prevVideoData) => {
    const updatedSubscribers = newSubscriptionStatus
      ? prevVideoData.channel.subscribers + 1
      : prevVideoData.channel.subscribers - 1;

    const newVideoData = { ...prevVideoData };

    newVideoData.subscribed = !prevVideoData.subscribed;
    newVideoData.channel = {
      ...prevVideoData.channel,
      subscribers: updatedSubscribers,
    };

    console.log("Updated Video Data:", newVideoData);
    return newVideoData;
  });
};

  useEffect(() => {
    const videoIndex = pathname.indexOf("video/");
    const newvideoId =
      videoIndex !== -1 ? pathname.slice(videoIndex + 6).split("/")[0] : null;
    if (newvideoId) {
      setLoading(true); // Set loading to true before fetching data
      const token = tokenManager.getToken();
      if (token) {
        tokenManager.isTokenValid(token).then((res) => {
          if (!res) {
            apiRefresh();
          }
        });
        getVideoById(newvideoId, token)
          .then((res) => {
            if (res) {
              setVideoData(res);
            }
          })
          .finally(() => setLoading(false));
      } else {
        getVideoById(newvideoId)
          .then((res) => {
            if (res) {
              setVideoData(res);
            }
          })
          .finally(() => setLoading(false));
      }
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
              <VideoInfo
                videoData={videoData}
                onSubscriptionChange={handleSubscriptionChange}
              />
              <CommentsSection videoDetails={videoData} />
            </>
          )}
        </div>
        <div className="w-1/4">
          {loading ? (
            <VideoSuggestionsLoader />
          ) : (
            <VideoSuggestions suggestions={videoData.suggestions} />
          )}
        </div>
      </div>
    </Header>
  );
};

export default Video;
