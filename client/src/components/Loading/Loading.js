import React from 'react';

export default function Loading({ children, size }) {
  const { loadingStyle } = styles;
  return (
    <div style={loadingStyle} className="center-align">
      <div className={`preloader-wrapper ${size} active`}>
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '15px', fontSize: '1.2rem' }}>{children}</div>
    </div>
  );
}

const styles = {
  loadingStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
