const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let USER_SCHEMA = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

let USER_DATA = mongoose.model('user', USER_SCHEMA);

module.exports = USER_DATA;