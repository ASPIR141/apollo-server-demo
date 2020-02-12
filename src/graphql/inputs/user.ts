import { gql } from 'apollo-server';

export default gql`
    input UserCreateInput {
        email: String!
        firstName: String!
        lastName: String!
        password: String!
        displayName: String
        birthDate: DateTime
    }
`;
