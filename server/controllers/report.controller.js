import { generateReport } from '../services/report.service.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Controller to generate report
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const generateReportController = async (req, res, next) => {
  try {
    // City value is validated and normalized by validation middleware
    const { city } = req.body;

    const reportData = await generateReport(city);
    return ApiResponse.success(res, 'Report generated successfully.', reportData);
  } catch (error) {
    next(error);
  }
};
