const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');

router.put('/:id', verifyToken, reviewController.update);
router.delete('/:id', verifyToken, reviewController.delete);
router.get('/user/:userId', reviewController.getAllForUser);

module.exports = router;
