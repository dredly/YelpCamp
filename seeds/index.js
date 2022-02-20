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
    for (let i = 0; i < 350; i++) {
        const random999 = Math.floor(Math.random() * 999);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '62017a071086ebc2b80d1a55',
            location: `${cities[random999].city}, ${cities[random999].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random999].longitude,
                    cities[random999].latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta interdum mauris, non iaculis augue tempor efficitur. Nulla magna ex, iaculis luctus porttitor id, convallis eu turpis. In eleifend enim vitae quam eleifend, a laoreet lorem tempus. Fusce condimentum tincidunt metus, euismod dapibus felis commodo in. Vivamus tempor lectus ut eleifend euismod. Aliquam erat volutpat. Morbi nibh enim, consectetur vitae lobortis sed, pretium vel neque. In hac habitasse platea dictumst. Integer non lacus mauris. Pellentesque ac sapien gravida mauris fringilla congue.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1644970571/YelpCamp/l5lubaqxexpht2tco3yz.jpg',
                    filename: 'YelpCamp/l5lubaqxexpht2tco3yz',
                },
                {
                    url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1644970571/YelpCamp/abzm56kqtstj0llumpiz.jpg',
                    filename: 'YelpCamp/abzm56kqtstj0llumpiz',
                },
                {
                    url: 'https://res.cloudinary.com/doemj9gq6/image/upload/v1644970571/YelpCamp/fz1smm7waazjxrxsgsru.jpg',
                    filename: 'YelpCamp/fz1smm7waazjxrxsgsru',
                },
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});