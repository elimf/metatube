"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/Header/Header";
const Short: React.FC = () => {
  const pathname = usePathname();
  useEffect(() => {
    const shortIndex = pathname.indexOf("short/");
    const shortId =
      shortIndex !== -1 ? pathname.slice(shortIndex + 6).split("/")[0] : null;
  }, [pathname]);
  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <h1>Short</h1>
      </div>
    </Header>
  );
};

export default Short;
