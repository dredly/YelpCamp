if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const _ = require('underscore');
const cities = require('./cities')
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const possibleImages = [
    {
        url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1645402115/YelpCamp/jamie-hagan-RWzPBcWVdpw-unsplash_v88vsd.jpg',
        filename: 'YelpCamp/jamie-hagan-RWzPBcWVdpw-unsplash_v88vsd'
    },
    {
        url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1645402116/YelpCamp/jeremy-bishop-dR_q93lfaTw-unsplash_xbn6tv.jpg',
        filename: 'jeremy-bishop-dR_q93lfaTw-unsplash_xbn6tv'
    },
    {
        url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1645402118/YelpCamp/bailey-zindel-NRQV-hBF10M-unsplash_lxyfvv.jpg',
        filename: 'bailey-zindel-NRQV-hBF10M-unsplash_lxyfvv'
    },
    {
        url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1645402122/YelpCamp/kalen-emsley-Bkci_8qcdvQ-unsplash_s28kj8.jpg',
        filename: 'kalen-emsley-Bkci_8qcdvQ-unsplash_s28kj8'
    },
];

const citiesSample = _.sample(cities, 350);

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let city of citiesSample) {
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '62129b01b6be2632d88b3084',
            location: `${city.city}, ${city.state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    city.longitude,
                    city.latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta interdum mauris, non iaculis augue tempor efficitur. Nulla magna ex, iaculis luctus porttitor id, convallis eu turpis. In eleifend enim vitae quam eleifend, a laoreet lorem tempus. Fusce condimentum tincidunt metus, euismod dapibus felis commodo in. Vivamus tempor lectus ut eleifend euismod. Aliquam erat volutpat. Morbi nibh enim, consectetur vitae lobortis sed, pretium vel neque. In hac habitasse platea dictumst. Integer non lacus mauris. Pellentesque ac sapien gravida mauris fringilla congue.',
            price,
            images: _.sample(possibleImages, 2)
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});