import { shield, allow } from 'graphql-shield';
import { AuthenticationError } from 'apollo-server';

import { isAuthenticated } from '../../utils/isAuthenticated';

const permissions = shield({
    Query: {
        user: isAuthenticated,
        channels: isAuthenticated,
        messages: isAuthenticated
    },
    Mutation: {
        createChannel: isAuthenticated,
        deleteChannel: isAuthenticated,
        createMessage: isAuthenticated,
        deleteMessage: isAuthenticated,
        uploadImage: isAuthenticated,
        deleteUser: isAuthenticated,
        signIn: allow,
        createUser: allow
    },
}, {
    fallbackError: new AuthenticationError('Unauthorized')
});

export default permissions;