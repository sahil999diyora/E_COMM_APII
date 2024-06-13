var express = require('express');
var router = express.Router();
var PRODUCT_CONTROLLER = require('../controllers/product');
const multer = require('multer');
var JWT_ADMIN = require('../controllers/jwt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/product')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/add', upload.array('images', 10), JWT_ADMIN.ADMIN_SECURE, PRODUCT_CONTROLLER.ADD_PRODUCT);

router.get('/', PRODUCT_CONTROLLER.ALL_PRODUCT);

router.get('/:id', PRODUCT_CONTROLLER.ONE_PRODUCT);

router.put('/:id', upload.array('images', 10), JWT_ADMIN.ADMIN_SECURE, PRODUCT_CONTROLLER.UPDATE_PRODUCT);

router.delete('/:id', JWT_ADMIN.ADMIN_SECURE, PRODUCT_CONTROLLER.DELETE_PRODUCT);

module.exports = router;
