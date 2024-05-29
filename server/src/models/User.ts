import { model, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    token: string;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: {type: String, required: true},
    token: {type: String, required: true},
});

export default model<IUser>('User', userSchema);
