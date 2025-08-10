const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bid = sequelize.define('Bid', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    timestamps: true,
    tableName: 'Bids'
  });

  return Bid;
};
