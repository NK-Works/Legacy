const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/me', verifyToken, userController.getMe);
router.get('/:id', userController.getById);
router.put('/me', verifyToken, userController.updateMe);
router.delete('/me', verifyToken, userController.deleteMe);

module.exports = router;
