'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductImages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      productId: {
        type: Sequelize.UUID,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductImages');
  }
};
