import React from 'react';
import * as format from '../../helpers/formatHelper.js';

export default function Info({ transactions }) {
  const infoData = {
    recordCount: 0,
    receiptValue: 0,
    debitValue: 0,
    balance: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === '-') {
      infoData.debitValue += transaction.value;
    } else {
      infoData.receiptValue += transaction.value;
    }
  });

  infoData.recordCount = transactions.length;
  infoData.balance = infoData.receiptValue - infoData.debitValue;

  const { recordCount, receiptValue, debitValue, balance } = infoData;

  return (
    <div style={Styles.infoContainerStyle}>
      <div style={Styles.labelStyle}>{`Lançamentos:  ${recordCount}`}</div>
      <div style={Styles.labelStyle}>
        {`Receitas:  `}
        <span style={Styles.receitaStyle}>
          {format.formatCurrency(receiptValue)}
        </span>
      </div>
      <div style={Styles.labelStyle}>
        {`Despesas:  `}
        <span style={Styles.despesaStyle}>
          {format.formatCurrency(debitValue)}
        </span>
      </div>
      <div style={Styles.labelStyle}>
        {`Saldo:  `}
        <span style={balance > 0 ? Styles.receitaStyle : Styles.despesaStyle}>
          {format.formatCurrency(balance)}
        </span>
      </div>
    </div>
  );
}

const Styles = {
  infoContainerStyle: {
    marginTop: '20px',
    marginBotton: '20px',
    border: '1px solid lightgray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelStyle: {
    fontWeight: 'bold',
  },
  receitaStyle: {
    color: 'green',
    fontWeight: 'bold',
  },
  despesaStyle: {
    color: 'red',
    fontWeight: 'bold',
  },
};
