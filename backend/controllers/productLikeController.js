const { ProductLike, Product, User } = require('../models');

const productLikeController = {
  async getAllForProduct(req, res) {
    try {
      const { productId } = req.params;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }

      const likes = await ProductLike.findAll({
        where: { productId },
        include: [
          {
            model: User,
            as: 'User', // Correct alias
          },
          {
            model: Product,
            as: 'Product'
          }
        ],
      });
      res.status(200).send(likes);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error getting likes', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { productId } = req.params;
      const { userId } = req; // Get userId from verified token

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }

      // Check if the user already liked the product
      const existingLike = await ProductLike.findOne({
        where: { productId, userId },
      });
      if (existingLike) {
        return res.status(409).send({ message: 'User already liked this product' });
      }

      const newLike = await ProductLike.create({
        productId,
        userId,
      });
      res.status(201).send(newLike);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error liking product', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { productId } = req.params;
      const { userId } = req;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }

      const like = await ProductLike.findOne({
        where: { productId, userId },
      });
      if (!like) {
        return res.status(404).send({ message: 'Like not found' });
      }

      await like.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error unliking product', error: error.message });
    }
  },
};

module.exports = productLikeController;
