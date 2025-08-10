const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, chatController.getUserChats);

module.exports = router;
