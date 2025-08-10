const { ChatMessage, User, Product } = require('../models');

const chatController = {
  async getUserChats(req, res) {
    try {
      const sentMessages = await ChatMessage.findAll({
        where: { senderId: req.userId },
        include: [
          { model: User, as: 'sender', attributes: ['id', 'username'] },
          { model: User, as: 'receiver', attributes: ['id', 'username'] },
          { model: Product, attributes: ['id', 'title'] },
        ],
      });

      const receivedMessages = await ChatMessage.findAll({
        where: { receiverId: req.userId },
        include: [
          { model: User, as: 'sender', attributes: ['id', 'username'] },
          { model: User, as: 'receiver', attributes: ['id', 'username'] },
          { model: Product, attributes: ['id', 'title'] },
        ],
      });

      const allMessages = [...sentMessages, ...receivedMessages];
      res.status(200).send(allMessages);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching chat messages', error: error.message });
    }
  },
};

module.exports = chatController;
