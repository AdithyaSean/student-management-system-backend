import express from 'express';
const router = express.Router();
import resultController from '../controllers/resultController.js';

// Enter exam results
router.post('/', resultController.enterExamResults);

// Get results for a student
router.get('/student/:studentId', resultController.getStudentResults);

// Get results for a course
router.get('/course/:courseId', resultController.getCourseResults);

// Update exam result
router.put('/:id', resultController.updateExamResult);

// Generate Excel report
router.get('/report', resultController.generateExcelReport);

export default router;
