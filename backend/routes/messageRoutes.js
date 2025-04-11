const express = require('express');
const messageController = require('../controllers/messageController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.get('/:userId', authenticate, messageController.getMessages);
router.post('/', authenticate, messageController.sendMessage);

module.exports = router;