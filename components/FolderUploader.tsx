"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import EXIF from 'exif-js';
import { processImage } from '../services/processImage';
import { resizeImage } from '../services/imageUtils';
import { uploadFile } from '../services/uploadFile';

interface FolderUploaderProps {
  bucketName: string;
}

// Add this outside the component to store metadata across uploads
const metadataCache = new Map<string, { title: string, keywords: string }>();

const getBaseFileName = (fullPath: string): string => {
  const fileName = fullPath.split('/').pop() || '';
  return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
};

const setImageMetadata = async (file: File, formData: FormData) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  
  await new Promise((resolve) => {
    img.onload = async () => {
      formData.append('x-amz-meta-width', img.width.toString());
      formData.append('x-amz-meta-height', img.height.toString());
      
      const baseFileName = getBaseFileName(file.path);
      const cachedMetadata = metadataCache.get(baseFileName);

      if (cachedMetadata) {
        // Use cached metadata if available
        formData.append('x-amz-meta-keywords', cachedMetadata.keywords);
        formData.append('x-amz-meta-title', cachedMetadata.title);
      } else {
        const { base64String, mimeType } = await resizeImage(file);
        const { title, keywords } = await processImage(base64String, mimeType);

        // Cache the metadata for files with the same base name
        metadataCache.set(baseFileName, { title, keywords });

        formData.append('x-amz-meta-keywords', keywords);
        formData.append('x-amz-meta-title', title);
      }

      URL.revokeObjectURL(img.src);
      resolve(null);
    };
  });
};

const createFileUploadFormData = (file: File, bucketName: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucketName', bucketName);

  const fullPath = file.path;
  formData.append('fullPath', fullPath);

  // Extract folder name from path
  const folderName = fullPath.split('/').slice(-2, -1)[0] || 'unknown';
  formData.append('x-amz-meta-componentname', folderName);
  
  return formData;
};

const FolderUploader: React.FC<FolderUploaderProps> = ({ bucketName }) => {
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadStatus('Uploading...');

    for (const file of acceptedFiles) {
      const formData = createFileUploadFormData(file, bucketName);

      if (file.type.startsWith('image/')) {
        await setImageMetadata(file, formData);
      }

      try {
        console.log('file', file);
        // Convert FormData to JSON object
        const formDataObj = Object.fromEntries(formData.entries());
        console.log('formData as JSON:', formDataObj);
        
        const result = await uploadFile(formData);
        if (!result.success) {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed');
        return;
      }
    }

    setUploadStatus('Upload completed successfully');
  }, [bucketName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
  });

  const border = isDragActive ? 'border-blue-500' : 'border-gray-300';
  const dashedBorder = isDragActive ? 'border-solid' : 'border-dashed';
  const textColor = isDragActive ? 'text-blue-500' : 'text-gray-500';
  const backgroundColor = isDragActive ? 'bg-blue-50' : 'bg-gray-100';

  return (
    <div>
      <div {...getRootProps()} className={`border-2 ${dashedBorder} ${border} p-6 rounded-lg cursor-pointer ${backgroundColor}`}>
        <input {...getInputProps()} />
        <p className={textColor}>Drag 'n' drop a folder here, or click to select a folder</p>
      </div>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default FolderUploader;
