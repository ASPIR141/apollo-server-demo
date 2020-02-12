import { gql } from 'apollo-server';

export default gql`
    type Mutation {
        createChannel(input: ChannelCreateInput!): Channel
        deleteChannel(id: ID!): DeleteChannelResponse
        createMessage(input: MessageCreateInput!): Message
        deleteMessage(id: ID!): DeleteMessageResponse
        uploadImage(file: Upload!): String
        createUser(input: UserCreateInput!): User
        deleteUser(id: ID!): DeleteUserResponse
        signIn(email: String!, password: String!): AuthResponse
    }
`;
