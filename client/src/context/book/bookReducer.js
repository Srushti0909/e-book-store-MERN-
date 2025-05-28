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

const bookReducer = (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case LIKE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book._id === action.payload._id ? action.payload : book
        ),
        loading: false
      };
    case PURCHASE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book._id === action.payload._id ? { ...book, isAvailable: false } : book
        ),
        loading: false
      };
    case SELL_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book._id === action.payload._id ? { ...book, isAvailable: true } : book
        ),
        loading: false
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        books: [],
        book: null,
        loading: false
      };
    default:
      return state;
  }
};

export default bookReducer; 