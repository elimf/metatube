import React from "react";
import Image from "next/image";

// Composant pour un élément de la grille courte
const ShortSkeleton: React.FC<{ item: number }> = ({ item }) => {
  return (
    <div key={item} className="overflow-hidden bg-gray-900">
      <Image
        src={`https://via.placeholder.com/400`}
        alt={`Short Item ${item}`}
        className="object-cover w-full h-72"
        width={400}
        height={200}
      />
      <div className="p-2">
        <p className="text-sm font-bold">Short Item {item}</p>
        <p className="text-sm font-bold"> {item}k views</p>
      </div>
    </div>
  );
};
export default ShortSkeleton;