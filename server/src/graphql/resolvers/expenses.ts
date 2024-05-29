import { Resolvers } from '__generated__/graphql';
import { ApolloError } from 'apollo-server-errors';
import Expense from '../../models/Expense';
import User from '../../models/User';

const expensesResolvers: Resolvers = {
    Query: {
        expenses: async (_, __, contextValue) => {
            if (!contextValue.user) {
                throw new ApolloError(
                    'User making the request is not authenticated',
                    'UNAUTHENTICATED'
                );
            }
            return await Expense.find({ownerId: contextValue.user._id});
        }
    },
    Mutation: {
        createExpense: async(_, {expenseInput}, contextValue) => {
            if (!contextValue.user) {
                throw new ApolloError(
                    'User making the request is not authenticated',
                    'UNAUTHENTICATED'
                );
            }
            const user = await User.findById(contextValue.user._id).exec();
            if (!user) {
                throw new ApolloError(
                    'User with given id does not exist',
                    'USER_NOT_FOUND'
                );
            }

            const newExpense = new Expense({
                amount: expenseInput.amount,
                description: expenseInput.description,
                date: expenseInput.date,
                ownerId: contextValue.user._id
            });

            const res = await newExpense.save();

            return {
                id: res.id,
                // todo find a better way
                // @ts-ignore
                ...res._doc,
            };
        }
    }
}

export default expensesResolvers;