const { Product, ProductImage } = require('../models');

const productController = {
  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        include: [{ model: ProductImage, as: 'images' }],
      });
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching products', error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: ProductImage, as: 'images' }],
      });
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching product', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { title, description, price, category, images } = req.body;
      const newProduct = await Product.create({
        title,
        description,
        price,
        category,
        userId: req.userId, // Assuming authentication middleware sets req.userId
      });

      // Handle image uploads (if any)
      if (images && images.length > 0) {
        const imageRecords = images.map((imageUrl) => ({
          url: imageUrl,
          productId: newProduct.id,
        }));
        await ProductImage.bulkCreate(imageRecords);
      }

      res.status(201).send({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error creating product', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id, sellerId: req.userId }, // Ensure user owns the product
      });

      if (updated === 0) {
        return res.status(404).send({ message: 'Product not found or unauthorized' });
      }

      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating product', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id, sellerId: req.userId }, // Ensure user owns the product
      });

      if (deleted === 0) {
        return res.status(404).send({ message: 'Product not found or unauthorized' });
      }

      res.status(204).send({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error deleting product', error: error.message });
    }
  },
};

module.exports = productController;
