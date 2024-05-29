import { model, Schema } from 'mongoose';

export interface IExpense {
    amount: number;
    description: string;
    date: string;
    ownerId: string;
}

const expenseSchema = new Schema<IExpense>({
    amount: {type: Number, required: true},
    description: {type: String, required: true},
    date: { type: String, required: true },
    ownerId: {type: String, required: true},
});

export default model<IExpense>('Expense', expenseSchema);
