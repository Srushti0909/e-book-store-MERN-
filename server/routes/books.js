const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');
const User = require('../models/User');
const Category = require('../models/Category');

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a category - Admin route in a real app
router.post('/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all books (for Explore page)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('category', 'name');
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get available books (for Buy page)
router.get('/available', async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true }).populate('category', 'name');
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category', 'name');
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Create a book - Admin route in a real app
router.post('/', async (req, res) => {
  try {
    const { title, author, description, image, category, price } = req.body;
    
    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ msg: 'Category not found' });
    }
    
    const book = new Book({
      title,
      author,
      description,
      image,
      category,
      price
    });
    
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Like/Unlike a book
router.put('/like/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    // Check if the book has already been liked
    const user = await User.findById(req.user.id);
    
    if (user.likedBooks.includes(book._id)) {
      // Unlike
      user.likedBooks = user.likedBooks.filter(
        bookId => bookId.toString() !== book._id.toString()
      );
      
      book.likedBy = book.likedBy.filter(
        userId => userId.toString() !== req.user.id
      );
    } else {
      // Like
      user.likedBooks.push(book._id);
      book.likedBy.push(req.user.id);
    }
    
    await user.save();
    await book.save();
    
    res.json({ likedBooks: user.likedBooks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Purchase a book
router.post('/purchase/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    if (!book.isAvailable) {
      return res.status(400).json({ msg: 'Book is not available for purchase' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Update book status
    book.isAvailable = false;
    book.purchasedBy = user._id;
    
    // Add to user's purchased books
    user.purchasedBooks.push({
      book: book._id,
      purchaseDate: Date.now()
    });
    
    await book.save();
    await user.save();
    
    res.json({ msg: 'Book purchased successfully', purchasedBooks: user.purchasedBooks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Sell a book
router.post('/sell/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Check if user owns the book
    const purchasedBook = user.purchasedBooks.find(
      item => item.book.toString() === book._id.toString()
    );
    
    if (!purchasedBook) {
      return res.status(400).json({ msg: 'You do not own this book' });
    }
    
    // Update book status
    book.isAvailable = true;
    book.purchasedBy = null;
    
    // Remove from user's purchased books
    user.purchasedBooks = user.purchasedBooks.filter(
      item => item.book.toString() !== book._id.toString()
    );
    
    // Add to user's sold books
    user.soldBooks.push({
      book: book._id,
      saleDate: Date.now()
    });
    
    await book.save();
    await user.save();
    
    res.json({ msg: 'Book sold successfully', purchasedBooks: user.purchasedBooks, soldBooks: user.soldBooks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 