'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_module', {
      moduleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      moduleName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      moduleCode: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      active: {
        type: Sequelize.STRING(3),
        defaultValue: 'Yes'
      },
      user: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      dateEntered: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add index for moduleCode
    await queryInterface.addIndex('course_module', ['moduleCode'], {
      unique: true,
      name: 'course_module_moduleCode_unique'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('course_module');
  }
};
