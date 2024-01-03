import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Video } from "@/types/video/video";
import { dateFormat } from "@/utils/dateFormat";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VideoSkeleton = ({ item }: { item: Video }) => {
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
    <div key={item._id} className="overflow-hidden bg-gray-900">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: "pointer" }} // Ajoute un style pour indiquer qu'il est cliquable
      >
        <Image
          src={`${API_URL}/${item.thumbnail}`}
          alt={`Gallery Item ${item}`}
          className={`object-cover w-full h-48 transition-opacity ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          width={400}
          height={400}
        />
        <video
          ref={videoRef}
          src={`${API_URL}/${item.url}`}
          className={`absolute top-0 left-0 object-cover w-full h-full ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-bold">Prime {` ${item.title}`}</p>
        <p className="text-gray-500">
          {item.views} views {dateFormat(+item.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default VideoSkeleton;
