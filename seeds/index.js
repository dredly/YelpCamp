const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta interdum mauris, non iaculis augue tempor efficitur. Nulla magna ex, iaculis luctus porttitor id, convallis eu turpis. In eleifend enim vitae quam eleifend, a laoreet lorem tempus. Fusce condimentum tincidunt metus, euismod dapibus felis commodo in. Vivamus tempor lectus ut eleifend euismod. Aliquam erat volutpat. Morbi nibh enim, consectetur vitae lobortis sed, pretium vel neque. In hac habitasse platea dictumst. Integer non lacus mauris. Pellentesque ac sapien gravida mauris fringilla congue.',
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});