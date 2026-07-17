import { analyzeCity } from '../services/analysis.service.js';

/**
 * Controller to analyze air quality scenario for a city
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const analyzeCityController = async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City field is required in request body'
      });
    }

    const analysisData = await analyzeCity(city);
    return res.status(200).json({
      success: true,
      message: 'Analysis completed successfully.',
      data: {
        city: analysisData.city,
        aqiSummary: analysisData.aqiSummary,
        weatherImpact: analysisData.weatherImpact,
        pollutionReason: analysisData.pollutionReason,
        majorSources: analysisData.majorSources,
        recommendations: analysisData.recommendations,
        healthAdvice: analysisData.healthAdvice
      }
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
      message: 'AI analysis failed.'
    });
  }
};
