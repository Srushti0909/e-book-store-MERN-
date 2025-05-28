import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  // Define alert styles
  const alertContainerStyle = {
    position: 'fixed',
    top: '80px',
    right: '20px',
    zIndex: 1000,
    maxWidth: '300px'
  };

  const alertStyle = (type) => ({
    padding: '12px 16px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    animation: 'fadeIn 0.3s ease-out',
    backgroundColor: type === 'success' ? '#2ecc71' : 
                    type === 'danger' ? '#e74c3c' : 
                    type === 'primary' ? '#3498db' : '#f4f4f4',
    color: ['success', 'danger', 'primary'].includes(type) ? '#fff' : '#333'
  });

  const iconStyle = {
    marginRight: '10px',
    fontSize: '1.2rem'
  };

  return (
    <div style={alertContainerStyle}>
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map(alert => (
          <div key={alert.id} style={alertStyle(alert.type)}>
            <i className='fas fa-info-circle' style={iconStyle} /> 
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

export default Alerts; 