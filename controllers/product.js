let PRODUCT = require('../models/product');

exports.ADD_PRODUCT = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        BODY_DATA.images = req.files.map(el => el.filename);

        if (!BODY_DATA.title || !BODY_DATA.description || !BODY_DATA.price || !BODY_DATA.discountPercentage || !BODY_DATA.rating || !BODY_DATA.stock || !BODY_DATA.brand || !BODY_DATA.images || !BODY_DATA.category_id) {
            throw new Error("PLESE ENTER ALL THE FIELDS");
        }


        let PRODUCT_DATA = await PRODUCT.create(BODY_DATA)


        res.status(201).json({
            message: "PRODUCT CREATED SUCESSFULLY",
            DATA: PRODUCT_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ONE_PRODUCT = async function (req, res, next) {

    try {

        let PRODUCT_ID = req.params.id;

        let ONE_PRODUCT = await PRODUCT.findById({ _id: PRODUCT_ID }).populate('category_id');

        res.status(201).json({
            message: "SINGLE PRODUCT FETCH SUCESSFULLY",
            DATA: ONE_PRODUCT
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ALL_PRODUCT = async function (req, res, next) {

    try {

        let ALL_PRODUCT = await PRODUCT.find().populate('category_id');

        res.status(201).json({
            message: "ALL PRODUCT FETCH SUCESSFULLY",
            DATA: ALL_PRODUCT
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.UPDATE_PRODUCT = async function (req, res, next) {

    try {

        let PRODUCT_ID = req.params.id;
        let UPDATE = req.body;

        if (req.files && req.files.map(el => el.filename)) {
            UPDATE.images = req.files.map(el => el.filename)
        }

        let UPDATE_DATA = await PRODUCT.findByIdAndUpdate(PRODUCT_ID, UPDATE, { new: true });


        res.status(201).json({
            message: "PRODUCT UPDATE SUCESSFULLY",
            DATA: UPDATE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.DELETE_PRODUCT = async function (req, res, next) {

    try {

        let PRODUCT_ID = req.params.id;

        let DELETE_DATA = await PRODUCT.findByIdAndDelete({ _id: PRODUCT_ID });

        res.status(201).json({
            message: "PRODUCT DELETE SUCESSFULLY",
            DATA: DELETE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}
