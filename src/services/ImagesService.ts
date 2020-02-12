import { injectable, inject } from 'inversify';

import { IImagesService } from './interfaces/IImagesService';
import { IS3Provider } from '../providers/s3/IS3Provider';
import { TYPE } from '../ioc/types';

@injectable()
export class ImagesService implements IImagesService {
    constructor(
        @inject(TYPE.S3Provider) private readonly s3Provider: IS3Provider
    ) { }

    public async uploadImage(file: any) {
        const { stream, filename } = await file;
        const buffers = [];

        for await (const chunk of stream) {
            buffers.push(chunk);
        }
        const buffer = Buffer.concat(buffers);

        const { Location } = await this.s3Provider.upload(process.env.BUCKET_NAME, buffer, filename);
        return Location;
    }
}