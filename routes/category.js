var express = require('express');
var router = express.Router();
var CATEGORY_CONTROLLER = require('../controllers/category');
var JWT_ADMIN = require('../controllers/jwt');


router.post('/add', JWT_ADMIN.ADMIN_SECURE, CATEGORY_CONTROLLER.ADD_CATEGORY);

router.get('/:id', CATEGORY_CONTROLLER.ONE_CATEGORY);

router.get('/', CATEGORY_CONTROLLER.ALL_CATEGORY);

router.put('/:id', JWT_ADMIN.ADMIN_SECURE, CATEGORY_CONTROLLER.UPDATE_CATEGORY);

router.delete('/:id', JWT_ADMIN.ADMIN_SECURE, CATEGORY_CONTROLLER.DELETE_CATEGORY);

module.exports = router;
