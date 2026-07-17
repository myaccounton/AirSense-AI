import { Router } from 'express';
import { getCitiesController } from '../controllers/city.controller.js';
import { getScenarioController } from '../controllers/scenario.controller.js';
import { analyzeCityController } from '../controllers/analysis.controller.js';
import { generateReportController } from '../controllers/report.controller.js';

const router = Router();

// GET /api/cities
router.get('/cities', getCitiesController);

// GET /api/scenario/:city
router.get('/scenario/:city', getScenarioController);

// POST /api/analyze
router.post('/analyze', analyzeCityController);

// POST /api/report
router.post('/report', generateReportController);

export default router;
