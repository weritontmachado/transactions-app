import React from 'react';

export default function PreviousButton({
  disabled,
  onChangePeriod,
  currentIndex,
}) {
  const handleClick = () => {
    onChangePeriod(currentIndex - 1);
  };

  return (
    <span
      style={{ marginLeft: '5px', marginRight: '5px', fontWeight: 'bold' }}
      className="waves-effect waves-light btn blue lighten-1"
      disabled={disabled}
      onClick={handleClick}
    >
      {'<'}
    </span>
  );
}
