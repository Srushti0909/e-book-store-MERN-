import React from 'react';

const Spinner = () => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '5rem 0' }}>
      <div className="spinner" style={{
        width: '50px',
        height: '50px',
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '5px solid #3498db',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner; 