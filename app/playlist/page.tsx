"use client";
import React from "react";
import Header from "@/components/Header/Header";
import { useSearchParams } from "next/navigation";

const Playlist: React.FC = () => {
  const searchParams = useSearchParams();
  const list = searchParams.get("list");

  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <h1>Playlist : {list}</h1>
      </div>
    </Header>
  );
};
export default Playlist;
