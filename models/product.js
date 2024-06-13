const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PRODUCT_SCHEMA = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    discountPercentage: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
})

let PRODUCT_DATA = mongoose.model('product', PRODUCT_SCHEMA);

module.exports = PRODUCT_DATA;