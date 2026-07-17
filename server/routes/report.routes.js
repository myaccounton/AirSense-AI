import { Router } from 'express';
import { generateReportController } from '../controllers/report.controller.js';

const router = Router();

// POST /api/report
router.post('/report', generateReportController);

export default router;
