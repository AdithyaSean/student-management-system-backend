import express from 'express';
const router = express.Router();
import studentController from '../controllers/studentController.js';

// Get all students
router.get('/', studentController.getAllStudents);

// Create new student
router.post('/', studentController.createStudent);

// Get single student
router.get('/:id', studentController.getStudentById);

// Update student
router.put('/:id', studentController.updateStudent);

// Delete student
router.delete('/:id', studentController.deleteStudent);

// Get student results
router.get('/:id/results', studentController.getStudentResults);

export default router;
