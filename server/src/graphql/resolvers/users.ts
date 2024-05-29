import User from '../../models/User';
import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resolvers } from '__generated__/graphql';

const userResolvers: Resolvers = {
    Query: {
        user: async (_, {id}) => await User.findById(id),
    },
    Mutation: {
        async registerUser(_, { registerInput }) {
            const oldUser = await User.findOne({ email: registerInput.email }).exec();
            if (oldUser) {
                throw new ApolloError(
                    'User with given email already exists',
                    'USER_ALREADY_EXISTS'
                );
            }

            const encryptedPassword = await bcrypt.hash(registerInput.password, 10);

            const newUser = new User({
                email: registerInput.email.toLowerCase(),
                password: encryptedPassword,
                username: registerInput.username,
            });

            newUser.token = generateToken(newUser._id, registerInput.email);

            const res = await newUser.save();

            return {
                id: res.id,
                // @ts-ignore
                ...res._doc,
            };
        },
        async loginUser(_, {loginInput}) {
            const user = await User.findOne({ email: loginInput.email });
            if (!user) {
                throw new ApolloError(
                    'User with given email does not exist',
                    'USER_DOES_NOT_EXIST'
                );
            }

            if (!bcrypt.compareSync(loginInput.password, user.password)) {
                throw new ApolloError(
                    'Invalid login credentials',
                    'INVALID_LOGIN'
                );
            }

            user.token = generateToken(user._id, loginInput.email)

            const res = await user.save();

            return {
                id: res.id,
                // @ts-ignore
                ...res._doc,
            };
        }
    },
};


const generateToken = (user_id, email) => {
    return jwt.sign(
        {
            user_id,
            email: email.toLowerCase(),
        },
        process.env.JWT_SECRET || '',
        {
            expiresIn: '2h',
        }
    );
}

export default userResolvers;