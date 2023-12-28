import React from "react";
import ShortSkeleton from "./ShortSkeleton";

interface ShortGridProps {
  items: number[];
  singleRow?: boolean;
}

const ShortGrid: React.FC<ShortGridProps> = ({ items, singleRow = false }) => {
  const containerClass = singleRow
    ? "flex space-x-4 overflow-x-auto"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4";

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <div key={item} className={singleRow ? "flex-none" : ""}>
          <ShortSkeleton item={item} />
        </div>
      ))}
    </div>
  );
};

export default ShortGrid;
