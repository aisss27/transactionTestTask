import React from 'react';
import { Transaction } from './Transaction';

type TransactionListProps = {
    transactions: Transaction[];
};

export const TransactionList: React.FC<TransactionListProps> = (props) => {
    const { transactions } = props;
    return (
        <div>
            <ul>
                {transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        id={transaction.id}
                        date={transaction.date}
                        amount={transaction.amount}
                        type={transaction.type}
                        details={transaction.details}
                    />
                ))}
            </ul>
        </div>
    );
};
