let CATEGORY = require('../models/category');


exports.ADD_CATEGORY = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.name || !BODY_DATA.description) {
            throw new Error("PLESE ENTER ALL THE FIELDS");
        }


        let CATEGORY_DATA = await CATEGORY.create(BODY_DATA)


        res.status(201).json({
            message: "CATEGORY CREATED SUCESSFULLY",
            DATA: CATEGORY_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ONE_CATEGORY = async function (req, res, next) {

    try {

        let CATEGORY_ID = req.params.id;

        let ONE_CATEGORY = await CATEGORY.findById({ _id: CATEGORY_ID });

        res.status(201).json({
            message: "SINGLE CATEGORY FETCH SUCESSFULLY",
            DATA: ONE_CATEGORY
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.ALL_CATEGORY = async function (req, res, next) {

    try {

        let ALL_CATEGORY = await CATEGORY.find();

        res.status(201).json({
            message: "ALL CATEGORY FETCH SUCESSFULLY",
            DATA: ALL_CATEGORY
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.UPDATE_CATEGORY = async function (req, res, next) {

    try {

        let CATEGORY_ID = req.params.id;
        let UPDATE = req.body;

        let UPDATE_DATA = await CATEGORY.findByIdAndUpdate(CATEGORY_ID, UPDATE, { new: true });

        res.status(201).json({
            message: "CATEGORY UPDATE SUCESSFULLY",
            DATA: UPDATE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.DELETE_CATEGORY = async function (req, res, next) {

    try {

        let CATEGORY_ID = req.params.id;

        let DELETE_DATA = await CATEGORY.findByIdAndDelete({ _id: CATEGORY_ID });

        res.status(201).json({
            message: "CATEGORY DELETE SUCESSFULLY",
            DATA: DELETE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}