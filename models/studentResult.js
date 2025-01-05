import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StudentResult = sequelize.define('StudentResult', {
  studentId: {
    type: DataTypes.INTEGER(4),
    primaryKey: true,
    allowNull: false
  },
  courseYear: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    allowNull: false
  },
  moduleCode: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false
  },
  marks: {
    type: DataTypes.INTEGER(10),
    allowNull: false
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
  tableName: 'student_exam_result',
  timestamps: true,
  createdAt: 'date_entered',
  updatedAt: 'date_modified',
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'courseYear', 'moduleCode']
    }
  ]
});

export default StudentResult;
