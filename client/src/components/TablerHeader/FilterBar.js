import React from 'react';

export default function FilterBar({ filter, onChangeFilter }) {
  const handleChange = (event) => {
    const filter = event.target.value.toLowerCase();
    onChangeFilter(filter);
  };

  return (
    <div style={Styles.filterBarStyle}>
      <input
        id="first_name"
        type="text"
        className="validate"
        placeholder="Filtro"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}

const Styles = {
  filterBarStyle: {
    width: '100%',
  },
};
