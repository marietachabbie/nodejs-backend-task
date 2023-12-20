"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(10),
        allowNull: false,
        defaultValue: 10000,
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
};
