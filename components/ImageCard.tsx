"use client";

import React, { useState } from "react";

interface ImageCardProps {
  object: any;
  showMetadata?: boolean;
}

const url = "https://d25xczrsvvsqdg.cloudfront.net/";

const ImageCard: React.FC<ImageCardProps> = ({ object, showMetadata = true }) => {
  const { Key, Metadata } = object;
  const imageUrl = `${url}${Key}`;
  const { title, keywords, width, height } = Metadata;
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
    // console.log(`bg-${baseColor}-${shade}`);
    // return `bg-green-400`;
    return `bg-${baseColor}-${shade}`;
  };

  const backgroundColor = getBackgroundColor();

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
        <div className="p-4">
          <div className="text-lg font-bold mb-2">{title}</div>
          <div className="text-sm text-gray-600 mb-1">Keywords: {keywords}</div>
          <div className="text-sm text-gray-600 mb-1">Dimensions: {width}x{height}</div>
          <div className="text-sm text-gray-600 mb-1">{Key}</div>
        </div>
      ) : (
        <div className={`p-2 ${backgroundColor[1-3]}`}></div>
      )}
    </div>
  );
};

export default ImageCard;
