import { gql } from 'apollo-server';

export default gql`
    type Subscription {
        messageAdded(channelId: ID!): Message
    }
`;
