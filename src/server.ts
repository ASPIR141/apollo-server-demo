require('dotenv').config();

import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';

import typeDefs from './typeDefs';
import permissions from './graphql/permissions';
import { AuthUtil } from './utils/auth';

import { container } from './ioc';
import { getResolvers } from './resolvers';

const createGraphQLServer = async () => {
    const c = await container;

    const resolvers = getResolvers(c);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const server = new ApolloServer({
        context: ({ req, connection }) => {
            const token = connection
                ? connection.context?.authToken
                : req.headers.authorization;

            const user = AuthUtil.validateTokenAndGetUser(token);
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

