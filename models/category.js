const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CATEGORY_SCHEMA = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    }
})

let CATEGORY_DATA = mongoose.model('category', CATEGORY_SCHEMA);

module.exports = CATEGORY_DATA;