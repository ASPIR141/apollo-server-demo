require('dotenv').config();

import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { mergeResolvers } from 'merge-graphql-schemas';

import typeDefs from './typeDefs';
import permissions from './graphql/permissions';
import { AuthUtil } from './utils/auth';

import { TYPE } from './ioc/types';
import { container } from './ioc';
import { IChannelsService } from './services/interfaces/IChannelsService';
import { IMessagesService } from './services/interfaces/IMessagesService';
import { IUsersService } from './services/interfaces/IUsersService';
import { IImagesService } from './services/interfaces/IImagesService';
import { MessageDataLoader } from './dataloaders/MessageDataLoader';
import channelsResolver from './graphql/resolvers/channels';
import messagesResolver from './graphql/resolvers/messages';
import usersResolver from './graphql/resolvers/users';
import imagesResolver from './graphql/resolvers/images';

const createGraphQLServer = async () => {
    const c = await container;

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

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const server = new ApolloServer({
        context: ({ req, connection }) => {
            if (connection) {
                const { authToken } = connection.context;
                return connection.context;
            }

            const token = req.headers.authorization || '';
            const user = AuthUtil.verifyToken(token);

            return { user };
        },
        subscriptions: {
            onConnect: (connectionParams: any) => { // TODO: remove any
                const { authToken } = connectionParams;
                return { authToken };
            }
        },
        schema: applyMiddleware(schema, permissions),
        engine: {
            apiKey: process.env.ENGINE_API_KEY,
        },
        playground: true,
        tracing: true,
        mocks: true,
        mockEntireSchema: false
    });

    if (process.env.NODE_ENV !== 'test') {
        server
            .listen({ port: process.env.PORT })
            .then(({ url }) => console.log(`🚀 Server started at ${url}`));
    }

    return server;
};

createGraphQLServer();

