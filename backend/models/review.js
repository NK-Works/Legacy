const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    timestamps: true,
    tableName: 'Reviews'
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Review.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
  };

  return Review;
};
