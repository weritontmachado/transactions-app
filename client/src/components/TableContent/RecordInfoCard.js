import React from 'react';
import * as format from '../../helpers/formatHelper.js';
import Action from './Action.js';

export default function RecordInfoCard({ transaction, onChangeContent }) {
  const color = transaction.type === '+' ? 'green' : 'red';

  const { _id: id, day, category, description, value } = transaction;
  const {
    descriptionContainerStyle,
    dayStyle,
    infoCardContainerStyle,
    valueStyle,
    actionStyle,
    categoryStyle,
  } = Styles;

  const handleActionClick = (id, type) => {
    onChangeContent(id, type);
  };

  return (
    <li
      style={infoCardContainerStyle}
      className={`card-panel ${color} lighten-3`}
    >
      <div style={dayStyle}>{day.toString().padStart(2, '0')}</div>
      <div style={descriptionContainerStyle}>
        <div style={categoryStyle}>{category}</div>
        <div>{description}</div>
      </div>
      <div style={valueStyle}>{format.formatCurrency(value)}</div>
      <div style={actionStyle}>
        <Action onActionClick={handleActionClick} id={id} type={'edit'} />
        <Action onActionClick={handleActionClick} id={id} type={'delete'} />
      </div>
    </li>
  );
}

const Styles = {
  infoCardContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'stretch',
    margin: '7px',
    padding: '5px',
    borderRadius: '7px',
  },
  descriptionContainerStyle: {
    marginLeft: '50px',
    alignSelf: 'center',
    marginRight: 'auto',
  },
  valueStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-end',
    marginRight: '15%',
  },
  categoryStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  dayStyle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingLeft: '10px',
  },
  actionStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-start',
  },
};
