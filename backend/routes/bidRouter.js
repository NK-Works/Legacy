const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const verifyToken = require('../middleware/verifyToken');

router.delete('/:id', verifyToken, bidController.delete);

module.exports = router;
