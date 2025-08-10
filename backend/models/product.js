const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 }
    },
    status: {
      type: DataTypes.ENUM('active', 'sold', 'expired'),
      defaultValue: 'active'
    }
  }, {
    timestamps: true,
    tableName: 'Products'
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Product.hasMany(models.Bid, {
      foreignKey: 'productId',
      as: 'bids'
    });
  };
  return Product;
};
