import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Video } from "@/types";
import { dateFormat } from "@/utils/dateFormat";
import Link from "next/link";
import { SuggestionVideo, VideoDetail } from "@/types/video/videoDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VideoPreview = ({
  item,
  useHover = false,
}: {
  item: Video | VideoDetail | SuggestionVideo;
  useHover?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsHovered(false);
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    // Naviguer vers une autre page avec le paramètre videoId
    router.push(`/video/${item._id}`);
  };

  return (
    <div key={item._id} className="overflow-hidden relative">
      <div
        className="relative"
        onClick={handleClick}
        onMouseEnter={useHover ? handleMouseEnter : undefined}
        onMouseLeave={useHover ? handleMouseLeave : undefined}
        style={{ cursor: "pointer" }}
      >
        <Image
          src={`${API_URL}/${item.thumbnail}`}
          alt={`Gallery Item ${item.title}`}
          className={`object-cover w-full h-48 transition-opacity ${
            isHovered && useHover ? "opacity-0" : "opacity-100"
          }`}
          width={400}
          height={400}
        />
        <video
          ref={videoRef}
          src={`${API_URL}/${item.url}`}
          className={`absolute top-0 left-0 object-cover w-full h-full ${
            isHovered && useHover ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={useHover ? handleMouseEnter : undefined}
          onMouseLeave={useHover ? handleMouseLeave : undefined}
          disablePictureInPicture={true}
        />
      </div>
      <div className="p-4 flex items-center">
        <Image
          src={
            item.channel?.icon ||
             "https://api.dicebear.com/7.x/avataaars-neutral/png?eyes=xDizzy"
          }
          alt={`thumbnail ${item.title}`}
          style={{ objectFit: "contain" }}
          sizes="(max-width: 300px) 100vw,
        (max-width: 500px) 100vw,
        (max-width: 800px) 100vw,
        (max-width: 1200px) 100vw,
        100vw"
          className="object-cover w-12 h-12 rounded-full mr-4"
          width={12}
          height={12}
        />
        <div>
          <p className="text-lg font-bold">
            {item.title.length > 19
              ? `${item.title.slice(0, 19)}...`
              : item.title}
          </p>
          <Link
            href={item.channel?._id ? `/channel/${item.channel._id}` : "#"}
            className="text-gray-500 hover:underline"
          >
            {item.channel?.channelName ? item.channel.channelName : ""}
          </Link>
          <p className="text-gray-500">
            {item.views} views {dateFormat(+item.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
