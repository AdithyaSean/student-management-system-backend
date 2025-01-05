'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      courseYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      nameWithInitials: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      nic: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      misNumber: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      mobile: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(555),
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false
      },
      deleted: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      changed: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      user: {
        type: Sequelize.INTEGER(7),
        allowNull: false
      },
      dateEntered: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      dropout: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      finalExamSitted: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      repeatStudent: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      }
    });

    // Add indexes
    await queryInterface.addIndex('student_details', ['nic'], {
      unique: true,
      name: 'student_details_nic_unique'
    });

    await queryInterface.addIndex('student_details', ['misNumber'], {
      unique: true,
      name: 'student_details_misNumber_unique'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('student_details');
  }
};
