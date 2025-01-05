'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      courseName: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      courseType: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      medium: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      courseLevel: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      moduleCode: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      active: {
        type: Sequelize.INTEGER(3),
        defaultValue: 1
      },
      dateEntered: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      user: {
        type: Sequelize.STRING(25),
        allowNull: false
      }
    });

    // Add index for moduleCode
    await queryInterface.addIndex('course_details', ['moduleCode'], {
      unique: true,
      name: 'course_details_moduleCode_unique'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('course_details');
  }
};
