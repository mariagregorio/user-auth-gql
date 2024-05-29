import { gql } from '@apollo/client';

export const CREATE_EXPENSE_MUTATION = gql`
    mutation Mutation($expenseInput: ExpenseInput!) {
        createExpense(expenseInput: $expenseInput) {
            id
            amount
            description
            date
            ownerId
        }
    }
`;
