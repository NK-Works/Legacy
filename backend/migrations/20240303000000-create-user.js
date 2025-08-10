'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      university: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('student', 'admin'),
        defaultValue: 'student'
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
    await queryInterface.dropTable('Users');
  }
};
