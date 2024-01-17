import React, {useState} from 'react';


export type Transaction = {
    id: number
    date: string
    amount: number
    type: 'Income' | 'Expense'
    details: string
}
export const Transaction:React.FC<Transaction> = (props) => {
  const {id,date,amount,type,details} = props
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <li onClick={toggleDetails} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <strong>{date}</strong>
            <br />
            <span>{amount} {type}</span>
            {showDetails && <p>{details}</p>}
        </li>
    );
};
