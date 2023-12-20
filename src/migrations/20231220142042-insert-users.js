'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      { id: crypto.randomUUID() },
      { id: crypto.randomUUID() },
      { id: crypto.randomUUID() },
    ])
  },

  down: (queryInterface, Sequelize) => {
  }
};
