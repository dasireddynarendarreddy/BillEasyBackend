const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const books = await Book.find()
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limitNum);

    res.json({
      books,
      totalPages,
      currentPage: pageNum,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getBookById = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: book._id })
      .populate('user', 'name') // optional: populate user info
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const avgRatingData = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);

    const averageRating = avgRatingData.length ? avgRatingData[0].averageRating : 0;

    res.json({
      ...book.toObject(),
      reviews,
      averageRating
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assuming Express app and Book model already set up

exports.searchBooks=async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Case-insensitive partial match on "title"
    // Using regex with "i" flag for case-insensitive search
    const regex = new RegExp(`\\b${query.trim()}`, 'i'); 
// \\b means word boundary
const books = await Book.find({ title: regex });

    res.json({ books });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

