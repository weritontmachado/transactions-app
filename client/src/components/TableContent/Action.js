import React from 'react';

export default function Action({ id, onActionClick, type }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <div>
      <span style={{ cursor: 'pointer' }}>
        <i
          style={{ marginRight: '15px' }}
          onClick={handleIconClick}
          className="material-icons left"
        >
          {type}
        </i>
      </span>
    </div>
  );
}
