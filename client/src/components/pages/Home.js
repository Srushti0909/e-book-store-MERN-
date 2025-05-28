import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import UserProfile from '../layout/UserProfile';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page-container">
      {isAuthenticated && <UserProfile />}
      
      <section className="hero">
        <h1 className="tagline">Read More, Spend Less</h1>
        <p>Get 90% of your money back when you resell your e-books</p>
        <div>
          <Link to="/explore" className="btn btn-primary">Explore Books</Link>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-secondary">Join Now</Link>
          )}
        </div>
      </section>

      <section className="container">
        <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>How It Works</h2>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div className="box" style={{ textAlign: 'center', padding: '1rem' }}>
            <i className="fas fa-search fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <h3>Find Your Book</h3>
            <p>Browse our extensive collection of e-books across various categories and find your next read.</p>
          </div>
          <div className="box" style={{ textAlign: 'center', padding: '1rem' }}>
            <i className="fas fa-book-reader fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <h3>Enjoy Reading</h3>
            <p>Purchase and immerse yourself in the content of your chosen e-book.</p>
          </div>
          <div className="box" style={{ textAlign: 'center', padding: '1rem' }}>
            <i className="fas fa-exchange-alt fa-3x" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <h3>Resell for 90% Back</h3>
            <p>When you're done, resell your e-book and get 90% of your purchase price back.</p>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <h2>Customer Reviews</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>"This platform has revolutionized how I read! I can buy books, read them, and get most of my money back. It's like a library but better!"</p>
              <p className="author">- Sarah J.</p>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>"I was skeptical at first, but the 90% buyback is real. I've saved so much money while reading more books than ever."</p>
              <p className="author">- Michael T.</p>
            </div>
            <div className="review-card">
              <div className="stars">★★★★☆</div>
              <p>"Great selection of books and the process to sell back is very simple. Would definitely recommend to any avid reader."</p>
              <p className="author">- Priya K.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 