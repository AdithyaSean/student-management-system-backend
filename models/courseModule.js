import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CourseModule = sequelize.define('CourseModule', {
  moduleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  moduleName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  moduleCode: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      is: /^[A-Z]{3}\d{4}$/ // Matches format like NVQM001
    }
  },
  active: {
    type: DataTypes.STRING(3),
    defaultValue: 'Yes'
  },
  user: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  dateEntered: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'course_module',
  timestamps: false
});

export default CourseModule;
