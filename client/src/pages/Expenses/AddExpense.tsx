import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE_MUTATION } from '../../apollo/expenses/mutations';

export type NewExpense = {
    description: string;
    amount: number;
};

const AddExpense = () => {
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [gqlErrors, setGqlErrors] = useState<any[]>([]);

    const [createExpense, { loading }] = useMutation(CREATE_EXPENSE_MUTATION, {
        update(cache, { data }) {
            // todo
            console.log('🧹 update apollo cache here', data);
        },
        onError({ graphQLErrors }) {
            setGqlErrors(graphQLErrors as any);
        },
        variables: {
            expenseInput: {
                amount,
                description,
                date: new Date().toISOString()
            },
        },
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (description && description !== '' && amount && amount > 0) {
            setAmount(0);
            setDescription('');
            createExpense();
        }
    };

    return (
        <div>
            <h2 style={{marginTop: '4rem'}}>Add new expense</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                    />
                </div>
                {gqlErrors && gqlErrors.length > 0 && (
                    <div className="form-error">
                        {gqlErrors.map((e, i) => (
                            <p key={i}>{e.message}</p>
                        ))}
                    </div>
                )}
                <button
                    type="submit"
                    value="Submit"
                    className="button-primary"
                    onClick={(e) => handleSubmit(e)}
                    disabled={loading}
                >
                    Add new expense
                </button>
            </form>
        </div>
    );
};

export default AddExpense;
