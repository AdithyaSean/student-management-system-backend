import { StudentResult, Student, CourseModule } from '../models/index.js';
import ExcelJS from 'exceljs';
import { Op } from 'sequelize';

// @desc    Enter exam results
// @route   POST /api/v1/results
// @access  Public
const enterExamResults = async (req, res) => {
  try {
    const { studentId, results } = req.body;

    // Validate student exists
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Validate and prepare results
    const formattedResults = results.map(result => ({
      StudentId: studentId,
      CourseYear: student.CourseYear,
      ModuleCode: result.moduleCode,
      Marks: result.marks,
      DateEntered: new Date(),
      User: req.user?.id || 'system'
    }));

    // Create results
    const createdResults = await StudentResult.bulkCreate(formattedResults);

    res.status(201).json({
      success: true,
      data: createdResults
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error entering exam results',
      error: error.message
    });
  }
};

// @desc    Get student results
// @route   GET /api/v1/results/student/:studentId
// @access  Public
const getStudentResults = async (req, res) => {
  try {
    const results = await StudentResult.findAll({
      where: { StudentId: req.params.studentId },
      include: [
        {
          model: CourseModule,
          as: 'CourseModule',
          attributes: ['ModuleName']
        }
      ],
      order: [['ModuleCode', 'ASC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student results',
      error: error.message
    });
  }
};

// @desc    Get course results
// @route   GET /api/v1/results/course/:courseId
// @access  Public
const getCourseResults = async (req, res) => {
  try {
    const results = await StudentResult.findAll({
      where: { CourseId: req.params.courseId },
      include: [
        {
          model: Student,
          as: 'Student',
          attributes: ['FullName', 'MISNumber']
        },
        {
          model: CourseModule,
          as: 'CourseModule',
          attributes: ['ModuleName']
        }
      ],
      order: [['StudentId', 'ASC'], ['ModuleCode', 'ASC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course results',
      error: error.message
    });
  }
};

// @desc    Update exam result
// @route   PUT /api/v1/results/:id
// @access  Public
const updateExamResult = async (req, res) => {
  try {
    const result = await StudentResult.findByPk(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    await result.update({
      Marks: req.body.marks,
      DateEntered: new Date(),
      User: req.user?.id || 'system'
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating exam result',
      error: error.message
    });
  }
};

// @desc    Generate Excel report
// @route   GET /api/v1/results/report
// @access  Public
const generateExcelReport = async (req, res) => {
  try {
    const { courseId, year } = req.query;

    const results = await StudentResult.findAll({
      where: {
        CourseId: courseId,
        CourseYear: year
      },
      include: [
        {
          model: Student,
          as: 'Student',
          attributes: ['FullName', 'MISNumber']
        },
        {
          model: CourseModule,
          as: 'CourseModule',
          attributes: ['ModuleName']
        }
      ],
      order: [['StudentId', 'ASC'], ['ModuleCode', 'ASC']]
    });

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Exam Results');

    // Set columns
    worksheet.columns = [
      { header: 'Student ID', key: 'studentId', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'MIS Number', key: 'misNumber', width: 15 },
      { header: 'Module Code', key: 'moduleCode', width: 15 },
      { header: 'Module Name', key: 'moduleName', width: 30 },
      { header: 'Marks', key: 'marks', width: 10 },
      { header: 'Status', key: 'status', width: 15 }
    ];

    // Add rows
    results.forEach(result => {
      worksheet.addRow({
        studentId: result.StudentId,
        name: result.Student.FullName,
        misNumber: result.Student.MISNumber,
        moduleCode: result.ModuleCode,
        moduleName: result.CourseModule.ModuleName,
        marks: result.Marks,
        status: result.Marks >= 40 ? 'Pass' : 'Fail'
      });
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=exam_results.xlsx'
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating report',
      error: error.message
    });
  }
};

export default {
  enterExamResults,
  getStudentResults,
  getCourseResults,
  updateExamResult,
  generateExcelReport
};
