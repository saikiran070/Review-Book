const Book = require('../models/Book');

// Add a new book
const addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all books with pagination
const getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  try {
    const books = await Book.find({ author, genre })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get book details by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBook, getBooks, getBookById };
