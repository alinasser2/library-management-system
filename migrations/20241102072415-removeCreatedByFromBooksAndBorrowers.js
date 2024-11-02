'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'created_by');
    await queryInterface.removeColumn('Borrowers', 'created_by');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'created_by', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Borrowers', 'created_by', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
