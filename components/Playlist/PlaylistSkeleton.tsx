import React from "react";
import Image from "next/image";

interface PlaylistSkeletonProps {
  item: any; // Remplacez le type any par le type approprié de vos playlists
}

const PlaylistSkeleton: React.FC<PlaylistSkeletonProps> = ({ item }) => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      <Image
        src={`https://via.placeholder.com/400`}
        alt={`Playlist ${item.id}`}
        className="object-cover w-full h-32"
        width={400}
        height={400}
      />
      <div className="p-2">
        <p className="text-sm font-bold">Playlist {item}</p>
      </div>
      <button className="absolute bottom-6 right-0 p-4 text-right">
        <p className="text-gray-500">{item} vidéos</p>
      </button>
    </div>
  );
};

export default PlaylistSkeleton;
