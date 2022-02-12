const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { loginRequired, validateCampground, isAuthor } = require('../middleware');

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

router.get('/new', loginRequired, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', loginRequired, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    console.log(campground);
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}))

router.get('/:id/edit', loginRequired, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', loginRequired, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const authorisedCampground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${authorisedCampground._id}`);
}))

router.delete('/:id', loginRequired, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
}))

module.exports = router;