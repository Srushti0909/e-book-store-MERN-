import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        username,
        password
      });
    }
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 8rem)',
    backgroundImage: 'linear-gradient(to right, rgba(52, 152, 219, 0.05), rgba(46, 204, 113, 0.05))'
  };

  const formContainerStyle = {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    padding: '3rem',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    position: 'relative',
    overflow: 'hidden'
  };

  const formHeaderStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative'
  };

  const inputGroupStyle = {
    position: 'relative',
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '2px solid #e0e0e0',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05) inset'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(to right, var(--primary-color), #2980b9)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const registerLinkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '1.5rem',
    color: 'var(--dark-color)',
    fontSize: '0.9rem'
  };

  return (
    <div className='page-container' style={pageStyle}>
      <div style={formContainerStyle}>
        <div style={formHeaderStyle}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--dark-color)' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#666' }}>Sign in to continue to ReadRecycle</p>
          <div style={{ 
            height: '4px', 
            width: '50px', 
            background: 'var(--primary-color)',
            margin: '1rem auto',
            borderRadius: '2px'
          }}></div>
        </div>
        
        <form onSubmit={onSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor='username' style={labelStyle}>Username</label>
            <input
              id='username'
              type='text'
              name='username'
              value={username}
              onChange={onChange}
              required
              style={inputStyle}
              placeholder="Enter your username"
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor='password' style={labelStyle}>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              style={inputStyle}
              placeholder="Enter your password"
            />
          </div>
          <button 
            type='submit'
            style={buttonStyle}
            onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            Sign In
          </button>
          
          <div style={registerLinkStyle}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 