import { Container } from 'inversify';
import { mergeResolvers } from 'merge-graphql-schemas';
import { TYPE } from './ioc/types';

import { IChannelsService } from './services/interfaces/IChannelsService';
import { IMessagesService } from './services/interfaces/IMessagesService';
import { IUsersService } from './services/interfaces/IUsersService';
import { IImagesService } from './services/interfaces/IImagesService';
import { MessageDataLoader } from './dataloaders/MessageDataLoader';
import channelsResolver from './graphql/resolvers/channels';
import messagesResolver from './graphql/resolvers/messages';
import usersResolver from './graphql/resolvers/users';
import imagesResolver from './graphql/resolvers/images';

export const getResolvers = (c: Container) => {
    const channelsService = c.get<IChannelsService>(TYPE.ChannelsService);
    const messagesService = c.get<IMessagesService>(TYPE.MessagesService);
    const usersService = c.get<IUsersService>(TYPE.UsersService);
    const imagesService = c.get<IImagesService>(TYPE.ImagesService);
    const messageDataLoader = c.get<MessageDataLoader>(TYPE.MessageDataLoader);

    const resolvers = mergeResolvers([
        channelsResolver(channelsService, messageDataLoader),
        messagesResolver(messagesService, messageDataLoader),
        usersResolver(usersService),
        imagesResolver(imagesService)
    ]);

    return resolvers;
};
