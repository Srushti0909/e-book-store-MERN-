import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import BookContext from '../../context/book/bookContext';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const MyBooks = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const bookContext = useContext(BookContext);
  
  const { user, loading, loadUser, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const { sellBook: sellBookContext } = bookContext;
  
  // Track which books have expanded details
  const [showDetailsMap, setShowDetailsMap] = useState({});

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  const sellBook = async (bookId, title, price) => {
    if (!isAuthenticated) {
      setAlert('Please log in to sell books', 'danger');
      return;
    }

    const sellPrice = (price * 75 * 0.9).toFixed(0); // 90% of original price in INR

    // Ask for confirmation using browser dialog
    const confirmSell = window.confirm(`Are you sure you want to sell "${title}" for ₹${sellPrice}? (90% of original price)`);
    
    if (!confirmSell) {
      return; // User canceled the sell operation
    }

    // Show a processing message
    setAlert('Processing your sell request...', 'primary');

    const result = await sellBookContext(bookId);
    
    if (result) {
      setAlert(`Successfully sold "${title}" for ₹${sellPrice}!`, 'success');
      loadUser(); // Refresh user data
    } else {
      setAlert('Failed to sell the book. Please try again.', 'danger');
    }
  };

  // Toggle book details
  const toggleDetails = (bookId) => {
    setShowDetailsMap(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--light-color)', borderRadius: '5px', marginTop: '5rem' }}>
            <i className="fas fa-lock fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <h3>You need to be logged in to view your books</h3>
            <p style={{ marginBottom: '1.5rem' }}>Please login or register to access this feature.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 style={{ marginTop: '5rem', marginBottom: '1rem', textAlign: 'center' }}>My Books</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
          Here are all the books you currently own. Remember, you can sell them back anytime and get 90% of your purchase price back!
        </p>
        
        {user?.purchasedBooks && user.purchasedBooks.length > 0 ? (
          <>
            <div className="book-grid">
              {user.purchasedBooks.map(item => (
                <div key={item._id} className='book-card'>
                  <img src={item.book.image} alt={item.book.title} />
                  <h3>{item.book.title}</h3>
                  <p className='author'>by {item.book.author}</p>
                  
                  <div style={{ marginTop: '0.5rem' }}>
                    {item.book.category && (
                      <span className='genre'>{item.book.category.name}</span>
                    )}
                  </div>
                  
                  <p className='price'>₹{(item.book.price * 75).toFixed(0)}</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                    <i className="far fa-calendar-alt" style={{ marginRight: '0.3rem' }}></i>
                    Purchased on: {new Date(item.purchaseDate).toLocaleDateString()}
                  </p>
                  
                  {/* Book description section */}
                  {showDetailsMap[item.book._id] && (
                    <div className="book-details" style={{ 
                      marginTop: '1rem', 
                      padding: '1rem', 
                      background: '#f9f9f9', 
                      borderRadius: '5px', 
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                    }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>Description:</h4>
                      <p>{item.book.description}</p>
                    </div>
                  )}
                  
                  <div className='buttons'>
                    <button 
                      className='btn btn-primary'
                      onClick={() => sellBook(item.book._id, item.book.title, item.book.price)}
                    >
                      <i className="fas fa-exchange-alt" style={{ marginRight: '0.3rem' }}></i> Sell Back
                    </button>
                    <button 
                      className='btn btn-light'
                      onClick={() => toggleDetails(item.book._id)}
                    >
                      {showDetailsMap[item.book._id] ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <span className='btn btn-light' style={{ cursor: 'help' }} title="You'll receive 90% of your purchase price back.">
                      ₹{(item.book.price * 0.9 * 75).toFixed(0)} value
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/buy" className="btn btn-secondary">
                <i className="fas fa-shopping-cart" style={{ marginRight: '0.5rem' }}></i> Browse More Books
              </Link>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <i className="fas fa-book-open fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <p className="lead">You haven't purchased any books yet</p>
            <Link to="/buy" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Browse Books to Buy
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks; 