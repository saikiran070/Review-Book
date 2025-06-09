const express = require('express');
const { submitReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../config/auth');
const router = express.Router();

router.post('/books/:id/reviews', protect, submitReview);
router.put('/reviews/:id', protect, updateReview);
router.delete('/reviews/:id', protect, deleteReview);

module.exports = router;
