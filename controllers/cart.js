let CART = require('../models/cart');

exports.CREATE_CART = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.user_id || !BODY_DATA.category_id || !BODY_DATA.product_id) {
            throw new Error("PLESE ENTER ALL THE FIELDS");
        }


        let CART_DATA = await CART.create(BODY_DATA)


        res.status(201).json({
            message: "CART CREATED SUCESSFULLY",
            DATA: CART_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ONE_CART = async function (req, res, next) {

    try {

        let CART_ID = req.params.id;

        let ONE_CART = await CART.findById({ _id: CART_ID }).populate(['user_id', 'category_id', 'product_id']);

        res.status(201).json({
            message: "SINGLE CART FETCH SUCESSFULLY",
            DATA: ONE_CART
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ALL_CART = async function (req, res, next) {

    try {

        let ALL_CART = await CART.find().populate(['user_id', 'category_id', 'product_id']);

        res.status(201).json({
            message: "ALL CART FETCH SUCESSFULLY",
            DATA: ALL_CART
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.UPDATE_CART = async function (req, res, next) {

    try {

        let CART_ID = req.params.id;
        let UPDATE = req.body;

        let UPDATE_DATA = await CART.findByIdAndUpdate(CART_ID, UPDATE, { new: true });

        res.status(201).json({
            message: "CART UPDATE SUCESSFULLY",
            DATA: UPDATE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.DELETE_CART = async function (req, res, next) {

    try {

        let CART_ID = req.params.id;

        let DELETE_DATA = await CART.findByIdAndDelete({ _id: CART_ID });

        res.status(201).json({
            message: "CART DELETE SUCESSFULLY",
            DATA: DELETE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}