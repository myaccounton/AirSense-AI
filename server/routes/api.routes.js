import { Router } from 'express';
import { getCitiesController } from '../controllers/city.controller.js';
import { getScenarioController } from '../controllers/scenario.controller.js';
import { analyzeCityController } from '../controllers/analysis.controller.js';
import { generateReportController } from '../controllers/report.controller.js';
import { validateCityRequest } from '../middleware/validation.middleware.js';

const router = Router();

// GET /api/cities
router.get('/cities', getCitiesController);

// GET /api/scenario/:city
router.get('/scenario/:city', getScenarioController);

// POST /api/analyze (Validated)
router.post('/analyze', validateCityRequest, analyzeCityController);

// POST /api/report (Validated)
router.post('/report', validateCityRequest, generateReportController);

export default router;
