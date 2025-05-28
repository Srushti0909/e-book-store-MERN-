import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BookContext from '../../context/book/bookContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';

const Sell = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { user, loading, loadUser, isAuthenticated, updateUserStats } = authContext;
  const { sellBook } = bookContext;
  const { setAlert } = alertContext;

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = new URLSearchParams(location.search).get('id');

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && user.purchasedBooks && bookId) {
      const book = user.purchasedBooks.find(item => item.book._id === bookId);
      if (book) {
        setSelectedBook(book);
      }
    }
  }, [user, bookId]);

  if (loading) {
    return <Spinner />;
  }

  const onSell = async () => {
    if (!selectedBook) {
      setAlert('Please select a book to sell', 'danger');
      return;
    }

    // Show a processing message
    setAlert('Processing your sale...', 'primary');

    const result = await sellBook(selectedBook.book._id);
    
    if (result) {
      const bookTitle = selectedBook.book.title;
      const amount = (selectedBook.book.price * 0.9 * 75).toFixed(0);
      
      // Show success message
      setAlert(`Successfully sold "${bookTitle}" for ₹${amount}!`, 'success');
      
      // Update user stats in real-time
      if (result.purchasedBooks && result.soldBooks) {
        updateUserStats(result.purchasedBooks, result.soldBooks);
      }
      
      navigate('/mybooks');
    } else {
      // Show error message
      setAlert('Sale failed. Please try again.', 'danger');
    }
  };

  const handleBookSelect = e => {
    const bookId = e.target.value;
    const book = user?.purchasedBooks?.find(item => item.book._id === bookId);
    setSelectedBook(book || null);
  };

  const pageContainerStyle = {
    backgroundImage: 'linear-gradient(to right, rgba(52, 152, 219, 0.1), rgba(46, 204, 113, 0.1))',
    minHeight: 'calc(100vh - 8rem)',
    paddingBottom: '3rem'
  };

  const pageHeaderStyle = {
    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
    color: 'white',
    padding: '3rem 1rem',
    borderRadius: '0 0 10px 10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '3rem',
    textAlign: 'center'
  };

  const formContainerStyle = {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    transition: 'all 0.3s ease'
  };

  const selectStyle = {
    height: '50px',
    borderRadius: '5px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  };

  const bookDetailsStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    border: 'none',
    background: '#f9f9f9',
    transition: 'all 0.3s ease',
    transform: selectedBook ? 'translateY(0)' : 'translateY(10px)',
    opacity: selectedBook ? 1 : 0,
    height: selectedBook ? 'auto' : 0,
    overflow: 'hidden'
  };

  const bookImageStyle = {
    width: '120px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '5px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
    transform: 'rotate(-3deg)'
  };

  const buttonStyle = {
    marginTop: '2rem',
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    borderRadius: '50px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    width: '100%',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(to right, var(--primary-color), var(--success-color))',
    border: 'none'
  };

  const noBookStyle = {
    textAlign: 'center',
    padding: '3rem 2rem',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  };

  const loginMessageStyle = {
    textAlign: 'center',
    padding: '3rem',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="page-container" style={pageContainerStyle}>
      <div style={pageHeaderStyle}>
        <h1 style={{ marginBottom: '1rem' }}>Sell Your Books</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          Ready to pass your books on to another reader? Sell your books back to us and 
          recover 90% of your original purchase price!
        </p>
      </div>
      
      <div className="container">
        {isAuthenticated ? (
          <div style={formContainerStyle}>
            {user?.purchasedBooks && user.purchasedBooks.length > 0 ? (
              <div>
                <div className="form-group">
                  <label htmlFor="book" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
                    Select a Book to Sell
                  </label>
                  <select 
                    className="form-select" 
                    id="book" 
                    value={selectedBook ? selectedBook.book._id : ''}
                    onChange={handleBookSelect}
                    style={selectStyle}
                  >
                    <option value="">-- Select a Book --</option>
                    {user.purchasedBooks.map(item => (
                      <option key={item.book._id} value={item.book._id}>
                        {item.book.title} by {item.book.author}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedBook && (
                  <div className="book-details" style={bookDetailsStyle}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--dark-color)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                      Book Details
                    </h3>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={selectedBook.book.image} 
                          alt={selectedBook.book.title} 
                          style={bookImageStyle}
                        />
                        <div style={{ 
                          position: 'absolute', 
                          top: '-10px', 
                          right: '-10px', 
                          background: 'var(--success-color)', 
                          color: 'white', 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>90%</div>
                      </div>
                      <div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Title:</strong> {selectedBook.book.title}</p>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Author:</strong> {selectedBook.book.author}</p>
                        <p style={{ marginBottom: '0.5rem' }}><strong>Purchase Date:</strong> {new Date(selectedBook.purchaseDate).toLocaleDateString()}</p>
                        <p style={{ marginBottom: '0.5rem' }}><strong>Original Price:</strong> ₹{(selectedBook.book.price * 75).toFixed(0)}</p>
                        <p style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          marginTop: '1rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(46, 204, 113, 0.1)',
                          borderRadius: '5px',
                          display: 'inline-block'
                        }}>
                          <strong>Resale Value:</strong> <span style={{ color: 'var(--success-color)' }}>₹{(selectedBook.book.price * 0.9 * 75).toFixed(0)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  className="btn btn-primary btn-block" 
                  style={buttonStyle}
                  disabled={!selectedBook}
                  onClick={onSell}
                >
                  <i className="fas fa-exchange-alt" style={{ marginRight: '0.8rem' }}></i> Sell Book
                </button>
                <p className="form-text" style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                  You will receive 90% of the original purchase price when you sell your book.
                </p>
              </div>
            ) : (
              <div style={noBookStyle}>
                <i className="fas fa-book-open fa-4x" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', opacity: 0.8 }}></i>
                <h3 style={{ marginBottom: '1rem', color: 'var(--dark-color)' }}>You don't have any books to sell</h3>
                <p style={{ marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  Browse our collection and purchase books to start enjoying our 90% buyback offer!
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/buy')}
                  style={{
                    padding: '0.7rem 1.5rem',
                    borderRadius: '50px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fas fa-shopping-cart" style={{ marginRight: '0.5rem' }}></i> Browse Books to Buy
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={loginMessageStyle}>
            <i className="fas fa-lock fa-4x" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', opacity: 0.8 }}></i>
            <h3 style={{ marginBottom: '1rem', color: 'var(--dark-color)' }}>You need to be logged in to sell books</h3>
            <p style={{ marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Please login or register to access our 90% buyback program and start selling your books.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell; 