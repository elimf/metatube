import React from "react";
import Image from "next/image";

const ChannelInfoLoader: React.FC = () => (
  <section>
    <div className="flex items-center mt-8">
      <div className="w-64 h-64 bg-gray-200 rounded-full"></div>
      <div className="ml-4">
        <h1 className="text-2xl font-bold bg-gray-200 w-32 h-6 mb-2"></h1>
        <p className="text-gray-600 bg-gray-200 w-48 h-4 mb-2"></p>
        <p className="text-gray-600 bg-gray-200 w-64 h-4"></p>
      </div>
    </div>
  </section>
);

export default ChannelInfoLoader;
