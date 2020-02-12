import { gql } from 'apollo-server';

export default gql`
    input MessageCreateInput {
        sender: String!
        text: String!
        channelId: ID!
        createTime: String!
    }
`;
