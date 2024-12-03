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

  // Determine the background color based on the file extension
  const getBackgroundColor = () => {
    if (Key.endsWith('.jpg')) {
      return 'bg-rose-50 dark:bg-rose-900';
    } else if (Key.endsWith('.webp')) {
      return 'bg-sky-50 dark:bg-sky-900';
    }
    return 'bg-gray-50 dark:bg-gray-900';
  };

  const backgroundColor = getBackgroundColor();

  const getFileType = (key: string) => {
    const extension = key.split('.').pop()?.toLowerCase() || '';
    return extension;
  };

  return (
    <div 
      onClick={copyToClipboard} 
      className={`cursor-pointer rounded-lg shadow-sm overflow-hidden w-full max-w-sm ${backgroundColor}`}
      title="Click to copy URL to clipboard"
    >
      <div className="w-full h-48 relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-contain" 
        />
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white dark:text-gray-900 text-sm font-medium px-3 py-1 rounded-lg bg-black dark:bg-white">Copied!</span>
          </div>
        )}
      </div>
      {showMetadata ? (
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 h-[3rem] leading-6 overflow-hidden line-clamp-2">{title}</h3>
          
          <div className="grid gap-2 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="font-medium min-w-20 mr-2">Keywords:</span>
              <span className="text-gray-700 dark:text-gray-200">{keywords}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="font-medium min-w-20 mr-2">Dimensions:</span>
              <span className="text-gray-700 dark:text-gray-200">{width} × {height}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="font-medium min-w-20 mr-2">Component:</span>
              <span className="text-gray-700 dark:text-gray-200">{componentname}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded px-2 py-1">
            <span className="truncate pr-2 font-mono text-xs">{Key}</span>
            <span className="uppercase font-medium text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">{getFileType(Key)}</span>
          </div>
        </div>
      ) : (
        <div className={`p-2 ${backgroundColor}`}>
          <span className="uppercase font-medium text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">{getFileType(Key)}</span>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
