const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

router.get('/', async (req, res) => {
    const allCampgrounds = await Campground.find({});
    const allGeodata = allCampgrounds.map(camp => {
        return {
            type: "feature",
            properties: {
                _id: camp._id,
                popUpMarkup: camp.properties.popUpMarkup
            },
            geometry: camp.geometry
        };
    })
    res.json({ features: allGeodata });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.json({
        title: campground.title,
        location: campground.location,
        coordinates: campground.geometry.coordinates
    });
})

module.exports = router;