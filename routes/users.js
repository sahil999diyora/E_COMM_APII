var express = require('express');
var router = express.Router();
var USER_CONTROLLER = require('../controllers/user')

router.post('/signup', USER_CONTROLLER.USER_SINUP);

router.post('/login', USER_CONTROLLER.USER_LOGIN);

router.get('/:id', USER_CONTROLLER.USER_ONE);

router.get('/', USER_CONTROLLER.USER_ALL);

router.put('/:id', USER_CONTROLLER.USER_UPDATE);

router.delete('/:id', USER_CONTROLLER.USER_DELETE);


module.exports = router;
