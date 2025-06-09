const Review = require('../models/Review');
const Book = require('../models/Book');

// Submit a review
const submitReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = new Review({
      book: req.params.id,
      user: req.user.id,
      rating,
      comment,
    });

    await review.save();
    const book = await Book.findById(req.params.id);
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitReview, updateReview, deleteReview };
