import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Explore from './components/pages/Explore';
import Buy from './components/pages/Buy';
import Sell from './components/pages/Sell';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/pages/NotFound';
import MyBooks from './components/pages/MyBooks';

// Context
import AuthState from './context/auth/AuthState';
import BookState from './context/book/BookState';
import AlertState from './context/alert/AlertState';

function App() {
  return (
    <AuthState>
      <BookState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route 
                    path="/buy" 
                    element={
                      <PrivateRoute>
                        <Buy />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/sell" 
                    element={
                      <PrivateRoute>
                        <Sell />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/mybooks" 
                    element={
                      <PrivateRoute>
                        <MyBooks />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </AlertState>
      </BookState>
    </AuthState>
  );
}

export default App;
