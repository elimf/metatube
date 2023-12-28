import React from "react";
import PlaylistSkeleton from "./PlaylistSkeleton";

interface PlaylistGridProps {
  playlists: any[];
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists }) => {
    if (playlists.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500">No playslists available</p>
        </div>
      );
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {playlists.map((playlist) => (
        <PlaylistSkeleton key={playlist} item={playlist} />
      ))}
    </div>
  );
};

export default PlaylistGrid;
