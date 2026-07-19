import { analyzeCity } from '../services/analysis.service.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Controller to analyze air quality scenario for a city
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const analyzeCityController = async (req, res, next) => {
  try {
    // City value is validated and normalized by validation middleware
    const { city } = req.body;

    const analysisData = await analyzeCity(city);
    
    // Format response exactly as required for the frontend
    const responsePayload = {
      city: analysisData.city,
      state: analysisData.state,
      executiveSummary: analysisData.executiveSummary,
      confidence: analysisData.confidence,
      rootCauseAnalysis: analysisData.rootCauseAnalysis,
      recommendations: analysisData.recommendations,
      predictionTimeline: analysisData.predictionTimeline,
      citizenAdvice: analysisData.citizenAdvice
    };

    return ApiResponse.success(res, 'Analysis completed successfully.', responsePayload);
  } catch (error) {
    next(error);
  }
};
