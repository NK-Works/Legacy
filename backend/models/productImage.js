const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductImage = sequelize.define('ProductImage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    timestamps: false, // No timestamps for ProductImage
    tableName: 'ProductImages'
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };

  return ProductImage;
};
