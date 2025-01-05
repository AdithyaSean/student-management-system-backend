import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  courseName: {
    type: DataTypes.STRING(250),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  courseType: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  duration: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  medium: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  courseLevel: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  moduleCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[A-Z]{3}\d{4}$/ // Matches format like NVQM001
    }
  },
  active: {
    type: DataTypes.INTEGER(3),
    defaultValue: 1
  },
  dateEntered: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  user: {
    type: DataTypes.STRING(25),
    allowNull: false
  }
}, {
  tableName: 'course_details',
  timestamps: false
});

export default Course;
