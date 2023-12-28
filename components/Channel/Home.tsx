import React from "react";
import VideoGrid from "@/components/Video/VideoGrid";
import ShortGrid from "@/components/Video/ShortGrid";
import VideoSkeleton from "@/components/Video/VideoSkeleton";

type HomeProps = {
  videoItems: any;
  shortItems: any;
};

const Home = ({ videoItems, shortItems }: HomeProps) => {
  return (
    <div>
      <div className="flex items-center ">
          <VideoSkeleton item={1} />
      </div>

      <hr className="my-4 border-t border-gray-300" />

      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Videos</h1>
        <VideoGrid items={videoItems} singleRow={true} />
      </div>
      <hr className="my-4 border-t border-gray-300" />

      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Shorts</h1>
        <ShortGrid items={shortItems} singleRow={true} />
      </div>
    </div>
  );
};

export default Home;
