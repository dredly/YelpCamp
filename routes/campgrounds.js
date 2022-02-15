const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require("../controllers/campgrounds");
const { loginRequired, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(loginRequired, validateCampground, catchAsync(campgrounds.create));
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send('Somehow it worked');
    })

router.get('/new', loginRequired, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(loginRequired, isAuthor, validateCampground, catchAsync(campgrounds.update))
    .delete(loginRequired, isAuthor, catchAsync(campgrounds.delete));

router.get('/:id/edit', loginRequired, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;