var jwt = require('jsonwebtoken');
let USER = require('../models/user');
let ADMIN = require('../models/admin');


exports.ADMIN_SECURE = async function (req, res, next) {

    try {

        let TOKEN = req.headers.authorization;

        if (!TOKEN) {
            throw new Error("PLESE ATTECH THE TOKEN");
        }

        let CHEAK_TOKEN = await jwt.verify(TOKEN, 'ADMIN');

        let CHEAK_ADMIN = await ADMIN.findById({ _id: CHEAK_TOKEN.admin_key });

        if (!CHEAK_ADMIN) {
            throw new Error("ADMIN NOT FOUND FOR THIS TOKEN OR INVALID TOKEN")
        }

        next()

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.USER_SECURE = async function (req, res, next) {

    try {

        let TOKEN = req.headers.authorization;

        if (!TOKEN) {
            throw new Error("PLESE ATTECH THE TOKEN");
        }

        let CHEAK_TOKEN = await jwt.verify(TOKEN, 'USER');

        let CHEAK_USER = await USER.findById({ _id: CHEAK_TOKEN.user_key });

        if (!CHEAK_USER) {
            throw new Error('USER NOT FOUND FOR THIS TOKEN OR INVALID TOKEN');
        }

        next()

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}