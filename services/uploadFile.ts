'use server'
import s3Client from './s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadFile(formData: FormData) {
  console.log('formData', formData);
  const file = formData.get('file') as File;
  console.log('file', file);
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
      'componentname': formData.get('x-amz-meta-componentname') as string,
      'height': formData.get('x-amz-meta-height') as string,
      'keywords': formData.get('x-amz-meta-keywords') as string,
      'template': formData.get('x-amz-meta-template') as string,
      'title': formData.get('x-amz-meta-title') as string,
      'width': formData.get('x-amz-meta-width') as string,
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
