import express from 'express';
const router = express.Router();
import courseController from '../controllers/courseController.js';

// Get all courses
router.get('/', courseController.getAllCourses);

// Create new course
router.post('/', courseController.createCourse);

// Get single course
router.get('/:id', courseController.getCourseById);

// Update course
router.put('/:id', courseController.updateCourse);

// Delete course
router.delete('/:id', courseController.deleteCourse);

// Assign course to student
router.post('/:id/assign', courseController.assignCourseToStudent);

// Get course modules
router.get('/:id/modules', courseController.getCourseModules);

export default router;
