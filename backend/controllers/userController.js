const { User } = require("../models");

const userController = {
  async getMe(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: { exclude: ["password"] }, // Exclude password for security
      });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error fetching user profile", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] }, // Exclude password for security
      });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error fetching user", error: error.message });
    }
  },

  async updateMe(req, res) {
    try {
      const updatedUser = await User.update(req.body, {
        where: { id: req.userId },
        returning: true, // Return the updated user
        individualHooks: true, // Run hooks on individual instances
      });

      if (updatedUser[0] === 0) {
        return res.status(404).send({ message: "User not found" });
      }

      const user = await User.findByPk(req.userId, {
        attributes: { exclude: ["password"] }, // Exclude password for security
      });

      res.status(200).send({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error updating profile", error: error.message });
    }
  },

  async deleteMe(req, res) {
    try {
      const deleted = await User.destroy({
        where: { id: req.userId },
      });
      if (!deleted) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(204).send({ message: "Account deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error deleting account", error: error.message });
    }
  },
};

module.exports = userController;
