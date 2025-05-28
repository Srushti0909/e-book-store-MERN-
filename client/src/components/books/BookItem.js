import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const BookItem = ({ book, isExplorePage }) => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [showDetails, setShowDetails] = useState(false);
  // Add local state to track likes
  const [localLikedBy, setLocalLikedBy] = useState(book.likedBy || []);
  const [isLiked, setIsLiked] = useState(false);

  const { likeBook, purchaseBook } = bookContext;
  const { isAuthenticated, user, updateUserStats } = authContext;
  const { setAlert } = alertContext;

  const { _id, title, author, description, image, category, price, isAvailable } = book;

  // Default image in case the book image is missing
  const defaultImage = "https://via.placeholder.com/350x500?text=Book+Cover";
  
  // Special image for Mars Protocol
  const getMarsImage = () => {
    if (title === "The Mars Protocol") {
      return "https://images.unsplash.com/photo-1614728894799-84fd1a4bce3e?q=80&w=1000";
    }
    return image || defaultImage;
  };

  // Special description for Mars Protocol
  const getBookDescription = () => {
    if (title === "The Mars Protocol") {
      return "When the first human colony on Mars goes silent, a team is sent to investigate. What they find will challenge everything we thought we knew about the red planet and humanity's place in the universe.";
    }
    return description || "No description available for this book.";
  };

  // Convert USD to INR (approximate exchange rate: 1 USD = 75 INR)
  const priceInINR = (price * 75).toFixed(0);

  // Update local state when book or user changes
  useEffect(() => {
    setLocalLikedBy(book.likedBy || []);
    setIsLiked(isAuthenticated && user && localLikedBy.includes(user._id));
  }, [book, user, isAuthenticated, localLikedBy]);

  const onLike = async () => {
    if (!isAuthenticated) {
      setAlert('Please log in to like books', 'danger');
      return;
    }

    // Optimistically update UI
    const userId = user._id;
    let updatedLikedBy;
    
    if (localLikedBy.includes(userId)) {
      // Unlike: remove user ID from likes
      updatedLikedBy = localLikedBy.filter(id => id !== userId);
      setIsLiked(false);
    } else {
      // Like: add user ID to likes
      updatedLikedBy = [...localLikedBy, userId];
      setIsLiked(true);
    }
    
    // Update local state immediately
    setLocalLikedBy(updatedLikedBy);
    
    // Call API
    await likeBook(_id);
  };

  const onPurchase = async () => {
    if (!isAuthenticated) {
      setAlert('Please log in to purchase books', 'danger');
      return;
    }
    
    // Ask for confirmation using a browser dialog
    const confirmPurchase = window.confirm(`Are you sure you want to purchase "${title}" for ₹${priceInINR}?`);
    
    if (!confirmPurchase) {
      return; // User canceled the purchase
    }
    
    // Show a processing message
    setAlert('Processing your purchase...', 'primary');
    
    const result = await purchaseBook(_id);
    
    if (result) {
      // Show success message
      setAlert(`Successfully purchased "${title}"!`, 'success');
      
      // Update user stats in real-time
      if (result.purchasedBooks) {
        updateUserStats(result.purchasedBooks, null);
      }
    } else {
      // Show error message
      setAlert('Purchase failed. Please try again.', 'danger');
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Render buttons based on whether this is the explore page or not
  const renderButtons = () => {
    if (isExplorePage) {
      // On Explore page, always show View/Hide Details button
      return (
        <div className='buttons'>
          {isAuthenticated && (
            <button onClick={onLike} className='btn btn-light'>
              <i 
                className={`fas fa-heart ${isLiked ? 'text-danger' : ''}`} 
                style={{ color: isLiked ? '#e74c3c' : 'inherit' }}
              ></i>
              <span style={{ marginLeft: '5px', fontSize: '0.8rem' }}>
                {localLikedBy.length}
              </span>
            </button>
          )}
          <button 
            className='btn btn-primary' 
            onClick={toggleDetails}
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      );
    } else {
      // On other pages like Buy, show purchase options when authenticated
      return (
        <div className='buttons'>
          {isAuthenticated ? (
            <>
              <button onClick={onLike} className='btn btn-light'>
                <i 
                  className={`fas fa-heart ${isLiked ? 'text-danger' : ''}`} 
                  style={{ color: isLiked ? '#e74c3c' : 'inherit' }}
                ></i>
                <span style={{ marginLeft: '5px', fontSize: '0.8rem' }}>
                  {localLikedBy.length}
                </span>
              </button>
              {isAvailable ? (
                <button onClick={onPurchase} className='btn btn-primary' disabled={!isAvailable}>
                  Purchase
                </button>
              ) : (
                <button className='btn btn-dark' disabled>
                  Sold
                </button>
              )}
            </>
          ) : (
            <button 
              className='btn btn-primary' 
              onClick={toggleDetails}
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className='book-card'>
      <img 
        src={getMarsImage()} 
        alt={title} 
        onError={(e) => {e.target.src = defaultImage}} 
      />
      <h3>{title}</h3>
      <p className='author'>by {author}</p>
      
      <div style={{ marginTop: '0.5rem' }}>
        {category && category.name && (
          <span className='genre'>{category.name}</span>
        )}
      </div>
      
      <p className='price'>₹{priceInINR}</p>
      
      {showDetails && (
        <div className="book-details" style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#f9f9f9', 
          borderRadius: '5px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Description:</h4>
          <p>{getBookDescription()}</p>
        </div>
      )}
      
      {renderButtons()}
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  isExplorePage: PropTypes.bool
};

BookItem.defaultProps = {
  isExplorePage: false
};

export default BookItem; 