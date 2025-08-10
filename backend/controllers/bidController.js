const { Bid, Product } = require('../models');

const bidController = {
  async getAllForProduct(req, res) {
    try {
      const bids = await Bid.findAll({
        where: { productId: req.params.productId },
        include: [{ model: Product }],
      });
      res.status(200).send(bids);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching bids', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { amount } = req.body;
      const newBid = await Bid.create({
        amount,
        productId: req.params.productId,
        userId: req.userId,
      });

      res.status(201).send({ message: 'Bid placed successfully', bid: newBid });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error placing bid', error: error.message });
    }
  },
    async delete(req, res) {
    try {
      const deleted = await Bid.destroy({
        where: { id: req.params.id, bidderId: req.userId },
      });

      if (deleted === 0) {
        return res.status(404).send({ message: 'Bid not found or unauthorized' });
      }

      res.status(204).send({ message: 'Bid retracted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error deleting bid', error: error.message });
    }
  },

};

module.exports = bidController;
