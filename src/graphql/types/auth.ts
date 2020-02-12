import { gql } from 'apollo-server';

export default gql`
    type AuthResponse {
        access_token: String
        refresh_token: String
        userId: String
    }
`;
