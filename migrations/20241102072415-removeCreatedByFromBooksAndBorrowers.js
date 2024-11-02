'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Books', 'created_by');
    // await queryInterface.removeColumn('Users', 'created_by');
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('Books', 'created_by', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn('Users', 'created_by', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });
  }
};
