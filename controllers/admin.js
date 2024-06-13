let ADMIN = require('../models/admin');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.ADMIN_SIGNUP = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.email || !BODY_DATA.password || !BODY_DATA.confirm_password) {
            throw new Error("PLESE ENTER ALL THE FIELDS");
        }

        if (BODY_DATA.password != BODY_DATA.confirm_password) {
            throw new Error("PASSWORD AND CONFIRM PASSWORD ARE NOT SAME");
        }

        BODY_DATA.password = await bcrypt.hash(BODY_DATA.password, 10)


        let ADMIN_DATA = await ADMIN.create(BODY_DATA)

        let TOKEN = await jwt.sign({ admin_key: ADMIN_DATA._id }, 'ADMIN');

        res.status(201).json({
            message: "ADMIN CREATED SUCESSFULLY",
            ADMIN_DATA,
            TOKEN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ADMIN_LOGIN = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.email || !BODY_DATA.password) {
            throw new Error("PLESE ENTER ALL THE FIELDS !");
        }

        let CHEAK_USER = await ADMIN.findOne({ email: BODY_DATA.email });

        if (!CHEAK_USER) {
            throw new Error("USER NOT FOUND !");
        }

        // TRUE - FALSE // ANS IN BOOLEAN VALUE //

        let CHEAK_PASS = await bcrypt.compare(BODY_DATA.password, CHEAK_USER.password)

        if (!CHEAK_PASS) {
            throw new Error("PASSWORD IS WRONG !");
        }

        res.status(201).json({
            message: "ADMIN LOG IN SUCESSFULLY"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ADMIN_ONE = async function (req, res, next) {

    try {

        let ADMIN_ID = req.params.id;
        let ONE_ADMIN = await ADMIN.findById({ _id: ADMIN_ID })

        res.status(201).json({
            message: "SINGLE ADMIN FETCH SUCESSFULLY",
            DATA: ONE_ADMIN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ADMIN_ALL = async function (req, res, next) {

    try {

        let ALL_ADMIN = await ADMIN.find();

        res.status(201).json({
            message: "ALL ADMIN FETCH SUCESSFULLY",
            DATA: ALL_ADMIN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ADMIN_UPDATE = async function (req, res, next) {

    try {

        let ADMIN_ID = req.params.id;
        let UPDATE = req.body;

        UPDATE.password = await bcrypt.hash(UPDATE.password, 10)

        let UPDATE_DATA = await ADMIN.findByIdAndUpdate(ADMIN_ID, UPDATE, { new: true });

        res.status(201).json({
            message: "ADMIN UPDATE SUCESSFULLY",
            DATA: UPDATE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ADMIN_DELETE = async function (req, res, next) {

    try {

        let ADMIN_ID = req.params.id;

        let DELETE_DATA = await ADMIN.findByIdAndDelete({ _id: ADMIN_ID });

        res.status(201).json({
            message: "ADMIN DELETE SUCESSFULLY",
            DATA: DELETE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}