const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const opts = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
};

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href=\\"/campgrounds/${this._id}\\">${this.title}</a></strong><p>${this.description.substring(0, 20)}...</p>`;
})

CampgroundSchema.virtual('avgStars').get(function () {
    if (!this.reviews.length) return 0;
    const reviewScores = this.reviews.map(rv => rv.rating);
    return reviewScores.reduce((a, b) => a + b) / reviewScores.length;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);