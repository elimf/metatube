"use client";
import React from "react";
import Header from "@/components/Header/Header";
const History: React.FC = () => {
  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <h1>History</h1>
      </div>
    </Header>
  );
};

export default History;
