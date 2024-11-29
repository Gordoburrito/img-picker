"use client";

import React, { useState } from "react";

interface ImageCardProps {
  object: any;
  showMetadata?: boolean;
}

// TODO: Make this dynamic based on the cloudfront distribution
const url = "https://d25xczrsvvsqdg.cloudfront.net/";

const ImageCard: React.FC<ImageCardProps> = ({ object, showMetadata = true }) => {
  const { Key, Metadata } = object;
  const imageUrl = `${url}${Key}`;
  const { title, keywords, width, height, componentname } = Metadata;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = `${url}${Key}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  // Determine the background color based on the file extension and showMetadata
  const getBackgroundColor = () => {
    const baseColor = Key.endsWith('.jpg') ? 'green' : Key.endsWith('.webp') ? 'blue' : 'gray';
    const shade = showMetadata ? '100' : '400';
    return `bg-${baseColor}-${shade}`;
  };

  const backgroundColor = getBackgroundColor();

  const getFileType = (key: string) => {
    const extension = key.split('.').pop()?.toLowerCase() || '';
    return extension;
  };

  return (
    <div 
      onClick={copyToClipboard} 
      className={`cursor-pointer rounded-lg ${backgroundColor} relative overflow-hidden`}
      title="Click to copy URL to clipboard"
    >
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      {copied && (
        <div className={`absolute inset-0 flex items-center justify-center ${backgroundColor} bg-opacity-80`}>
          <span className="text-white text-2xl font-bold bg-black px-4 py-2 rounded-lg">Copied</span>
        </div>
      )}
      {showMetadata ? (
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          
          <div className="grid gap-2 text-sm">
            <div className="flex items-center text-gray-600">
              <span className="font-medium min-w-20 mr-2">Keywords:</span>
              <span className="text-gray-700">{keywords}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium min-w-20 mr-2">Dimensions:</span>
              <span className="text-gray-700">{width} × {height}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium min-w-20 mr-2">Component:</span>
              <span className="text-gray-700">{componentname}</span>
            </div>
          </div>

            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
            <span className="truncate pr-2 font-mono text-xs">{Key}</span>
            <span className="uppercase font-medium text-xs bg-gray-200 px-2 py-0.5 rounded">{getFileType(Key)}</span>
          </div>
        </div>
      ) : (
        <div className={`p-2 ${backgroundColor}`}></div>
      )}
    </div>
  );
};

export default ImageCard;
