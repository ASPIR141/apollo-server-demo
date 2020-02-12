import { S3, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface IS3Provider {
    upload(bucket: string, file: Buffer, fileName: string): Promise<S3.ManagedUpload.SendData>;
    delete(bucket: string, key: string): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>>;
}
