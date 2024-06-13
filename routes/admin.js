var express = require('express');
var router = express.Router();
var ADMIN_CONTROLLER = require('../controllers/admin');

router.post('/signup', ADMIN_CONTROLLER.ADMIN_SIGNUP);

router.post('/login', ADMIN_CONTROLLER.ADMIN_LOGIN);

router.get('/:id', ADMIN_CONTROLLER.ADMIN_ONE);

router.get('/', ADMIN_CONTROLLER.ADMIN_ALL);

router.put('/:id', ADMIN_CONTROLLER.ADMIN_UPDATE);

router.delete('/:id', ADMIN_CONTROLLER.ADMIN_DELETE);

module.exports = router;
