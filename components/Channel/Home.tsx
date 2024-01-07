import React from "react";
import VideoGrid from "@/components/Video/VideoGrid";
import ShortGrid from "@/components/Short/ShortGrid";
import VideoSkeleton from "@/components/Video/VideoSkeleton";
import { Video } from "@/types/video/video";

type HomeProps = {
  videoItems: Video[];
  shortItems: any; //TODO: type
};

const Home = ({ videoItems, shortItems }: HomeProps) => {  
  return (
    <div>
      <div className="flex items-center ">
        <VideoSkeleton item={videoItems[0]}  useHover={true}/>
      </div>

      <hr className="my-4 border-t border-gray-300" />

      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Videos</h1>
        <VideoGrid items={videoItems} singleRow={true} />
      </div>
      <hr className="my-4 border-t border-gray-300" />

      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Shorts</h1>
        <ShortGrid items={[]} singleRow={true} />
      </div>
    </div>
  );
};

export default Home;
