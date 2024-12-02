"use client";

import React, { useState, useMemo } from "react";
import ImageCard from "./ImageCard";
import useS3Objects from "../app/hooks/useS3Objects";
import { PREDEFINED_DIMENSIONS, type Dimension } from "../types/dimensions";

const ObjectList: React.FC<{ bucketName: string }> = ({ bucketName }) => {
  const { objects, error } = useS3Objects(bucketName);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Filter objects based on search and dimensions
  const filteredObjects = useMemo(() => {
    return objects.filter((obj) => {
      const matchesSearch = obj.Metadata.keywords.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDimensions = selectedDimensions.length === 0 ||
        (obj.Metadata.width && obj.Metadata.height && 
          selectedDimensions.includes(`${obj.Metadata.width}x${obj.Metadata.height}`));
      return matchesSearch && matchesDimensions;
    });
  }, [objects, searchQuery, selectedDimensions]);

  // const filteredObjects = objects;
  // console.log(filteredObjects);

  const handleDimensionToggle = (dimension: Dimension) => {
    const dimensionString = `${dimension.width}x${dimension.height}`;
    setSelectedDimensions(prev =>
      prev.includes(dimensionString)
        ? prev.filter(d => d !== dimensionString)
        : [...prev, dimensionString]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex gap-6 w-full">
      {/* Filters Sidebar */}
      <div className="sticky top-4 h-fit w-64 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search files..."
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-4">
          {Object.entries(PREDEFINED_DIMENSIONS).map(([category, dimensions]) => (
            <div key={category} className="space-y-2">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center w-full font-semibold capitalize"
              >
                <span className="mr-2">{expandedCategories.includes(category) ? '▼' : '▶'}</span>
                {category}
              </button>
              {expandedCategories.includes(category) && (
                <div className="ml-4 space-y-2">
                  {dimensions.map((dimension) => (
                    <label 
                      key={`${dimension.width}x${dimension.height}`} 
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDimensions.includes(`${dimension.width}x${dimension.height}`)}
                        onChange={() => handleDimensionToggle(dimension)}
                        className="rounded"
                      />
                      <span>{dimension.name} ({dimension.width}x{dimension.height})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">Objects in {bucketName}</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredObjects.map((object, index) => (
            <ImageCard key={index} object={object} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectList;