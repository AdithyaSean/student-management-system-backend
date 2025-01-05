'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('student_exam_result', {
      studentId: {
        type: Sequelize.INTEGER(4),
        primaryKey: true,
        allowNull: false
      },
      courseYear: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        allowNull: false
      },
      moduleCode: {
        type: Sequelize.STRING(255),
        primaryKey: true,
        allowNull: false
      },
      marks: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      user: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      dateEntered: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      date_modified: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('student_exam_result', ['studentId', 'courseYear', 'moduleCode'], {
      unique: true,
      name: 'student_exam_result_composite_unique'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('student_exam_result');
  }
};
