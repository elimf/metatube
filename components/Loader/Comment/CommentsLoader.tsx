import React from "react";
import Image from "next/image";

const CommentsLoader = () => (
  <div>
    {/* Input for new comment loader */}
    <div className="flex items-center mb-4">
      <div className="bg-gray-200 w-8 h-8 rounded-full mr-2"></div>
      <div className="bg-gray-200 w-full h-8 rounded"></div>
      <div className="bg-blue-500 w-16 h-8 ml-2 rounded"></div>
    </div>

    {/* Existing comments loader */}
    <div>
      <div className="bg-gray-200 w-full h-16 mb-4"></div>
      <div className="bg-gray-200 w-full h-16 mb-4"></div>
      <div className="bg-gray-200 w-full h-16 mb-4"></div>
    </div>
  </div>
);

export default CommentsLoader;
