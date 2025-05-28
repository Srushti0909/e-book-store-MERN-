import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

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
    password: '',
    password2: ''
  });

  const { username, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (password.length < 6) {
      setAlert('Password must be at least 6 characters', 'danger');
    } else {
      register({
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
    backgroundImage: 'linear-gradient(to right, rgba(46, 204, 113, 0.05), rgba(52, 152, 219, 0.05))'
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
    background: 'linear-gradient(to right, var(--secondary-color), #27ae60)',
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

  const loginLinkStyle = {
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
            Create an Account
          </h1>
          <p style={{ color: '#666' }}>Join ReadRecycle to buy and sell books</p>
          <div style={{ 
            height: '4px', 
            width: '50px', 
            background: 'var(--secondary-color)',
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
              minLength='3'
              style={inputStyle}
              placeholder="Choose a username (min. 3 characters)"
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
              minLength='6'
              style={inputStyle}
              placeholder="Create a password (min. 6 characters)"
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor='password2' style={labelStyle}>Confirm Password</label>
            <input
              id='password2'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
              minLength='6'
              style={inputStyle}
              placeholder="Confirm your password"
            />
          </div>
          <button 
            type='submit'
            style={buttonStyle}
            onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            Create Account
          </button>
          
          <div style={loginLinkStyle}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 