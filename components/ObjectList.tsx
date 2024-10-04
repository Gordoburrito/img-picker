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
      <ul className="list-disc pl-5">
        {objects.map((object, index) => (
          <li key={index} className="mb-2">
            <ImageCard object={object}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectList;