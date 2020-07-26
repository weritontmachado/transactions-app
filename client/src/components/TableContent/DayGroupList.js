import React from 'react';
import RecordInfoCard from './RecordInfoCard';

export default function DayGroupList({ transactions, onChangeContent }) {
  return (
    <ul>
      {transactions.map((transaction, index) => {
        return (
          <div key={index}>
            <RecordInfoCard
              transaction={transaction}
              onChangeContent={onChangeContent}
            />
          </div>
        );
      })}
    </ul>
  );
}
