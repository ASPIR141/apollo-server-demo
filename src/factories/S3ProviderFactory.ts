import { S3 } from 'aws-sdk';

import { S3Provider } from '../providers/s3/S3Provider';

export const createS3Provider = () => {
    const s3Client = new S3();
    return new S3Provider(s3Client);
};
