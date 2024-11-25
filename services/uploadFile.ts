'use server'
import s3Client from './s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  const bucketName = formData.get('bucketName') as string;

  if (!file || !bucketName) {
    throw new Error('File or bucket name is missing');
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: buffer,
    Metadata: {
      'x-amz-meta-componentname': formData.get('x-amz-meta-componentname') as string,
      'x-amz-meta-height': formData.get('x-amz-meta-height') as string,
      'x-amz-meta-keywords': formData.get('x-amz-meta-keywords') as string,
      'x-amz-meta-template': formData.get('x-amz-meta-template') as string,
      'x-amz-meta-title': formData.get('x-amz-meta-title') as string,
      'x-amz-meta-width': formData.get('x-amz-meta-width') as string,
    },
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return { success: true, message: 'File uploaded successfully' };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return { success: false, message: 'Error uploading file to S3' };
  }
}
