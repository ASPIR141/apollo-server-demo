import { gql } from 'apollo-server';

export default gql`
    type Channel {
        id: ID!
        displayName: String
        description: String
        # members: [User]
        messages: [Message]
    }

    type DeleteChannelResponse {
        ok: Boolean!
        error: String
    }
`;