export interface IImagesService {
    uploadImage(file: any): Promise<string>;
}