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
  const [showMetadata, setShowMetadata] = useState(false);

  // Filter objects based on search and dimensions
  const filteredObjects = useMemo(() => {
    return objects.filter((obj) => {
      const keywords = obj.Metadata?.keywords || '';
      const matchesSearch = keywords.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDimensions = selectedDimensions.length === 0 ||
        (obj.Metadata?.width && obj.Metadata?.height && 
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
      <div className="sticky top-4 h-fit w-72 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">Filters</h2>
        
        <div className="mb-4">
          <button
            onClick={() => setShowMetadata(prev => !prev)}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {showMetadata ? 'Hide Metadata' : 'Show Metadata'}
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(PREDEFINED_DIMENSIONS).map(([category, dimensions]) => (
            <div key={category} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between w-full py-2 text-left font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              >
                <span className="capitalize">{category}</span>
                <span className="text-sm text-gray-500">
                  {expandedCategories.includes(category) ? '−' : '+'}
                </span>
              </button>
              {expandedCategories.includes(category) && (
                <div className="mt-2 space-y-2">
                  {dimensions.map((dimension) => (
                    <label 
                      key={`${dimension.width}x${dimension.height}`} 
                      className="flex items-center space-x-3 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDimensions.includes(`${dimension.width}x${dimension.height}`)}
                        onChange={() => handleDimensionToggle(dimension)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-sm dark:text-gray-300">
                        {dimension.name} 
                        <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                          ({dimension.width}x{dimension.height})
                        </span>
                      </span>
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
            <ImageCard 
              key={index} 
              object={object} 
              showMetadata={showMetadata}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectList;