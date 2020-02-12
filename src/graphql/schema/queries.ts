import { gql } from 'apollo-server';

export default gql`
    type Query {
        user: User
        channels: [Channel]
        messages(channelId: ID!): [Message]
    }
`;