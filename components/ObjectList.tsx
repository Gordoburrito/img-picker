"use client";

import React from "react";
import ImageCard from "./ImageCard";
import useS3Objects from "../app/hooks/useS3Objects";

const ObjectList: React.FC<{ bucketName: string }> = ({ bucketName }) => {
  const { objects, error } = useS3Objects(bucketName);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Objects in {bucketName}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {objects.map((object, index) => (
          <ImageCard key={index} object={object} />
        ))}
      </div>
    </div>
  );
};

export default ObjectList;