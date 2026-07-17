import { generateReport } from '../services/report.service.js';

/**
 * Controller to generate report
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const generateReportController = async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City field is required in request body'
      });
    }

    const reportData = await generateReport(city);
    return res.status(200).json({
      success: true,
      message: 'Report generated successfully.',
      data: reportData
    });
  } catch (error) {
    if (error.statusCode === 404 || error.message === 'City not found') {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'AI report generation failed.'
    });
  }
};
