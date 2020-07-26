import React from 'react';
import DayGroupList from './DayGroupList';

export default function TableContent({ transactions, onChangeContent }) {
  const transactionsByDay = [];
  let tempTransactions = [];
  let currentDay = 1;

  transactions.forEach((transaction, index) => {
    if (transaction.day === currentDay) {
      tempTransactions.push(transaction);
    } else {
      transactionsByDay.push({
        day: currentDay,
        transactions: tempTransactions,
      });
      tempTransactions = [];
      currentDay = transaction.day;
      tempTransactions.push(transaction);
    }

    if (index === transactions.length - 1) {
      transactionsByDay.push({
        day: currentDay,
        transactions: tempTransactions,
      });
    }
  });

  return (
    <div className="row">
      <div className="col s12">
        {transactionsByDay.map((transactionGroup) => {
          return (
            <div key={transactionGroup.day}>
              <DayGroupList
                transactions={transactionGroup.transactions}
                onChangeContent={onChangeContent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// const Style = {
//   tableContentStyle: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// };
