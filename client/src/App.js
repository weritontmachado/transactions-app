import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import TransactionService from './services/trasactionService.js';

import Header from './components/Header/Header';
import PeriodSelector from './components/PeriodSelector/PeriodSelector';
import Info from './components/Info/Info';
import TableHeader from './components/TablerHeader/TableHeader';
import NewTransactionButton from './components/TablerHeader/NewTransactionButton';
import FilterBar from './components/TablerHeader/FilterBar';
import PreviousButton from './components/PeriodSelector/PreviousButton';
import NextButton from './components/PeriodSelector/NextButton.js';
import PeriodView from './components/PeriodSelector/PeriodView';
import TableContent from './components/TableContent/TableContent';
import ModalTransaction from './components/TableContent/ModalTransaction/ModalTransaction.js';
import Loading from './components/Loading/Loading.js';

export default function App() {
  const [transactionList, setTransactionList] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [periodList, setPeriodList] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(' ');

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    const months = [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ',
    ];

    const fecthPeriods = async () => {
      const periods = await TransactionService.findPeriods();
      const mappedPeriodList = [];

      periods.data.forEach((period) => {
        for (let i = 0; i < 12; i++) {
          mappedPeriodList.push({
            description: `${months[i]}/${period}`,
            period: `${period}-${(i + 1).toString().padStart(2, '0')}`,
          });
        }
      });

      setPeriodList(mappedPeriodList);
      setCurrentIndex(0);
      setCurrentPeriod(mappedPeriodList[0]);
    };
    fecthPeriods();
  }, []);

  useEffect(() => {
    const fetchTransactions = async (period) => {
      const transactions = await TransactionService.findByPeriod(period);
      transactions.data.sort((a, b) => {
        return a.day - b.day;
      });
      setTransactionList(transactions.data);
      setFilteredTransactions(transactions.data);
    };

    fetchTransactions(currentPeriod.period);
    setFilter('');
  }, [currentPeriod]);

  const updateList = (bookmark) => {
    setCurrentPeriod(periodList[0]);
    setCurrentPeriod(bookmark);
  };

  const handleChangePeriod = (newIndex) => {
    setCurrentIndex(newIndex);
    setCurrentPeriod(periodList[newIndex]);
  };

  const handleChangeFilter = (filter) => {
    setFilter(filter);
    const newTransactionList = transactionList.filter((transaction) => {
      return transaction.description.toLowerCase().indexOf(filter) >= 0;
    });
    setFilteredTransactions(newTransactionList);
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      _id: '',
      description: '',
      value: 0,
      category: '',
      year: 0,
      month: 0,
      day: 0,
      yearMonth: '',
      yearMonthDay: '',
      type: '',
    };
    setIsOpen(true);
    setSelectedTransaction(newTransaction);
  };

  const handleEditDeleteTransaction = (id, type) => {
    const lastPeriod = { ...currentPeriod };

    if (type === 'edit') {
      const transaction = transactionList.find((currentTransaction) => {
        return currentTransaction._id === id;
      });
      setSelectedTransaction(transaction);
      setIsOpen(true);
    } else {
      confirmAlert({
        title: 'Delete',
        message: 'Tem certeza que deseja apagar esta transação?',
        buttons: [
          {
            label: 'Sim',
            onClick: async () => {
              const result = await TransactionService.remove(id);
              if (result) {
                M.toast({
                  html: 'Transação apagada com sucesso ',
                  classes: 'rounded',
                });
                updateList(lastPeriod);
              } else {
                M.toast({
                  html:
                    'Erro ao apagar transação, verifique e tente novamente.',
                  classes: 'rounded',
                });
              }
            },
          },
          {
            label: 'Não',
            onClick: () => {
              M.toast({
                html: 'Ação cancelada pelo usuário ',
                classes: 'rounded',
              });
            },
          },
        ],
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handlePersistData = async (newTransaction) => {
    const lastPeriod = { ...currentPeriod };
    let result = null;
    if (newTransaction._id === '') {
      result = await TransactionService.create(newTransaction);
    } else {
      result = await TransactionService.update(newTransaction);
    }
    if (result != null) {
      M.toast({ html: 'Transação salva com sucesso ', classes: 'rounded' });
      setIsOpen(false);
      updateList(lastPeriod);
    } else {
      M.toast({
        html: 'Erro ao salvar a transação, verifique e tente novamente.',
        classes: 'rounded',
      });
    }
  };

  return (
    <div className="container">
      <Header />
      {periodList.length === 0 && <Loading>Aguarde carregando...</Loading>}
      {periodList.length > 0 && (
        <PeriodSelector>
          <PreviousButton
            currentIndex={currentIndex}
            disabled={currentIndex === 0}
            onChangePeriod={handleChangePeriod}
          />
          <PeriodView
            periods={periodList}
            value={currentPeriod}
            onChangePeriod={handleChangePeriod}
          />
          <NextButton
            currentIndex={currentIndex}
            disabled={currentIndex === periodList.length - 1}
            onChangePeriod={handleChangePeriod}
          />
        </PeriodSelector>
      )}
      {transactionList.length > 0 && (
        <Info transactions={filteredTransactions} />
      )}
      {transactionList.length > 0 && (
        <TableHeader>
          <NewTransactionButton onClick={handleAddTransaction} />
          <FilterBar filter={filter} onChangeFilter={handleChangeFilter} />
        </TableHeader>
      )}
      {transactionList.length > 0 && (
        <TableContent
          transactions={filteredTransactions}
          onChangeContent={handleEditDeleteTransaction}
        />
      )}
      {modalIsOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleCloseModal}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
