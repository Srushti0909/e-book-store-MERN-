import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>
        <Link to='/buy'>Buy</Link>
      </li>
      <li>
        <Link to='/sell'>Sell</Link>
      </li>
      <li>
        <Link to='/mybooks'>My Books</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </>
  );

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/' className='brand'>
          <i className='fas fa-book'></i> ReadRecycle
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/explore'>Explore</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar; 