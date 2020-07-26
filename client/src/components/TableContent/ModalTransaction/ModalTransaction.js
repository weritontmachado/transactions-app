import React, { useState } from 'react';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import Modal from 'react-modal';
import Radio from './Radio';

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const [transaction, setTransaction] = useState({ ...selectedTransaction });

  const {
    _id: id,
    description,
    value,
    category,
    type,
    yearMonthDay,
  } = transaction;
  const { headerStyle } = Styles;

  const modalMode = id === '' ? 'add' : 'edit';

  Modal.setAppElement('#root');
  moment.locale('pt-br');

  const handleCloseModal = () => {
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    const newTransaction = { ...transaction };

    newTransaction.day = Number(moment(value).format('DD'));
    newTransaction.month = Number(moment(value).format('MM'));
    newTransaction.year = Number(moment(value).format('YYYY'));
    newTransaction.yearMonth = moment(value).format('YYYY-MM');
    newTransaction.yearMonthDay = moment(value).format('YYYY-MM-DD');
    setTransaction(newTransaction);
  };

  const handleChangeRadioValue = (value) => {
    const newTransaction = { ...transaction };
    if (value === 'Receita') {
      newTransaction.type = '+';
    } else {
      newTransaction.type = '-';
    }
    setTransaction(newTransaction);
  };

  const handelSubmit = (event) => {
    event.target.preventDefaut();
  };

  const handleSaveData = () => {
    onSave(transaction);
  };

  return (
    <div>
      <Modal
        isOpen={true}
        style={customStyles}
        contentLabel="Example Modal"
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
      >
        <form onSubmit={handelSubmit}>
          <div style={headerStyle}>
            <h5>
              {modalMode === 'edit'
                ? 'Edição de lançamento'
                : 'Adição de lançamento'}
            </h5>
            <span
              style={{
                marginLeft: '5px',
                marginRight: '5px',
                fontWeight: 'bold',
              }}
              className="waves-effect waves-light btn red lighten-1"
              onClick={handleCloseModal}
            >
              X
            </span>
          </div>
          <div>
            <Radio
              name="type"
              label="Receita"
              checked={type === '+'}
              disabled={modalMode === 'edit'}
              onChangeValue={handleChangeRadioValue}
            />
            <Radio
              name={'type'}
              label={'Despesa'}
              checked={type === '-'}
              disabled={modalMode === 'edit'}
              onChangeValue={handleChangeRadioValue}
            />
            <div className="input-field col s12">
              <input
                id="description"
                type="text"
                className="validate"
                value={description}
                onChange={handleInputChange}
                name="description"
              />
              <label className="active" htmlFor="description">
                Descrição
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="category"
                type="text"
                className="validate"
                value={category}
                onChange={handleInputChange}
                name="category"
              />
              <label className="active" htmlFor="category">
                Categoria
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="value"
                type="text"
                className="validate"
                value={value}
                onChange={handleInputChange}
                name="value"
              />
              <label className="active" htmlFor="value">
                Valor
              </label>
            </div>
            <input
              id="date"
              type="date"
              value={yearMonthDay}
              onChange={handleDateChange}
            ></input>
          </div>
          <span
            style={{
              marginLeft: '5px',
              marginRight: '5px',
              fontWeight: 'bold',
            }}
            className="waves-effect waves-light btn blue lighten-1"
            onClick={handleSaveData}
          >
            save
          </span>
        </form>
      </Modal>
    </div>
  );
}

const Styles = {
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '400px',
    transform: 'translate(-50%, -50%)',
  },
};
