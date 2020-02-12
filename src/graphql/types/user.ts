import { gql } from 'apollo-server';

export default gql`
    type User {
        id: ID!
        email: String
        firstName: String
        lastName: String
        birthDate: String
        displayName: String
        createdAt: String
        updatedAt: String
    }

    type DeleteUserResponse {
        ok: Boolean!
        error: String
    }
`;
