"use client";

import Header from "@/components/Header";
const YourComponent = () => {
  const channelID =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2]
      : null;

  return (
    <Header>
      <div>
        <div className="flex-grow mt-24 px-8">
          <p>Channel ID : {channelID}</p>
        </div>
      </div>
    </Header>
  );
};

export default YourComponent;
