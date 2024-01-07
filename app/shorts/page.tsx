"use client";
import React from "react";
import Header from "@/components/Header/Header";
const Shorts: React.FC = () => {
  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <h1>Short</h1>
      </div>
    </Header>
  );
};

export default Shorts;
