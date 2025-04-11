const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authenticate, userController.getCurrentUser);
router.get('/users', authenticate, userController.getUsers);

module.exports = router;