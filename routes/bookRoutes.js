const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks
} = require('../controllers/bookcontroller');

router.post('/books', auth, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/search', searchBooks);

module.exports = router;
