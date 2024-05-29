import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
    mutation Mutation($registerInput: RegisterInput!) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`;

export const LOGIN_USER_MUTATION = gql`
    mutation Mutation($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token
        }
    }
`;