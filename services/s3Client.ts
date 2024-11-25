
import { S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const s3Client = new S3Client({
  region: "us-west-1",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "us-west-1" },
    identityPoolId: "us-west-1:89fd2c99-b305-44b4-a883-6a38ed25f7c8",
  }),
});

export default s3Client;
