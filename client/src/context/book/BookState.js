import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import {
  GET_BOOKS,
  GET_BOOK,
  BOOK_ERROR,
  SET_LOADING,
  CLEAR_BOOKS,
  LIKE_BOOK,
  PURCHASE_BOOK,
  SELL_BOOK,
  GET_CATEGORIES
} from '../types';

const BookState = props => {
  const initialState = {
    books: [],
    book: null,
    categories: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Get all books
  const getBooks = async () => {
    setLoading();

    try {
      const res = await axios.get('/api/books');

      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Get available books
  const getAvailableBooks = async () => {
    setLoading();

    try {
      const res = await axios.get('/api/books/available');

      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Get book by ID
  const getBook = async id => {
    setLoading();

    try {
      const res = await axios.get(`/api/books/${id}`);

      dispatch({
        type: GET_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Like/Unlike book
  const likeBook = async id => {
    try {
      const res = await axios.put(`/api/books/like/${id}`);

      dispatch({
        type: LIKE_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Purchase book
  const purchaseBook = async id => {
    try {
      const res = await axios.post(`/api/books/purchase/${id}`);

      dispatch({
        type: PURCHASE_BOOK,
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Sell book
  const sellBook = async id => {
    try {
      const res = await axios.post(`/api/books/sell/${id}`);

      dispatch({
        type: SELL_BOOK,
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Get categories
  const getCategories = async () => {
    try {
      const res = await axios.get('/api/books/categories');

      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Clear books
  const clearBooks = () => dispatch({ type: CLEAR_BOOKS });

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        book: state.book,
        categories: state.categories,
        loading: state.loading,
        error: state.error,
        getBooks,
        getAvailableBooks,
        getBook,
        likeBook,
        purchaseBook,
        sellBook,
        getCategories,
        clearBooks
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState; 