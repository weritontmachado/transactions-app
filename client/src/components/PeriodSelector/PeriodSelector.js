import React from 'react';

export default function PeriodSelector({ children }) {
  return (
    <div style={Styles.periodSelectorContainerStyle}>
      <div style={Styles.periodSelectorStyle}>{children}</div>
    </div>
  );
}

const Styles = {
  periodSelectorContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  periodSelectorStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
