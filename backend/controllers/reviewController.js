const { Review, User, Product } = require("../models");

const reviewController = {
  async getAllForProduct(req, res) {
    try {
      const reviews = await Review.findAll({
        where: { productId: req.params.productId },
        include: [
          { model: User, as: "User", attributes: ["id", "name"] },
          { model: Product },
        ],
      });
      res.status(200).send(reviews);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error fetching reviews", error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { rating, comment } = req.body;
      const newReview = await Review.create({
        rating,
        comment,
        productId: req.params.productId,
        userId: req.userId, // Assuming authentication middleware sets req.userId
      });

      res
        .status(201)
        .send({ message: "Review created successfully", review: newReview });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error creating review", error: error.message });
    }
  },
  async update(req, res) {
    try {
      const [updated] = await Review.update(req.body, {
        where: { id: req.params.id, reviewerId: req.userId }, // Ensure user owns the review
      });

      if (updated === 0) {
        return res
          .status(404)
          .send({ message: "Review not found or unauthorized" });
      }

      const updatedReview = await Review.findByPk(req.params.id);

      res
        .status(200)
        .send({
          message: "Review updated successfully",
          review: updatedReview,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error updating review", error: error.message });
    }
  },
  async delete(req, res) {
    try {
      const deleted = await Review.destroy({
        where: { id: req.params.id, reviewerId: req.userId }, // Ensure user owns the review
      });

      if (deleted === 0) {
        return res
          .status(404)
          .send({ message: "Review not found or unauthorized" });
      }

      res.status(204).send({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error deleting review", error: error.message });
    }
  },
  async getAllForUser(req, res) {
    try {
      const reviews = await Review.findAll({
        where: { reviewerId: req.params.userId },
        include: [
          { model: User, as: "reviewer", attributes: ["id", "username"] },
          { model: Product },
        ],
      });
      res.status(200).send(reviews);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error fetching reviews", error: error.message });
    }
  },
};

module.exports = reviewController;
