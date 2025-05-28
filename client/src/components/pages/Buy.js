import React, { useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';
import BookItem from '../books/BookItem';
import Spinner from '../layout/Spinner';

const Buy = () => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);

  const { books, getAvailableBooks, loading } = bookContext;
  const { loadUser, isAuthenticated, updateUserStats } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    getAvailableBooks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 style={{ marginTop: '5rem', marginBottom: '1rem', textAlign: 'center' }}>Buy Books</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
          These books are currently available for purchase. Remember that when you're done reading, 
          you can sell them back for 90% of your purchase price!
        </p>
        
        {isAuthenticated ? (
          books && books.length > 0 ? (
            <div className="book-grid">
              {books.map(book => (
                <BookItem key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <i className="fas fa-book-open fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
              <p className="lead text-center">No books available for purchase at the moment...</p>
              <p>Check back soon as our catalog is regularly updated!</p>
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--light-color)', borderRadius: '5px' }}>
            <i className="fas fa-lock fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <h3>You need to be logged in to buy books</h3>
            <p style={{ marginBottom: '1.5rem' }}>Please login or register to access this feature.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy; 