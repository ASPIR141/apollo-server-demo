import * as path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const inputs = fileLoader(path.join(__dirname, 'graphql/inputs'));
const schema = fileLoader(path.join(__dirname, 'graphql/schema'));
const types = fileLoader(path.join(__dirname, 'graphql/types'));

export default mergeTypes([...inputs, ...types, ...schema], { all: true });

// import { gql } from 'apollo-server';

// export default gql`
//     type Query {
//         messages(channelId: ID!): [Message]
//     }

//     type Mutation {
//         createMessage(input: MessageCreateInput!): Message
//         deleteMessage(id: ID!): ID
//     }

//     type Subscription {
//         messageAdded(channelId: ID!): Message
//     }

//     input MessageCreateInput {
//         id: ID!
//         sender: String!
//         text: String!
//         threadId: ID!
//         channelId: ID!
//         createTime: String!
//     }

//     type Message {
//         id: ID!
//         sender: String!
//         text: String!
//         channel: Channel! @external
//         createTime: String!
//     }
// `;
