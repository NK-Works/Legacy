'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      comment: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      productId: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Reviews');
  }
};
