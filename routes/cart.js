var express = require('express');
var router = express.Router();
var CART_CONTROLLER = require('../controllers/cart');
var JWT_USER = require('../controllers/jwt');

router.post('/create', JWT_USER.USER_SECURE, CART_CONTROLLER.CREATE_CART);

router.get('/:id', CART_CONTROLLER.ONE_CART);

router.get('/', CART_CONTROLLER.ALL_CART);

router.put('/:id', JWT_USER.USER_SECURE, CART_CONTROLLER.UPDATE_CART);

router.delete('/:id', JWT_USER.USER_SECURE, CART_CONTROLLER.DELETE_CART);

module.exports = router;
