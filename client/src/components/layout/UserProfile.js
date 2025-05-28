import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  
  // State for animated counters
  const [counters, setCounters] = useState({
    booksOwned: 0,
    booksSold: 0,
    booksLiked: 0
  });
  
  // Effect to animate counters when user data changes
  useEffect(() => {
    if (user) {
      const targetBooksOwned = user.purchasedBooks ? user.purchasedBooks.length : 0;
      const targetBooksSold = user.soldBooks ? user.soldBooks.length : 0;
      const targetBooksLiked = user.likedBooks ? user.likedBooks.length : 0;
      
      // Reset counters if they're higher than the current values
      if (counters.booksOwned > targetBooksOwned) {
        setCounters(prev => ({ ...prev, booksOwned: 0 }));
      }
      if (counters.booksSold > targetBooksSold) {
        setCounters(prev => ({ ...prev, booksSold: 0 }));
      }
      if (counters.booksLiked > targetBooksLiked) {
        setCounters(prev => ({ ...prev, booksLiked: 0 }));
      }
      
      // Animate counters
      const interval = setInterval(() => {
        setCounters(prev => {
          const newCounters = { ...prev };
          let updated = false;
          
          if (prev.booksOwned < targetBooksOwned) {
            newCounters.booksOwned += 1;
            updated = true;
          }
          if (prev.booksSold < targetBooksSold) {
            newCounters.booksSold += 1;
            updated = true;
          }
          if (prev.booksLiked < targetBooksLiked) {
            newCounters.booksLiked += 1;
            updated = true;
          }
          
          if (!updated) {
            clearInterval(interval);
          }
          
          return newCounters;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <div className="welcome-message">
          <h2>Welcome, {user.username}!</h2>
          <p>Your personal reading journey</p>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number" style={{ 
              transition: 'all 0.5s ease',
              color: counters.booksOwned > 0 ? 'var(--primary-color)' : 'var(--dark-color)'
            }}>
              {counters.booksOwned}
            </span>
            <span className="stat-label">Books Owned</span>
          </div>
          <div className="stat">
            <span className="stat-number" style={{ 
              transition: 'all 0.5s ease',
              color: counters.booksSold > 0 ? 'var(--success-color)' : 'var(--dark-color)'
            }}>
              {counters.booksSold}
            </span>
            <span className="stat-label">Books Sold</span>
          </div>
          <div className="stat">
            <span className="stat-number" style={{ 
              transition: 'all 0.5s ease',
              color: counters.booksLiked > 0 ? '#e74c3c' : 'var(--dark-color)'
            }}>
              {counters.booksLiked}
            </span>
            <span className="stat-label">Books Liked</span>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/mybooks" className="btn btn-primary">
            <i className="fas fa-book"></i> My Books
          </Link>
          <Link to="/buy" className="btn btn-secondary">
            <i className="fas fa-shopping-cart"></i> Buy Books
          </Link>
          <Link to="/sell" className="btn btn-dark">
            <i className="fas fa-exchange-alt"></i> Sell Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 