import React, { useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';
import BookItem from '../books/BookItem';
import Spinner from '../layout/Spinner';

const Explore = () => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);

  const { books, getBooks, loading } = bookContext;
  const { loadUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    getBooks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 style={{ marginTop: '5rem', marginBottom: '1rem', textAlign: 'center' }}>Explore Books</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
          Browse our collection of e-books across various genres. Find your next great read and remember - 
          you can get 90% back when you resell your books after reading!
        </p>
        
        {books && books.length > 0 ? (
          <div className="book-grid">
            {books.map(book => (
              <BookItem key={book._id} book={book} isExplorePage={true} />
            ))}
          </div>
        ) : (
          <p className="lead text-center">No books found...</p>
        )}
      </div>
    </div>
  );
};

export default Explore; 