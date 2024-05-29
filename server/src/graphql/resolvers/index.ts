
import usersResolvers from './users';
import expensesResolvers from './expenses';


export default {
    Query: {
        ...usersResolvers.Query,
        ...expensesResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...expensesResolvers.Mutation,

    },
};
