import React from "react";

const TabbarLoader: React.FC = () => (
  <div className="container mx-auto mt-8">
    <div className="flex items-center justify-center">
      {[1, 2, 3,4,5].map((index) => (
        <div
          key={index}
          className="flex-1 p-4 text-center bg-gray-300 rounded-md mr-2"
        >
          <div className="h-6 w-full bg-gray-400 rounded-lg animate-pulse"></div>
        </div>
      ))}
    </div>

    {/* Content for the active tab */}
    {[1, 2, 3].map((index) => (
      <div key={index} className="mt-4 p-4 ">
        <div className="h-32 w-full bg-gray-400 rounded-lg animate-pulse"></div>
      </div>
    ))}
  </div>
);

export default TabbarLoader;
