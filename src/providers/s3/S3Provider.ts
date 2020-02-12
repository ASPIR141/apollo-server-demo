import { S3 } from 'aws-sdk';

import { IS3Provider } from './IS3Provider';

export class S3Provider implements IS3Provider {
    constructor(
        private readonly s3Client: S3
    ) { }

    public async upload(bucket: string, file: Buffer, fileName: string) {
        // const base64Data = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        // const type = file.split(';')[0].split('/')[1];

        const params = {
            Bucket: bucket,
            Key: fileName,
            Body: file,
            ACL: 'public-read',
            // ContentEncoding: 'base64',
            // ContentType: `image/${type}`
        };

        return await this.s3Client.upload(params).promise();
    }

    public async delete(bucket: string, key: string) {
        const params = {
            Bucket: bucket,
            Key: key
        };

        return await this.s3Client.deleteObject(params).promise();
    }
}
