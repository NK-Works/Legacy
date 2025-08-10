'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductLikes', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      productId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductLikes');
  }
};
