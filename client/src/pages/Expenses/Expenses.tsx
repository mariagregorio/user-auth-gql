import React, { useState, useEffect } from 'react';
import styles from './Expenses.module.scss';
import AddExpense, { NewExpense } from './AddExpense';
import { useQuery } from '@apollo/client';
import { EXPENSES_QUERY } from '../../apollo/expenses/queries';

const Expenses = () => {
    const [total, setTotal] = useState(0);
    //todo need some types for queries data
    //todo handle errors
    const { loading, error, data } = useQuery(EXPENSES_QUERY);

    useEffect(() => {
        console.log(data);
        if (data?.expenses) {
            const sum = data.expenses.reduce((prev: any, curr: any) => {
                return prev + curr.amount;
            }, 0);
            setTotal(sum)
        }
    }, [data]);

    return (
        <div className="container">
            <h1>Expenses</h1>
            {loading && <div>Loading...</div>}
            {data?.expenses && (
                <div className={styles.expensesList}>
                    {data?.expenses.map((expense: any) => (
                        <div key={expense.id}>
                            <span>{expense.description}</span>
                            <span>$ {expense.amount.toFixed(2)}</span>
                            <span>{expense.date}</span>
                        </div>
                    ))}
                    <p>Total: $ {total.toFixed(2)}</p>
                </div>
            )}
            <AddExpense />
        </div>
    );
};

export default Expenses;
