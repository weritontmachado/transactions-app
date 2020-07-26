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
  const {
    flexRowStyle,
    radioGroupStyle,
    saveButtonStyle,
    dataContainerStyle,
  } = Styles;

  const modalMode = id === '' ? 'add' : 'edit';

  Modal.setAppElement('#root');
  moment.locale('pt-br');

  const handleCloseModal = () => {
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if ((name = 'value')) {
      setTransaction({ ...transaction, [name]: Number(value) });
    } else {
      setTransaction({ ...transaction, [name]: value });
    }
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
        style={modalStyle}
        contentLabel={
          modalMode === 'edit' ? 'Edição de lançamento' : 'Adição de lançamento'
        }
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={false}
      >
        <form onSubmit={handelSubmit}>
          <div style={flexRowStyle}>
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
          <div style={{ ...flexRowStyle, ...radioGroupStyle }}>
            <Radio
              name="type"
              label="Receita"
              checked={type === '+'}
              disabled={modalMode === 'edit'}
              color={'green'}
              onChangeValue={handleChangeRadioValue}
            />
            <Radio
              name={'type'}
              label={'Despesa'}
              checked={type === '-'}
              disabled={modalMode === 'edit'}
              color={'red'}
              onChangeValue={handleChangeRadioValue}
            />
          </div>
          <div style={dataContainerStyle}>
            <div className="input-field">
              <input
                id="description"
                type="text"
                className="validate"
                value={description}
                onChange={handleInputChange}
                name="description"
              />
              <label
                className={description ? 'active' : ''}
                htmlFor="description"
              >
                Descrição
              </label>
            </div>
            <div className="input-field">
              <input
                id="category"
                type="text"
                className="validate"
                value={category}
                onChange={handleInputChange}
                name="category"
              />
              <label className={category ? 'active' : ''} htmlFor="category">
                Categoria
              </label>
            </div>
            <div className="input-field">
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
            <label className="active" htmlFor="date">
              Data do lançamento:
            </label>
            <input
              id="date"
              type="date"
              value={yearMonthDay}
              onChange={handleDateChange}
            />
          </div>
          <span
            style={saveButtonStyle}
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
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioGroupStyle: {
    padding: '0 50px 0 50px',
  },
  saveButtonStyle: {
    marginTop: '10px',
    // marginLeft: '10px',
    marginRight: '10px',
    width: '100px',
    fontWeight: 'bold',
  },
  dataContainerStyle: {
    padding: '10px',
    border: '1px solid lightgray',
  },
};

const modalStyle = {
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
