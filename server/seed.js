const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Book = require('./models/Book');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Categories data
const categories = [
  { name: 'Fiction', description: 'Novels, short stories, and other fictional works' },
  { name: 'Non-Fiction', description: 'Factual works like biographies, history, and self-help' },
  { name: 'Science Fiction', description: 'Futuristic science-based fiction' },
  { name: 'Mystery', description: 'Suspenseful stories focused on solving mysteries' },
  { name: 'Business', description: 'Books about business, entrepreneurship, and finance' }
];

// Books data
const booksData = [
  {
    title: 'The Silent Echo',
    author: 'Maya Johnson',
    description: 'A haunting tale of a small town with a dark secret that has remained hidden for generations. When a young journalist returns to her hometown, she uncovers the truth that will change everything.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000',
    price: 14.99
  },
  {
    title: 'Beyond the Code',
    author: 'David Chen',
    description: 'A comprehensive guide to understanding the human elements of software engineering. This book explores how empathy, communication, and collaboration are just as important as technical skills.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000',
    price: 24.99
  },
  {
    title: 'Quantum Dreams',
    author: 'Sophia Rodriguez',
    description: 'In a world where dreams can be shared through quantum technology, a scientist discovers a way to enter the consciousness of others. But some secrets of the mind were never meant to be revealed.',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000',
    price: 19.99
  },
  {
    title: 'The Last Detective',
    author: 'James Mercer',
    description: 'Detective Alex Morgan is assigned to solve one final case before retirement - a series of impossible murders that seem to defy explanation. The answers may cost him everything.',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000',
    price: 16.99
  },
  {
    title: 'Start Small, Think Big',
    author: 'Jennifer Liu',
    description: 'A practical guide to building a successful business from the ground up. Learn how to turn limited resources into massive opportunities through strategic thinking and execution.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000',
    price: 22.99
  },
  {
    title: 'The Ocean Whispers',
    author: 'Robert Thompson',
    description: 'A beautiful and lyrical novel about a seaside community whose lives are transformed when a mysterious stranger washes ashore after a violent storm.',
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1000',
    price: 15.99
  },
  {
    title: 'Mindful Leadership',
    author: 'Sarah Kim',
    description: 'Discover how mindfulness practices can transform your leadership style and create a more productive, harmonious, and innovative workplace culture.',
    image: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?q=80&w=1000',
    price: 26.99
  },
  {
    title: 'The Mars Protocol',
    author: 'Michael Stevens',
    description: 'When the first human colony on Mars goes silent, a team is sent to investigate. What they find will challenge everything we thought we knew about the red planet and humanity\'s place in the universe.',
    image: 'https://images.unsplash.com/photo-1614728894799-84fd1a4bce3e?q=80&w=1000',
    price: 18.99
  },
  {
    title: 'Shadows in the Alley',
    author: 'Patricia Wright',
    description: 'A gripping thriller following detective Olivia Reed as she tracks a serial killer through the streets of Boston, only to discover a connection to her own troubled past.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000',
    price: 17.99
  }
];

// Function to clear database and seed with sample data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Book.deleteMany({});

    console.log('Previous data cleared');

    // Insert categories
    const savedCategories = await Category.insertMany(categories);
    console.log(`${savedCategories.length} categories inserted`);

    // Map categories to their MongoDB IDs
    const categoryMap = {};
    savedCategories.forEach(category => {
      categoryMap[category.name] = category._id;
    });

    // Assign categories to books
    const categoryNames = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Business'];
    const books = booksData.map((book, index) => {
      // Cycle through categories (0,1,2,3,4,0,1,2,3)
      const categoryName = categoryNames[index % categoryNames.length];
      return {
        ...book,
        category: categoryMap[categoryName],
        isAvailable: true
      };
    });

    // Insert books
    const savedBooks = await Book.insertMany(books);
    console.log(`${savedBooks.length} books inserted`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 