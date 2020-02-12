import { gql } from 'apollo-server';

export default gql`
    type Message {
        id: ID!
        text: String!
        sender: String
        channelId: ID!
        createTime: String
    }

    type DeleteMessageResponse {
        ok: Boolean!
        error: String
    }
`;