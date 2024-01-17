// transactions.tsx
import React, {useState} from 'react';
import { TransactionList } from '../components/TransactionList';
import { SearchFilter } from '../components/SearchFilter';
import TransactionChart from '../components/TransactionChart';
import {Transaction} from '../components/Transaction';

const initialTransactions: Transaction[] = [
    { id: 1, date: '2024-01-15', amount: 100.00, type: 'Income', details: 'Salary payment' },
    { id: 2, date: '2024-01-16', amount: -30.00, type: 'Expense', details: 'Grocery shopping' },
    { id: 3, date: '2024-01-10', amount:  30.00, type: 'Expense', details: 'Grocery shopping' },
    { id: 4, date: '2024-01-10', amount: 50.00, type: 'Income', details: 'Sport' },
    { id: 5, date: '2024-01-10', amount: 50.00, type: 'Expense', details: 'Grocery shopping' },
    { id: 6, date: '2024-01-09', amount: 70.00, type: 'Income', details: 'Sport' },
    { id: 7, date: '2024-03-27', amount: 10.00, type: 'Income', details: 'Sport' },
    { id: 8, date: '2024-01-02', amount: 5.00, type: 'Expense', details: 'Grocery shopping' },
];


const Transactions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [transactionsData, setTransactionsData] = useState(initialTransactions);

    const chartData = transactionsData.map((transaction) => transaction.amount);
    const chartLabels = transactionsData.map((transaction) => transaction.details);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        updateFilteredTransactions(term, filterType);
    };

    const handleFilterChange = (type: string) => {
        setFilterType(type);
        updateFilteredTransactions(searchTerm, type);
    };

    const updateFilteredTransactions = (term: string, type: string) => {
        const filteredTransactions = initialTransactions.filter(
            (transaction) =>
                transaction.details.toLowerCase().includes(term.toLowerCase()) &&
                (type === 'all' || transaction.type.toLowerCase() === type.toLowerCase())
        );
        setTransactionsData(filteredTransactions);
    };

    const summary = calculateSummary(transactionsData);

    return (
        <div>
            <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />
            <h1>История транзакций</h1>
            <TransactionList transactions={transactionsData} />
            <TransactionChart data={chartData} labels={chartLabels} width={300} height={200} />
            <TransactionChart data={summary.data} labels={summary.labels} width={300} height={200} />
            <div>
                <h2>Общий обзор</h2>
                <p>Суммарный доход: {summary.totalIncome}</p>
                <p>Суммарные расходы: {summary.totalExpenses}</p>
                <p>Баланс: {summary.balance}</p>
            </div>
        </div>
    );
};

// Add the following function for calculating summary
const calculateSummary = (transactions: Transaction[]) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += Math.abs(transaction.amount);
        }
    });

    const balance = totalIncome - totalExpenses;

    const data = [totalIncome, totalExpenses, balance];
    const labels = ['Total Income', 'Total Expenses', 'Balance'];

    return { data, labels, totalIncome, totalExpenses, balance };
};

export default Transactions;