"use client";

import React, { useState, useEffect } from "react";

interface ImageCardProps {
  object: any;
}

const url = "https://d25xczrsvvsqdg.cloudfront.net/";

const ImageCard: React.FC<ImageCardProps> = ({ object }) => {
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

  // Determine the background color based on the file extension
  const backgroundColor = Key.endsWith('.jpg') ? 'bg-green-100' : Key.endsWith('.webp') ? 'bg-blue-100' : 'bg-white';

  return (
    <div 
      onClick={copyToClipboard} 
      className={`cursor-pointer p-4 rounded-lg ${backgroundColor} relative`}
      title="Click to copy URL to clipboard"
    >
      <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
      {copied && (
        <div className={`absolute inset-0 flex items-center justify-center ${backgroundColor} bg-opacity-80 rounded-lg`}>
          <span className="text-black text-2xl font-bold">Copied</span>
        </div>
      )}
      <div className="mt-3">
        <div className="text-lg font-bold mb-2">{title}</div>
        <div className="text-sm text-gray-600 mb-1">Keywords: {keywords}</div>
        <div className="text-sm text-gray-600 mb-1">Dimensions: {width}x{height}</div>
        <div className="text-sm text-gray-600 mb-1">{imageUrl}</div>
      </div>
    </div>
  );
};

export default ImageCard;
