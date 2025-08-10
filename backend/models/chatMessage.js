const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'ChatMessages'
  });

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sender'
    });
    ChatMessage.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'receiver'
    });
    ChatMessage.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
  };

  return ChatMessage;
};
