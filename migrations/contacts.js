'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'users', // Make sure to use the actual table name of your User model
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone number must not be empty" },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: { msg: "Must be a valid email address" },
        },
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  }
};
