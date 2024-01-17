// SearchFilter.tsx
import React, { ChangeEvent } from 'react';

type SearchFilterProps = {
    onSearch: (searchTerm: string) => void;
    onFilterChange: (filterType: string) => void;
};

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilterChange }) => {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск..."
                onChange={handleSearch}
            />
            <select onChange={handleFilterChange}>
                <option value="all">Все транзакции</option>
                <option value="income">Доходы</option>
                <option value="expense">Расходы</option>
            </select>
        </div>
    );
};
