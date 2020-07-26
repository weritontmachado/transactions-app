import React from 'react';

export default function NewTransactionButton({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <div style={Styles.buttonStyle}>
      <span
        className="waves-effect waves-light btn blue lighten-1"
        onClick={handleClick}
      >
        Nova Transação
      </span>
    </div>
  );
}

const Styles = {
  buttonStyle: {
    width: '230px',
  },
};
