const { Sequelize } = require('sequelize');
const config = require('../config/config.js');
const User = require('./user');
const Product = require('./product');
const Bid = require('./bid');
const Review = require('./review');
const ProductImage = require('./productImage');
const ChatMessage = require('./chatMessage');
const ProductLike = require('./productLike');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

const models = {
  User: User(sequelize),
  Product: Product(sequelize),
  ProductImage: ProductImage(sequelize),
  ChatMessage: ChatMessage(sequelize),
  Bid: Bid(sequelize),
  Review: Review(sequelize),
  ProductLike: ProductLike(sequelize)
};

// Setup associations once all models are defined
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.User.hasMany(models.Product, { foreignKey: 'userId', as: 'soldProducts' });
models.Product.belongsTo(models.User, { foreignKey: 'userId', as: 'seller' });

models.User.hasMany(models.Bid, { 
  foreignKey: 'userId', 
  as: 'userBids', // Renamed alias to userBids
  targetKey: 'id', // Explicitly specify target key
  sourceKey: 'id'  // Explicitly specify source key
});
models.Bid.belongsTo(models.User, { foreignKey: 'userId', as: 'bidder' });
models.Product.hasMany(models.Bid, { 
  foreignKey: 'productId', 
  as: 'productBids',
  targetKey: 'id', // Explicitly specify target key
  sourceKey: 'id'  // Explicitly specify source key
});
models.Bid.belongsTo(models.Product, { foreignKey: 'productId' });

models.User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
models.Review.belongsTo(models.User, { foreignKey: 'userId', as: 'reviewer' });
models.Product.hasMany(models.Review, { foreignKey: 'productId', as: 'reviews' });
models.Review.belongsTo(models.Product, { foreignKey: 'productId' });

models.Product.hasMany(models.ProductLike, { foreignKey: 'productId', as: 'likes' });
models.ProductLike.belongsTo(models.Product, { foreignKey: 'productId' });
models.User.hasMany(models.ProductLike, { foreignKey: 'userId', as: 'productLikes' });
models.ProductLike.belongsTo(models.User, { foreignKey: 'userId' });

models.Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'images' });
models.ProductImage.belongsTo(models.Product, { foreignKey: 'productId' });

models.Product.hasMany(models.ChatMessage, { foreignKey: 'productId', as: 'chatMessages' });
models.ChatMessage.belongsTo(models.Product, { foreignKey: 'productId' });
models.User.hasMany(models.ChatMessage, { foreignKey: 'senderId', as: 'sentMessages' });
models.ChatMessage.belongsTo(models.User, { foreignKey: 'senderId', as: 'messageSender' });
models.User.hasMany(models.ChatMessage, { foreignKey: 'receiverId', as: 'receivedMessages' });
models.ChatMessage.belongsTo(models.User, { foreignKey: 'receiverId', as: 'messageReceiver' });

module.exports = {
  sequelize,
  ...models
};
