import { Course, CourseModule, Student } from '../models/index.js';
import { Op } from 'sequelize';

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Course.findAndCountAll({
      where: { Active: 1 },
      limit: parseInt(limit),
      offset: offset,
      order: [['id', 'ASC']],
      include: ['CourseModules']
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Public
const createCourse = async (req, res) => {
  try {
    const { modules, ...courseData } = req.body;
    
    const course = await Course.create(courseData);
    
    if (modules && modules.length > 0) {
      const courseModules = modules.map(module => ({
        ...module,
        CourseId: course.id
      }));
      await CourseModule.bulkCreate(courseModules);
    }

    const createdCourse = await Course.findByPk(course.id, {
      include: ['CourseModules']
    });

    res.status(201).json({
      success: true,
      data: createdCourse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
};

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: ['CourseModules']
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Public
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const { modules, ...courseData } = req.body;
    
    await course.update(courseData);

    if (modules && modules.length > 0) {
      // Delete existing modules
      await CourseModule.destroy({
        where: { CourseId: course.id }
      });

      // Create new modules
      const courseModules = modules.map(module => ({
        ...module,
        CourseId: course.id
      }));
      await CourseModule.bulkCreate(courseModules);
    }

    const updatedCourse = await Course.findByPk(course.id, {
      include: ['CourseModules']
    });

    res.json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Public
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Soft delete
    await course.update({ Active: 0 });
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
};

// @desc    Assign course to student
// @route   POST /api/v1/courses/:id/assign
// @access  Public
const assignCourseToStudent = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    const student = await Student.findByPk(req.body.studentId);

    if (!course || !student) {
      return res.status(404).json({
        success: false,
        message: 'Course or student not found'
      });
    }

    await student.update({
      CourseId: course.id,
      CourseYear: req.body.year || new Date().getFullYear()
    });

    res.json({
      success: true,
      message: 'Course assigned successfully',
      data: {
        studentId: student.id,
        courseId: course.id,
        year: req.body.year || new Date().getFullYear()
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error assigning course',
      error: error.message
    });
  }
};

// @desc    Get course modules
// @route   GET /api/v1/courses/:id/modules
// @access  Public
const getCourseModules = async (req, res) => {
  try {
    const modules = await CourseModule.findAll({
      where: { CourseId: req.params.id, Active: 'YES' }
    });

    res.json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course modules',
      error: error.message
    });
  }
};

export default {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignCourseToStudent,
  getCourseModules
};
