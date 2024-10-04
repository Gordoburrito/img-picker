"use server";
  
import { S3Client, ListObjectsCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const s3Client = new S3Client({
  region: "us-west-1",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "us-west-1" },
    identityPoolId: "us-west-1:89fd2c99-b305-44b4-a883-6a38ed25f7c8",
  }),
});

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
