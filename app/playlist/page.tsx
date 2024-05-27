"use client";
import React, { Suspense } from "react";
import Header from "@/components/Header/Header";
import { useSearchParams } from "next/navigation";
import withAuth from "@/utils/authManager";

const PlaylistContent: React.FC = () => {
  const searchParams = useSearchParams();
  const list = searchParams.get("list");

  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <h1>Playlist: {list}</h1>
      </div>
    </Header>
  );
};

const Playlist: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlaylistContent />
    </Suspense>
  );
};

export default withAuth(Playlist);
