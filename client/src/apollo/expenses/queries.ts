import { gql } from '@apollo/client';

export const EXPENSES_QUERY = gql`
    query Query {
        expenses {
            id
            amount
            description
            date
            ownerId
        }
    }
`;
