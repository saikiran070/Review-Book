const express = require('express');
const { addBook, getBooks, getBookById } = require('../controllers/bookController');
const { protect } = require('../config/auth');
const router = express.Router();

router.post('/books', protect, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);

module.exports = router;
