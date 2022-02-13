const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const reviews = require("../controllers/reviews");
const { validateReview, loginRequired, isReviewAuthor } = require('../middleware');

router.post('/', loginRequired, validateReview, catchAsync(reviews.create));

router.delete('/:reviewId', loginRequired, isReviewAuthor, catchAsync(reviews.delete))

module.exports = router;