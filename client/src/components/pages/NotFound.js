import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '5rem 0' }}>
      <h1>404 - Page Not Found</h1>
      <p className="lead">The page you are looking for does not exist</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound; 