import React from 'react';

export default function PeriodView({ value, periods, onChangePeriod }) {
  const handleChange = (event) => {
    const selectObject = event.target;
    const newIndex = selectObject.selectedIndex;
    onChangePeriod(newIndex);
  };

  const periodList = [];

  periods.forEach(({ description, period }) => {
    periodList.push({ description, period });
  });

  const optionsValues = periodList.map((currentPeriod, index) => {
    return (
      <option key={index} value={currentPeriod.period}>
        {currentPeriod.description}
      </option>
    );
  });

  return (
    <div className="input-field col s12">
      <select value={value.period} onChange={handleChange}>
        {optionsValues}
      </select>
    </div>
  );
}
