let USER = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "sahildiyora123@gmail.com",
        pass: "huegyjchobapmbvn",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'sahildiyora123@gmail.com', // sender address
        to: email, // list of receivers
        subject: "HELLO E COMMERCE", // Subject line
        // text: "Hello world?", // plain text body
        html: "<h1> THIS IS E COMMERCE API PROJECT </h1>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

exports.USER_SINUP = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.name || !BODY_DATA.email || !BODY_DATA.password || !BODY_DATA.confirm_password || !BODY_DATA.mobile || !BODY_DATA.city) {
            throw new Error("PLESE ENTER ALL THE FIELDS");
        }

        if (BODY_DATA.password != BODY_DATA.confirm_password) {
            throw new Error("PASSWORD AND CONFIRM PASSWORD ARE NOT SAME");
        }

        BODY_DATA.password = await bcrypt.hash(BODY_DATA.password, 10)


        let USER_DATA = await USER.create(BODY_DATA)

        // NODE MAILER //

        main(USER_DATA.email)

        let TOKEN = await jwt.sign({ user_key: USER_DATA._id }, 'USER')


        res.status(201).json({
            message: "USER CREATED SUCESSFULLY",
            USER_DATA,
            TOKEN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.USER_LOGIN = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.email || !BODY_DATA.password) {
            throw new Error("PLESE ENTER ALL THE FIELDS !");
        }

        let CHEAK_USER = await USER.findOne({ email: BODY_DATA.email });

        if (!CHEAK_USER) {
            throw new Error("USER NOT FOUND !");
        }

        // TRUE - FALSE // ANS IN BOOLEAN VALUE //

        let CHEAK_PASS = await bcrypt.compare(BODY_DATA.password, CHEAK_USER.password)

        if (!CHEAK_PASS) {
            throw new Error("PASSWORD IS WRONG !");
        }

        res.status(201).json({
            message: "USER LOG IN SUCESSFULLY"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.USER_ONE = async function (req, res, next) {

    try {

        let USER_ID = req.params.id;

        let ONE_USER = await USER.findById({ _id: USER_ID });

        res.status(201).json({
            message: "SINGLE USER FETCH SUCESSFULLY",
            DATA: ONE_USER
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.USER_ALL = async function (req, res, next) {

    try {

        let ALL_USER = await USER.find();

        res.status(201).json({
            message: "ALL USER FETCH SUCESSFULLY",
            DATA: ALL_USER
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.USER_UPDATE = async function (req, res, next) {

    try {

        let USER_ID = req.params.id;
        let UPDATE = req.body;

        UPDATE.password = await bcrypt.hash(UPDATE.password, 10)

        let UPDATE_DATA = await USER.findByIdAndUpdate(USER_ID, UPDATE, { new: true });

        res.status(201).json({
            message: "USER UPDATE SUCESSFULLY",
            DATA: UPDATE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.USER_DELETE = async function (req, res, next) {

    try {

        let USER_ID = req.params.id;

        let DELETE_DATA = await USER.findByIdAndDelete({ _id: USER_ID });

        res.status(201).json({
            message: "USER DELETE SUCESSFULLY",
            DATA: DELETE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}