const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utilis/catchAsync');
const reviews = require('../controllers/reviews')
const ExpressError = require('../utilis/ExpressError');
const {reviewSchema} = require('../schemas.js');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware')



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;