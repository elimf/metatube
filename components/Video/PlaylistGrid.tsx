import React from "react";
import PlaylistSkeleton from "./PlaylistSkeleton";

interface PlaylistGridProps {
  playlists: any[]; // Remplacez le type any par le type approprié de vos playlists
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {playlists.map((playlist) => (
        <PlaylistSkeleton key={playlist.id} item={playlist} />
      ))}
    </div>
  );
};

export default PlaylistGrid;
