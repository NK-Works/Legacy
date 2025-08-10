const { DataTypes } = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    university: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('student', 'admin'),
      defaultValue: 'student'
    }
  }, {
    timestamps: true,
    tableName: 'Users',
    defaultScope: {
      attributes: { exclude: ['password_hash'] }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: 'userId',
      as: 'products'
    });
    User.hasMany(models.Bid, {
      foreignKey: 'userId',
      as: 'bids'
    });
  };

  return User;
};
