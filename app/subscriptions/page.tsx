"use client";
import React from "react";
import Header from "@/components/Header/Header";
import withAuth from "@/utils/authManager";
const Subscriptions: React.FC = () => {
  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <h1>Subscriptions</h1>
      </div>
    </Header>
  );
};

export default withAuth(Subscriptions);
