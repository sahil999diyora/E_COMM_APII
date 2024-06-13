const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ADMIN_SCHEMA = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
})

let ADMIN_DATA = mongoose.model('admin', ADMIN_SCHEMA);

module.exports = ADMIN_DATA;