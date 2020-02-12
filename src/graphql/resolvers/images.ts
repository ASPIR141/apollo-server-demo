import { IImagesService } from '../../services/interfaces/IImagesService';

const imagesResolver = (imagesService: IImagesService) => ({
    Query: { },
    Mutation: {
        uploadImage: async (_, { file }) => await imagesService.uploadImage(file)
    }
});

export default imagesResolver;