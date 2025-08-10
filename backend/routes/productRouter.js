const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const bidController = require('../controllers/bidController');
const reviewController = require('../controllers/reviewController');
const productLikeController = require('../controllers/productLikeController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', verifyToken, productController.create);
router.put('/:id', verifyToken, productController.update);
router.delete('/:id', verifyToken, productController.delete);

// Nested routes for bids, reviews, and likes
router.get('/:productId/bids', bidController.getAllForProduct);
router.post('/:productId/bids', verifyToken, bidController.create);
// router.delete('/bids/:id', verifyToken, bidController.delete); // This will be in bidRouter.js

router.get('/:productId/reviews', reviewController.getAllForProduct);
router.post('/:productId/reviews', verifyToken, reviewController.create);
// router.put('/reviews/:id', verifyToken, reviewController.update); // This will be in reviewRouter.js
// router.delete('/reviews/:id', verifyToken, reviewController.delete); // This will be in reviewRouter.js

router.get('/:productId/likes', productLikeController.getAllForProduct);
router.post('/:productId/likes', verifyToken, productLikeController.create);
router.delete('/:productId/likes', verifyToken, productLikeController.delete);

module.exports = router;
