const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CART_SCHEMA = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        require: true
    }
})

let CART_DATA = mongoose.model('cart', CART_SCHEMA);

module.exports = CART_DATA;