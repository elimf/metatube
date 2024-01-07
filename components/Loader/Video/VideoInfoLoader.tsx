import React from "react";

const VideoInfoLoader = () => (
  <div className="mt-4 mb-8">
    {/* Video Information Header Loader */}
    <div className="animate-pulse flex items-center mb-4">
      <div className="bg-gray-200 h-6 w-1/2"></div>
    </div>

    {/* Video Title and Channel Information Loader */}
    <div>
      <div className="flex items-center justify-between mb-2">
        {/* Channel Image Loader */}
        <div className="flex items-center justify-between mb-2 animate-pulse">
          {/* Channel Image Loader */}
          <div className="flex items-center">
            <div className="bg-gray-200 w-16 h-16 rounded-full mr-2 animate-pulse"></div>
            {/* Channel Name and Subscribers Loader */}
            <div>
              <div className="bg-gray-200 h-4 w-24 mb-1 animate-pulse"></div>
              <div className="bg-gray-200 h-3 w-16"></div>
            </div>
          </div>
          <div className="bg-gray-200 w-16 h-8 ml-2 animate-pulse"></div>
        </div>
        {/* Like, Share, and Downloads Button Loaders */}
        <div className="flex mr-8">
          <div className="bg-blue-700 w-20 h-8 mr-2"></div>
          <div className="bg-blue-700 w-20 h-8 mr-2"></div>
          <div className="bg-gray-500 w-20 h-8 mr-2"></div>
        </div>
      </div>

      {/* Video Views and Timestamp Loader */}
      <div className="border-gray-300 py-2">
        <div className="bg-gray-100 rounded-lg shadow-md p-4 animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-gray-300 h-4 w-1/4"></div>
            <div className="bg-gray-300 h-4 w-1/4"></div>
          </div>
          <div className="mt-4 bg-gray-200 h-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export default VideoInfoLoader;
