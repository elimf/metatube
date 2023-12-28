import React from "react";
import Image from "next/image";

const VideoSkeleton = ({ item }: { item: number }) => {
  return (
    <div key={item} className="overflow-hidden bg-gray-900">
      <Image
        src={`https://via.placeholder.com/400`}
        alt={`Gallery Item ${item}`}
        className="object-cover w-full h-48"
        width={400}
        height={400}
      />
      <div className="p-4">
        <p className="text-lg font-bold">Prime {`#LAVIDE ${item}`}</p>
        <p className="text-gray-500">{item}0k views  il y a 3 jours</p>
      </div>
    </div>
  );
};

export default VideoSkeleton;
