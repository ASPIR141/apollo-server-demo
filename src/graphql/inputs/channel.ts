import { gql } from 'apollo-server';

export default gql`
    input ChannelCreateInput {
        displayName: String!
        description: String
        members: [String]
    }
`;
