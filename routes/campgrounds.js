const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require("../controllers/campgrounds");
const { loginRequired, validateCampground, isAuthor } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(loginRequired, validateCampground, catchAsync(campgrounds.create));

router.get('/new', loginRequired, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(loginRequired, isAuthor, validateCampground, catchAsync(campgrounds.update))
    .delete(loginRequired, isAuthor, catchAsync(campgrounds.delete));

router.get('/:id/edit', loginRequired, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;