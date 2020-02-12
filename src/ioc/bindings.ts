import { interfaces, AsyncContainerModule } from 'inversify';

import { TYPE } from './types';
import { createS3Provider } from '../factories/S3ProviderFactory';
import { IS3Provider } from '../providers/s3/IS3Provider';
import { MongoDBProviderFactory } from '../factories/MongoDBProviderFactory';
import { createRepository } from '../factories/RepositoryFactory';
import { ChannelsRepository } from '../repositories/ChannelsRepository';
import { MessagesRepository } from '../repositories/MessagesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { AuthRepository } from '../repositories/AuthRepository';
import { IChannelsService } from '../services/interfaces/IChannelsService';
import { ChannelsService } from '../services/ChannelsService';
import { IMessagesService } from '../services/interfaces/IMessagesService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';
import { IUsersService } from '../services/interfaces/IUsersService';
import { MessageDataLoader } from '../dataloaders/MessageDataLoader';
import { IImagesService } from '../services/interfaces/IImagesService';
import { ImagesService } from '../services/ImagesService';

export const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    const database = await new MongoDBProviderFactory().create();

    const s3Provider = createS3Provider();
    const authRepository = createRepository(AuthRepository, database, process.env.TOKENS_COLLECTION_NAME);
    const channelsRepository = createRepository(ChannelsRepository, database, process.env.CHANNELS_COLLECTION_NAME);
    const messagesRepository = createRepository(MessagesRepository, database, process.env.MESSAGES_COLLECTION_NAME);
    const usersRepository = createRepository(UsersRepository, database, process.env.USERS_COLLECTION_NAME);

    bind<IS3Provider>(TYPE.S3Provider).toConstantValue(s3Provider);
    bind<AuthRepository>(TYPE.AuthRepository).toConstantValue(authRepository);
    bind<ChannelsRepository>(TYPE.ChannelsRepository).toConstantValue(channelsRepository);
    bind<MessagesRepository>(TYPE.MessagesRepository).toConstantValue(messagesRepository);
    bind<UsersRepository>(TYPE.UsersRepository).toConstantValue(usersRepository);
    bind<IChannelsService>(TYPE.ChannelsService).to(ChannelsService);
    bind<IMessagesService>(TYPE.MessagesService).to(MessagesService);
    bind<IUsersService>(TYPE.UsersService).to(UsersService);
    bind<IImagesService>(TYPE.ImagesService).to(ImagesService);
    bind<MessageDataLoader>(TYPE.MessageDataLoader).to(MessageDataLoader);
});
