const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require("../controllers/campgrounds");
const { loginRequired, validateCampground, isAuthor } = require('../middleware');

router.get('/', catchAsync(campgrounds.index));

router.get('/new', loginRequired, campgrounds.renderNewForm);

router.post('/', loginRequired, validateCampground, catchAsync(campgrounds.create));

router.get('/:id', catchAsync(campgrounds.show));

router.get('/:id/edit', loginRequired, isAuthor, catchAsync(campgrounds.renderEditForm));

router.put('/:id', loginRequired, isAuthor, validateCampground, catchAsync(campgrounds.update));

router.delete('/:id', loginRequired, isAuthor, catchAsync(campgrounds.delete));

module.exports = router;