import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  courseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 2000,
      max: new Date().getFullYear() + 5
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nameWithInitials: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nic: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  misNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  mobile: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 10]
    }
  },
  address: {
    type: DataTypes.STRING(555),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  deleted: {
    type: DataTypes.INTEGER(1),
    defaultValue: 0
  },
  changed: {
    type: DataTypes.INTEGER(1),
    defaultValue: 0
  },
  user: {
    type: DataTypes.INTEGER(7),
    allowNull: false
  },
  dateEntered: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dropout: {
    type: DataTypes.INTEGER(1),
    defaultValue: 0
  },
  finalExamSitted: {
    type: DataTypes.INTEGER(1),
    defaultValue: 0
  },
  repeatStudent: {
    type: DataTypes.INTEGER(1),
    defaultValue: 0
  }
}, {
  tableName: 'student_details',
  timestamps: false
});

export default Student;
