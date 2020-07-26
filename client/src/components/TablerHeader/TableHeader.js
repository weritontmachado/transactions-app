import React from 'react';

export default function TableHeader(props) {
  return <div style={Styles.tableHeaderStyle}>{props.children}</div>;
}

const Styles = {
  tableHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '20px',
  },
};
