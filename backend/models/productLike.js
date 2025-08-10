const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductLike = sequelize.define('ProductLike', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    timestamps: true,
    tableName: 'ProductLikes'
  });

  return ProductLike;
};
