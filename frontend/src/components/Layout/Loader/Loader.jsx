import React from 'react';

const Loader = ({ color = '#ECC94B' }) => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ transform: 'scale(4)', width: 'fit-content', height: 'fit-content' }}>
        <div
          style={{
            border: `3px solid ${color}`,
            borderTopColor: "transparent",
            borderRadius: '50%',
            width: '2rem',
            height: '2rem',
            animation: 'spin 0.8s linear infinite'
          }}
        />
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
    
  );
};

export default Loader;
