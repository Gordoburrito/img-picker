"use server";
  
import { ListObjectsCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

// TODO: request by metadata
// TODO: request by folder prefix

export const listObjects = async (bucketName: string) => {
  try {
    const command = new ListObjectsCommand({ Bucket: bucketName });
    const response = await s3Client.send(command);
    const objects = response.Contents || [];

    const objectsWithMetadata = await Promise.all(objects.map(async (obj) => {
      const headCommand = new HeadObjectCommand({ Bucket: bucketName, Key: obj.Key });
      const metadata = await s3Client.send(headCommand);
      return { ...obj, Metadata: metadata.Metadata };
    }));

    return objectsWithMetadata;
  } catch (error) {
    console.error("Error listing objects: ", error);
    throw error;
  }
};
