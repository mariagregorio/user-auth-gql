import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import resolvers from './graphql/resolvers';
import jwt from 'jsonwebtoken';
import User, { IUser } from './models/User';

dotenv.config();

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@moonlight.ytypa7x.mongodb.net/?retryWrites=true&w=majority&appName=moonlight`;

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, '/graphql/schema.graphql'),
        'utf8'
    ),
    resolvers
});

mongoose
    .connect(URI, { dbName: 'apollo-server-user-auth' })
    .then(async () => {
        console.log('Connected to Mongodb');
        return startStandaloneServer(server, {
            context: async ({ req, res }) => {
              const token = req.headers.authorization;
              if (token) {
                const user = await getAuthorizedUser(token);
                return { user };
              } 
              return {}
            },
            listen: { port: 3001 },
          });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(e => {
        console.error(e)
    }) 
    
    
const getAuthorizedUser = async (token: string): Promise<IUser | null> => {
    const data: any = jwt.verify(token, process.env.JWT_SECRET || '')
    const user = await User.findById(data.user_id);
    console.log("🧬 user", user)
    return user;
}
