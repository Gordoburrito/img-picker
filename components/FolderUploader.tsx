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

const processImageFile = async (file: File, formData: FormData) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  
  await new Promise((resolve) => {
    img.onload = async () => {
      formData.append('x-amz-meta-width', img.width.toString());
      formData.append('x-amz-meta-height', img.height.toString());
      
      console.log('img.width', img.width);
      console.log('img.height', img.height);

      // Resize and convert image
      // const { base64String, mimeType } = await resizeImage(file);
      // console.log('base64String', base64String);

      // const { title, keywords } = await processImage(base64String, mimeType);
      const title = 'test';
      const keywords = 'test';
      console.log('title', title);
      console.log('keywords', keywords);

      formData.append('x-amz-meta-keywords', keywords);
      formData.append('x-amz-meta-title', title);

      URL.revokeObjectURL(img.src);
      resolve(null);
    };
  });
};

const prepareFileUpload = (file: File, bucketName: string) => {
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
      const formData = prepareFileUpload(file, bucketName);

      if (file.type.startsWith('image/')) {
        await processImageFile(file, formData);
      } else {
        formData.append('x-amz-meta-componentname', file.name);
        formData.append('x-amz-meta-keywords', file.name);
        formData.append('x-amz-meta-template', file.name);
        formData.append('x-amz-meta-title', file.name);
      }

      try {
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
