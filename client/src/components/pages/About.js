import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <div className="container">
        <h1 style={{ marginTop: '5rem', marginBottom: '2rem', textAlign: 'center' }}>About ReadRecycle</h1>
        
        <div className="about">
          <div>
            <h2>Our Story</h2>
            <p style={{ textAlign: 'justify' }}>
              ReadRecycle was founded in 2020 by book enthusiast Alex Chen with a simple but revolutionary idea:
              What if readers could get back most of their money when they're done with a book?
            </p>
            <p style={{ textAlign: 'justify' }}>
              As an avid reader, Alex was frustrated with the high costs of e-books and the fact that once purchased,
              they sat unused in digital libraries. He envisioned a platform where readers could purchase books, 
              enjoy them, and then "return" them for most of their money back - creating a sustainable cycle of reading.
            </p>
            <p style={{ textAlign: 'justify' }}>
              This led to the creation of ReadRecycle's signature 90% buyback program, which has helped thousands of 
              readers expand their literary horizons without breaking the bank.
            </p>
            
            <h2 style={{ marginTop: '2rem' }}>Our Mission</h2>
            <p style={{ textAlign: 'justify' }}>
              At ReadRecycle, we believe that knowledge should be accessible and affordable for everyone. Our mission is to:
            </p>
            
            <div className="mission-points" style={{ marginTop: '1.5rem' }}>
              <div className="mission-point" style={{ 
                background: 'white', 
                padding: '1rem 1.5rem', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fas fa-book" style={{ color: 'var(--primary-color)', marginRight: '1rem', fontSize: '1.2rem' }}></i>
                <span>Promote reading and learning by making books more affordable</span>
              </div>
              
              <div className="mission-point" style={{ 
                background: 'white', 
                padding: '1rem 1.5rem', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fas fa-recycle" style={{ color: 'var(--secondary-color)', marginRight: '1rem', fontSize: '1.2rem' }}></i>
                <span>Create a sustainable model for digital content consumption</span>
              </div>
              
              <div className="mission-point" style={{ 
                background: 'white', 
                padding: '1rem 1.5rem', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fas fa-users" style={{ color: 'var(--primary-color)', marginRight: '1rem', fontSize: '1.2rem' }}></i>
                <span>Build a community of readers who can share their experiences</span>
              </div>
              
              <div className="mission-point" style={{ 
                background: 'white', 
                padding: '1rem 1.5rem', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fas fa-globe" style={{ color: 'var(--secondary-color)', marginRight: '1rem', fontSize: '1.2rem' }}></i>
                <span>Make quality literature accessible to everyone regardless of budget constraints</span>
              </div>
            </div>
            
            <h2 style={{ marginTop: '2rem' }}>The 90% Resale Benefit</h2>
            <p style={{ textAlign: 'justify' }}>
              Our unique 90% buyback program works on a simple principle: when you're done with a book, you can "sell" it back to us for 90% of your purchase price.
              This encourages more reading while keeping costs low for our users.
            </p>
            <p style={{ textAlign: 'justify' }}>
              We can offer this generous resale benefit because e-books are digital assets that can be transferred between users without degradation.
              This system creates a sustainable cycle where books circulate among readers, maximizing the value of each title.
            </p>
          </div>
          
          <div>
            <div style={{ background: '#f5f5f5', padding: '2rem', borderRadius: '5px', marginBottom: '2rem' }}>
              <h3>Founded</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2020</p>
              
              <h3 style={{ marginTop: '1.5rem' }}>Founder</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Alex Chen</p>
              
              <h3 style={{ marginTop: '1.5rem' }}>Books Available</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>10,000+</p>
              
              <h3 style={{ marginTop: '1.5rem' }}>Readers Served</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>50,000+</p>
            </div>
            
            <div className="join-revolution" style={{ 
              padding: '2rem', 
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              borderRadius: '5px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              transform: 'translateZ(0)',
              marginBottom: '2rem'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                zIndex: 1
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ marginBottom: '1rem' }}>Join The Reading Revolution</h2>
                <p style={{ fontSize: '1.1rem' }}>
                  Experience the ReadRecycle difference today and see how our 90% buyback program can transform your reading habits.
                </p>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Books on a shelf" 
              style={{ width: '100%', borderRadius: '5px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 